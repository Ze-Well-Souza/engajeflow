// src/utils/metrics/index.ts

import { register, Counter, Gauge, Histogram } from 'prom-client';
import express from 'express';
import { Logger } from '../logger';

const logger = new Logger('Metrics');

// Contadores
export const tasksProcessedCounter = new Counter({
  name: 'techcare_tasks_processed_total',
  help: 'Total de tarefas processadas',
  labelNames: ['status', 'type']
});

export const errorsCounter = new Counter({
  name: 'techcare_errors_total',
  help: 'Total de erros ocorridos',
  labelNames: ['service', 'type']
});

export const apiRequestsCounter = new Counter({
  name: 'techcare_api_requests_total',
  help: 'Total de requisições à API',
  labelNames: ['method', 'endpoint', 'status']
});

// Gauges
export const queueSizeGauge = new Gauge({
  name: 'techcare_queue_size',
  help: 'Tamanho atual da fila de tarefas',
  labelNames: ['priority']
});

export const activeWorkersGauge = new Gauge({
  name: 'techcare_active_workers',
  help: 'Número de workers ativos processando tarefas'
});

export const circuitBreakerStateGauge = new Gauge({
  name: 'techcare_circuit_breaker_state',
  help: 'Estado atual do circuit breaker (0=fechado, 1=meio-aberto, 2=aberto)',
  labelNames: ['service']
});

// Histogramas
export const taskDurationHistogram = new Histogram({
  name: 'techcare_task_duration_seconds',
  help: 'Duração do processamento de tarefas em segundos',
  labelNames: ['type'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60, 120, 300, 600]
});

export const apiResponseTimeHistogram = new Histogram({
  name: 'techcare_api_response_time_seconds',
  help: 'Tempo de resposta da API em segundos',
  labelNames: ['method', 'endpoint'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10]
});

// Função para inicializar o servidor de métricas
export const initMetricsServer = (port: number = 9090): void => {
  const app = express();
  
  // Endpoint para métricas do Prometheus
  app.get('/metrics', async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (error) {
      logger.error('Erro ao coletar métricas', { error });
      res.status(500).end();
    }
  });
  
  // Endpoint de saúde
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  
  // Iniciar servidor
  app.listen(port, () => {
    logger.info(`Servidor de métricas iniciado na porta ${port}`);
  });
};

// Função para registrar duração de tarefas
export const measureTaskDuration = async <T>(
  taskType: string,
  task: () => Promise<T>
): Promise<T> => {
  const end = taskDurationHistogram.startTimer({ type: taskType });
  try {
    const result = await task();
    tasksProcessedCounter.inc({ status: 'success', type: taskType });
    return result;
  } catch (error) {
    tasksProcessedCounter.inc({ status: 'error', type: taskType });
    errorsCounter.inc({ service: 'task_processor', type: taskType });
    throw error;
  } finally {
    end();
  }
};

// Middleware para medir tempo de resposta da API
export const apiMetricsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now();
  const { method, path } = req;
  
  // Interceptar o método end para capturar o status de resposta
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any, callback?: any) {
    const responseTime = (Date.now() - start) / 1000;
    const status = res.statusCode.toString();
    
    apiRequestsCounter.inc({ method, endpoint: path, status });
    apiResponseTimeHistogram.observe({ method, endpoint: path }, responseTime);
    
    return originalEnd.call(this, chunk, encoding, callback);
  };
  
  next();
};

// Exportar registro para uso em outros módulos
export { register };
