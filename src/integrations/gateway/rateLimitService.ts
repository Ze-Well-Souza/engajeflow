
/**
 * Serviço responsável pelo controle de rate limiting
 * Limita o número de requisições por janela de tempo
 */

interface RateLimitConfig {
  enabled: boolean;
  requestsPerMinute: number;
}

class RateLimitService {
  private requestTimestamps: number[] = [];
  private requestsInLastMinute = 0;
  private config: RateLimitConfig = {
    enabled: true,
    requestsPerMinute: 100
  };

  /**
   * Inicializa o serviço com a configuração fornecida
   */
  init(config: RateLimitConfig): void {
    this.config = config;
    this.requestTimestamps = [];
    this.requestsInLastMinute = 0;
    
    // Iniciar limpeza periódica dos contadores
    setInterval(() => this.cleanupRequestCounts(), 5000);
  }

  /**
   * Verifica se o rate limit foi excedido
   * @returns true se excedido, false caso contrário
   */
  isRateLimited(): boolean {
    if (!this.config.enabled) return false;
    
    this.cleanupRequestCounts();
    
    if (this.requestsInLastMinute >= this.config.requestsPerMinute) {
      return true;
    }
    
    // Registra a requisição atual
    this.requestTimestamps.push(Date.now());
    this.requestsInLastMinute++;
    
    return false;
  }

  /**
   * Limpa as requisições antigas da janela de tempo
   */
  private cleanupRequestCounts(): void {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Remover timestamps mais antigos que um minuto
    while (this.requestTimestamps.length && this.requestTimestamps[0] < oneMinuteAgo) {
      this.requestTimestamps.shift();
    }
    
    this.requestsInLastMinute = this.requestTimestamps.length;
  }
}

export const rateLimitService = new RateLimitService();
