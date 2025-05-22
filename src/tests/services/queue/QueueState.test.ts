import { QueueState } from '../../../services/queue/QueueState';
import { QueueItem } from '../../../services/queue/interfaces';

describe('QueueState', () => {
  let queueState: QueueState<string>;
  let testItem: QueueItem<string>;

  beforeEach(() => {
    queueState = new QueueState<string>();
    testItem = {
      id: 'test-item-1',
      data: 'test data',
      status: 'pending',
      priority: 1,
      addedAt: new Date(),
      attempt: 0
    };
  });

  describe('addPending', () => {
    it('deve adicionar um item ao estado pendente', () => {
      queueState.addPending(testItem);
      const item = queueState.getItem(testItem.id);
      expect(item).toBeDefined();
      expect(item).toEqual(testItem);
    });
  });

  describe('moveToProcessing', () => {
    it('deve mover um item do estado pendente para processando', () => {
      queueState.addPending(testItem);
      const item = queueState.moveToProcessing(testItem.id);
      
      expect(item).toBeDefined();
      expect(item?.status).toBe('processing');
      expect(item?.startedAt).toBeDefined();
      
      // Verificar se foi removido de pendentes
      const pendingItems = queueState.getPendingItems();
      expect(pendingItems.has(testItem.id)).toBe(false);
      
      // Verificar se está em processamento
      const processingItems = queueState.getProcessingItems();
      expect(processingItems.has(testItem.id)).toBe(true);
    });

    it('deve retornar undefined se o item não existir', () => {
      const item = queueState.moveToProcessing('non-existent');
      expect(item).toBeUndefined();
    });
  });

  describe('moveToCompleted', () => {
    it('deve mover um item do estado processando para completo', () => {
      queueState.addPending(testItem);
      queueState.moveToProcessing(testItem.id);
      
      const result = { success: true };
      const item = queueState.moveToCompleted(testItem.id, result);
      
      expect(item).toBeDefined();
      expect(item?.status).toBe('completed');
      expect(item?.completedAt).toBeDefined();
      expect(item?.result).toEqual(result);
    });

    it('deve retornar undefined se o item não estiver em processamento', () => {
      const item = queueState.moveToCompleted('non-existent');
      expect(item).toBeUndefined();
    });
  });

  describe('moveToFailed', () => {
    it('deve mover um item do estado processando para falha', () => {
      queueState.addPending(testItem);
      queueState.moveToProcessing(testItem.id);
      
      const error = 'Test error message';
      const item = queueState.moveToFailed(testItem.id, error);
      
      expect(item).toBeDefined();
      expect(item?.status).toBe('failed');
      expect(item?.failedAt).toBeDefined();
      expect(item?.error).toBe(error);
    });

    it('deve retornar undefined se o item não estiver em processamento', () => {
      const item = queueState.moveToFailed('non-existent');
      expect(item).toBeUndefined();
    });
  });

  describe('prepareForRetry', () => {
    it('deve preparar um item em processamento para nova tentativa', () => {
      queueState.addPending(testItem);
      queueState.moveToProcessing(testItem.id);
      
      const item = queueState.prepareForRetry(testItem.id);
      
      expect(item).toBeDefined();
      expect(item?.status).toBe('retry');
      expect(item?.attempt).toBe(1);
    });

    it('deve preparar um item em falha para nova tentativa', () => {
      queueState.addPending(testItem);
      queueState.moveToProcessing(testItem.id);
      queueState.moveToFailed(testItem.id, 'Error');
      
      const item = queueState.prepareForRetry(testItem.id);
      
      expect(item).toBeDefined();
      expect(item?.status).toBe('retry');
      expect(item?.attempt).toBe(1);
    });

    it('deve retornar undefined se o item não existir', () => {
      const item = queueState.prepareForRetry('non-existent');
      expect(item).toBeUndefined();
    });
  });

  describe('removeItem', () => {
    it('deve remover um item do estado pendente', () => {
      queueState.addPending(testItem);
      const removed = queueState.removeItem(testItem.id);
      
      expect(removed).toBe(true);
      expect(queueState.getItem(testItem.id)).toBeUndefined();
    });

    it('deve remover um item do estado processando', () => {
      queueState.addPending(testItem);
      queueState.moveToProcessing(testItem.id);
      
      const removed = queueState.removeItem(testItem.id);
      
      expect(removed).toBe(true);
      expect(queueState.getItem(testItem.id)).toBeUndefined();
    });

    it('deve retornar false se o item não existir', () => {
      const removed = queueState.removeItem('non-existent');
      expect(removed).toBe(false);
    });
  });

  describe('clearPending', () => {
    it('deve limpar todos os itens pendentes', () => {
      queueState.addPending(testItem);
      queueState.addPending({
        ...testItem,
        id: 'test-item-2'
      });
      
      const count = queueState.clearPending();
      
      expect(count).toBe(2);
      expect(queueState.getPendingItems().size).toBe(0);
    });

    it('deve retornar 0 se não houver itens pendentes', () => {
      const count = queueState.clearPending();
      expect(count).toBe(0);
    });
  });

  describe('getStats', () => {
    it('deve retornar estatísticas corretas', () => {
      queueState.addPending(testItem);
      queueState.addPending({
        ...testItem,
        id: 'test-item-2',
        attempt: 1
      });
      
      queueState.moveToProcessing(testItem.id);
      
      const stats = queueState.getStats(100, 200);
      
      expect(stats.pending).toBe(1);
      expect(stats.processing).toBe(1);
      expect(stats.completed).toBe(0);
      expect(stats.failed).toBe(0);
      expect(stats.retry).toBe(1);
      expect(stats.total).toBe(2);
      expect(stats.averageWaitTime).toBe(100);
      expect(stats.averageProcessTime).toBe(200);
    });
  });
});
