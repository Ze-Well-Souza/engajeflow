
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QueueManager from '../../services/queue/QueueManager';

describe('QueueManager', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    QueueManager.reset();
  });

  afterEach(() => {
    QueueManager.stop();
  });

  it('should be defined', () => {
    expect(QueueManager).toBeDefined();
  });

  it('should add tasks correctly', () => {
    const taskId = QueueManager.addTask('test-task', { test: true }, 1);
    const tasks = QueueManager.getTasks();
    
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(taskId);
    expect(tasks[0].type).toBe('test-task');
    expect(tasks[0].status).toBe('pending');
  });

  it('should sort tasks by priority', () => {
    QueueManager.addTask('low', {}, 1);
    QueueManager.addTask('high', {}, 3);
    QueueManager.addTask('medium', {}, 2);
    
    const tasks = QueueManager.getTasks();
    expect(tasks[0].priority).toBe(3);
    expect(tasks[1].priority).toBe(2);
    expect(tasks[2].priority).toBe(1);
  });

  it('should clear completed tasks', () => {
    QueueManager.addTask('task1', {}, 1);
    QueueManager.addTask('task2', {}, 1);
    
    // Como as tarefas são pending, clearCompleted não deve remover nada
    QueueManager.clearCompleted();
    expect(QueueManager.getTasks().length).toBe(2);
  });

  it('should reset queue completely', () => {
    QueueManager.addTask('task1', {}, 1);
    QueueManager.addTask('task2', {}, 2);
    
    expect(QueueManager.getTasks().length).toBe(2);
    
    QueueManager.reset();
    expect(QueueManager.getTasks().length).toBe(0);
  });

  it('should stop and start processing', () => {
    QueueManager.stop();
    // Adicionar uma tarefa deve iniciar o processamento novamente
    QueueManager.addTask('restart-test', {}, 1);
    
    expect(QueueManager.getTasks().length).toBe(1);
  });
});
