
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ConsultantAIService from '../../services/techcare/ConsultantAIService';

describe('ConsultantAIService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Configurar serviço com uma chave mock
    ConsultantAIService.setApiKey('mock-api-key-1234');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = ConsultantAIService;
    const instance2 = ConsultantAIService;
    expect(instance1).toBe(instance2);
  });

  it('should check if service is configured', () => {
    expect(ConsultantAIService.isConfigured()).toBe(true);
    
    // Reset API key
    ConsultantAIService.setApiKey('');
    expect(ConsultantAIService.isConfigured()).toBe(false);
    
    // Restore API key for other tests
    ConsultantAIService.setApiKey('mock-api-key-1234');
  });

  it('should fail when generating consulting without API key', async () => {
    ConsultantAIService.setApiKey('');
    
    const result = await ConsultantAIService.generateFinancialConsulting(
      { revenue: 100000, expenses: 80000 }, 
      'increase profitability'
    );
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('não configurado');
  });

  it('should generate financial consulting', async () => {
    const businessData = {
      revenue: 500000,
      expenses: 420000,
      profit: 80000,
      industry: 'technology',
      employees: 15
    };
    
    const result = await ConsultantAIService.generateFinancialConsulting(
      businessData, 
      'increase profitability by 20%'
    );
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.summary).toBeDefined();
    expect(result.data.recommendations).toBeDefined();
    expect(Array.isArray(result.data.recommendations)).toBe(true);
  });

  it('should generate marketing consulting', async () => {
    const businessData = {
      currentChannels: ['social media', 'email', 'seo'],
      budget: 50000,
      targetAudience: 'small businesses',
      conversionRate: 2.4
    };
    
    const result = await ConsultantAIService.generateMarketingConsulting(
      businessData, 
      'improve conversion rates',
      { detailed: true }
    );
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.summary).toBeDefined();
    expect(result.data.recommendations).toBeDefined();
    expect(result.data.channels).toBeDefined();
  });

  it('should generate sales consulting', async () => {
    const businessData = {
      salesTeam: 5,
      averageDealSize: 15000,
      salesCycle: 45,
      closingRate: 15,
      leads: 100
    };
    
    const result = await ConsultantAIService.generateSalesConsulting(
      businessData, 
      'reduce sales cycle length'
    );
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.summary).toBeDefined();
    expect(result.data.recommendations).toBeDefined();
    expect(result.data.salesFunnel).toBeDefined();
  });

  it('should generate operations consulting', async () => {
    const businessData = {
      currentProcesses: ['order processing', 'fulfillment', 'shipping'],
      averageDeliveryTime: 5,
      errorRate: 8,
      warehouseCapacity: '5000 sqft'
    };
    
    const result = await ConsultantAIService.generateOperationsConsulting(
      businessData, 
      'optimize warehouse processes'
    );
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.summary).toBeDefined();
    expect(result.data.recommendations).toBeDefined();
    expect(result.data.processMapping).toBeDefined();
  });

  it('should generate customer service consulting', async () => {
    const businessData = {
      channels: ['phone', 'email', 'chat'],
      averageResponseTime: 12,
      customerSatisfaction: 7.2,
      ticketsPerDay: 45,
      resolutionRate: 85
    };
    
    const result = await ConsultantAIService.generateCustomerServiceConsulting(
      businessData, 
      'improve customer satisfaction'
    );
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.summary).toBeDefined();
    expect(result.data.recommendations).toBeDefined();
    expect(result.data.metrics).toBeDefined();
  });
});
