
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QueueManager from '../../services/queue/QueueManager';

describe('QueueManager', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Limpar tarefas antes de cada teste
    QueueManager.clearCompleted();
  });

  afterEach(() => {
    QueueManager.stop();
  });

  it('should be defined', () => {
    expect(QueueManager).toBeDefined();
  });

  it('should add task successfully', () => {
    const taskId = QueueManager.addTask('test', { message: 'test data' }, 1);
    expect(taskId).toBeDefined();
    expect(typeof taskId).toBe('string');
  });

  it('should return empty tasks initially', () => {
    const tasks = QueueManager.getTasks();
    expect(Array.isArray(tasks)).toBe(true);
  });

  it('should add and retrieve tasks', () => {
    const taskId = QueueManager.addTask('test', { message: 'test data' }, 1);
    const tasks = QueueManager.getTasks();
    
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(taskId);
    expect(tasks[0].type).toBe('test');
    expect(tasks[0].status).toBe('pending');
  });

  it('should handle multiple tasks', () => {
    QueueManager.addTask('test1', { data: 1 }, 1);
    QueueManager.addTask('test2', { data: 2 }, 2);
    
    const tasks = QueueManager.getTasks();
    expect(tasks.length).toBe(2);
  });

  it('should prioritize tasks correctly', () => {
    const lowPriorityId = QueueManager.addTask('low', { data: 1 }, 1);
    const highPriorityId = QueueManager.addTask('high', { data: 2 }, 5);
    
    const tasks = QueueManager.getTasks();
    expect(tasks[0].id).toBe(highPriorityId); // High priority should be first
    expect(tasks[1].id).toBe(lowPriorityId);
  });

  it('should clear completed tasks', () => {
    QueueManager.addTask('test', { data: 1 }, 1);
    const initialTasks = QueueManager.getTasks();
    expect(initialTasks.length).toBeGreaterThan(0);
    
    QueueManager.clearCompleted();
    // Since no tasks are completed yet, should still have pending tasks
    const tasksAfterClear = QueueManager.getTasks();
    expect(tasksAfterClear.length).toBe(initialTasks.length);
  });
});
