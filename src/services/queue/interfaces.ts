/**
 * Interface para processadores de itens da fila
 */
export interface IQueueItemProcessor<T = any> {
  /**
   * Processa um item da fila
   * @param item Item a ser processado
   * @returns Promise com o resultado do processamento
   */
  process(item: QueueItem<T>): Promise<any>;
}

/**
 * Interface para gerenciadores de estado da fila
 */
export interface IQueueStateManager<T = any> {
  /**
   * Adiciona um item ao estado pendente
   * @param item Item a ser adicionado
   */
  addPending(item: QueueItem<T>): void;
  
  /**
   * Move um item do estado pendente para processando
   * @param id ID do item
   * @returns O item movido ou undefined se não encontrado
   */
  moveToProcessing(id: string): QueueItem<T> | undefined;
  
  /**
   * Move um item do estado processando para completo
   * @param id ID do item
   * @param result Resultado do processamento
   * @returns O item movido ou undefined se não encontrado
   */
  moveToCompleted(id: string, result?: any): QueueItem<T> | undefined;
  
  /**
   * Move um item do estado processando para falha
   * @param id ID do item
   * @param error Erro ocorrido
   * @returns O item movido ou undefined se não encontrado
   */
  moveToFailed(id: string, error?: string): QueueItem<T> | undefined;
  
  /**
   * Prepara um item para nova tentativa
   * @param id ID do item
   * @returns O item preparado ou undefined se não encontrado
   */
  prepareForRetry(id: string): QueueItem<T> | undefined;
  
  /**
   * Remove um item de qualquer estado
   * @param id ID do item
   * @returns true se removido, false se não encontrado
   */
  removeItem(id: string): boolean;
  
  /**
   * Limpa todos os itens pendentes
   * @returns Número de itens removidos
   */
  clearPending(): number;
  
  /**
   * Obtém um item por ID de qualquer estado
   * @param id ID do item
   * @returns O item ou undefined se não encontrado
   */
  getItem(id: string): QueueItem<T> | undefined;
  
  /**
   * Obtém todos os itens pendentes
   * @returns Map com os itens pendentes
   */
  getPendingItems(): Map<string, QueueItem<T>>;
  
  /**
   * Obtém todos os itens em processamento
   * @returns Map com os itens em processamento
   */
  getProcessingItems(): Map<string, QueueItem<T>>;
  
  /**
   * Obtém estatísticas atuais dos itens
   * @param averageWaitTime Tempo médio de espera
   * @param averageProcessTime Tempo médio de processamento
   * @returns Estatísticas da fila
   */
  getStats(averageWaitTime: number, averageProcessTime: number): QueueStats;
}

/**
 * Interface para gerenciadores de prioridade da fila
 */
export interface IQueuePriorityManager<T = any> {
  /**
   * Obtém o item com maior prioridade da fila
   * @param items Map com os itens
   * @returns O item com maior prioridade ou undefined se não houver itens
   */
  getHighestPriorityItem(items: Map<string, QueueItem<T>>): QueueItem<T> | undefined;
}

/**
 * Interface para emissores de eventos da fila
 */
export interface IQueueEventEmitter<T = any> {
  /**
   * Registra um handler para um evento específico
   * @param event Tipo do evento
   * @param handler Função handler
   * @returns Instância do emissor para encadeamento
   */
  on(event: QueueEventType, handler: QueueEventHandler<T>): this;
  
  /**
   * Remove um handler de um evento específico
   * @param event Tipo do evento
   * @param handler Função handler a ser removida
   * @returns Instância do emissor para encadeamento
   */
  off(event: QueueEventType, handler: QueueEventHandler<T>): this;
  
  /**
   * Emite um evento para todos os handlers registrados
   * @param event Tipo do evento
   * @param item Item relacionado ao evento (opcional)
   * @param data Dados adicionais (opcional)
   */
  emit(event: QueueEventType, item?: QueueItem<T>, data?: any): void;
}

/**
 * Tipos e interfaces para o sistema de filas
 */

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
  retryStrategy?: 'fixed' | 'exponential' | 'linear';
  retryMultiplier?: number;
  paused?: boolean;
}

/**
 * Tipos de eventos da fila
 */
export type QueueEventType = 
  | 'item:added'
  | 'item:started'
  | 'item:completed'
  | 'item:failed'
  | 'item:retry'
  | 'item:removed'
  | 'queue:cleared'
  | 'queue:paused'
  | 'queue:resumed'
  | 'queue:empty';

/**
 * Interface para handlers de eventos
 */
export type QueueEventHandler<T = any> = (item?: QueueItem<T>, data?: any) => void;
