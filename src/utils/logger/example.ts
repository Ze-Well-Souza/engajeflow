/**
 * Exemplo de uso do logger estruturado em um serviço
 * Este arquivo demonstra como integrar o logger em serviços existentes
 */

import logger from '../../utils/logger';

// Criar um logger específico para este serviço
const serviceLogger = logger.withContext('QueueService');

/**
 * Exemplo de integração do logger em um serviço
 */
export class ExampleService {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
    serviceLogger.info(`Serviço ${name} inicializado`);
  }
  
  /**
   * Exemplo de método com logging de operação
   */
  async processItem(item: any): Promise<any> {
    // Iniciar medição de operação
    const operation = logger.startOperation(`${this.name}.processItem`);
    
    try {
      serviceLogger.info(`Processando item`, { itemId: item.id });
      
      // Simulação de processamento
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Log de sucesso
      const result = { success: true, itemId: item.id };
      serviceLogger.info(`Item processado com sucesso`, { itemId: item.id });
      
      // Finalizar operação com sucesso
      operation.end('success', { itemId: item.id });
      
      return result;
    } catch (error) {
      // Log de erro com detalhes da exceção
      serviceLogger.error(`Erro ao processar item ${item.id}`, error);
      
      // Finalizar operação com falha
      operation.end('failure', { itemId: item.id, error: error.message });
      
      throw error;
    }
  }
  
  /**
   * Exemplo de método com diferentes níveis de log
   */
  async executeTask(task: any): Promise<void> {
    // Log de debug com detalhes completos
    serviceLogger.debug(`Detalhes da tarefa`, { task });
    
    // Log de info com informações essenciais
    serviceLogger.info(`Executando tarefa ${task.id}`);
    
    if (task.priority > 5) {
      // Log de aviso para situações não críticas
      serviceLogger.warn(`Tarefa com prioridade alta`, { 
        taskId: task.id, 
        priority: task.priority 
      });
    }
    
    try {
      // Simulação de execução
      await new Promise(resolve => setTimeout(resolve, 50));
      
      serviceLogger.info(`Tarefa ${task.id} concluída`);
    } catch (error) {
      // Log de erro com stack trace
      serviceLogger.error(`Falha na execução da tarefa ${task.id}`, error);
      throw error;
    }
  }
}

/**
 * Guia de integração do logger:
 * 
 * 1. Importe o logger no início do arquivo:
 *    import logger from '../../utils/logger';
 * 
 * 2. Para contextos específicos, crie um logger com contexto:
 *    const moduleLogger = logger.withContext('NomeDoModulo');
 * 
 * 3. Substitua todos os console.log por:
 *    - logger.debug() para informações detalhadas de desenvolvimento
 *    - logger.info() para informações gerais de operação
 *    - logger.warn() para avisos não críticos
 *    - logger.error() para erros que afetam a operação
 * 
 * 4. Para operações com duração, use:
 *    const operation = logger.startOperation('NomeDaOperacao');
 *    try {
 *      // código da operação
 *      operation.end('success', { resultado });
 *    } catch (error) {
 *      operation.end('failure', { error });
 *      throw error;
 *    }
 * 
 * 5. Sempre inclua metadados relevantes como segundo parâmetro:
 *    logger.info('Mensagem', { id: item.id, status: item.status });
 */
