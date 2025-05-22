/**
 * Testes de integração para o sistema de filas
 */

import { 
  QueueManager, 
  QueueState, 
  QueueProcessor, 
  QueuePriority, 
  QueueEventEmitter 
} from '../../../services/queue';

describe('Queue Integration Tests', () => {
  let queueManager: QueueManager<string>;
  let jobFunction: jest.Mock;
  let processedItems: string[] = [];
  let failedItems: string[] = [];

  beforeEach(() => {
    processedItems = [];
    failedItems = [];
    
    // Criar função de processamento simulada
    jobFunction = jest.fn().mockImplementation(async (data: string) => {
      // Simular processamento assíncrono
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Falhar para itens que começam com "fail"
      if (data.startsWith('fail')) {
        throw new Error(`Falha ao processar ${data}`);
      }
      
      // Registrar item processado
      processedItems.push(data);
      return { processed: data };
    });
    
    // Criar instância real do QueueManager com todas as dependências reais
    queueManager = new QueueManager<string>(
      jobFunction,
      {
        concurrency: 2,
        maxRetries: 2,
        retryDelay: 50,
        retryStrategy: 'fixed'
      }
    );
    
    // Registrar handler para itens com falha
    queueManager.on('item:failed', (item) => {
      if (item?.data) {
        failedItems.push(item.data);
      }
    });
  });

  it('deve processar múltiplos itens com sucesso', async () => {
    // Adicionar vários itens à fila
    queueManager.enqueue('item1', 'data1', 1);
    queueManager.enqueue('item2', 'data2', 2);
    queueManager.enqueue('item3', 'data3', 1);
    
    // Aguardar processamento
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Verificar se todos os itens foram processados
    expect(processedItems).toContain('data1');
    expect(processedItems).toContain('data2');
    expect(processedItems).toContain('data3');
    expect(processedItems.length).toBe(3);
    
    // Verificar se a função de processamento foi chamada para cada item
    expect(jobFunction).toHaveBeenCalledTimes(3);
  });

  it('deve lidar com falhas e retentativas', async () => {
    // Adicionar item que vai falhar
    queueManager.enqueue('fail1', 'fail-data', 1);
    
    // Aguardar processamento e retentativas
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Verificar se o item falhou após as retentativas
    expect(failedItems).toContain('fail-data');
    expect(processedItems).not.toContain('fail-data');
    
    // Verificar se a função de processamento foi chamada para cada tentativa
    // 1 tentativa inicial + 2 retentativas = 3 chamadas
    expect(jobFunction).toHaveBeenCalledTimes(3);
  });

  it('deve respeitar prioridades ao processar itens', async () => {
    // Adicionar itens com diferentes prioridades
    queueManager.enqueue('low', 'low-priority', 1);
    queueManager.enqueue('high', 'high-priority', 10);
    queueManager.enqueue('medium', 'medium-priority', 5);
    
    // Aguardar processamento
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Verificar ordem de processamento
    expect(processedItems.indexOf('high-priority')).toBeLessThan(processedItems.indexOf('medium-priority'));
    expect(processedItems.indexOf('medium-priority')).toBeLessThan(processedItems.indexOf('low-priority'));
  });

  it('deve pausar e retomar o processamento', async () => {
    // Pausar a fila
    queueManager.pause();
    
    // Adicionar itens
    queueManager.enqueue('item1', 'data1', 1);
    queueManager.enqueue('item2', 'data2', 1);
    
    // Verificar que nada foi processado ainda
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(processedItems.length).toBe(0);
    
    // Retomar processamento
    queueManager.resume();
    
    // Verificar que os itens foram processados
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(processedItems.length).toBe(2);
  });

  it('deve remover itens corretamente', async () => {
    // Adicionar itens
    queueManager.enqueue('item1', 'data1', 1);
    queueManager.enqueue('item2', 'data2', 1);
    queueManager.enqueue('item3', 'data3', 1);
    
    // Remover um item
    const removed = queueManager.dequeue('item2');
    expect(removed).toBe(true);
    
    // Aguardar processamento
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Verificar que apenas os itens não removidos foram processados
    expect(processedItems).toContain('data1');
    expect(processedItems).toContain('data3');
    expect(processedItems).not.toContain('data2');
    expect(processedItems.length).toBe(2);
  });

  it('deve limpar a fila corretamente', async () => {
    // Adicionar itens
    queueManager.enqueue('item1', 'data1', 1);
    queueManager.enqueue('item2', 'data2', 1);
    
    // Limpar a fila
    const count = queueManager.clear();
    expect(count).toBe(2);
    
    // Adicionar novo item após limpar
    queueManager.enqueue('item3', 'data3', 1);
    
    // Aguardar processamento
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Verificar que apenas o item adicionado após limpar foi processado
    expect(processedItems).not.toContain('data1');
    expect(processedItems).not.toContain('data2');
    expect(processedItems).toContain('data3');
    expect(processedItems.length).toBe(1);
  });
});
