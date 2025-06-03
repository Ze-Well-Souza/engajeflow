
/**
 * Serviço responsável pelo Circuit Breaker
 * Implementa o padrão de circuit breaker para evitar chamadas a serviços falhando
 */

type CircuitState = 'closed' | 'open' | 'half-open';

interface CircuitBreakerConfig {
  enabled: boolean;
  failureThreshold: number;
  resetTimeoutMs: number;
}

class CircuitBreakerService {
  private state: CircuitState = 'closed';
  private failureCount = 0;
  private lastCircuitOpenTime = 0;
  private config: CircuitBreakerConfig = {
    enabled: true,
    failureThreshold: 5,
    resetTimeoutMs: 30000
  };

  /**
   * Inicializa o circuit breaker com a configuração fornecida
   */
  init(config: CircuitBreakerConfig): void {
    this.config = config;
    this.state = 'closed';
    this.failureCount = 0;
    this.lastCircuitOpenTime = 0;
  }

  /**
   * Verifica se o circuit breaker está no estado aberto
   */
  isOpen(): boolean {
    return this.state === 'open';
  }

  /**
   * Tenta mudar para o estado half-open se o tempo de espera tiver expirado
   * @returns true se transitou para half-open, false caso contrário
   */
  tryHalfOpen(): boolean {
    const now = Date.now();
    
    // Verificar se já passou o tempo de reset
    if (now - this.lastCircuitOpenTime > this.config.resetTimeoutMs) {
      // Mudar para half-open para tentar uma requisição
      this.state = 'half-open';
      console.log('Circuit Breaker: Mudando para estado half-open');
      return true;
    }
    
    return false;
  }

  /**
   * Registra sucesso, transitando de half-open para closed se necessário
   */
  onSuccess(): void {
    if (this.state === 'half-open') {
      // Se estava meio aberto e sucedeu, fechar o circuit breaker
      this.state = 'closed';
      this.failureCount = 0;
      console.log('Circuit Breaker: Fechado após sucesso em half-open');
    }
  }

  /**
   * Registra falha, potencialmente abrindo o circuito
   */
  onFailure(): void {
    this.failureCount++;
    
    if (this.state === 'half-open' || 
        (this.state === 'closed' && this.failureCount >= this.config.failureThreshold)) {
      // Abrir o circuit breaker
      this.state = 'open';
      this.lastCircuitOpenTime = Date.now();
      console.log(`Circuit Breaker: Aberto após ${this.failureCount} falhas`);
    }
  }

  /**
   * Fecha o circuit breaker manualmente
   */
  reset(): void {
    this.state = 'closed';
    this.failureCount = 0;
    console.log('Circuit Breaker: Reset manual para estado fechado');
  }
}

export const circuitBreakerService = new CircuitBreakerService();
