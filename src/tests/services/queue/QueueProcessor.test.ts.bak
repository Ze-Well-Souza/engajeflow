import { QueueProcessor, RetryError, FinalError } from '../../../services/queue/QueueProcessor';
import { QueueItem, QueueOptions, IQueueEventEmitter } from '../../../services/queue/interfaces';

describe('QueueProcessor', () => {
  let queueProcessor: QueueProcessor<string>;
  let mockJobFunction: jest.Mock;
  let mockEventEmitter: IQueueEventEmitter<string>;
  let testItem: QueueItem<string>;
  let options: QueueOptions;

  beforeEach(() => {
    mockJobFunction = jest.fn();
    mockEventEmitter = {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    };
    
    options = {
      concurrency: 2,
      maxRetries: 3,
      retryDelay: 1000,
      retryStrategy: 'fixed'
    };
    
    queueProcessor = new QueueProcessor<string>(
      mockJobFunction,
      options,
      mockEventEmitter
    );
    
    testItem = {
      id: 'test-item-1',
      data: 'test data',
      status: 'pending',
      priority: 1,
      addedAt: new Date(),
      attempt: 0
    };
  });

  describe('process', () => {
    it('deve processar um item com sucesso', async () => {
      const result = { success: true };
      mockJobFunction.mockResolvedValue(result);
      
      const processResult = await queueProcessor.process(testItem);
      
      expect(mockJobFunction).toHaveBeenCalledWith(testItem.data);
      expect(processResult).toEqual(result);
      
      // Verificar eventos emitidos
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('item:started', testItem);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'item:completed', 
        testItem, 
        expect.objectContaining({ result })
      );
    });

    it('deve lançar RetryError quando o processamento falha e há tentativas restantes', async () => {
      const error = new Error('Test error');
      mockJobFunction.mockRejectedValue(error);
      
      await expect(queueProcessor.process(testItem))
        .rejects
        .toBeInstanceOf(RetryError);
      
      // Verificar eventos emitidos
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('item:started', testItem);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'item:retry', 
        testItem, 
        expect.objectContaining({ 
          error: 'Test error',
          retryDelay: expect.any(Number)
        })
      );
    });

    it('deve lançar FinalError quando o processamento falha e não há mais tentativas', async () => {
      const error = new Error('Test error');
      mockJobFunction.mockRejectedValue(error);
      
      // Definir item como já tendo atingido o máximo de tentativas
      testItem.attempt = options.maxRetries;
      
      await expect(queueProcessor.process(testItem))
        .rejects
        .toBeInstanceOf(FinalError);
      
      // Verificar eventos emitidos
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('item:started', testItem);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        'item:failed', 
        testItem, 
        expect.objectContaining({ error: 'Test error' })
      );
    });
  });

  describe('calculateRetryDelay', () => {
    it('deve calcular delay fixo quando a estratégia é "fixed"', async () => {
      options.retryStrategy = 'fixed';
      queueProcessor = new QueueProcessor<string>(
        mockJobFunction,
        options,
        mockEventEmitter
      );
      
      mockJobFunction.mockRejectedValue(new Error('Test error'));
      
      try {
        await queueProcessor.process(testItem);
      } catch (error) {
        if (error instanceof RetryError) {
          expect(error.retryDelay).toBe(options.retryDelay);
        } else {
          fail('Deveria ter lançado RetryError');
        }
      }
    });

    it('deve calcular delay linear quando a estratégia é "linear"', async () => {
      options.retryStrategy = 'linear';
      options.retryMultiplier = 2;
      queueProcessor = new QueueProcessor<string>(
        mockJobFunction,
        options,
        mockEventEmitter
      );
      
      mockJobFunction.mockRejectedValue(new Error('Test error'));
      testItem.attempt = 1; // Segunda tentativa
      
      try {
        await queueProcessor.process(testItem);
      } catch (error) {
        if (error instanceof RetryError) {
          // delay * (1 + attempt * multiplier) = 1000 * (1 + 1 * 2) = 3000
          expect(error.retryDelay).toBe(3000);
        } else {
          fail('Deveria ter lançado RetryError');
        }
      }
    });

    it('deve calcular delay exponencial quando a estratégia é "exponential"', async () => {
      options.retryStrategy = 'exponential';
      options.retryMultiplier = 2;
      queueProcessor = new QueueProcessor<string>(
        mockJobFunction,
        options,
        mockEventEmitter
      );
      
      mockJobFunction.mockRejectedValue(new Error('Test error'));
      testItem.attempt = 2; // Terceira tentativa
      
      try {
        await queueProcessor.process(testItem);
      } catch (error) {
        if (error instanceof RetryError) {
          // delay * (multiplier ^ attempt) = 1000 * (2 ^ 2) = 4000
          expect(error.retryDelay).toBe(4000);
        } else {
          fail('Deveria ter lançado RetryError');
        }
      }
    });
  });
});
