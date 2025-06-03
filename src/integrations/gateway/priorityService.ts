
interface PendingRequest {
  id: string;
  priority: 'high' | 'normal' | 'low';
  execute: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  addedAt: number;
}

export class PriorityService {
  private queue: PendingRequest[] = [];
  private isProcessing: boolean = false;
  private maxConcurrentRequests: number = 5;
  private activeRequests: number = 0;
  private requestIdCounter: number = 0;

  constructor(maxConcurrentRequests: number = 5) {
    this.maxConcurrentRequests = maxConcurrentRequests;
  }

  /**
   * Adiciona uma requisição à fila de prioridade
   */
  public enqueue<T>(
    execute: () => Promise<T>,
    priority: 'high' | 'normal' | 'low' = 'normal'
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const request: PendingRequest = {
        id: `req_${++this.requestIdCounter}`,
        priority,
        execute,
        resolve,
        reject,
        addedAt: Date.now()
      };
      
      // Adicionar a requisição à fila
      this.queue.push(request);
      console.log(`PriorityService: Enfileirou requisição ${request.id} com prioridade ${priority}`);
      
      // Ordenar a fila por prioridade e tempo de chegada
      this.sortQueue();
      
      // Tentar processar a fila
      this.processQueue();
    });
  }

  /**
   * Organiza a fila com base na prioridade e tempo de chegada
   */
  private sortQueue(): void {
    this.queue.sort((a, b) => {
      const priorityOrder = { 'high': 0, 'normal': 1, 'low': 2 };
      
      // Primeiro ordenar por prioridade
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // Em caso de mesma prioridade, ordenar por tempo de chegada (FIFO)
      return a.addedAt - b.addedAt;
    });
  }

  /**
   * Processa a fila de requisições de acordo com a disponibilidade
   */
  private async processQueue(): Promise<void> {
    // Se já está processando ou não há requisições, sair
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    
    this.isProcessing = true;
    
    try {
      // Enquanto houver requisições na fila e capacidade disponível
      while (this.queue.length > 0 && this.activeRequests < this.maxConcurrentRequests) {
        // Pegar a próxima requisição na fila
        const request = this.queue.shift();
        if (!request) continue;
        
        this.activeRequests++;
        console.log(`PriorityService: Processando requisição ${request.id} (Prioridade: ${request.priority})`);
        
        // Executar a requisição sem aguardar sua conclusão
        this.executeRequest(request).finally(() => {
          this.activeRequests--;
          // Continuar processando a fila após a conclusão
          this.processQueue();
        });
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Executa uma requisição e trata sua resolução ou rejeição
   */
  private async executeRequest(request: PendingRequest): Promise<void> {
    try {
      const result = await request.execute();
      request.resolve(result);
      console.log(`PriorityService: Requisição ${request.id} concluída com sucesso`);
    } catch (error) {
      request.reject(error);
      console.error(`PriorityService: Requisição ${request.id} falhou:`, error);
    }
  }
}

export const priorityService = new PriorityService();
