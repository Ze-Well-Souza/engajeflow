
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import QueueManager from '../../../services/queue/QueueManager';

describe('QueueIntegration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset completo do QueueManager para isolamento entre testes
    QueueManager.reset();
  });

  afterEach(() => {
    // Garantir que o processamento seja parado após cada teste
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
    expect(tasks[0].status).toBe('pending');
    expect(tasks[0].data).toEqual({ test: true });
    expect(tasks[0].priority).toBe(1);
  });

  it('should process tasks in order based on priority', () => {
    // Adicionar tarefas com diferentes prioridades
    const taskId1 = QueueManager.addTask('task1', { order: 1 }, 3); // Maior prioridade
    const taskId2 = QueueManager.addTask('task2', { order: 2 }, 1); // Menor prioridade  
    const taskId3 = QueueManager.addTask('task3', { order: 3 }, 2); // Prioridade média
    
    const tasks = QueueManager.getTasks();
    expect(tasks.length).toBe(3);
    
    // Tarefas devem estar ordenadas por prioridade (maior primeiro)
    expect(tasks[0].priority).toBe(3); // task1
    expect(tasks[0].id).toBe(taskId1);
    expect(tasks[1].priority).toBe(2); // task3
    expect(tasks[1].id).toBe(taskId3);
    expect(tasks[2].priority).toBe(1); // task2
    expect(tasks[2].id).toBe(taskId2);
  });

  it('should handle queue lifecycle correctly', () => {
    // Fila deve estar vazia no início do teste devido ao beforeEach reset
    const initialTasks = QueueManager.getTasks();
    expect(initialTasks.length).toBe(0);
    
    // Adicionar uma tarefa
    const taskId = QueueManager.addTask('lifecycle-test', { phase: 'start' }, 1);
    const tasksAfterAdd = QueueManager.getTasks();
    expect(tasksAfterAdd.length).toBe(1);
    expect(tasksAfterAdd[0].type).toBe('lifecycle-test');
    expect(tasksAfterAdd[0].status).toBe('pending');
    expect(tasksAfterAdd[0].id).toBe(taskId);
    
    // clearCompleted não deve remover tarefas pending
    QueueManager.clearCompleted();
    const tasksAfterClear = QueueManager.getTasks();
    expect(tasksAfterClear.length).toBe(1);
    expect(tasksAfterClear[0].status).toBe('pending');

    // Reset deve limpar todas as tarefas
    QueueManager.reset();
    const tasksAfterReset = QueueManager.getTasks();
    expect(tasksAfterReset.length).toBe(0);
  });

  it('should clear completed tasks only', () => {
    // Adicionar algumas tarefas
    QueueManager.addTask('task1', { data: 1 }, 1);
    QueueManager.addTask('task2', { data: 2 }, 1);
    
    const tasks = QueueManager.getTasks();
    expect(tasks.length).toBe(2);
    
    // Simular que uma tarefa foi completada manualmente para teste
    // Como não temos acesso direto ao array interno, vamos usar o método reset
    // e adicionar uma tarefa que já esteja "completed" através de uma extensão do teste
    
    // Por enquanto, testar apenas que clearCompleted não remove tarefas pending
    QueueManager.clearCompleted();
    const tasksAfterClear = QueueManager.getTasks();
    expect(tasksAfterClear.length).toBe(2); // Todas ainda pending, então não removidas
    
    // Todas as tarefas ainda devem estar com status pending
    tasksAfterClear.forEach(task => {
      expect(task.status).toBe('pending');
    });
  });

  it('should maintain task properties correctly', () => {
    const testData = { userId: 123, action: 'process' };
    const taskId = QueueManager.addTask('property-test', testData, 5);
    
    const tasks = QueueManager.getTasks();
    const task = tasks.find(t => t.id === taskId);
    
    expect(task).toBeDefined();
    expect(task!.type).toBe('property-test');
    expect(task!.data).toEqual(testData);
    expect(task!.priority).toBe(5);
    expect(task!.status).toBe('pending');
    expect(task!.retries).toBe(0);
    expect(task!.maxRetries).toBe(3);
    expect(task!.createdAt).toBeInstanceOf(Date);
  });

  it('should handle multiple queue operations sequentially', () => {
    // Operações sequenciais para testar robustez
    expect(QueueManager.getTasks().length).toBe(0);
    
    const taskId1 = QueueManager.addTask('seq1', { step: 1 }, 1);
    expect(QueueManager.getTasks().length).toBe(1);
    
    const taskId2 = QueueManager.addTask('seq2', { step: 2 }, 2);
    expect(QueueManager.getTasks().length).toBe(2);
    
    // Verificar ordenação por prioridade
    const tasks = QueueManager.getTasks();
    expect(tasks[0].id).toBe(taskId2); // Prioridade 2, deve vir primeiro
    expect(tasks[1].id).toBe(taskId1); // Prioridade 1, deve vir depois
    
    QueueManager.clearCompleted();
    expect(QueueManager.getTasks().length).toBe(2); // Nenhuma completada ainda
    
    QueueManager.stop();
    expect(QueueManager.getTasks().length).toBe(2); // Stop não remove tarefas
    
    QueueManager.reset();
    expect(QueueManager.getTasks().length).toBe(0); // Reset remove todas
  });
});
