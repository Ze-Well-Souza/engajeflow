
import { ApiRequest, ApiResponse, GatewayConfig, RetryOptions } from "@/types/gateway";
import { cacheService } from "./cacheService";
import { retryService } from "./retryService";
import { initializeLoadBalancer, loadBalancerService } from "./loadBalancerService";
import { priorityService } from "./priorityService";

// Contador para registrar conexões simultâneas
let circuitState: 'closed' | 'open' | 'half-open' = 'closed';
let failureCount = 0;
let lastCircuitOpenTime = 0;

// Configuração padrão do gateway
const defaultConfig: GatewayConfig = {
  defaultRetry: {
    maxRetries: 3,
    initialDelayMs: 500,
    backoffFactor: 2,
    shouldRetry: (error) => {
      // Erros de rede ou códigos 5xx são retentáveis por padrão
      if (!error.response) return true;
      return error.response.status >= 500 && error.response.status < 600;
    }
  },
  defaultCache: {
    enabled: true,
    ttlSeconds: 60, // 1 minuto por padrão
    keyPrefix: 'api'
  },
  rateLimiting: {
    enabled: true,
    requestsPerMinute: 100
  },
  circuitBreaker: {
    enabled: true,
    failureThreshold: 5,
    resetTimeoutMs: 30000 // 30 segundos
  }
};

// Contador de requisições no último minuto (para rate limiting)
let requestsInLastMinute = 0;
const requestTimestamps: number[] = [];

// Limpa as requisições antigas da janela de tempo
const cleanupRequestCounts = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  // Remover timestamps mais antigos que um minuto
  while (requestTimestamps.length && requestTimestamps[0] < oneMinuteAgo) {
    requestTimestamps.shift();
  }
  
  requestsInLastMinute = requestTimestamps.length;
};

class ApiGateway {
  private config: GatewayConfig;

  constructor(config: Partial<GatewayConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    
    // Inicializar load balancer se configurado
    if (this.config.loadBalancer) {
      initializeLoadBalancer(this.config.loadBalancer);
    }
    
    // Iniciar limpeza periódica dos contadores de rate limiting
    setInterval(cleanupRequestCounts, 5000);
  }

  /**
   * Executa uma requisição HTTP através do gateway
   */
  async request<T = any>(request: ApiRequest): Promise<ApiResponse> {
    // Aplicar rate limiting se habilitado
    if (this.config.rateLimiting.enabled) {
      cleanupRequestCounts();
      
      if (requestsInLastMinute >= this.config.rateLimiting.requestsPerMinute) {
        const response: ApiResponse = {
          success: false,
          error: "Rate limit excedido",
          statusCode: 429,
          timestamp: Date.now()
        };
        return response;
      }
      
      requestTimestamps.push(Date.now());
      requestsInLastMinute++;
    }
    
    // Verificar o estado do circuit breaker
    if (this.config.circuitBreaker.enabled && circuitState === 'open') {
      const now = Date.now();
      
      // Verificar se já passou o tempo de reset
      if (now - lastCircuitOpenTime > this.config.circuitBreaker.resetTimeoutMs) {
        // Mudar para half-open para tentar uma requisição
        circuitState = 'half-open';
        console.log('Circuit Breaker: Mudando para estado half-open');
      } else {
        // Circuit breaker ainda aberto
        const response: ApiResponse = {
          success: false,
          error: "Serviço indisponível (Circuit Breaker aberto)",
          statusCode: 503,
          timestamp: Date.now()
        };
        return response;
      }
    }
    
    // Gerar chave de cache com base na requisição
    const cacheKey = cacheService.generateCacheKey(
      request.url, 
      request.method, 
      request.method !== 'GET' ? request.data : undefined
    );
    
    // Verificar cache para requisições GET
    const cacheOptions = request.cache || this.config.defaultCache;
    if (request.method === 'GET' && cacheOptions.enabled) {
      const cachedResponse = cacheService.get(cacheKey, cacheOptions);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Configurar balanceamento de carga se disponível
    let finalUrl = request.url;
    let selectedEndpoint: string | null = null;
    
    if (loadBalancerService && !request.url.startsWith('http')) {
      selectedEndpoint = loadBalancerService.getNextEndpoint();
      finalUrl = `${selectedEndpoint}${request.url.startsWith('/') ? '' : '/'}${request.url}`;
      
      if (selectedEndpoint) {
        loadBalancerService.incrementConnectionCount(selectedEndpoint);
      }
    }
    
    try {
      // Definir opções de retry
      const retryOptions: RetryOptions = request.retry || this.config.defaultRetry;
      
      // Executar requisição com prioridade
      const executeRequest = async () => {
        try {
          // Executar requisição com retry
          const response = await retryService.executeWithRetry(
            async () => {
              const response = await fetch(finalUrl, {
                method: request.method,
                headers: {
                  'Content-Type': 'application/json',
                  ...request.headers
                },
                body: request.data ? JSON.stringify(request.data) : undefined
              });
              
              if (!response.ok) {
                throw {
                  response: {
                    status: response.status,
                    statusText: response.statusText
                  }
                };
              }
              
              let responseData;
              const contentType = response.headers.get('content-type');
              
              if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
              } else {
                responseData = await response.text();
              }
              
              return {
                success: true,
                data: responseData,
                statusCode: response.status,
                timestamp: Date.now()
              };
            },
            retryOptions
          );
          
          // Estado do circuit breaker: sucesso
          if (this.config.circuitBreaker.enabled) {
            if (circuitState === 'half-open') {
              // Se estava meio aberto e sucedeu, fechar o circuit breaker
              circuitState = 'closed';
              failureCount = 0;
              console.log('Circuit Breaker: Fechado após sucesso em half-open');
            }
          }
          
          // Armazenar em cache para requisições GET
          if (request.method === 'GET' && cacheOptions.enabled) {
            cacheService.set(cacheKey, response, cacheOptions);
          }
          
          return response;
        } catch (error) {
          // Estado do circuit breaker: falha
          if (this.config.circuitBreaker.enabled) {
            failureCount++;
            
            if (circuitState === 'half-open' || 
                (circuitState === 'closed' && failureCount >= this.config.circuitBreaker.failureThreshold)) {
              // Abrir o circuit breaker
              circuitState = 'open';
              lastCircuitOpenTime = Date.now();
              console.log(`Circuit Breaker: Aberto após ${failureCount} falhas`);
            }
          }
          
          const apiResponse: ApiResponse = {
            success: false,
            error: error.message || "Erro na requisição",
            statusCode: error.response?.status || 500,
            timestamp: Date.now()
          };
          
          throw apiResponse;
        }
      };
      
      // Usar o serviço de priorização para executar a requisição
      return await priorityService.enqueue(executeRequest, request.priority || 'normal');
    } finally {
      // Decrementar contador de conexões se estiver usando balanceamento
      if (selectedEndpoint && loadBalancerService) {
        loadBalancerService.decrementConnectionCount(selectedEndpoint);
      }
    }
  }

  // Métodos auxiliares para os diferentes tipos de requisição
  async get<T = any>(url: string, options: Partial<ApiRequest> = {}): Promise<ApiResponse> {
    return this.request<T>({
      url,
      method: 'GET',
      ...options
    });
  }

  async post<T = any>(url: string, data: any, options: Partial<ApiRequest> = {}): Promise<ApiResponse> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...options
    });
  }

  async put<T = any>(url: string, data: any, options: Partial<ApiRequest> = {}): Promise<ApiResponse> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...options
    });
  }

  async delete<T = any>(url: string, options: Partial<ApiRequest> = {}): Promise<ApiResponse> {
    return this.request<T>({
      url,
      method: 'DELETE',
      ...options
    });
  }

  // Método para invalidar cache
  invalidateCache(url: string, method: string = 'GET', data?: any): void {
    const cacheKey = cacheService.generateCacheKey(url, method, data);
    cacheService.invalidate(cacheKey, this.config.defaultCache.keyPrefix);
  }

  // Método para limpar todo o cache
  clearCache(): void {
    cacheService.clear();
  }
}

// Criar uma instância singleton do gateway com configuração padrão
export const apiGateway = new ApiGateway();
