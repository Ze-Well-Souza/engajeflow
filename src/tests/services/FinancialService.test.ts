
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FinancialService from '../../services/techcare/FinancialService';

describe('FinancialService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should be defined', () => {
    expect(FinancialService).toBeDefined();
  });

  it('should have required methods', () => {
    expect(typeof FinancialService.getTransactions).toBe('function');
    expect(typeof FinancialService.getBalance).toBe('function');
    expect(typeof FinancialService.generateReport).toBe('function');
  });

  describe('getTransactions', () => {
    it('should return transactions with default period', async () => {
      const transactions = await FinancialService.getTransactions();
      expect(Array.isArray(transactions)).toBe(true);
    });

    it('should accept period parameter', async () => {
      const transactions = await FinancialService.getTransactions('monthly');
      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  describe('getBalance', () => {
    it('should return balance data', async () => {
      const balance = await FinancialService.getBalance();
      expect(balance).toBeDefined();
      expect(typeof balance.total).toBe('number');
    });
  });

  describe('generateReport', () => {
    it('should generate financial report', async () => {
      const report = await FinancialService.generateReport();
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
    });
  });
});
