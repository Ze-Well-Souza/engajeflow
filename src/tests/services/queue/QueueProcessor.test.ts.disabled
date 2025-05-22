import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { QueueProcessor } from '../../../services/queue/QueueProcessor';
import { QueueItem, QueueOptions, IQueueEventEmitter } from '../../../services/queue/interfaces';

describe('QueueProcessor', () => {
  let queueProcessor: QueueProcessor<string>;
  let mockJobFunction: any;
  let mockEventEmitter: IQueueEventEmitter;
  let testItem: QueueItem<string>;

  beforeEach(() => {
    // Mock do processador de jobs
    mockJobFunction = vi.fn().mockResolvedValue('result');
    
    // Mock do emissor de eventos
    mockEventEmitter = {
      emit: vi.fn()
    };
    
    // Opções de configuração
    const options: QueueOptions = {
      concurrency: 2,
      retryLimit: 3,
      retryDelay: 100
    };
    
    // Criar instância do processador
    queueProcessor = new QueueProcessor<string>(mockJobFunction, options, mockEventEmitter);
    
    // Item de teste
    testItem = {
      id: 'test-id',
      data: 'test-data',
      priority: 1,
      timestamp: Date.now(),
      status: 'pending'
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should process item successfully', async () => {
    const result = await queueProcessor.processItem(testItem);
    
    expect(result.success).toBe(true);
    expect(result.result).toBe('result');
    expect(mockJobFunction).toHaveBeenCalledWith('test-data');
    expect(mockEventEmitter.emit).toHaveBeenCalledWith('itemProcessed', expect.objectContaining({
      id: 'test-id',
      success: true
    }));
  });

  it('should handle job function errors', async () => {
    const error = new Error('Test error');
    mockJobFunction.mockRejectedValueOnce(error);
    
    const result = await queueProcessor.processItem(testItem);
    
    expect(result.success).toBe(false);
    expect(result.error).toBe(error);
    expect(mockEventEmitter.emit).toHaveBeenCalledWith('itemFailed', expect.objectContaining({
      id: 'test-id',
      error
    }));
  });

  it('should retry failed items up to retry limit', async () => {
    const error = new Error('Test error');
    mockJobFunction.mockRejectedValue(error);
    
    // Configurar processador com retry
    const options: QueueOptions = {
      concurrency: 1,
      retryLimit: 2,
      retryDelay: 10
    };
    
    const retryProcessor = new QueueProcessor<string>(mockJobFunction, options, mockEventEmitter);
    
    const result = await retryProcessor.processItem(testItem);
    
    // Deve ter tentado 1 + 2 retries = 3 vezes
    expect(mockJobFunction).toHaveBeenCalledTimes(3);
    expect(result.success).toBe(false);
    expect(result.error).toBe(error);
    expect(result.retries).toBe(2);
  });

  it('should respect concurrency limit', async () => {
    // Criar processador com concorrência 1
    const options: QueueOptions = {
      concurrency: 1,
      retryLimit: 0,
      retryDelay: 0
    };
    
    const singleConcurrencyProcessor = new QueueProcessor<string>(mockJobFunction, options);
    
    // Simular delay na função de processamento
    mockJobFunction.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve('result'), 50);
    }));
    
    // Iniciar processamento de dois itens
    const item1 = { ...testItem, id: 'id1' };
    const item2 = { ...testItem, id: 'id2' };
    
    const promise1 = singleConcurrencyProcessor.processItem(item1);
    const promise2 = singleConcurrencyProcessor.processItem(item2);
    
    // Verificar que o segundo item está aguardando (não foi processado ainda)
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(mockJobFunction).toHaveBeenCalledTimes(1);
    
    // Aguardar conclusão de ambos
    await Promise.all([promise1, promise2]);
    expect(mockJobFunction).toHaveBeenCalledTimes(2);
  });
});
