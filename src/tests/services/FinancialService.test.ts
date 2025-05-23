
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FinancialService from '../../services/techcare/FinancialService';
import AuthService from '../../services/techcare/AuthService';

// Mock de AuthService
vi.mock('../../services/techcare/AuthService', () => ({
  default: {
    isAuthenticated: vi.fn(),
    getToken: vi.fn()
  }
}));

// Mock de NavigationService
vi.mock('../../services/techcare/NavigationService', () => ({
  default: {
    navigateToUrl: vi.fn().mockResolvedValue()
  }
}));

describe('FinancialService', () => {
  const mockAuthIsAuthenticated = vi.mocked(AuthService.isAuthenticated);
  
  beforeEach(() => {
    vi.resetAllMocks();
    mockAuthIsAuthenticated.mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = FinancialService;
    const instance2 = FinancialService;
    expect(instance1).toBe(instance2);
  });

  it('should get financial summary successfully when authenticated', async () => {
    const period = { startDate: new Date('2025-01-01'), endDate: new Date('2025-01-31') };
    
    const result = await FinancialService.getFinancialSummary(period);
    
    expect(result).toBeDefined();
    expect(result.totalRevenue).toBeDefined();
    expect(result.totalExpenses).toBeDefined();
    expect(result.netProfit).toBeDefined();
  });

  it('should generate financial report', async () => {
    const period = { startDate: new Date('2025-01-01'), endDate: new Date('2025-01-31') };
    
    const result = await FinancialService.generateFinancialReport(period);
    
    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.data).toBeDefined();
  });

  it('should get transaction history', async () => {
    const period = { startDate: new Date('2025-01-01'), endDate: new Date('2025-01-31') };
    
    const result = await FinancialService.getTransactions(period);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get pending payments', async () => {
    const result = await FinancialService.getPendingPayments();
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
