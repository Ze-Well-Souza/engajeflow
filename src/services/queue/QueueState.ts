/**
 * Gerenciador de estado da fila
 * Responsável por armazenar e gerenciar os itens em diferentes estados
 */

import { QueueItem, QueueStats } from './types';
import logger from '../../utils/logger';

/**
 * Classe responsável por gerenciar o estado dos itens na fila
 */
export class QueueState<T = any> {
  private pending: Map<string, QueueItem<T>> = new Map();
  private processing: Map<string, QueueItem<T>> = new Map();
  private completed: Map<string, QueueItem<T>> = new Map();
  private failed: Map<string, QueueItem<T>> = new Map();

  /**
   * Adiciona um item ao estado pendente
   * @param item Item a ser adicionado
   */
  public addPending(item: QueueItem<T>): void {
    this.pending.set(item.id, item);
    logger.debug(`[QueueState] Item ${item.id} adicionado ao estado pendente`);
  }

  /**
   * Move um item do estado pendente para processando
   * @param id ID do item
   * @returns O item movido ou undefined se não encontrado
   */
  public moveToProcessing(id: string): QueueItem<T> | undefined {
    const item = this.pending.get(id);
    if (!item) return undefined;

    this.pending.delete(id);
    item.status = 'processing';
    item.startedAt = new Date();
    this.processing.set(id, item);
    
    logger.debug(`[QueueState] Item ${id} movido para estado processando`);
    return item;
  }

  /**
   * Move um item do estado processando para completo
   * @param id ID do item
   * @param result Resultado do processamento
   * @returns O item movido ou undefined se não encontrado
   */
  public moveToCompleted(id: string, result?: any): QueueItem<T> | undefined {
    const item = this.processing.get(id);
    if (!item) return undefined;

    this.processing.delete(id);
    item.status = 'completed';
    item.completedAt = new Date();
    item.result = result;
    this.completed.set(id, item);
    
    logger.debug(`[QueueState] Item ${id} movido para estado completo`);
    return item;
  }

  /**
   * Move um item do estado processando para falha
   * @param id ID do item
   * @param error Erro ocorrido
   * @returns O item movido ou undefined se não encontrado
   */
  public moveToFailed(id: string, error?: string): QueueItem<T> | undefined {
    const item = this.processing.get(id);
    if (!item) return undefined;

    this.processing.delete(id);
    item.status = 'failed';
    item.failedAt = new Date();
    item.error = error;
    this.failed.set(id, item);
    
    logger.debug(`[QueueState] Item ${id} movido para estado falha`);
    return item;
  }

  /**
   * Prepara um item para nova tentativa
   * @param id ID do item
   * @returns O item preparado ou undefined se não encontrado
   */
  public prepareForRetry(id: string): QueueItem<T> | undefined {
    // Pode estar em processamento ou falha
    const item = this.processing.get(id) || this.failed.get(id);
    if (!item) return undefined;

    // Remover do estado atual
    if (this.processing.has(id)) this.processing.delete(id);
    if (this.failed.has(id)) this.failed.delete(id);

    // Atualizar para retry
    item.status = 'retry';
    item.attempt += 1;
    
    logger.debug(`[QueueState] Item ${id} preparado para nova tentativa (${item.attempt})`);
    return item;
  }

  /**
   * Remove um item de qualquer estado
   * @param id ID do item
   * @returns true se removido, false se não encontrado
   */
  public removeItem(id: string): boolean {
    if (this.pending.has(id)) {
      this.pending.delete(id);
      logger.debug(`[QueueState] Item ${id} removido do estado pendente`);
      return true;
    }
    
    if (this.processing.has(id)) {
      this.processing.delete(id);
      logger.debug(`[QueueState] Item ${id} removido do estado processando`);
      return true;
    }
    
    if (this.completed.has(id)) {
      this.completed.delete(id);
      logger.debug(`[QueueState] Item ${id} removido do estado completo`);
      return true;
    }
    
    if (this.failed.has(id)) {
      this.failed.delete(id);
      logger.debug(`[QueueState] Item ${id} removido do estado falha`);
      return true;
    }
    
    return false;
  }

  /**
   * Limpa todos os itens pendentes
   * @returns Número de itens removidos
   */
  public clearPending(): number {
    const count = this.pending.size;
    this.pending.clear();
    logger.debug(`[QueueState] ${count} itens pendentes removidos`);
    return count;
  }

  /**
   * Obtém um item por ID de qualquer estado
   * @param id ID do item
   * @returns O item ou undefined se não encontrado
   */
  public getItem(id: string): QueueItem<T> | undefined {
    return this.pending.get(id) || 
           this.processing.get(id) || 
           this.completed.get(id) || 
           this.failed.get(id);
  }

  /**
   * Obtém todos os itens pendentes
   * @returns Map com os itens pendentes
   */
  public getPendingItems(): Map<string, QueueItem<T>> {
    return this.pending;
  }

  /**
   * Obtém todos os itens em processamento
   * @returns Map com os itens em processamento
   */
  public getProcessingItems(): Map<string, QueueItem<T>> {
    return this.processing;
  }

  /**
   * Obtém estatísticas atuais dos itens
   * @param averageWaitTime Tempo médio de espera
   * @param averageProcessTime Tempo médio de processamento
   * @returns Estatísticas da fila
   */
  public getStats(averageWaitTime: number, averageProcessTime: number): QueueStats {
    return {
      pending: this.pending.size,
      processing: this.processing.size,
      completed: this.completed.size,
      failed: this.failed.size,
      retry: Array.from(this.pending.values()).filter(i => i.attempt > 0).length,
      total: this.pending.size + this.processing.size + this.completed.size + this.failed.size,
      averageWaitTime,
      averageProcessTime
    };
  }
}
