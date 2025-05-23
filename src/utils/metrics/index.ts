
/**
 * Sistema de métricas baseado em Prometheus
 */

import { Counter, Gauge, Histogram, register } from 'prom-client';
import { Router } from 'express';
import logger from '../logger';

const metricsLogger = logger.withContext('Metrics');

// Configuração padrão
const DEFAULT_PREFIX = 'techcare_';
const DEFAULT_LABELS = ['service', 'endpoint'];

// Interface para inicialização do sistema de métricas
export interface MetricsConfig {
  prefix?: string;
  defaultLabels?: string[];
  collectDefaultMetrics?: boolean;
}

// Singleton para gerenciar métricas
class MetricsService {
  private static instance: MetricsService;
  private prefix: string;
  private defaultLabels: string[];
  private counters: Map<string, Counter> = new Map();
  private gauges: Map<string, Gauge> = new Map();
  private histograms: Map<string, Histogram> = new Map();
  
  private constructor() {
    this.prefix = DEFAULT_PREFIX;
    this.defaultLabels = DEFAULT_LABELS;
    metricsLogger.info('Sistema de métricas inicializado');
  }
  
  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }
  
  // Configurar o serviço de métricas
  public configure(config: MetricsConfig = {}): void {
    const { prefix, defaultLabels, collectDefaultMetrics } = config;
    
    if (prefix) {
      this.prefix = prefix;
    }
    
    if (defaultLabels) {
      this.defaultLabels = defaultLabels;
    }
    
    if (collectDefaultMetrics) {
      register.setDefaultLabels({ service: 'techcare' });
      require('prom-client').collectDefaultMetrics({ prefix: this.prefix });
      metricsLogger.info('Métricas padrão ativadas');
    }
    
    metricsLogger.info('Sistema de métricas configurado', { prefix: this.prefix });
  }
  
  // Criar ou obter um contador
  public counter(name: string, help: string, labelNames: string[] = []): Counter {
    const metricName = `${this.prefix}${name}`;
    
    if (!this.counters.has(metricName)) {
      const counter = new Counter({
        name: metricName,
        help,
        labelNames: [...this.defaultLabels, ...labelNames]
      });
      this.counters.set(metricName, counter);
    }
    
    return this.counters.get(metricName)!;
  }
  
  // Criar ou obter um gauge
  public gauge(name: string, help: string, labelNames: string[] = []): Gauge {
    const metricName = `${this.prefix}${name}`;
    
    if (!this.gauges.has(metricName)) {
      const gauge = new Gauge({
        name: metricName,
        help,
        labelNames: [...this.defaultLabels, ...labelNames]
      });
      this.gauges.set(metricName, gauge);
    }
    
    return this.gauges.get(metricName)!;
  }
  
  // Criar ou obter um histograma
  public histogram(name: string, help: string, labelNames: string[] = [], buckets?: number[]): Histogram {
    const metricName = `${this.prefix}${name}`;
    
    if (!this.histograms.has(metricName)) {
      const options: any = {
        name: metricName,
        help,
        labelNames: [...this.defaultLabels, ...labelNames]
      };
      
      if (buckets) {
        options.buckets = buckets;
      }
      
      const histogram = new Histogram(options);
      this.histograms.set(metricName, histogram);
    }
    
    return this.histograms.get(metricName)!;
  }
  
  // Criar um middleware para Express que expõe um endpoint de métricas
  public createMetricsMiddleware(): Router {
    const router = Router();
    
    router.get('/metrics', (req, res) => {
      res.set('Content-Type', register.contentType);
      register.metrics().then(metrics => {
        res.send(metrics);
      }).catch(err => {
        metricsLogger.error('Erro ao gerar métricas', err);
        res.status(500).send('Erro ao gerar métricas');
      });
    });
    
    return router;
  }
  
  // Resetar métricas (útil para testes)
  public resetMetrics(): void {
    register.clear();
    this.counters.clear();
    this.gauges.clear();
    this.histograms.clear();
    metricsLogger.info('Métricas resetadas');
  }
}

// Exportar instância singleton
const metrics = MetricsService.getInstance();
export default metrics;
