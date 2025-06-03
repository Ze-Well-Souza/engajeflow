
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
    expect(typeof FinancialService.fetchTransactions).toBe('function');
    expect(typeof FinancialService.fetchAccountBalance).toBe('function');
    expect(typeof FinancialService.generateFinancialReport).toBe('function');
  });

  describe('fetchTransactions', () => {
    it('should return transactions with default period', async () => {
      const period = { start: new Date(), end: new Date() };
      const transactions = await FinancialService.fetchTransactions(period);
      expect(Array.isArray(transactions)).toBe(true);
    });

    it('should accept period parameter', async () => {
      const period = { start: new Date('2023-01-01'), end: new Date('2023-01-31') };
      const transactions = await FinancialService.fetchTransactions(period);
      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  describe('fetchAccountBalance', () => {
    it('should return balance data', async () => {
      const balance = await FinancialService.fetchAccountBalance('test-account');
      expect(typeof balance).toBe('number');
    });
  });

  describe('generateFinancialReport', () => {
    it('should generate financial report', async () => {
      const period = { startDate: new Date(), endDate: new Date() };
      const report = await FinancialService.generateFinancialReport(period);
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
    });
  });
});
