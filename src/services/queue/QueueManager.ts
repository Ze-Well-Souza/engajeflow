
/**
 * Gerenciador de filas para o TechCare Connect Automator
 */

import logger from '../../utils/logger';

/**
 * Interface para um item da fila
 */
export interface QueueItem<T = any> {
  id: string;
  data: T;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'retry';
  priority: number;
  addedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  error?: string;
  attempt: number;
  result?: any;
}

/**
 * Interface para estatísticas da fila
 */
export interface QueueStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  retry: number;
  total: number;
  averageWaitTime: number;
  averageProcessTime: number;
}

/**
 * Opções para configuração da fila
 */
export interface QueueOptions {
  concurrency: number;
  maxRetries: number;
  retryDelay: number;
}

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
  private waitTimes: number[] = [];
  private processTimes: number[] = [];
  
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
    const avgWaitTime = this.waitTimes.length > 0 
      ? this.waitTimes.reduce((a, b) => a + b, 0) / this.waitTimes.length 
      : 0;
    
    const avgProcessTime = this.processTimes.length > 0 
      ? this.processTimes.reduce((a, b) => a + b, 0) / this.processTimes.length 
      : 0;
    
    return {
      pending: this.queue.size,
      processing: this.processing.size,
      completed: this.completed.size,
      failed: this.failed.size,
      retry: Array.from(this.queue.values()).filter(i => i.attempt > 0).length,
      total: this.queue.size + this.processing.size + this.completed.size + this.failed.size,
      averageWaitTime: avgWaitTime,
      averageProcessTime: avgProcessTime
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
        const nextItem = this.getHighestPriorityItem();
        
        if (!nextItem) break;
        
        // Remover da fila e adicionar aos em processamento
        this.queue.delete(nextItem.id);
        nextItem.status = 'processing';
        nextItem.startedAt = new Date();
        this.processing.set(nextItem.id, nextItem);
        
        // Calcular tempo de espera
        const waitTime = nextItem.startedAt.getTime() - nextItem.addedAt.getTime();
        this.waitTimes.push(waitTime);
        
        // Limite o histórico de tempos para evitar consumo excessivo de memória
        if (this.waitTimes.length > 100) {
          this.waitTimes.shift();
        }
        
        logger.info(`[QueueManager] Processando item ${nextItem.id} (tentativa: ${nextItem.attempt + 1})`);
        
        // Executar em uma Promise separada para não bloquear o loop
        this.processItem(nextItem).catch(error => {
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
  
  /**
   * Processa um único item da fila
   */
  private async processItem(item: QueueItem<T>): Promise<void> {
    try {
      // Incrementar contador de tentativas
      item.attempt++;
      
      // Executar função de processamento
      const result = await this.jobFunction(item.data);
      
      // Atualizar item como concluído
      item.status = 'completed';
      item.completedAt = new Date();
      item.result = result;
      
      // Remover dos em processamento e adicionar aos concluídos
      this.processing.delete(item.id);
      this.completed.set(item.id, item);
      
      // Calcular tempo de processamento
      const processTime = item.completedAt.getTime() - (item.startedAt as Date).getTime();
      this.processTimes.push(processTime);
      
      // Limite o histórico de tempos para evitar consumo excessivo de memória
      if (this.processTimes.length > 100) {
        this.processTimes.shift();
      }
      
      logger.info(`[QueueManager] Item ${item.id} processado com sucesso`);
      
      // Reiniciar processamento para pegar próximo item
      if (this.queue.size > 0) {
        this.processQueue();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      // Verificar se deve tentar novamente
      if (item.attempt < this.options.maxRetries) {
        logger.warn(
          `[QueueManager] Erro ao processar item ${item.id} (tentativa ${item.attempt}/${this.options.maxRetries}):`, 
          errorMessage
        );
        
        // Atualizar status para retry
        item.status = 'retry';
        item.error = errorMessage;
        
        // Remover de processamento e voltar para a fila após delay
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
        }, this.options.retryDelay * item.attempt); // Aumento de delay com base no número de tentativas
      } else {
        // Sem mais tentativas, marcar como falha
        logger.error(
          `[QueueManager] Falha ao processar item ${item.id} após ${item.attempt} tentativas:`, 
          errorMessage
        );
        
        item.status = 'failed';
        item.error = errorMessage;
        item.failedAt = new Date();
        
        // Remover de processamento e adicionar aos falhos
        this.processing.delete(item.id);
        this.failed.set(item.id, item);
        
        // Continuar processamento
        if (this.queue.size > 0) {
          this.processQueue();
        }
      }
    }
  }
  
  /**
   * Obtém o item com maior prioridade da fila
   */
  private getHighestPriorityItem(): QueueItem<T> | undefined {
    if (this.queue.size === 0) return undefined;
    
    let highestPriorityItem: QueueItem<T> | undefined;
    let highestPriority = -Infinity;
    let oldestTimestamp = Infinity;
    
    // Encontrar o item com maior prioridade (ou o mais antigo em caso de empate)
    for (const item of this.queue.values()) {
      const timestamp = item.addedAt.getTime();
      
      if (
        item.priority > highestPriority || 
        (item.priority === highestPriority && timestamp < oldestTimestamp)
      ) {
        highestPriorityItem = item;
        highestPriority = item.priority;
        oldestTimestamp = timestamp;
      }
    }
    
    return highestPriorityItem;
  }
}
