import { describe, it, expect, beforeEach } from 'vitest';
import { QueueState } from '../../../services/queue/QueueState';
import { QueueItem } from '../../../services/queue/interfaces';

describe('QueueState', () => {
  let queueState: QueueState<string>;
  let testItem: QueueItem<string>;

  beforeEach(() => {
    queueState = new QueueState<string>();
    testItem = {
      id: 'test-id',
      data: 'test-data',
      priority: 1,
      timestamp: Date.now(),
      status: 'pending'
    };
  });

  it('should add item to queue', () => {
    queueState.addItem(testItem);
    expect(queueState.getItem(testItem.id)).toEqual(testItem);
  });

  it('should update item status', () => {
    queueState.addItem(testItem);
    queueState.updateItemStatus(testItem.id, 'processing');
    const updatedItem = queueState.getItem(testItem.id);
    expect(updatedItem?.status).toBe('processing');
  });

  it('should remove item from queue', () => {
    queueState.addItem(testItem);
    queueState.removeItem(testItem.id);
    expect(queueState.getItem(testItem.id)).toBeUndefined();
  });

  it('should get all items', () => {
    const item1 = { ...testItem, id: 'id1' };
    const item2 = { ...testItem, id: 'id2' };
    
    queueState.addItem(item1);
    queueState.addItem(item2);
    
    const items = queueState.getAllItems();
    expect(items.size).toBe(2);
    expect(items.get('id1')).toEqual(item1);
    expect(items.get('id2')).toEqual(item2);
  });

  it('should get items by status', () => {
    const item1 = { ...testItem, id: 'id1', status: 'pending' };
    const item2 = { ...testItem, id: 'id2', status: 'processing' };
    const item3 = { ...testItem, id: 'id3', status: 'pending' };
    
    queueState.addItem(item1);
    queueState.addItem(item2);
    queueState.addItem(item3);
    
    const pendingItems = queueState.getItemsByStatus('pending');
    expect(pendingItems.length).toBe(2);
    expect(pendingItems.find(item => item.id === 'id1')).toBeDefined();
    expect(pendingItems.find(item => item.id === 'id3')).toBeDefined();
    
    const processingItems = queueState.getItemsByStatus('processing');
    expect(processingItems.length).toBe(1);
    expect(processingItems[0].id).toBe('id2');
  });

  it('should clear all items', () => {
    queueState.addItem({ ...testItem, id: 'id1' });
    queueState.addItem({ ...testItem, id: 'id2' });
    
    queueState.clear();
    
    expect(queueState.getAllItems().size).toBe(0);
  });
});
