
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConsultantAIService from '../../../services/techcare/ConsultantAIService';
import logger from '../../../utils/logger'; // Import logger

// Mock dependencies
vi.mock('../../../services/techcare/NavigationService');
vi.mock('../../../services/techcare/ScrapingService');
// Update logger mock to be consistent and include startOperation
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
    // Add other methods if ConsultantAIService uses them
  }
}));

describe('ConsultantAIService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Ensure API key is set for tests that need it, or mock the check
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
    // No direct assertion needed, just ensures the method exists and doesn't throw
    expect(ConsultantAIService).toBeDefined();
  });

  it('should allow setting model', () => {
    const model = 'gpt-4-turbo';
    ConsultantAIService.setModel(model);
    expect(ConsultantAIService).toBeDefined();
  });

  it('should fail to generate financial consulting without API key', async () => {
    ConsultantAIService.setApiKey(''); // Explicitly unset for this test

    const businessData = {
      revenue: 100000,
      expenses: 75000,
      profit: 25000
    };

    // Mock the internal call if it relies on external API
    // For now, assume the internal check works
    const result = await ConsultantAIService.generateFinancialConsulting(
      businessData,
      'increase profit by 10%'
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain('API Key não configurada');
    // Adjust assertion based on actual implementation logging
    expect(logger.error).toHaveBeenCalledWith('[ConsultantAIService] API Key não configurada.');
  });

  it('should generate financial consulting when API key is set', async () => {
    // API key set in beforeEach
    const businessData = {
      revenue: 100000,
      expenses: 75000,
      profit: 25000
    };

    // Mock the actual API call if it makes one
    // For now, assume the service returns mock data or the internal logic is tested
    const result = await ConsultantAIService.generateFinancialConsulting(
      businessData,
      'increase profit by 10%',
      { detailed: true }
    );

    // Basic assertions based on the current implementation (likely mock/simulated)
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.summary).toBeTruthy();
    expect(result.data?.recommendations).toBeInstanceOf(Array);
    // Check if logger was called appropriately
    expect(logger.startOperation).toHaveBeenCalledWith('generateFinancialConsulting');
    // Adjust assertion based on actual logs
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Consultoria financeira gerada com sucesso'));
  });

  it('should generate consultant suggestions', async () => {
    const clientId = 'client-123';
    // Assume service returns mock data
    const result = await ConsultantAIService.generateConsultantSuggestions(clientId);

    expect(result).toBeDefined();
    expect(result.recommendations).toBeInstanceOf(Array);
    expect(result.confidence).toBeDefined();
    expect(logger.startOperation).toHaveBeenCalledWith('generateConsultantSuggestions');
    // Adjust assertion based on actual logs
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Sugestões geradas com sucesso'));
  });

  it('should generate client report', async () => {
    const clientId = 'client-123';
    // Assume service returns mock data
    const result = await ConsultantAIService.generateClientReport(clientId);

    expect(result).toBeDefined();
    expect(result.summary).toBeTruthy();
    expect(result.sections).toBeInstanceOf(Array);
    expect(logger.startOperation).toHaveBeenCalledWith('generateClientReport');
    // Adjust assertion based on actual logs
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Relatório gerado com sucesso'));
  });

  it('should analyze client trends', async () => {
    // Assume service returns mock data
    const result = await ConsultantAIService.analyzeClientTrends();

    expect(result).toBeDefined();
    expect(result.trends).toBeInstanceOf(Array);
    expect(result.insights).toBeInstanceOf(Array);
    expect(logger.startOperation).toHaveBeenCalledWith('analyzeClientTrends');
    // Adjust assertion based on actual logs
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Análise de tendências concluída com sucesso'));
  });

  it('should generate response suggestions', async () => {
    const clientId = 'client-123';
    const message = 'Hello, I need help with my project';
    // Assume service returns mock data
    const result = await ConsultantAIService.generateResponseSuggestions(clientId, message);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(logger.startOperation).toHaveBeenCalledWith('generateResponseSuggestions');
    // Adjust assertion based on actual logs
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Sugestões de resposta geradas com sucesso'));
  });
});

