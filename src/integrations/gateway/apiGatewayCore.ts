
import { ApiRequest, ApiResponse, GatewayConfig, RetryOptions } from "@/types/gateway";
import { cacheService } from "./cacheService";
import { retryService } from "./retryService";
import { initializeLoadBalancer, loadBalancerService } from "./loadBalancerService";
import { priorityService } from "./priorityService";
import { circuitBreakerService } from "./circuitBreakerService";
import { rateLimitService } from "./rateLimitService";

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

class ApiGateway {
  private config: GatewayConfig;

  constructor(config: Partial<GatewayConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    
    // Inicializar load balancer se configurado
    if (this.config.loadBalancer) {
      initializeLoadBalancer(this.config.loadBalancer);
    }
    
    // Inicializar o serviço de rate limiting
    rateLimitService.init(this.config.rateLimiting);
    
    // Inicializar o circuit breaker
    circuitBreakerService.init(this.config.circuitBreaker);
  }

  /**
   * Executa uma requisição HTTP através do gateway
   */
  async request<T = any>(request: ApiRequest): Promise<ApiResponse> {
    // Aplicar rate limiting se habilitado
    if (this.config.rateLimiting.enabled) {
      const rateLimitExceeded = rateLimitService.isRateLimited();
      if (rateLimitExceeded) {
        const response: ApiResponse = {
          success: false,
          error: "Rate limit excedido",
          statusCode: 429,
          timestamp: Date.now()
        };
        return response;
      }
    }
    
    // Verificar o estado do circuit breaker
    if (this.config.circuitBreaker.enabled && circuitBreakerService.isOpen()) {
      const circuitTransitionToHalfOpen = circuitBreakerService.tryHalfOpen();
      
      if (!circuitTransitionToHalfOpen) {
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
    
    return this.executeRequest(request, cacheKey, cacheOptions);
  }

  /**
   * Executa a requisição HTTP com todas as verificações e tratamentos
   */
  private async executeRequest(request: ApiRequest, cacheKey: string, cacheOptions: any): Promise<ApiResponse> {
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
            circuitBreakerService.onSuccess();
          }
          
          // Armazenar em cache para requisições GET
          if (request.method === 'GET' && cacheOptions.enabled) {
            cacheService.set(cacheKey, response, cacheOptions);
          }
          
          return response;
        } catch (error) {
          // Estado do circuit breaker: falha
          if (this.config.circuitBreaker.enabled) {
            circuitBreakerService.onFailure();
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
