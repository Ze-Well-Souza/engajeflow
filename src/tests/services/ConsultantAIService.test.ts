
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConsultantAIService from '../../services/techcare/ConsultantAIService';

vi.mock('../../utils/logger', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    withContext: vi.fn().mockReturnValue({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    }),
    startOperation: vi.fn().mockReturnValue({
      end: vi.fn()
    })
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
    expect(result.error).toContain('API Key não configurada');
  });

  it('should generate financial consulting when API key is set', async () => {
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

  it('should generate consultant suggestions', async () => {
    const clientId = 'client-123';
    
    const result = await ConsultantAIService.generateConsultantSuggestions(clientId);
    
    expect(result).toBeDefined();
    expect(result.recommendations).toBeInstanceOf(Array);
    expect(result.confidence).toBeDefined();
  });

  it('should generate client report', async () => {
    const clientId = 'client-123';
    
    const result = await ConsultantAIService.generateClientReport(clientId);
    
    expect(result).toBeDefined();
    expect(result.summary).toBeTruthy();
    expect(result.sections).toBeInstanceOf(Array);
  });

  it('should handle circuit breaker exceptions', async () => {
    const originalMethod = Object.getPrototypeOf(ConsultantAIService)['generateConsultantSuggestions'];
    
    Object.getPrototypeOf(ConsultantAIService)['generateConsultantSuggestions'] = vi.fn().mockRejectedValue(
      new Error('Circuit Breaker is open')
    );
    
    await expect(ConsultantAIService.generateConsultantSuggestions('client-123'))
      .rejects
      .toThrow('Circuit Breaker is open');
    
    Object.getPrototypeOf(ConsultantAIService)['generateConsultantSuggestions'] = originalMethod;
  });
});
