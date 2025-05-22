// src/utils/metrics/test-metrics.ts

import { 
  initMetricsServer, 
  tasksProcessedCounter, 
  errorsCounter, 
  queueSizeGauge, 
  activeWorkersGauge, 
  circuitBreakerStateGauge,
  taskDurationHistogram,
  measureTaskDuration
} from './index';
import { Logger } from '../logger';

const logger = new Logger('MetricsTest');

/**
 * Script para testar a geração de métricas para o Prometheus
 * Este script simula atividade no sistema para gerar métricas de exemplo
 */
async function runMetricsTest() {
  logger.info('Iniciando teste de métricas');
  
  // Iniciar servidor de métricas
  initMetricsServer(9090);
  
  // Simular tamanho da fila
  setInterval(() => {
    const normalSize = Math.floor(Math.random() * 20);
    const highSize = Math.floor(Math.random() * 5);
    
    queueSizeGauge.set({ priority: 'normal' }, normalSize);
    queueSizeGauge.set({ priority: 'high' }, highSize);
    
    logger.info('Atualizando tamanho da fila', { normal: normalSize, high: highSize });
  }, 5000);
  
  // Simular workers ativos
  setInterval(() => {
    const workers = Math.floor(Math.random() * 5) + 1;
    activeWorkersGauge.set(workers);
    logger.info('Atualizando workers ativos', { workers });
  }, 7000);
  
  // Simular estado do circuit breaker
  setInterval(() => {
    const services = ['techcare_api', 'database', 'external_service'];
    const states = [0, 1, 2]; // 0=fechado, 1=meio-aberto, 2=aberto
    const weights = [0.8, 0.15, 0.05]; // Probabilidades para cada estado
    
    services.forEach(service => {
      // Selecionar estado com base nas probabilidades
      let random = Math.random();
      let state = 0;
      
      for (let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
          state = states[i];
          break;
        }
        random -= weights[i];
      }
      
      circuitBreakerStateGauge.set({ service }, state);
      logger.info('Atualizando estado do circuit breaker', { service, state });
    });
  }, 10000);
  
  // Simular processamento de tarefas
  setInterval(async () => {
    const taskTypes = ['financial_report', 'client_data', 'sales_analysis', 'inventory_check'];
    const randomType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    
    try {
      await measureTaskDuration(randomType, async () => {
        // Simular duração variável da tarefa
        const duration = Math.random() * 5 + 0.5; // Entre 0.5 e 5.5 segundos
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        
        // Simular erro ocasional (10% de chance)
        if (Math.random() < 0.1) {
          throw new Error('Erro simulado no processamento');
        }
        
        logger.info('Tarefa processada com sucesso', { type: randomType, duration });
        return { success: true };
      });
    } catch (error) {
      logger.error('Erro ao processar tarefa', { type: randomType, error });
      errorsCounter.inc({ service: 'task_processor', type: randomType });
    }
  }, 3000);
  
  // Simular erros aleatórios
  setInterval(() => {
    const services = ['api', 'database', 'external_service', 'auth'];
    const errorTypes = ['timeout', 'connection_refused', 'validation_error', 'internal_error'];
    
    if (Math.random() < 0.2) { // 20% de chance de gerar erro
      const service = services[Math.floor(Math.random() * services.length)];
      const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
      
      errorsCounter.inc({ service, type: errorType });
      logger.warn('Erro simulado registrado', { service, type: errorType });
    }
  }, 15000);
  
  logger.info('Teste de métricas em execução. Pressione Ctrl+C para encerrar.');
}

// Executar o teste
runMetricsTest().catch(error => {
  logger.error('Erro ao executar teste de métricas', { error });
  process.exit(1);
});
