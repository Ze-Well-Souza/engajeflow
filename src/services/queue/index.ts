/**
 * Arquivo de índice para exportar todos os componentes do sistema de filas
 */

// Exportar interfaces
export * from './interfaces';

// Exportar implementações
export { QueueManager } from './QueueManager';
export { QueueState } from './QueueState';
export { QueueProcessor, RetryError, FinalError } from './QueueProcessor';
export { QueuePriority } from './QueuePriority';
export { QueueEventEmitter } from './QueueEventEmitter';

// Exportar tipos
// Já exportados através de interfaces.ts
