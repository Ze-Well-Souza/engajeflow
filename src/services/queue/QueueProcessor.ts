/**
 * Implementação atualizada do QueueProcessor com melhor tratamento de erros e suporte a eventos
 */

import { QueueItem, QueueOptions, IQueueItemProcessor, IQueueEventEmitter, QueueEventType } from './interfaces';
import logger from '../../utils/logger';

/**
 * Processador de itens da fila com suporte a retentativas e eventos
 */
export class QueueProcessor<T = any> implements IQueueItemProcessor<T> {
  private jobFunction: (data: T) => Promise<any>;
  private options: QueueOptions;
  private eventEmitter: IQueueEventEmitter<T>;
  
  /**
   * Cria uma nova instância do processador de itens
   * @param jobFunction Função que será executada para cada item
   * @param options Opções de configuração
   * @param eventEmitter Emissor de eventos para notificações
   */
  constructor(
    jobFunction: (data: T) => Promise<any>,
    options: QueueOptions,
    eventEmitter: IQueueEventEmitter<T>
  ) {
    this.jobFunction = jobFunction;
    this.options = options;
    this.eventEmitter = eventEmitter;
    
    logger.debug('[QueueProcessor] Inicializado com configurações:', JSON.stringify({
      maxRetries: options.maxRetries,
      retryDelay: options.retryDelay,
      retryStrategy: options.retryStrategy || 'fixed'
    }));
  }
  
  /**
   * Processa um item da fila
   * @param item Item a ser processado
   * @returns Promise com o resultado do processamento
   */
  public async process(item: QueueItem<T>): Promise<any> {
    try {
      logger.info(`[QueueProcessor] Processando item ${item.id} (tentativa: ${item.attempt + 1}/${this.options.maxRetries})`);
      
      // Emitir evento de início de processamento
      this.eventEmitter.emit('item:started', item);
      
      // Registrar tempo de início para cálculo de duração
      const startTime = Date.now();
      
      // Executar a função de processamento
      const result = await this.jobFunction(item.data);
      
      // Calcular duração do processamento
      const duration = Date.now() - startTime;
      
      logger.info(`[QueueProcessor] Item ${item.id} processado com sucesso em ${duration}ms`);
      
      // Emitir evento de conclusão
      this.eventEmitter.emit('item:completed', item, { result, duration });
      
      return result;
    } catch (error) {
      // Extrair mensagem de erro
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      logger.error(`[QueueProcessor] Erro ao processar item ${item.id}:`, errorMessage);
      
      // Verificar se deve tentar novamente
      if (item.attempt < this.options.maxRetries) {
        // Calcular delay para próxima tentativa
        const retryDelay = this.calculateRetryDelay(item.attempt);
        
        logger.info(`[QueueProcessor] Agendando nova tentativa para item ${item.id} em ${retryDelay}ms`);
        
        // Emitir evento de retry
        this.eventEmitter.emit('item:retry', item, { error: errorMessage, retryDelay });
        
        // Rejeitar com informações para retry
        throw new RetryError(errorMessage, retryDelay);
      } else {
        logger.warn(`[QueueProcessor] Item ${item.id} falhou após ${item.attempt + 1} tentativas`);
        
        // Emitir evento de falha
        this.eventEmitter.emit('item:failed', item, { error: errorMessage });
        
        // Rejeitar com erro final
        throw new FinalError(errorMessage);
      }
    }
  }
  
  /**
   * Calcula o delay para a próxima tentativa com base na estratégia configurada
   * @param attempt Número da tentativa atual (0-based)
   * @returns Delay em milissegundos
   */
  private calculateRetryDelay(attempt: number): number {
    const { retryDelay, retryStrategy, retryMultiplier } = this.options;
    const multiplier = retryMultiplier || 2;
    
    switch (retryStrategy) {
      case 'exponential':
        // Crescimento exponencial: delay * (multiplier ^ attempt)
        return retryDelay * Math.pow(multiplier, attempt);
        
      case 'linear':
        // Crescimento linear: delay * (1 + attempt * multiplier)
        return retryDelay * (1 + attempt * multiplier);
        
      case 'fixed':
      default:
        // Delay fixo
        return retryDelay;
    }
  }
}

/**
 * Erro que indica que o item deve ser tentado novamente
 */
export class RetryError extends Error {
  public retryDelay: number;
  
  constructor(message: string, retryDelay: number) {
    super(message);
    this.name = 'RetryError';
    this.retryDelay = retryDelay;
  }
}

/**
 * Erro que indica que o item falhou definitivamente
 */
export class FinalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FinalError';
  }
}
