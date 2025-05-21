
import { QueueItem, QueueOptions } from './types';
import { QueueStatistics } from './QueueStats';
import logger from '../../utils/logger';

/**
 * Classe responsável por processar itens da fila
 */
export class QueueProcessor<T = any> {
  private jobFunction: (data: T) => Promise<any>;
  private options: QueueOptions;
  private statistics: QueueStatistics;
  
  constructor(
    jobFunction: (data: T) => Promise<any>,
    options: QueueOptions,
    statistics: QueueStatistics
  ) {
    this.jobFunction = jobFunction;
    this.options = options;
    this.statistics = statistics;
  }
  
  /**
   * Processa um único item da fila
   * @param item Item a ser processado
   * @param onComplete Callback chamado quando o processamento for concluído
   * @param onError Callback chamado quando ocorrer um erro
   * @param onRetry Callback chamado quando for necessário tentar novamente
   */
  public async processItem(
    item: QueueItem<T>,
    onComplete: (item: QueueItem<T>, result: any) => void,
    onError: (item: QueueItem<T>, error: string) => void,
    onRetry: (item: QueueItem<T>, error: string, delay: number) => void
  ): Promise<void> {
    try {
      // Incrementar contador de tentativas
      item.attempt++;
      
      // Executar função de processamento
      const result = await this.jobFunction(item.data);
      
      // Atualizar item como concluído
      item.status = 'completed';
      item.completedAt = new Date();
      item.result = result;
      
      // Calcular tempo de processamento
      const processTime = item.completedAt.getTime() - (item.startedAt as Date).getTime();
      this.statistics.addProcessTime(processTime);
      
      logger.info(`[QueueProcessor] Item ${item.id} processado com sucesso`);
      
      // Chamar callback de conclusão
      onComplete(item, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      // Verificar se deve tentar novamente
      if (item.attempt < this.options.maxRetries) {
        logger.warn(
          `[QueueProcessor] Erro ao processar item ${item.id} (tentativa ${item.attempt}/${this.options.maxRetries}):`, 
          errorMessage
        );
        
        // Atualizar status para retry
        item.status = 'retry';
        item.error = errorMessage;
        
        // Calcular delay para nova tentativa - aumenta com base no número de tentativas
        const retryDelay = this.options.retryDelay * item.attempt;
        
        // Chamar callback de retry
        onRetry(item, errorMessage, retryDelay);
      } else {
        // Sem mais tentativas, marcar como falha
        logger.error(
          `[QueueProcessor] Falha ao processar item ${item.id} após ${item.attempt} tentativas:`, 
          errorMessage
        );
        
        item.status = 'failed';
        item.error = errorMessage;
        item.failedAt = new Date();
        
        // Chamar callback de erro
        onError(item, errorMessage);
      }
    }
  }
}
