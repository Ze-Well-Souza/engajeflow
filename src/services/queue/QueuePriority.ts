
import { QueueItem } from './types';

/**
 * Classe responsável por gerenciar a prioridade dos itens na fila
 */
export class QueuePriority<T = any> {
  /**
   * Obtém o item com maior prioridade da fila
   * @param items Lista de itens da fila
   * @returns O item com maior prioridade ou undefined se a lista estiver vazia
   */
  public getHighestPriorityItem(items: Map<string, QueueItem<T>>): QueueItem<T> | undefined {
    if (items.size === 0) return undefined;
    
    let highestPriorityItem: QueueItem<T> | undefined;
    let highestPriority = -Infinity;
    let oldestTimestamp = Infinity;
    
    // Encontrar o item com maior prioridade (ou o mais antigo em caso de empate)
    for (const item of items.values()) {
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
