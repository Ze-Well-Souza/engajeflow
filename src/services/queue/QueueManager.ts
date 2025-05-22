/**
 * Implementação refatorada do QueueManager com injeção de dependências e melhor separação de responsabilidades
 */

import { 
  QueueItem, 
  QueueOptions, 
  QueueStats,
  IQueueStateManager,
  IQueuePriorityManager,
  IQueueItemProcessor,
  IQueueEventEmitter
} from './interfaces';
import { QueueState } from './QueueState';
import { QueueProcessor, RetryError, FinalError } from './QueueProcessor';
import { QueuePriority } from './QueuePriority';
import { QueueEventEmitter } from './QueueEventEmitter';
import logger from '../../utils/logger';

/**
 * Gerenciador de fila com suporte a prioridades, retentativas e concorrência
 */
export class QueueManager<T = any> {
  // Opções da fila
  private options: QueueOptions = {
    concurrency: 1,
    maxRetries: 3,
    retryDelay: 1000,
    retryStrategy: 'fixed',
    paused: false
  };
  
  // Componentes da fila
  private stateManager: IQueueStateManager<T>;
  private priorityManager: IQueuePriorityManager<T>;
  private processor: IQueueItemProcessor<T>;
  private eventEmitter: IQueueEventEmitter<T>;
  
  // Estado de processamento
  private isProcessing: boolean = false;
  private processingTimer: NodeJS.Timeout | null = null;
  
  // Estatísticas
  private waitTimes: number[] = [];
  private processTimes: number[] = [];
  
  /**
   * Cria uma nova instância de gerenciador de fila
   * @param jobFunction Função que será executada para cada item da fila
   * @param options Opções da fila
   * @param dependencies Dependências opcionais para injeção
   */
  constructor(
    jobFunction: (data: T) => Promise<any>,
    options?: Partial<QueueOptions>,
    dependencies?: {
      stateManager?: IQueueStateManager<T>;
      priorityManager?: IQueuePriorityManager<T>;
      processor?: IQueueItemProcessor<T>;
      eventEmitter?: IQueueEventEmitter<T>;
    }
  ) {
    // Mesclar opções padrões com fornecidas
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    // Inicializar ou injetar dependências
    this.eventEmitter = dependencies?.eventEmitter || new QueueEventEmitter<T>();
    this.stateManager = dependencies?.stateManager || new QueueState<T>();
    this.priorityManager = dependencies?.priorityManager || new QueuePriority<T>();
    this.processor = dependencies?.processor || 
      new QueueProcessor<T>(jobFunction, this.options, this.eventEmitter);
    
    // Registrar handlers de eventos
    this.setupEventHandlers();
    
    logger.info('[QueueManager] Inicializado com concorrência:', this.options.concurrency);
    
    // Iniciar processamento da fila se não estiver pausada
    if (!this.options.paused) {
      setTimeout(() => this.processQueue(), 0);
    }
  }
  
  /**
   * Configura os handlers de eventos
   */
  private setupEventHandlers(): void {
    // Handler para item completado
    this.eventEmitter.on('item:completed', (item, data) => {
      if (!item) return;
      
      // Registrar tempo de processamento
      if (data?.duration) {
        this.processTimes.push(data.duration);
        // Manter apenas os últimos 100 tempos
        if (this.processTimes.length > 100) {
          this.processTimes.shift();
        }
      }
      
      // Atualizar estado
      this.stateManager.moveToCompleted(item.id, data?.result);
      
      // Continuar processamento
      this.scheduleProcessing();
    });
    
    // Handler para item com falha
    this.eventEmitter.on('item:failed', (item, data) => {
      if (!item) return;
      
      // Atualizar estado
      this.stateManager.moveToFailed(item.id, data?.error);
      
      // Continuar processamento
      this.scheduleProcessing();
    });
    
    // Handler para item com retry
    this.eventEmitter.on('item:retry', (item, data) => {
      if (!item) return;
      
      // Preparar para retry
      const updatedItem = this.stateManager.prepareForRetry(item.id);
      
      if (updatedItem) {
        // Agendar nova tentativa após o delay
        setTimeout(() => {
          // Adicionar novamente à fila pendente
          this.stateManager.addPending(updatedItem);
          
          // Reiniciar processamento se necessário
          if (!this.isProcessing) {
            this.processQueue();
          }
        }, data?.retryDelay || this.options.retryDelay);
      }
      
      // Continuar processamento
      this.scheduleProcessing();
    });
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
    if (this.stateManager.getItem(id)) {
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
    this.stateManager.addPending(item);
    
    // Emitir evento
    this.eventEmitter.emit('item:added', item);
    
    logger.info(`[QueueManager] Item adicionado à fila: ${id} (prioridade: ${priority})`);
    
    // Verificar se o processamento está parado e reiniciar
    if (!this.isProcessing && !this.options.paused) {
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
    const item = this.stateManager.getItem(id);
    const removed = this.stateManager.removeItem(id);
    
    if (removed && item) {
      this.eventEmitter.emit('item:removed', item);
      logger.info(`[QueueManager] Item removido da fila: ${id}`);
    }
    
    return removed;
  }
  
  /**
   * Limpa toda a fila
   * @returns Número de itens removidos
   */
  public clear(): number {
    const count = this.stateManager.clearPending();
    
    if (count > 0) {
      this.eventEmitter.emit('queue:cleared', undefined, { count });
      logger.info(`[QueueManager] Fila limpa: ${count} itens removidos`);
    }
    
    return count;
  }
  
  /**
   * Pausa o processamento da fila
   */
  public pause(): void {
    if (!this.options.paused) {
      this.options.paused = true;
      this.eventEmitter.emit('queue:paused');
      logger.info('[QueueManager] Processamento da fila pausado');
    }
  }
  
  /**
   * Retoma o processamento da fila
   */
  public resume(): void {
    if (this.options.paused) {
      this.options.paused = false;
      this.eventEmitter.emit('queue:resumed');
      logger.info('[QueueManager] Processamento da fila retomado');
      
      // Reiniciar processamento
      if (!this.isProcessing) {
        this.processQueue();
      }
    }
  }
  
  /**
   * Obtém um item específico da fila
   * @param id ID do item
   * @returns O item da fila ou undefined se não encontrado
   */
  public getItem(id: string): QueueItem<T> | undefined {
    return this.stateManager.getItem(id);
  }
  
  /**
   * Obtém estatísticas da fila
   */
  public getStats(): QueueStats {
    const averageWaitTime = this.calculateAverageWaitTime();
    const averageProcessTime = this.calculateAverageProcessTime();
    
    return this.stateManager.getStats(averageWaitTime, averageProcessTime);
  }
  
  /**
   * Calcula o tempo médio de espera
   * @returns Tempo médio em milissegundos
   */
  private calculateAverageWaitTime(): number {
    if (this.waitTimes.length === 0) return 0;
    
    const sum = this.waitTimes.reduce((acc, time) => acc + time, 0);
    return sum / this.waitTimes.length;
  }
  
  /**
   * Calcula o tempo médio de processamento
   * @returns Tempo médio em milissegundos
   */
  private calculateAverageProcessTime(): number {
    if (this.processTimes.length === 0) return 0;
    
    const sum = this.processTimes.reduce((acc, time) => acc + time, 0);
    return sum / this.processTimes.length;
  }
  
  /**
   * Agenda o processamento da fila
   */
  private scheduleProcessing(): void {
    // Cancelar timer existente
    if (this.processingTimer) {
      clearTimeout(this.processingTimer);
      this.processingTimer = null;
    }
    
    // Agendar novo processamento
    this.processingTimer = setTimeout(() => this.processQueue(), 0);
  }
  
  /**
   * Processa a fila continuamente
   */
  private async processQueue(): Promise<void> {
    // Verificar se está pausado
    if (this.options.paused) {
      this.isProcessing = false;
      return;
    }
    
    // Definir como processando
    this.isProcessing = true;
    
    try {
      const pendingItems = this.stateManager.getPendingItems();
      const processingItems = this.stateManager.getProcessingItems();
      
      // Verificar se há espaço para processar mais itens
      while (pendingItems.size > 0 && processingItems.size < this.options.concurrency) {
        // Obter próximo item por prioridade
        const nextItem = this.priorityManager.getHighestPriorityItem(pendingItems);
        
        if (!nextItem) break;
        
        // Mover para processamento
        const item = this.stateManager.moveToProcessing(nextItem.id);
        
        if (!item) {
          logger.warn(`[QueueManager] Item ${nextItem.id} não encontrado para processamento`);
          continue;
        }
        
        // Calcular tempo de espera
        const waitTime = Date.now() - item.addedAt.getTime();
        this.waitTimes.push(waitTime);
        
        // Manter apenas os últimos 100 tempos
        if (this.waitTimes.length > 100) {
          this.waitTimes.shift();
        }
        
        logger.info(`[QueueManager] Processando item ${item.id} (tentativa: ${item.attempt + 1}/${this.options.maxRetries})`);
        
        // Processar em uma Promise separada para não bloquear o loop
        this.processor.process(item).catch(error => {
          // Erros já são tratados pelos handlers de eventos
          if (!(error instanceof RetryError) && !(error instanceof FinalError)) {
            logger.error(`[QueueManager] Erro não tratado ao processar item ${item.id}:`, error);
          }
        });
      }
      
      // Se ainda há itens na fila ou em processamento, agendar nova verificação
      if (pendingItems.size > 0 || processingItems.size > 0) {
        this.scheduleProcessing();
      } else {
        this.isProcessing = false;
        this.eventEmitter.emit('queue:empty');
        logger.debug('[QueueManager] Fila vazia, processamento pausado');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      logger.error('[QueueManager] Erro no loop de processamento:', errorMessage);
      
      // Pequena pausa para evitar loop rápido demais em caso de erros
      this.isProcessing = false;
      setTimeout(() => this.processQueue(), 1000);
    }
  }
  
  /**
   * Registra um handler para um evento específico
   * @param event Tipo do evento
   * @param handler Função handler
   * @returns Instância do gerenciador para encadeamento
   */
  public on(event: string, handler: (item?: QueueItem<T>, data?: any) => void): this {
    this.eventEmitter.on(event as any, handler);
    return this;
  }
  
  /**
   * Remove um handler de um evento específico
   * @param event Tipo do evento
   * @param handler Função handler a ser removida
   * @returns Instância do gerenciador para encadeamento
   */
  public off(event: string, handler: (item?: QueueItem<T>, data?: any) => void): this {
    this.eventEmitter.off(event as any, handler);
    return this;
  }
}
