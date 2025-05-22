import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueuePriority } from '../../../services/queue/QueuePriority';
import { QueueItem } from '../../../services/queue/interfaces';

describe('QueuePriority', () => {
  let queuePriority: QueuePriority<string>;
  let items: Map<string, QueueItem<string>>;

  beforeEach(() => {
    items = new Map();
    queuePriority = new QueuePriority<string>();
    
    // Adicionar alguns itens de teste
    items.set('id1', {
      id: 'id1',
      data: 'data1',
      priority: 1,
      timestamp: Date.now(),
      status: 'pending'
    });
    
    items.set('id2', {
      id: 'id2',
      data: 'data2',
      priority: 3,
      timestamp: Date.now() - 1000,
      status: 'pending'
    });
    
    items.set('id3', {
      id: 'id3',
      data: 'data3',
      priority: 2,
      timestamp: Date.now() - 2000,
      status: 'pending'
    });
  });

  it('should get next item by priority', () => {
    const nextItem = queuePriority.getNextItem(items);
    expect(nextItem?.id).toBe('id2'); // Maior prioridade (3)
  });

  it('should get next item by timestamp when priorities are equal', () => {
    // Criar itens com mesma prioridade
    const equalPriorityItems = new Map();
    
    equalPriorityItems.set('id1', {
      id: 'id1',
      data: 'data1',
      priority: 2,
      timestamp: Date.now(),
      status: 'pending'
    });
    
    equalPriorityItems.set('id2', {
      id: 'id2',
      data: 'data2',
      priority: 2,
      timestamp: Date.now() - 1000, // Mais antigo
      status: 'pending'
    });
    
    const nextItem = queuePriority.getNextItem(equalPriorityItems);
    expect(nextItem?.id).toBe('id2'); // Mesmo com prioridade igual, é o mais antigo
  });

  it('should return undefined when no pending items exist', () => {
    const processingItems = new Map();
    
    processingItems.set('id1', {
      id: 'id1',
      data: 'data1',
      priority: 1,
      timestamp: Date.now(),
      status: 'processing'
    });
    
    const nextItem = queuePriority.getNextItem(processingItems);
    expect(nextItem).toBeUndefined();
  });

  it('should handle empty items map', () => {
    const emptyItems = new Map();
    const nextItem = queuePriority.getNextItem(emptyItems);
    expect(nextItem).toBeUndefined();
  });
});
