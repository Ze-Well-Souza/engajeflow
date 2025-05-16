
import { LoadBalancerConfig } from "@/types/gateway";

interface EndpointHealth {
  url: string;
  healthy: boolean;
  lastCheck: number;
  failureCount: number;
  successCount: number;
  activeConnections: number;
}

export class LoadBalancerService {
  private config: LoadBalancerConfig;
  private currentIndex: number = 0;
  private endpointHealth: EndpointHealth[] = [];
  private healthCheckInterval: number | null = null;

  constructor(config: LoadBalancerConfig) {
    this.config = config;
    this.initializeHealthStatus();
    
    if (config.healthCheck.enabled) {
      this.startHealthChecks();
    }
  }

  private initializeHealthStatus() {
    this.endpointHealth = this.config.endpoints.map(url => ({
      url,
      healthy: true, // Assumir saudável inicialmente
      lastCheck: 0,
      failureCount: 0,
      successCount: 0,
      activeConnections: 0
    }));
  }

  private startHealthChecks() {
    this.healthCheckInterval = window.setInterval(
      () => this.performHealthChecks(), 
      this.config.healthCheck.intervalMs
    );
  }

  public stopHealthChecks() {
    if (this.healthCheckInterval !== null) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  private async performHealthChecks() {
    for (const endpoint of this.endpointHealth) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.healthCheck.timeoutMs);
        
        const response = await fetch(`${endpoint.url}/health`, {
          method: 'GET',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          this.updateEndpointHealth(endpoint.url, true);
        } else {
          this.updateEndpointHealth(endpoint.url, false);
        }
      } catch (error) {
        this.updateEndpointHealth(endpoint.url, false);
      }
    }
  }

  private updateEndpointHealth(url: string, isHealthy: boolean) {
    const endpoint = this.endpointHealth.find(e => e.url === url);
    if (!endpoint) return;
    
    endpoint.lastCheck = Date.now();
    
    if (isHealthy) {
      endpoint.successCount++;
      // Se atingiu o limiar de sucessos, marcar como saudável
      if (!endpoint.healthy && endpoint.successCount >= this.config.healthCheck.healthyThreshold) {
        endpoint.healthy = true;
        endpoint.failureCount = 0;
        console.log(`LoadBalancer: Endpoint ${url} está saudável novamente`);
      }
    } else {
      endpoint.failureCount++;
      // Se atingiu o limiar de falhas, marcar como não saudável
      if (endpoint.healthy && endpoint.failureCount >= this.config.healthCheck.unhealthyThreshold) {
        endpoint.healthy = false;
        endpoint.successCount = 0;
        console.log(`LoadBalancer: Endpoint ${url} está não saudável`);
      }
    }
  }

  /**
   * Retorna o próximo endpoint disponível com base na estratégia configurada
   */
  public getNextEndpoint(): string {
    const healthyEndpoints = this.endpointHealth.filter(e => e.healthy);
    
    // Se não há endpoints saudáveis, retornar o primeiro configurado
    if (healthyEndpoints.length === 0) {
      console.warn("LoadBalancer: Nenhum endpoint saudável disponível, usando o primeiro configurado");
      return this.config.endpoints[0];
    }
    
    let selectedEndpoint: EndpointHealth;
    
    switch (this.config.strategy) {
      case "round-robin":
        // Implementação Round-Robin
        selectedEndpoint = healthyEndpoints[this.currentIndex % healthyEndpoints.length];
        this.currentIndex++;
        break;
        
      case "least-connections":
        // Menos conexões ativas
        selectedEndpoint = healthyEndpoints.reduce((min, current) => 
          current.activeConnections < min.activeConnections ? current : min, 
          healthyEndpoints[0]);
        break;
        
      case "random":
      default:
        // Escolha aleatória
        const randomIndex = Math.floor(Math.random() * healthyEndpoints.length);
        selectedEndpoint = healthyEndpoints[randomIndex];
        break;
    }
    
    return selectedEndpoint.url;
  }

  /**
   * Registra uma nova conexão ativa para um endpoint
   */
  public incrementConnectionCount(url: string): void {
    const endpoint = this.endpointHealth.find(e => e.url === url);
    if (endpoint) {
      endpoint.activeConnections++;
    }
  }

  /**
   * Registra o término de uma conexão para um endpoint
   */
  public decrementConnectionCount(url: string): void {
    const endpoint = this.endpointHealth.find(e => e.url === url);
    if (endpoint) {
      endpoint.activeConnections = Math.max(0, endpoint.activeConnections - 1);
    }
  }
}

// Singleton para uso em toda a aplicação
export let loadBalancerService: LoadBalancerService | null = null;

export const initializeLoadBalancer = (config: LoadBalancerConfig) => {
  loadBalancerService = new LoadBalancerService(config);
  return loadBalancerService;
};
