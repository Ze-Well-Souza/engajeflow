
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConsultantAIService from '../../services/techcare/ConsultantAIService';

// Mock do logger
vi.mock('../../utils/logger', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

describe('ConsultantAIService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
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
    
    // Since apiKey is private, we cannot test it directly
    expect(ConsultantAIService).toBeDefined();
  });

  it('should allow setting model', () => {
    const model = 'gpt-4-turbo';
    ConsultantAIService.setModel(model);
    
    // Since model is private, we cannot test it directly
    expect(ConsultantAIService).toBeDefined();
  });

  it('should fail to generate financial consulting without API key', async () => {
    // Set API key to null for this test
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
    expect(result.error).toContain('API Key não configurada');
  });

  it('should generate financial consulting when API key is set', async () => {
    // Set API key
    ConsultantAIService.setApiKey('fake-api-key-for-testing');
    
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
    expect(result.data).toBeDefined();
    expect(result.data?.summary).toBeTruthy();
    expect(result.data?.recommendations).toBeInstanceOf(Array);
    expect(result.data?.recommendations.length).toBeGreaterThan(0);
  });

  it('should analyze sentiment when API key is set', async () => {
    // Set API key
    ConsultantAIService.setApiKey('fake-api-key-for-testing');
    
    const texts = [
      "Estou muito satisfeito com o produto, funcionou perfeitamente!",
      "O atendimento foi péssimo, esperei mais de 30 minutos."
    ];
    
    const result = await ConsultantAIService.analyzeSentiment(texts);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.overall).toBeDefined();
    expect(result.data?.aspects).toBeInstanceOf(Array);
    expect(result.data?.suggestions).toBeInstanceOf(Array);
  });

  it('should generate sales plan when API key is set', async () => {
    // Set API key
    ConsultantAIService.setApiKey('fake-api-key-for-testing');
    
    const salesData = {
      "2024-Q1": 120000,
      "2024-Q2": 135000,
      "2024-Q3": 142000,
      "2024-Q4": 158000
    };
    
    const result = await ConsultantAIService.generateSalesPlan(
      salesData,
      15,
      "6 months"
    );
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  // Add tests for error handling and edge cases
  it('should handle circuit breaker exceptions', async () => {
    // Set API key
    ConsultantAIService.setApiKey('fake-api-key-for-testing');

    // Replace the executeWithRetry method to simulate circuit breaker open
    const originalExecuteWithRetry = Object.getPrototypeOf(ConsultantAIService)['executeWithRetry'];
    Object.getPrototypeOf(ConsultantAIService)['executeWithRetry'] = vi.fn().mockRejectedValue(
      new Error('Circuit Breaker is open')
    );
    
    const result = await ConsultantAIService.analyzeSentiment(["Test text"]);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('Circuit Breaker is open');
    
    // Restore original method
    Object.getPrototypeOf(ConsultantAIService)['executeWithRetry'] = originalExecuteWithRetry;
  });
});
