
/**
 * Métricas específicas para testes do sistema
 */

import metrics from './index';
import { collectDefaultMetrics, register } from 'prom-client';

// Configurar métricas padrão
collectDefaultMetrics({ prefix: 'test_' });

// Logger para métricas de teste
import logger from '../logger';
const testMetricsLogger = logger.withContext('TestMetrics');

// Métricas de teste
const testCounter = metrics.counter('test_counter', 'Contador de testes', ['test_type']);
const testGauge = metrics.gauge('test_gauge', 'Gauge de testes', ['component']);
const testHistogram = metrics.histogram('test_duration', 'Duração de testes', ['test_case'], [0.01, 0.1, 0.5, 1, 2, 5]);

// Funções auxiliares para registrar métricas de teste
export const incrementTestCount = (type: string, amount = 1): void => {
  testCounter.inc({ service: 'test_service', endpoint: 'test', test_type: type }, amount);
  testMetricsLogger.info(`Teste incrementado: ${type} (${amount})`);
};

export const setTestValue = (component: string, value: number): void => {
  testGauge.set({ service: 'test_service', endpoint: 'test', component }, value);
  testMetricsLogger.info(`Valor do teste definido: ${component} = ${value}`);
};

export const recordTestDuration = (testCase: string, durationSeconds: number): void => {
  testHistogram.observe({ service: 'test_service', endpoint: 'test', test_case: testCase }, durationSeconds);
  testMetricsLogger.info(`Duração do teste registrada: ${testCase} = ${durationSeconds}s`);
};

// Funções para gerar métricas simuladas para testes
export const generateTestMetrics = async (count = 10): Promise<void> => {
  testMetricsLogger.info(`Gerando ${count} métricas de teste`);
  
  const testTypes = ['unit', 'integration', 'e2e', 'performance'];
  const components = ['api', 'database', 'frontend', 'cache'];
  const testCases = ['login', 'checkout', 'search', 'profile_update'];
  
  for (let i = 0; i < count; i++) {
    const testType = testTypes[Math.floor(Math.random() * testTypes.length)];
    const component = components[Math.floor(Math.random() * components.length)];
    const testCase = testCases[Math.floor(Math.random() * testCases.length)];
    
    incrementTestCount(testType);
    setTestValue(component, Math.random() * 100);
    recordTestDuration(testCase, Math.random() * 5);
    
    // Simular delay para distribuir métricas no tempo
    await new Promise(resolve => setTimeout(resolve, 10));
  }
};

// Função para coletar métricas para testes
export const getTestMetricsSnapshot = async (): Promise<string> => {
  return await register.metrics();
};

// Função para limpar métricas de teste
export const resetTestMetrics = (): void => {
  register.clear();
  testMetricsLogger.info('Métricas de teste resetadas');
};

export default {
  incrementTestCount,
  setTestValue,
  recordTestDuration,
  generateTestMetrics,
  getTestMetricsSnapshot,
  resetTestMetrics
};
