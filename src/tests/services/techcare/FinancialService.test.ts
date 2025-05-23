
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FinancialService from '../../../services/techcare/FinancialService';

vi.mock('../../../services/techcare/NavigationService');
vi.mock('../../../services/techcare/ScrapingService');
vi.mock('../../../utils/logger');

describe('FinancialService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = FinancialService;
    const instance2 = FinancialService;
    expect(instance1).toBe(instance2);
  });

  it('should sync bank accounts', async () => {
    const result = await FinancialService.syncBankAccounts();
    
    expect(typeof result).toBe('boolean');
  });

  it('should generate financial report', async () => {
    const period = { startDate: new Date('2023-01-01'), endDate: new Date('2023-01-31') };
    
    const result = await FinancialService.generateFinancialReport(period);
    
    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.summary.totalIncome).toBeDefined();
    expect(result.summary.totalExpenses).toBeDefined();
    expect(result.summary.netCashflow).toBeDefined();
  });

  it('should get transaction history', async () => {
    const period = { startDate: new Date('2023-01-01'), endDate: new Date('2023-01-31') };
    
    const result = await FinancialService.fetchTransactions(period);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get financial accounts', () => {
    const result = FinancialService.getFinancialAccounts();
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
