
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConsultantAIService from '../../../services/techcare/ConsultantAIService';
import logger from '../../../utils/logger';

// Mock dependencies
vi.mock('../../../services/techcare/NavigationService');
vi.mock('../../../services/techcare/ScrapingService');
vi.mock('../../../utils/logger', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    startOperation: vi.fn((operationName) => ({
        operationName: operationName,
        end: vi.fn(),
        error: vi.fn(),
        addData: vi.fn(),
    })),
  }
}));

describe('ConsultantAIService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    ConsultantAIService.setApiKey('fake-api-key-for-testing');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = ConsultantAIService;
    const instance2 = ConsultantAIService;
    expect(instance1).toBe(instance2);
  });

  it('should allow setting API key', () => {
    const apiKey = 'test-api-key-123';
    ConsultantAIService.setApiKey(apiKey);
    expect(ConsultantAIService).toBeDefined();
  });

  it('should allow setting model', () => {
    const model = 'gpt-4-turbo';
    ConsultantAIService.setModel(model);
    expect(ConsultantAIService).toBeDefined();
  });

  it('should fail to generate financial consulting without API key', async () => {
    ConsultantAIService.setApiKey('');

    const businessData = {
      revenue: 100000,
      expenses: 75000,
      profit: 25000
    };

    const result = await ConsultantAIService.generateFinancialConsulting(
      businessData,
      'increase profit by 10%'
    );

    expect(result.success).toBe(false);
    expect(result).toHaveProperty('error');
    expect((result as any).error).toContain('API Key não configurada');
    expect(logger.error).toHaveBeenCalledWith('[ConsultantAIService] API Key não configurada.');
  });

  it('should generate financial consulting when API key is set', async () => {
    const businessData = {
      revenue: 100000,
      expenses: 75000,
      profit: 25000
    };

    const result = await ConsultantAIService.generateFinancialConsulting(
      businessData,
      'increase profit by 10%',
      { detailed: true }
    );

    expect(result.success).toBe(true);
    expect(result).toHaveProperty('data');
    expect((result as any).data).toBeDefined();
    expect((result as any).data.summary).toBeTruthy();
    expect((result as any).data.recommendations).toBeInstanceOf(Array);
    expect(logger.startOperation).toHaveBeenCalledWith('generateFinancialConsulting');
    expect(logger.info).toHaveBeenCalled();
    
    const infoCallArgs = vi.mocked(logger.info).mock.calls;
    const hasSuccessMessage = infoCallArgs.some(args => 
      typeof args[0] === 'string' && args[0].includes('consultoria financeira')
    );
    expect(hasSuccessMessage).toBe(true);
  });

  it('should generate consultant suggestions', async () => {
    const clientId = 'client-123';
    const result = await ConsultantAIService.generateConsultantSuggestions(clientId);

    expect(result).toBeDefined();
    expect(result.recommendations).toBeInstanceOf(Array);
    expect(result.confidence).toBeDefined();
    expect(logger.startOperation).toHaveBeenCalledWith('generateConsultantSuggestions');
    
    const infoCallArgs = vi.mocked(logger.info).mock.calls;
    const hasSuccessMessage = infoCallArgs.some(args => 
      typeof args[0] === 'string' && args[0].includes('Sugestões geradas com sucesso')
    );
    expect(hasSuccessMessage).toBe(true);
  });

  it('should generate client report', async () => {
    const clientId = 'client-123';
    const result = await ConsultantAIService.generateClientReport(clientId);

    expect(result).toBeDefined();
    expect(result.summary).toBeTruthy();
    expect(result.sections).toBeInstanceOf(Array);
    expect(logger.startOperation).toHaveBeenCalledWith('generateClientReport');
    
    const infoCallArgs = vi.mocked(logger.info).mock.calls;
    const hasSuccessMessage = infoCallArgs.some(args => 
      typeof args[0] === 'string' && args[0].includes('Relatório gerado com sucesso')
    );
    expect(hasSuccessMessage).toBe(true);
  });

  it('should analyze client trends', async () => {
    const result = await ConsultantAIService.analyzeClientTrends();

    expect(result).toBeDefined();
    expect(result.trends).toBeInstanceOf(Array);
    expect(result.insights).toBeInstanceOf(Array);
    expect(logger.startOperation).toHaveBeenCalledWith('analyzeClientTrends');
    
    const infoCallArgs = vi.mocked(logger.info).mock.calls;
    const hasSuccessMessage = infoCallArgs.some(args => 
      typeof args[0] === 'string' && args[0].includes('Análise de tendências concluída')
    );
    expect(hasSuccessMessage).toBe(true);
  });

  it('should generate response suggestions', async () => {
    const clientId = 'client-123';
    const message = 'Hello, I need help with my project';
    const result = await ConsultantAIService.generateResponseSuggestions(clientId, message);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(logger.startOperation).toHaveBeenCalledWith('generateResponseSuggestions');
    
    const infoCallArgs = vi.mocked(logger.info).mock.calls;
    const hasSuccessMessage = infoCallArgs.some(args => 
      typeof args[0] === 'string' && args[0].includes('Sugestões de resposta geradas com sucesso')
    );
    expect(hasSuccessMessage).toBe(true);
  });
});
