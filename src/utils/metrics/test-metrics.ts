
import { metricsCollector } from './index';
import logger from '../logger';

export function recordTestMetrics() {
  logger.info('[TestMetrics] Registrando métricas de teste');
  
  // Registrar algumas métricas de exemplo
  metricsCollector.recordMetric('test_counter', 1, { environment: 'test' });
  metricsCollector.recordMetric('response_time', 250, { endpoint: '/api/test' });
  metricsCollector.recordMetric('memory_usage', 512, { unit: 'MB' });
  
  logger.info('[TestMetrics] Métricas de teste registradas com sucesso');
}

export function getTestMetricsReport() {
  const metrics = metricsCollector.getMetrics();
  return {
    total: metrics.length,
    metrics: metrics.map(m => ({
      name: m.name,
      value: m.value,
      timestamp: m.timestamp
    }))
  };
}
