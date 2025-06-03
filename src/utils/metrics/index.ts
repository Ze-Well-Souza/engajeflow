
import logger from '../logger';

interface Metric {
  name: string;
  value: number;
  timestamp: Date;
  labels?: Record<string, string>;
}

export class MetricsCollector {
  private metrics: Metric[] = [];

  constructor() {
    logger.info('[Metrics] Inicializando coletor de métricas');
  }

  recordMetric(name: string, value: number, labels?: Record<string, string>): void {
    const metric: Metric = {
      name,
      value,
      timestamp: new Date(),
      labels
    };
    
    this.metrics.push(metric);
    logger.debug(`[Metrics] Métrica registrada: ${name} = ${value}`);
  }

  getMetrics(): Metric[] {
    return [...this.metrics];
  }

  clearMetrics(): void {
    this.metrics = [];
    logger.info('[Metrics] Métricas limpas');
  }
}

export const metricsCollector = new MetricsCollector();
