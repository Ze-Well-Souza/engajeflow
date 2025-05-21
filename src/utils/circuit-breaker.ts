
/**
 * Circuit Breaker para evitar falhas em cascata
 */
import logger from './logger';

// Estados do circuit breaker
enum CircuitState {
  CLOSED,    // Funcionamento normal
  OPEN,      // Circuito aberto, falhas detectadas
  HALF_OPEN  // Teste de recuperação
}

// Opções de configuração
interface CircuitBreakerOptions {
  failureThreshold: number;   // Número de falhas necessárias para abrir o circuito
  resetTimeout: number;       // Tempo em ms para tentar fechar o circuito novamente
  halfOpenSuccessThreshold?: number;  // Número de sucessos necessários para fechar completamente
}

/**
 * Implementação de Circuit Breaker
 */
export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private nextAttempt: number = Date.now();
  private readonly options: Required<CircuitBreakerOptions>;

  constructor(options: CircuitBreakerOptions) {
    // Configuração padrão
    this.options = {
      halfOpenSuccessThreshold: 1,
      ...options
    };

    logger.debug('Circuit breaker inicializado', this.options);
  }

  /**
   * Executa uma função protegida pelo circuit breaker
   */
  public async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Verificar se o circuito está aberto
    if (this.state === CircuitState.OPEN) {
      // Verificar se é hora de tentar novamente
      if (this.nextAttempt <= Date.now()) {
        logger.info('Circuit breaker entrando em estado semi-aberto');
        this.state = CircuitState.HALF_OPEN;
      } else {
        const err = new Error('Circuito aberto, falha rápida');
        logger.warn('Circuit breaker recusando requisição', {
          nextAttempt: new Date(this.nextAttempt).toISOString()
        });
        throw err;
      }
    }

    try {
      // Executar função protegida
      const result = await fn();

      // Atualizar contador de sucessos
      this.recordSuccess();

      return result;
    } catch (error) {
      // Atualizar contador de falhas
      this.recordFailure();

      // Relançar o erro
      throw error;
    }
  }

  /**
   * Registra um sucesso
   */
  private recordSuccess(): void {
    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      
      // Verificar se atingiu o threshold para fechar o circuito
      if (this.successCount >= this.options.halfOpenSuccessThreshold) {
        logger.info('Circuit breaker fechando após recuperação');
        this.state = CircuitState.CLOSED;
        this.reset();
      }
    } else if (this.state === CircuitState.CLOSED) {
      // Resetar contadores em caso de sucesso
      this.reset();
    }
  }

  /**
   * Registra uma falha
   */
  private recordFailure(): void {
    this.failureCount++;

    if (this.state === CircuitState.CLOSED) {
      // Verificar se atingiu o threshold para abrir o circuito
      if (this.failureCount >= this.options.failureThreshold) {
        logger.warn('Circuit breaker abrindo após múltiplas falhas');
        this.state = CircuitState.OPEN;
        this.nextAttempt = Date.now() + this.options.resetTimeout;
      }
    } else if (this.state === CircuitState.HALF_OPEN) {
      // Falha durante teste, voltar para aberto
      logger.warn('Circuit breaker voltando para estado aberto após falha no teste');
      this.state = CircuitState.OPEN;
      this.nextAttempt = Date.now() + this.options.resetTimeout;
    }
  }

  /**
   * Reseta contadores internos
   */
  private reset(): void {
    this.failureCount = 0;
    this.successCount = 0;
  }

  /**
   * Obtém o estado atual do circuit breaker
   */
  public getState(): string {
    switch (this.state) {
      case CircuitState.CLOSED: return 'CLOSED';
      case CircuitState.OPEN: return 'OPEN';
      case CircuitState.HALF_OPEN: return 'HALF_OPEN';
    }
  }

  /**
   * Força o fechamento do circuit breaker
   */
  public forceClose(): void {
    this.state = CircuitState.CLOSED;
    this.reset();
    logger.info('Circuit breaker forçado para estado fechado');
  }
}
