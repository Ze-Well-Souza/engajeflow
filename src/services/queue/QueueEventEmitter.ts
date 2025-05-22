/**
 * Sistema de eventos para comunicação entre componentes da fila
 */

import { QueueItem } from './types';
import logger from '../../utils/logger';

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

/**
 * Emissor de eventos para comunicação entre componentes da fila
 */
export class QueueEventEmitter<T = any> {
  private handlers: Map<QueueEventType, Set<QueueEventHandler<T>>> = new Map();

  /**
   * Registra um handler para um evento específico
   * @param event Tipo do evento
   * @param handler Função handler
   * @returns Instância do emissor para encadeamento
   */
  public on(event: QueueEventType, handler: QueueEventHandler<T>): this {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    
    this.handlers.get(event)!.add(handler);
    logger.debug(`[QueueEventEmitter] Handler registrado para evento '${event}'`);
    
    return this;
  }

  /**
   * Remove um handler de um evento específico
   * @param event Tipo do evento
   * @param handler Função handler a ser removida
   * @returns Instância do emissor para encadeamento
   */
  public off(event: QueueEventType, handler: QueueEventHandler<T>): this {
    if (this.handlers.has(event)) {
      this.handlers.get(event)!.delete(handler);
      logger.debug(`[QueueEventEmitter] Handler removido do evento '${event}'`);
    }
    
    return this;
  }

  /**
   * Emite um evento para todos os handlers registrados
   * @param event Tipo do evento
   * @param item Item relacionado ao evento (opcional)
   * @param data Dados adicionais (opcional)
   */
  public emit(event: QueueEventType, item?: QueueItem<T>, data?: any): void {
    if (!this.handlers.has(event)) return;
    
    logger.debug(`[QueueEventEmitter] Emitindo evento '${event}'${item ? ` para item ${item.id}` : ''}`);
    
    for (const handler of this.handlers.get(event)!) {
      try {
        handler(item, data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        logger.error(`[QueueEventEmitter] Erro ao executar handler para evento '${event}':`, errorMessage);
      }
    }
  }

  /**
   * Remove todos os handlers de um evento específico
   * @param event Tipo do evento
   * @returns Instância do emissor para encadeamento
   */
  public clearEvent(event: QueueEventType): this {
    if (this.handlers.has(event)) {
      this.handlers.set(event, new Set());
      logger.debug(`[QueueEventEmitter] Todos os handlers removidos do evento '${event}'`);
    }
    
    return this;
  }

  /**
   * Remove todos os handlers de todos os eventos
   * @returns Instância do emissor para encadeamento
   */
  public clearAllEvents(): this {
    this.handlers.clear();
    logger.debug('[QueueEventEmitter] Todos os handlers removidos de todos os eventos');
    
    return this;
  }
}
