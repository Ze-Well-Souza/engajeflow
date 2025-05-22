/**
 * Implementação atualizada do QueuePriority com melhor suporte a interfaces
 */

import { QueueItem, IQueuePriorityManager } from './interfaces';
import logger from '../../utils/logger';

/**
 * Gerenciador de prioridade para itens da fila
 */
export class QueuePriority<T = any> implements IQueuePriorityManager<T> {
  /**
   * Obtém o item com maior prioridade da fila
   * @param items Map com os itens
   * @returns O item com maior prioridade ou undefined se não houver itens
   */
  public getHighestPriorityItem(items: Map<string, QueueItem<T>>): QueueItem<T> | undefined {
    if (items.size === 0) return undefined;
    
    // Converter Map para array para facilitar ordenação
    const itemsArray = Array.from(items.values());
    
    // Ordenar por prioridade (maior primeiro) e depois por tempo de adição (mais antigo primeiro)
    itemsArray.sort((a, b) => {
      // Primeiro critério: prioridade (decrescente)
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      
      // Segundo critério: tempo de adição (crescente)
      return a.addedAt.getTime() - b.addedAt.getTime();
    });
    
    const selectedItem = itemsArray[0];
    logger.debug(`[QueuePriority] Item ${selectedItem.id} selecionado com prioridade ${selectedItem.priority}`);
    
    return selectedItem;
  }
  
  /**
   * Calcula a prioridade dinâmica com base em fatores como tempo de espera
   * @param item Item da fila
   * @param baseWeight Peso base para o cálculo
   * @param waitTimeWeight Peso do tempo de espera
   * @param maxWaitTime Tempo máximo de espera considerado (ms)
   * @returns Prioridade calculada
   */
  public calculateDynamicPriority(
    item: QueueItem<T>,
    baseWeight: number = 1.0,
    waitTimeWeight: number = 0.5,
    maxWaitTime: number = 3600000 // 1 hora
  ): number {
    // Prioridade base definida no item
    const basePriority = item.priority * baseWeight;
    
    // Calcular tempo de espera em milissegundos
    const waitTime = Date.now() - item.addedAt.getTime();
    
    // Normalizar tempo de espera (0 a 1)
    const normalizedWaitTime = Math.min(waitTime / maxWaitTime, 1);
    
    // Calcular componente de prioridade baseado no tempo de espera
    const waitTimePriority = normalizedWaitTime * waitTimeWeight;
    
    // Prioridade final
    const finalPriority = basePriority + waitTimePriority;
    
    logger.debug(`[QueuePriority] Prioridade dinâmica calculada para item ${item.id}: ${finalPriority.toFixed(2)} (base: ${basePriority}, espera: ${waitTimePriority.toFixed(2)})`);
    
    return finalPriority;
  }
}
