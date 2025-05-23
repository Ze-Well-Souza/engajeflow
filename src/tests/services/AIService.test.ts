
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AIService from '../../services/techcare/AIService';

describe('AIService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = AIService;
    const instance2 = AIService;
    expect(instance1).toBe(instance2);
  });

  it('should not be configured initially', () => {
    expect(AIService.isConfigured()).toBe(false);
  });

  it('should configure correctly', () => {
    AIService.configure({
      apiKey: 'test-api-key',
      useGemini: true
    });
    
    expect(AIService.isConfigured()).toBe(true);
    expect(AIService.isUsingGemini()).toBe(true);
  });

  it('should analyze sentiment successfully', async () => {
    AIService.configure({
      apiKey: 'test-api-key',
      useGemini: true
    });
    
    const result = await AIService.analyzeSentiment('Este é um texto de teste positivo!');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.sentiment).toMatch(/positive|negative|neutral/);
    expect(typeof result.data?.score).toBe('number');
    expect(typeof result.data?.confidence).toBe('number');
    expect(Array.isArray(result.data?.keyPhrases)).toBe(true);
  });

  it('should classify ticket successfully', async () => {
    AIService.configure({
      apiKey: 'test-api-key',
      useGemini: true
    });
    
    const result = await AIService.classifyTicket('Estou com problema para fazer login');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof result.data?.category).toBe('string');
    expect(typeof result.data?.confidence).toBe('number');
  });

  it('should generate response successfully', async () => {
    AIService.configure({
      apiKey: 'test-api-key',
      useGemini: true
    });
    
    const result = await AIService.generateResponse('Gerar resposta', { context: 'Problema de login' });
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof result.data?.text).toBe('string');
    expect(Array.isArray(result.data?.variations)).toBe(true);
  });

  it('should summarize text successfully', async () => {
    AIService.configure({
      apiKey: 'test-api-key',
      useGemini: true
    });
    
    const longText = 'Este é um texto muito longo que precisa ser sumarizado. '.repeat(10);
    const result = await AIService.summarizeText(longText);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof result.data?.summary).toBe('string');
    expect(Array.isArray(result.data?.keyPoints)).toBe(true);
    expect(typeof result.data?.originalLength).toBe('number');
    expect(typeof result.data?.summaryLength).toBe('number');
  });

  it('should generate insights successfully', async () => {
    AIService.configure({
      apiKey: 'test-api-key',
      useGemini: true
    });
    
    const mockData = { tickets: 100, satisfactionRate: 85 };
    const result = await AIService.generateInsights(mockData);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    
    if (result.data && result.data.length > 0) {
      const insight = result.data[0];
      expect(typeof insight.title).toBe('string');
      expect(typeof insight.description).toBe('string');
      expect(['high', 'medium', 'low']).toContain(insight.priority);
      expect(Array.isArray(insight.recommendations)).toBe(true);
    }
  });

  it('should fail operations when not configured', async () => {
    // Reinicializar sem configuração
    const freshService = Object.create(Object.getPrototypeOf(AIService));
    Object.setPrototypeOf(freshService, Object.getPrototypeOf(AIService));
    freshService.apiKey = null;
    
    const result = await freshService.analyzeSentiment('teste');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Serviço de IA não configurado');
  });
});
