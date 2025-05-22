
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueueManager } from '../../services/queue/QueueManager';

describe('QueueManager', () => {
  let queueManager: QueueManager<{ task: string }>;
  let mockJobFunction: any;
  
  beforeEach(() => {
    // Create mock job function
    mockJobFunction = vi.fn().mockImplementation(async (data) => {
      return `Processed ${data.task}`;
    });
    
    // Create queue manager with test options
    queueManager = new QueueManager<{ task: string }>(mockJobFunction, {
      concurrency: 2,
      maxRetries: 2,
      retryDelay: 10 // Short delay for tests
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should add items to the queue', () => {
    const item1 = queueManager.enqueue('task1', { task: 'Task 1' });
    const item2 = queueManager.enqueue('task2', { task: 'Task 2' }, 5); // Higher priority
    
    expect(item1.id).toBe('task1');
    expect(item1.data).toEqual({ task: 'Task 1' });
    expect(item1.status).toBe('pending');
    
    expect(item2.priority).toBe(5);
    
    // Check queue stats
    const stats = queueManager.getStats();
    expect(stats.pending).toBeGreaterThan(0);
  });

  it('should prevent duplicate items in the queue', () => {
    queueManager.enqueue('task1', { task: 'Task 1' });
    
    expect(() => {
      queueManager.enqueue('task1', { task: 'Task 1 Duplicate' });
    }).toThrow('já está na fila');
  });

  it('should remove items from the queue', () => {
    queueManager.enqueue('task1', { task: 'Task 1' });
    queueManager.enqueue('task2', { task: 'Task 2' });
    
    const removed = queueManager.dequeue('task1');
    expect(removed).toBe(true);
    
    const notFound = queueManager.dequeue('non-existent');
    expect(notFound).toBe(false);
  });

  it('should process queue items and execute job function', async () => {
    // Add items to the queue
    queueManager.enqueue('task1', { task: 'Task 1' });
    queueManager.enqueue('task2', { task: 'Task 2' });
    
    // Allow time for processing
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(mockJobFunction).toHaveBeenCalledTimes(2);
    expect(mockJobFunction).toHaveBeenCalledWith({ task: 'Task 1' });
    expect(mockJobFunction).toHaveBeenCalledWith({ task: 'Task 2' });
  });

  it('should process higher priority items first', async () => {
    const processOrder: string[] = [];
    
    // Create a mock that tracks processing order
    mockJobFunction = vi.fn().mockImplementation(async (data) => {
      processOrder.push(data.task);
      return `Processed ${data.task}`;
    });
    
    // Create new queue with the tracking mock
    queueManager = new QueueManager<{ task: string }>(mockJobFunction, {
      concurrency: 1, // Process one at a time to check order
      maxRetries: 1,
      retryDelay: 10
    });
    
    // Add items with different priorities
    queueManager.enqueue('task1', { task: 'Low Priority' }, 1);
    queueManager.enqueue('task2', { task: 'High Priority' }, 10);
    queueManager.enqueue('task3', { task: 'Medium Priority' }, 5);
    
    // Allow time for processing
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // High priority should be first, then medium, then low
    expect(processOrder[0]).toBe('High Priority');
    expect(processOrder[1]).toBe('Medium Priority');
    expect(processOrder[2]).toBe('Low Priority');
  });

  it('should retry failed tasks', async () => {
    // Mock function that fails once then succeeds
    mockJobFunction = vi.fn()
      .mockRejectedValueOnce(new Error('Temporary failure'))
      .mockResolvedValueOnce('Success on retry');
    
    // Create new queue with the retry mock
    queueManager = new QueueManager<{ task: string }>(mockJobFunction, {
      concurrency: 1,
      maxRetries: 2,
      retryDelay: 10
    });
    
    queueManager.enqueue('retry-task', { task: 'Retry Me' });
    
    // Allow time for initial failure and retry
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(mockJobFunction).toHaveBeenCalledTimes(2);
  });

  it('should clear the queue', async () => {
    queueManager.enqueue('task1', { task: 'Task 1' });
    queueManager.enqueue('task2', { task: 'Task 2' });
    queueManager.enqueue('task3', { task: 'Task 3' });
    
    const clearedCount = queueManager.clear();
    expect(clearedCount).toBe(3);
    
    const stats = queueManager.getStats();
    expect(stats.pending).toBe(0);
  });
});
