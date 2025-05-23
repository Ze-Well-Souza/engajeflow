
import logger from "../../utils/logger";
import CacheService from "./CacheService";

interface PerformanceMetric {
  operation: string;
  duration: number;
  timestamp: number;
  success: boolean;
  errorMessage?: string;
  metadata?: any;
}

interface SystemHealth {
  uptime: number;
  memoryUsage: number;
  cacheHitRate: number;
  errorRate: number;
  avgResponseTime: number;
  activeConnections: number;
  lastHealthCheck: number;
}

class MonitoringService {
  private static instance: MonitoringService;
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 10000;
  private startTime = Date.now();
  private activeOperations = new Map<string, number>();

  private constructor() {
    // Limpar métricas antigas a cada hora
    setInterval(() => this.cleanupMetrics(), 3600000);
    logger.info('[MonitoringService] Inicializado');
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public startOperation(operationId: string, operationName: string): void {
    this.activeOperations.set(operationId, Date.now());
    logger.debug(`[MonitoringService] Started operation: ${operationName} (${operationId})`);
  }

  public endOperation(operationId: string, operationName: string, success: boolean = true, errorMessage?: string, metadata?: any): void {
    const startTime = this.activeOperations.get(operationId);
    
    if (startTime) {
      const duration = Date.now() - startTime;
      const metric: PerformanceMetric = {
        operation: operationName,
        duration,
        timestamp: Date.now(),
        success,
        errorMessage,
        metadata
      };

      this.metrics.push(metric);
      this.activeOperations.delete(operationId);

      // Manter apenas as métricas mais recentes
      if (this.metrics.length > this.maxMetrics) {
        this.metrics = this.metrics.slice(-this.maxMetrics);
      }

      logger.debug(`[MonitoringService] Completed operation: ${operationName} in ${duration}ms`);

      // Alertar sobre operações lentas
      if (duration > 5000) {
        logger.warn(`[MonitoringService] Slow operation detected: ${operationName} took ${duration}ms`);
      }

      // Alertar sobre erros
      if (!success) {
        logger.error(`[MonitoringService] Operation failed: ${operationName} - ${errorMessage}`);
      }
    }
  }

  public getSystemHealth(): SystemHealth {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 3600000); // Última hora
    
    const errorRate = recentMetrics.length > 0 
      ? (recentMetrics.filter(m => !m.success).length / recentMetrics.length) * 100 
      : 0;

    const avgResponseTime = recentMetrics.length > 0
      ? recentMetrics.reduce((sum, m) => sum + m.duration, 0) / recentMetrics.length
      : 0;

    const cacheStats = CacheService.getStats();

    return {
      uptime: now - this.startTime,
      memoryUsage: this.getMemoryUsage(),
      cacheHitRate: cacheStats.hitRate,
      errorRate,
      avgResponseTime,
      activeConnections: this.activeOperations.size,
      lastHealthCheck: now
    };
  }

  public getMetrics(operation?: string, timeRange?: number): PerformanceMetric[] {
    let filteredMetrics = this.metrics;

    if (operation) {
      filteredMetrics = filteredMetrics.filter(m => m.operation === operation);
    }

    if (timeRange) {
      const cutoff = Date.now() - timeRange;
      filteredMetrics = filteredMetrics.filter(m => m.timestamp > cutoff);
    }

    return filteredMetrics;
  }

  public getOperationStats(operation: string): {
    count: number;
    avgDuration: number;
    successRate: number;
    errors: string[];
  } {
    const operationMetrics = this.metrics.filter(m => m.operation === operation);
    
    if (operationMetrics.length === 0) {
      return {
        count: 0,
        avgDuration: 0,
        successRate: 0,
        errors: []
      };
    }

    const successCount = operationMetrics.filter(m => m.success).length;
    const avgDuration = operationMetrics.reduce((sum, m) => sum + m.duration, 0) / operationMetrics.length;
    const errors = operationMetrics
      .filter(m => !m.success && m.errorMessage)
      .map(m => m.errorMessage!)
      .slice(-10); // Últimos 10 erros

    return {
      count: operationMetrics.length,
      avgDuration: Math.round(avgDuration),
      successRate: (successCount / operationMetrics.length) * 100,
      errors
    };
  }

  public exportMetrics(): string {
    return JSON.stringify({
      systemHealth: this.getSystemHealth(),
      metrics: this.metrics.slice(-1000), // Últimas 1000 métricas
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  private getMemoryUsage(): number {
    // Estimativa simples de uso de memória
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
      return (window.performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  private cleanupMetrics(): void {
    const cutoff = Date.now() - 86400000; // 24 horas
    const originalCount = this.metrics.length;
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
    
    const removed = originalCount - this.metrics.length;
    if (removed > 0) {
      logger.info(`[MonitoringService] Cleaned up ${removed} old metrics`);
    }
  }

  // Wrapper para operações com monitoramento automático
  public async monitorOperation<T>(
    operationName: string,
    operation: () => Promise<T>,
    metadata?: any
  ): Promise<T> {
    const operationId = `${operationName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.startOperation(operationId, operationName);
    
    try {
      const result = await operation();
      this.endOperation(operationId, operationName, true, undefined, metadata);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.endOperation(operationId, operationName, false, errorMessage, metadata);
      throw error;
    }
  }
}

export default MonitoringService.getInstance();
