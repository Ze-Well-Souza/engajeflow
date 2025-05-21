
/**
 * Sistema de gerenciamento de filas para o TechCare Connect Automator
 * Permite execução paralela e controlada de múltiplas tarefas
 */
import logger from '../../utils/logger';

interface QueueItem<T> {
  id: string;
  data: T;
  priority: number;
  addedAt: number;
  startedAt?: number;
  completedAt?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: Error | string;
  result?: any;
}

interface QueueOptions {
  concurrency: number;
  maxRetries: number;
  retryDelay: number;
}

type JobFunction<T> = (data: T) => Promise<any>;

/**
 * Gerenciador de fila de tarefas para execução controlada
 */
export class QueueManager<T> {
  private queue: QueueItem<T>[] = [];
  private processing: Map<string, QueueItem<T>> = new Map();
  private jobFunction: JobFunction<T>;
  private isProcessing = false;
  private options: QueueOptions;
  private retries: Map<string, number> = new Map();

  constructor(jobFunction: JobFunction<T>, options?: Partial<QueueOptions>) {
    this.jobFunction = jobFunction;
    this.options = {
      concurrency: options?.concurrency || 2,
      maxRetries: options?.maxRetries || 3,
      retryDelay: options?.retryDelay || 5000
    };

    logger.info('[QueueManager] Inicializado', this.options);
  }

  /**
   * Adiciona um item à fila
   * @param id Identificador único do item
   * @param data Dados para processamento
   * @param priority Prioridade (maior número = maior prioridade)
   * @returns O item adicionado
   */
  public enqueue(id: string, data: T, priority = 0): QueueItem<T> {
    // Verificar se o item já está na fila ou em processamento
    if (this.queue.some(item => item.id === id) || this.processing.has(id)) {
      logger.warn(`[QueueManager] Item já está na fila: ${id}`);
      throw new Error(`Item já está na fila: ${id}`);
    }

    const item: QueueItem<T> = {
      id,
      data,
      priority,
      addedAt: Date.now(),
      status: 'pending'
    };

    this.queue.push(item);
    
    // Ordenar por prioridade (maior primeiro) e depois por tempo (mais antigo primeiro)
    this.queue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.addedAt - b.addedAt;
    });

    logger.info(`[QueueManager] Item adicionado à fila: ${id}`, { priority, queueSize: this.queue.length });

    // Iniciar processamento se não estiver ativo
    if (!this.isProcessing) {
      this.process();
    }

    return item;
  }

  /**
   * Remove um item da fila
   */
  public dequeue(id: string): boolean {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    this.queue.splice(index, 1);
    logger.info(`[QueueManager] Item removido da fila: ${id}`, { queueSize: this.queue.length });
    return true;
  }

  /**
   * Processa os itens da fila
   */
  private async process(): Promise<void> {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;
    logger.info('[QueueManager] Iniciando processamento da fila');

    try {
      while (this.queue.length > 0 && this.processing.size < this.options.concurrency) {
        const item = this.queue.shift();
        if (!item) continue;

        this.processing.set(item.id, item);

        // Processar item de forma assíncrona
        item.status = 'processing';
        item.startedAt = Date.now();
        logger.info(`[QueueManager] Processando item: ${item.id}`);

        this.processItem(item).catch(error => {
          logger.error(`[QueueManager] Erro ao processar item ${item.id}:`, error);
        });

        // Continuar processando outros itens sem esperar
      }

      // Se ainda houver itens em processamento, manter o status como processando
      if (this.processing.size > 0) {
        this.isProcessing = true;
      } else {
        this.isProcessing = false;
        logger.info('[QueueManager] Fila vazia, processamento concluído');
      }
    } catch (error) {
      logger.error('[QueueManager] Erro no processamento da fila:', error);
      this.isProcessing = false;
    }
  }

  /**
   * Processa um item individualmente
   */
  private async processItem(item: QueueItem<T>): Promise<void> {
    try {
      const result = await this.jobFunction(item.data);
      
      // Marcar como concluído
      item.status = 'completed';
      item.completedAt = Date.now();
      item.result = result;
      
      logger.info(`[QueueManager] Item processado com sucesso: ${item.id}`, { 
        duration: item.completedAt - (item.startedAt || item.addedAt) 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      item.error = errorMessage;

      // Verificar se deve tentar novamente
      const retryCount = this.retries.get(item.id) || 0;
      if (retryCount < this.options.maxRetries) {
        this.retries.set(item.id, retryCount + 1);
        
        logger.warn(`[QueueManager] Erro ao processar item ${item.id}, tentativa ${retryCount + 1}/${this.options.maxRetries}:`, errorMessage);
        
        // Adicionar novamente à fila após o delay
        setTimeout(() => {
          this.queue.unshift({
            ...item,
            status: 'pending'
          });
          
          logger.info(`[QueueManager] Item readicionado à fila para nova tentativa: ${item.id}`);
          
          // Se não estiver processando, reiniciar
          if (!this.isProcessing) {
            this.process();
          }
        }, this.options.retryDelay);
      } else {
        // Marcar como falha definitiva
        item.status = 'failed';
        item.completedAt = Date.now();
        
        logger.error(`[QueueManager] Item falhou definitivamente após ${this.options.maxRetries} tentativas: ${item.id}`, errorMessage);
      }
    } finally {
      // Remover dos itens em processamento
      this.processing.delete(item.id);

      // Verificar se deve continuar processando
      if (this.queue.length > 0 && this.processing.size < this.options.concurrency) {
        this.process();
      } else if (this.processing.size === 0) {
        this.isProcessing = false;
        logger.info('[QueueManager] Processamento concluído');
      }
    }
  }

  /**
   * Retorna estatísticas da fila
   */
  public getStats() {
    return {
      pending: this.queue.length,
      processing: this.processing.size,
      completed: this.getItemsByStatus('completed').length,
      failed: this.getItemsByStatus('failed').length,
      total: this.queue.length + this.processing.size
    };
  }

  /**
   * Retorna todos os itens com um determinado status
   */
  private getItemsByStatus(status: 'pending' | 'processing' | 'completed' | 'failed'): QueueItem<T>[] {
    return [
      ...this.queue.filter(item => item.status === status),
      ...[...this.processing.values()].filter(item => item.status === status)
    ];
  }

  /**
   * Limpa a fila (não afeta itens em processamento)
   */
  public clear(): number {
    const count = this.queue.length;
    this.queue = [];
    logger.info(`[QueueManager] Fila limpa, ${count} itens removidos`);
    return count;
  }
}

export default QueueManager;
