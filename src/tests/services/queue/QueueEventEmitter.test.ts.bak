import { QueueEventEmitter, QueueEventType, QueueEventHandler } from '../../../services/queue/QueueEventEmitter';
import { QueueItem } from '../../../services/queue/interfaces';

describe('QueueEventEmitter', () => {
  let eventEmitter: QueueEventEmitter<string>;
  let testItem: QueueItem<string>;

  beforeEach(() => {
    eventEmitter = new QueueEventEmitter<string>();
    testItem = {
      id: 'test-item-1',
      data: 'test data',
      status: 'pending',
      priority: 1,
      addedAt: new Date(),
      attempt: 0
    };
  });

  describe('on', () => {
    it('deve registrar um handler para um evento', () => {
      const handler = jest.fn();
      eventEmitter.on('item:added', handler);
      
      eventEmitter.emit('item:added', testItem);
      
      expect(handler).toHaveBeenCalledWith(testItem, undefined);
    });

    it('deve permitir registrar múltiplos handlers para o mesmo evento', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      eventEmitter.on('item:added', handler1);
      eventEmitter.on('item:added', handler2);
      
      eventEmitter.emit('item:added', testItem);
      
      expect(handler1).toHaveBeenCalledWith(testItem, undefined);
      expect(handler2).toHaveBeenCalledWith(testItem, undefined);
    });

    it('deve permitir encadeamento de métodos', () => {
      const handler = jest.fn();
      const result = eventEmitter.on('item:added', handler);
      
      expect(result).toBe(eventEmitter);
    });
  });

  describe('off', () => {
    it('deve remover um handler específico', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      eventEmitter.on('item:added', handler1);
      eventEmitter.on('item:added', handler2);
      
      eventEmitter.off('item:added', handler1);
      
      eventEmitter.emit('item:added', testItem);
      
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledWith(testItem, undefined);
    });

    it('não deve fazer nada se o evento não existir', () => {
      const handler = jest.fn();
      
      // Não deve lançar erro
      eventEmitter.off('non-existent' as QueueEventType, handler);
    });

    it('deve permitir encadeamento de métodos', () => {
      const handler = jest.fn();
      const result = eventEmitter.off('item:added', handler);
      
      expect(result).toBe(eventEmitter);
    });
  });

  describe('emit', () => {
    it('deve chamar todos os handlers registrados para o evento', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      eventEmitter.on('item:added', handler1);
      eventEmitter.on('item:added', handler2);
      
      eventEmitter.emit('item:added', testItem);
      
      expect(handler1).toHaveBeenCalledWith(testItem, undefined);
      expect(handler2).toHaveBeenCalledWith(testItem, undefined);
    });

    it('deve passar dados adicionais para os handlers', () => {
      const handler = jest.fn();
      const data = { extra: 'info' };
      
      eventEmitter.on('item:added', handler);
      eventEmitter.emit('item:added', testItem, data);
      
      expect(handler).toHaveBeenCalledWith(testItem, data);
    });

    it('não deve fazer nada se o evento não tiver handlers', () => {
      // Não deve lançar erro
      eventEmitter.emit('item:added', testItem);
    });

    it('deve continuar chamando outros handlers mesmo se um falhar', () => {
      const errorHandler = jest.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      const normalHandler = jest.fn();
      
      eventEmitter.on('item:added', errorHandler);
      eventEmitter.on('item:added', normalHandler);
      
      // Não deve lançar erro
      eventEmitter.emit('item:added', testItem);
      
      expect(errorHandler).toHaveBeenCalled();
      expect(normalHandler).toHaveBeenCalled();
    });
  });

  describe('clearEvent', () => {
    it('deve remover todos os handlers de um evento específico', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      eventEmitter.on('item:added', handler1);
      eventEmitter.on('item:added', handler2);
      
      eventEmitter.clearEvent('item:added');
      
      eventEmitter.emit('item:added', testItem);
      
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });

    it('não deve afetar outros eventos', () => {
      const addedHandler = jest.fn();
      const completedHandler = jest.fn();
      
      eventEmitter.on('item:added', addedHandler);
      eventEmitter.on('item:completed', completedHandler);
      
      eventEmitter.clearEvent('item:added');
      
      eventEmitter.emit('item:added', testItem);
      eventEmitter.emit('item:completed', testItem);
      
      expect(addedHandler).not.toHaveBeenCalled();
      expect(completedHandler).toHaveBeenCalled();
    });

    it('deve permitir encadeamento de métodos', () => {
      const result = eventEmitter.clearEvent('item:added');
      
      expect(result).toBe(eventEmitter);
    });
  });

  describe('clearAllEvents', () => {
    it('deve remover todos os handlers de todos os eventos', () => {
      const addedHandler = jest.fn();
      const completedHandler = jest.fn();
      
      eventEmitter.on('item:added', addedHandler);
      eventEmitter.on('item:completed', completedHandler);
      
      eventEmitter.clearAllEvents();
      
      eventEmitter.emit('item:added', testItem);
      eventEmitter.emit('item:completed', testItem);
      
      expect(addedHandler).not.toHaveBeenCalled();
      expect(completedHandler).not.toHaveBeenCalled();
    });

    it('deve permitir encadeamento de métodos', () => {
      const result = eventEmitter.clearAllEvents();
      
      expect(result).toBe(eventEmitter);
    });
  });
});
