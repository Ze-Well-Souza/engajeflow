
import logger from '../../utils/logger';

interface QueueTask {
  id: string;
  type: string;
  data: any;
  priority: number;
  createdAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  retries: number;
  maxRetries: number;
}

export class QueueManager {
  private tasks: QueueTask[] = [];
  private isProcessing = false;
  private processingInterval: NodeJS.Timeout | null = null;

  constructor() {
    logger.info('[QueueManager] Inicializado');
    // Não iniciar processamento automaticamente para melhor controle nos testes
  }

  addTask(type: string, data: any, priority: number = 1): string {
    const task: QueueTask = {
      id: this.generateId(),
      type,
      data,
      priority,
      createdAt: new Date(),
      status: 'pending',
      retries: 0,
      maxRetries: 3
    };

    this.tasks.push(task);
    this.tasks.sort((a, b) => b.priority - a.priority);
    
    logger.info(`[QueueManager] Nova tarefa adicionada: ${task.id}`);
    // Iniciar processamento quando uma tarefa é adicionada
    this.startProcessing();
    return task.id;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  public startProcessing(): void {
    if (this.processingInterval) return;
    
    this.processingInterval = setInterval(() => {
      this.processNextTask();
    }, 1000);
  }

  private async processNextTask(): Promise<void> {
    if (this.isProcessing) return;

    const task = this.tasks.find(t => t.status === 'pending');
    if (!task) {
      // Parar processamento se não há tarefas pendentes
      this.stop();
      return;
    }

    this.isProcessing = true;
    task.status = 'processing';

    try {
      logger.info(`[QueueManager] Processando tarefa: ${task.id}`);
      await this.executeTask(task);
      task.status = 'completed';
      logger.info(`[QueueManager] Tarefa concluída: ${task.id}`);
    } catch (error) {
      task.retries++;
      if (task.retries >= task.maxRetries) {
        task.status = 'failed';
        logger.error(`[QueueManager] Tarefa falhou: ${task.id}`, error);
      } else {
        task.status = 'pending';
        logger.warn(`[QueueManager] Tarefa retry: ${task.id}, tentativa ${task.retries}`);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private async executeTask(task: QueueTask): Promise<void> {
    // Simular processamento da tarefa
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  getTasks(): QueueTask[] {
    return [...this.tasks];
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter(t => t.status !== 'completed');
    logger.info('[QueueManager] Tarefas concluídas removidas');
  }

  /**
   * Método para resetar completamente o estado da fila para testes
   */
  public reset(): void {
    this.stop();
    this.tasks = [];
    this.isProcessing = false;
    logger.info('[QueueManager] Fila resetada');
  }

  stop(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
      logger.info('[QueueManager] Processamento parado');
    }
  }
}

export default new QueueManager();
