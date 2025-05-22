import { QueueManager } from '../../../services/queue/QueueManager';
import { 
  QueueItem, 
  QueueOptions, 
  IQueueStateManager, 
  IQueuePriorityManager,
  IQueueItemProcessor,
  IQueueEventEmitter
} from '../../../services/queue/interfaces';

describe('QueueManager', () => {
  let queueManager: QueueManager<string>;
  let mockJobFunction: jest.Mock;
  let mockStateManager: IQueueStateManager<string>;
  let mockPriorityManager: IQueuePriorityManager<string>;
  let mockProcessor: IQueueItemProcessor<string>;
  let mockEventEmitter: IQueueEventEmitter<string>;
  let options: QueueOptions;

  beforeEach(() => {
    mockJobFunction = jest.fn();
    
    mockStateManager = {
      addPending: jest.fn(),
      moveToProcessing: jest.fn(),
      moveToCompleted: jest.fn(),
      moveToFailed: jest.fn(),
      prepareForRetry: jest.fn(),
      removeItem: jest.fn(),
      clearPending: jest.fn(),
      getItem: jest.fn(),
      getPendingItems: jest.fn().mockReturnValue(new Map()),
      getProcessingItems: jest.fn().mockReturnValue(new Map()),
      getStats: jest.fn()
    };
    
    mockPriorityManager = {
      getHighestPriorityItem: jest.fn()
    };
    
    mockProcessor = {
      process: jest.fn()
    };
    
    mockEventEmitter = {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    };
    
    options = {
      concurrency: 2,
      maxRetries: 3,
      retryDelay: 1000,
      retryStrategy: 'fixed',
      paused: false
    };
    
    queueManager = new QueueManager<string>(
      mockJobFunction,
      options,
      {
        stateManager: mockStateManager,
        priorityManager: mockPriorityManager,
        processor: mockProcessor,
        eventEmitter: mockEventEmitter
      }
    );
  });

  describe('enqueue', () => {
    it('deve adicionar um item à fila', () => {
      const id = 'test-item-1';
      const data = 'test data';
      const priority = 2;
      
      // Configurar mock para getItem retornar undefined (item não existe)
      mockStateManager.getItem.mockReturnValue(undefined);
      
      const item = queueManager.enqueue(id, data, priority);
      
      expect(item).toBeDefined();
      expect(item.id).toBe(id);
      expect(item.data).toBe(data);
      expect(item.priority).toBe(priority);
      expect(item.status).toBe('pending');
      expect(item.attempt).toBe(0);
      
      // Verificar se o item foi adicionado ao estado
      expect(mockStateManager.addPending).toHaveBeenCalledWith(expect.objectContaining({
        id,
        data,
        priority,
        status: 'pending',
        attempt: 0
      }));
      
      // Verificar se o evento foi emitido
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('item:added', expect.objectContaining({
        id,
        data,
        priority
      }));
    });

    it('deve lançar erro se o item já existir na fila', () => {
      const id = 'test-item-1';
      const data = 'test data';
      
      // Configurar mock para getItem retornar um item existente
      mockStateManager.getItem.mockReturnValue({
        id,
        data: 'existing data',
        status: 'pending',
        priority: 1,
        addedAt: new Date(),
        attempt: 0
      });
      
      expect(() => queueManager.enqueue(id, data)).toThrow();
    });
  });

  describe('dequeue', () => {
    it('deve remover um item da fila', () => {
      const id = 'test-item-1';
      const item = {
        id,
        data: 'test data',
        status: 'pending',
        priority: 1,
        addedAt: new Date(),
        attempt: 0
      };
      
      // Configurar mocks
      mockStateManager.getItem.mockReturnValue(item);
      mockStateManager.removeItem.mockReturnValue(true);
      
      const result = queueManager.dequeue(id);
      
      expect(result).toBe(true);
      expect(mockStateManager.removeItem).toHaveBeenCalledWith(id);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('item:removed', item);
    });

    it('deve retornar false se o item não existir', () => {
      const id = 'non-existent';
      
      // Configurar mocks
      mockStateManager.getItem.mockReturnValue(undefined);
      mockStateManager.removeItem.mockReturnValue(false);
      
      const result = queueManager.dequeue(id);
      
      expect(result).toBe(false);
      expect(mockStateManager.removeItem).toHaveBeenCalledWith(id);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('deve limpar todos os itens pendentes', () => {
      // Configurar mock para retornar 3 itens removidos
      mockStateManager.clearPending.mockReturnValue(3);
      
      const count = queueManager.clear();
      
      expect(count).toBe(3);
      expect(mockStateManager.clearPending).toHaveBeenCalled();
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('queue:cleared', undefined, { count: 3 });
    });

    it('não deve emitir evento se nenhum item for removido', () => {
      // Configurar mock para retornar 0 itens removidos
      mockStateManager.clearPending.mockReturnValue(0);
      
      const count = queueManager.clear();
      
      expect(count).toBe(0);
      expect(mockStateManager.clearPending).toHaveBeenCalled();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
  });

  describe('pause/resume', () => {
    it('deve pausar o processamento da fila', () => {
      queueManager.pause();
      
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('queue:paused');
      
      // Pausar novamente não deve emitir evento
      mockEventEmitter.emit.mockClear();
      queueManager.pause();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('deve retomar o processamento da fila', () => {
      // Primeiro pausar
      queueManager.pause();
      mockEventEmitter.emit.mockClear();
      
      queueManager.resume();
      
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('queue:resumed');
      
      // Retomar novamente não deve emitir evento
      mockEventEmitter.emit.mockClear();
      queueManager.resume();
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });
  });

  describe('getItem', () => {
    it('deve retornar um item específico da fila', () => {
      const id = 'test-item-1';
      const item = {
        id,
        data: 'test data',
        status: 'pending',
        priority: 1,
        addedAt: new Date(),
        attempt: 0
      };
      
      // Configurar mock
      mockStateManager.getItem.mockReturnValue(item);
      
      const result = queueManager.getItem(id);
      
      expect(result).toBe(item);
      expect(mockStateManager.getItem).toHaveBeenCalledWith(id);
    });
  });

  describe('getStats', () => {
    it('deve retornar estatísticas da fila', () => {
      const stats = {
        pending: 2,
        processing: 1,
        completed: 3,
        failed: 1,
        retry: 1,
        total: 7,
        averageWaitTime: 100,
        averageProcessTime: 200
      };
      
      // Configurar mock
      mockStateManager.getStats.mockReturnValue(stats);
      
      const result = queueManager.getStats();
      
      expect(result).toBe(stats);
      expect(mockStateManager.getStats).toHaveBeenCalled();
    });
  });

  describe('event handlers', () => {
    it('deve configurar handlers de eventos na inicialização', () => {
      // Verificar se os handlers foram registrados
      expect(mockEventEmitter.on).toHaveBeenCalledWith('item:completed', expect.any(Function));
      expect(mockEventEmitter.on).toHaveBeenCalledWith('item:failed', expect.any(Function));
      expect(mockEventEmitter.on).toHaveBeenCalledWith('item:retry', expect.any(Function));
    });
  });

  describe('on/off', () => {
    it('deve registrar um handler para um evento', () => {
      const handler = jest.fn();
      
      queueManager.on('item:added', handler);
      
      expect(mockEventEmitter.on).toHaveBeenCalledWith('item:added', handler);
    });

    it('deve remover um handler de um evento', () => {
      const handler = jest.fn();
      
      queueManager.off('item:added', handler);
      
      expect(mockEventEmitter.off).toHaveBeenCalledWith('item:added', handler);
    });
  });
});
