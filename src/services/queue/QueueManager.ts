
/**
 * Gerenciador de filas para o TechCare Connect Automator
 */

import logger from '../../utils/logger';
import { QueueItem, QueueOptions, QueueStats } from './types';
import { QueueStatistics } from './QueueStats';
import { QueueProcessor } from './QueueProcessor';
import { QueuePriority } from './QueuePriority';

/**
 * Gerenciador de fila com suporte a prioridades, retentativas e concorrência
 */
export class QueueManager<T = any> {
  private queue: Map<string, QueueItem<T>> = new Map();
  private processing: Map<string, QueueItem<T>> = new Map();
  private completed: Map<string, QueueItem<T>> = new Map();
  private failed: Map<string, QueueItem<T>> = new Map();
  private jobFunction: (data: T) => Promise<any>;
  private isProcessing: boolean = false;
  
  // Classes auxiliares
  private statistics: QueueStatistics;
  private processor: QueueProcessor<T>;
  private priorityManager: QueuePriority<T>;
  
  // Configurações da fila
  private options: QueueOptions = {
    concurrency: 1,
    maxRetries: 3,
    retryDelay: 1000
  };
  
  /**
   * Cria uma nova instância de gerenciador de fila
   * @param jobFunction Função que será executada para cada item da fila
   * @param options Opções da fila
   */
  constructor(jobFunction: (data: T) => Promise<any>, options?: Partial<QueueOptions>) {
    this.jobFunction = jobFunction;
    
    // Mesclar opções padrões com fornecidas
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    // Inicializar classes auxiliares
    this.statistics = new QueueStatistics();
    this.processor = new QueueProcessor<T>(jobFunction, this.options, this.statistics);
    this.priorityManager = new QueuePriority<T>();
    
    logger.info('[QueueManager] Inicializado com concorrência:', this.options.concurrency);
    
    // Iniciar processamento da fila
    setTimeout(() => this.processQueue(), 0);
  }
  
  /**
   * Adiciona um item à fila
   * @param id Identificador único do item
   * @param data Dados para processamento
   * @param priority Prioridade do item (valores maiores têm prioridade)
   * @returns O item criado
   */
  public enqueue(id: string, data: T, priority: number = 0): QueueItem<T> {
    // Verificar se o ID já está na fila
    if (this.queue.has(id) || this.processing.has(id)) {
      throw new Error(`Item com ID '${id}' já está na fila`);
    }
    
    // Criar item da fila
    const item: QueueItem<T> = {
      id,
      data,
      status: 'pending',
      priority,
      addedAt: new Date(),
      attempt: 0
    };
    
    // Adicionar à fila
    this.queue.set(id, item);
    
    logger.info(`[QueueManager] Item adicionado à fila: ${id} (prioridade: ${priority})`);
    
    // Verificar se o processamento está parado e reiniciar
    if (!this.isProcessing) {
      this.processQueue();
    }
    
    return item;
  }
  
  /**
   * Remove um item da fila
   * @param id ID do item a ser removido
   * @returns true se o item foi removido, false se não foi encontrado
   */
  public dequeue(id: string): boolean {
    // Verificar se está na fila de pendentes
    if (this.queue.has(id)) {
      this.queue.delete(id);
      logger.info(`[QueueManager] Item removido da fila: ${id}`);
      return true;
    }
    return false;
  }
  
  /**
   * Limpa toda a fila
   * @returns Número de itens removidos
   */
  public clear(): number {
    const count = this.queue.size;
    this.queue.clear();
    logger.info(`[QueueManager] Fila limpa: ${count} itens removidos`);
    return count;
  }
  
  /**
   * Obtém um item específico da fila
   * @param id ID do item
   * @returns O item da fila ou undefined se não encontrado
   */
  public getItem(id: string): QueueItem<T> | undefined {
    return this.queue.get(id) || 
           this.processing.get(id) || 
           this.completed.get(id) || 
           this.failed.get(id);
  }
  
  /**
   * Obtém estatísticas da fila
   */
  public getStats(): QueueStats {
    return {
      pending: this.queue.size,
      processing: this.processing.size,
      completed: this.completed.size,
      failed: this.failed.size,
      retry: Array.from(this.queue.values()).filter(i => i.attempt > 0).length,
      total: this.queue.size + this.processing.size + this.completed.size + this.failed.size,
      averageWaitTime: this.statistics.getAverageWaitTime(),
      averageProcessTime: this.statistics.getAverageProcessTime()
    };
  }
  
  /**
   * Processa a fila continuamente
   */
  private async processQueue(): Promise<void> {
    // Definir como processando
    this.isProcessing = true;
    
    while (this.queue.size > 0 && this.processing.size < this.options.concurrency) {
      try {
        // Obter próximo item por prioridade
        const nextItem = this.priorityManager.getHighestPriorityItem(this.queue);
        
        if (!nextItem) break;
        
        // Remover da fila e adicionar aos em processamento
        this.queue.delete(nextItem.id);
        nextItem.status = 'processing';
        nextItem.startedAt = new Date();
        this.processing.set(nextItem.id, nextItem);
        
        // Calcular tempo de espera
        const waitTime = nextItem.startedAt.getTime() - nextItem.addedAt.getTime();
        this.statistics.addWaitTime(waitTime);
        
        logger.info(`[QueueManager] Processando item ${nextItem.id} (tentativa: ${nextItem.attempt + 1})`);
        
        // Executar em uma Promise separada para não bloquear o loop
        this.processor.processItem(
          nextItem,
          // onComplete
          (item, result) => {
            this.processing.delete(item.id);
            this.completed.set(item.id, item);
            
            // Reiniciar processamento para pegar próximo item
            if (this.queue.size > 0) {
              this.processQueue();
            }
          },
          // onError
          (item, error) => {
            this.processing.delete(item.id);
            this.failed.set(item.id, item);
            
            // Continuar processamento
            if (this.queue.size > 0) {
              this.processQueue();
            }
          },
          // onRetry
          (item, error, delay) => {
            this.processing.delete(item.id);
            
            setTimeout(() => {
              // Verificar se ainda não foi removido manualmente
              if (!this.queue.has(item.id)) {
                this.queue.set(item.id, item);
                logger.info(`[QueueManager] Item ${item.id} adicionado para nova tentativa ${item.attempt + 1}/${this.options.maxRetries}`);
                
                // Reiniciar processamento
                if (!this.isProcessing) {
                  this.processQueue();
                }
              }
            }, delay);
          }
        ).catch(error => {
          logger.error(`[QueueManager] Erro ao processar item ${nextItem.id}:`, error);
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        logger.error('[QueueManager] Erro no loop de processamento:', errorMessage);
        
        // Pequena pausa para evitar loop rápido demais em caso de erros
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Se ainda há itens na fila ou em processamento, agendar nova verificação
    if (this.queue.size > 0 || this.processing.size > 0) {
      setTimeout(() => this.processQueue(), 100);
    } else {
      this.isProcessing = false;
      logger.debug('[QueueManager] Fila vazia, processamento pausado');
    }
  }
}
