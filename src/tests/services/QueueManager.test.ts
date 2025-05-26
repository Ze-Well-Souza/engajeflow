
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QueueManager from '../../../services/queue/QueueManager';

describe('QueueIntegration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    QueueManager.clearCompleted();
  });

  afterEach(() => {
    QueueManager.stop();
  });

  it('should integrate with queue manager successfully', () => {
    expect(QueueManager).toBeDefined();
  });

  it('should handle queue operations', () => {
    const taskId = QueueManager.addTask('integration-test', { test: true }, 1);
    const tasks = QueueManager.getTasks();
    
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(taskId);
    expect(tasks[0].type).toBe('integration-test');
  });

  it('should process tasks in order', async () => {
    QueueManager.addTask('task1', { order: 1 }, 3);
    QueueManager.addTask('task2', { order: 2 }, 2);
    QueueManager.addTask('task3', { order: 3 }, 1);
    
    const tasks = QueueManager.getTasks();
    expect(tasks.length).toBe(3);
    
    // Tasks should be ordered by priority (highest first)
    expect(tasks[0].priority).toBe(3);
    expect(tasks[1].priority).toBe(2);
    expect(tasks[2].priority).toBe(1);
  });

  it('should handle queue lifecycle', () => {
    const initialTasks = QueueManager.getTasks();
    expect(initialTasks.length).toBe(0);
    
    QueueManager.addTask('lifecycle-test', { phase: 'start' }, 1);
    const tasksAfterAdd = QueueManager.getTasks();
    expect(tasksAfterAdd.length).toBe(1);
    
    QueueManager.clearCompleted();
    // Should still have pending tasks
    const tasksAfterClear = QueueManager.getTasks();
    expect(tasksAfterClear.length).toBe(1);
  });
});
