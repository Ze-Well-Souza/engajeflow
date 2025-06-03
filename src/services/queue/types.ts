
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
}
