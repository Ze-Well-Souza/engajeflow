import { QueuePriority } from '../../../services/queue/QueuePriority';
import { QueueItem } from '../../../services/queue/interfaces';

describe('QueuePriority', () => {
  let queuePriority: QueuePriority<string>;
  let items: Map<string, QueueItem<string>>;

  beforeEach(() => {
    queuePriority = new QueuePriority<string>();
    items = new Map();
    
    // Adicionar alguns itens com diferentes prioridades
    const now = new Date();
    
    items.set('item1', {
      id: 'item1',
      data: 'data1',
      status: 'pending',
      priority: 1,
      addedAt: new Date(now.getTime() - 3000), // 3 segundos atrás
      attempt: 0
    });
    
    items.set('item2', {
      id: 'item2',
      data: 'data2',
      status: 'pending',
      priority: 2, // Maior prioridade
      addedAt: new Date(now.getTime() - 1000), // 1 segundo atrás
      attempt: 0
    });
    
    items.set('item3', {
      id: 'item3',
      data: 'data3',
      status: 'pending',
      priority: 1,
      addedAt: new Date(now.getTime() - 2000), // 2 segundos atrás
      attempt: 0
    });
  });

  describe('getHighestPriorityItem', () => {
    it('deve retornar o item com maior prioridade', () => {
      const item = queuePriority.getHighestPriorityItem(items);
      
      expect(item).toBeDefined();
      expect(item?.id).toBe('item2');
    });

    it('deve retornar o item mais antigo quando as prioridades são iguais', () => {
      // Remover item2 para testar com prioridades iguais
      items.delete('item2');
      
      const item = queuePriority.getHighestPriorityItem(items);
      
      expect(item).toBeDefined();
      expect(item?.id).toBe('item1'); // item1 é mais antigo que item3
    });

    it('deve retornar undefined para uma fila vazia', () => {
      const emptyMap = new Map<string, QueueItem<string>>();
      const item = queuePriority.getHighestPriorityItem(emptyMap);
      
      expect(item).toBeUndefined();
    });
  });

  describe('calculateDynamicPriority', () => {
    it('deve calcular prioridade dinâmica baseada na prioridade base e tempo de espera', () => {
      const now = new Date();
      const item: QueueItem<string> = {
        id: 'test',
        data: 'test',
        status: 'pending',
        priority: 2,
        addedAt: new Date(now.getTime() - 1800000), // 30 minutos atrás
        attempt: 0
      };
      
      // Com maxWaitTime de 1 hora, 30 minutos deve dar um fator de 0.5
      const priority = queuePriority.calculateDynamicPriority(
        item,
        1.0,  // baseWeight
        0.5,  // waitTimeWeight
        3600000  // maxWaitTime (1 hora)
      );
      
      // Prioridade base (2 * 1.0) + tempo de espera (0.5 * 0.5) = 2.25
      expect(priority).toBeCloseTo(2.25, 2);
    });

    it('deve limitar o fator de tempo de espera a 1.0 para esperas longas', () => {
      const now = new Date();
      const item: QueueItem<string> = {
        id: 'test',
        data: 'test',
        status: 'pending',
        priority: 1,
        addedAt: new Date(now.getTime() - 7200000), // 2 horas atrás
        attempt: 0
      };
      
      // Com maxWaitTime de 1 hora, 2 horas deve dar um fator de 1.0 (limitado)
      const priority = queuePriority.calculateDynamicPriority(
        item,
        1.0,  // baseWeight
        0.5,  // waitTimeWeight
        3600000  // maxWaitTime (1 hora)
      );
      
      // Prioridade base (1 * 1.0) + tempo de espera (1.0 * 0.5) = 1.5
      expect(priority).toBeCloseTo(1.5, 2);
    });
  });
});
