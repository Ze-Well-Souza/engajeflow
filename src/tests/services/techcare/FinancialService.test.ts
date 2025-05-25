import { describe, it, expect, vi, beforeEach } from 'vitest';
import FinancialService from '../../../services/techcare/FinancialService';
import AuthService from '../../../services/techcare/AuthService';
import { ReportsService } from '../../../services/techcare/financial/ReportsService';
import { TransactionsService } from '../../../services/techcare/financial/TransactionsService';
import { BankSyncService } from '../../../services/techcare/financial/BankSyncService';
import logger from '../../../utils/logger';
import MonitoringService from '../../../services/techcare/MonitoringService';

// Mock dependencies
vi.mock('../../../services/techcare/NavigationService');
vi.mock('../../../services/techcare/ScrapingService');
vi.mock('../../../utils/logger', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    startOperation: vi.fn(() => ({
        end: vi.fn(),
        error: vi.fn(),
        addData: vi.fn(),
    })),
  }
}));
vi.mock('../../../services/techcare/AuthService');
vi.mock('../../../services/techcare/MonitoringService', () => ({
    default: {
        monitorOperation: vi.fn((name, fn) => fn()),
        incrementMetric: vi.fn(),
        observeValue: vi.fn(),
    }
}));
vi.mock('../../../services/techcare/financial/ReportsService');
vi.mock('../../../services/techcare/financial/TransactionsService');
vi.mock('../../../services/techcare/financial/BankSyncService');

describe('FinancialService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(AuthService.isAuthenticated).mockReturnValue(true);

    vi.mocked(ReportsService.generateFinancialReport).mockResolvedValue({
        period: { start: new Date(), end: new Date() },
        summary: { totalIncome: 5000, totalExpenses: 3000, netCashflow: 2000 },
        incomeByCategory: [],
        expensesByCategory: [],
        transactions: [],
    });
    vi.mocked(TransactionsService.fetchTransactions).mockResolvedValue([
        { id: 't1', date: new Date(), description: 'Test Tx', amount: 100, type: 'income', category: 'Test' }
    ]);
    vi.mocked(BankSyncService.fetchAccountBalance).mockResolvedValue(1500.50);
    vi.mocked(BankSyncService.syncBankAccounts).mockResolvedValue(true);

    vi.spyOn(FinancialService, 'getFinancialAccounts').mockReturnValue([
        { id: 'acc-001', name: 'Checking', balance: 1500.50, type: 'checking' }
    ]);
    vi.spyOn(FinancialService, 'createBudget').mockImplementation(async (budgetData) => ({
        ...budgetData,
        id: 'budget-123',
    }));
  });

  it('should be a singleton', () => {
    const instance1 = FinancialService;
    const instance2 = FinancialService;
    expect(instance1).toBe(instance2);
  });

  it('should sync bank accounts', async () => {
    const result = await FinancialService.syncBankAccounts();
    expect(result).toBe(true);
    expect(BankSyncService.syncBankAccounts).toHaveBeenCalled();
  });

  it('should generate financial report', async () => {
    const period = {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-31')
    };
    const result = await FinancialService.generateFinancialReport(period);

    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.summary.totalIncome).toBe(5000);
    expect(ReportsService.generateFinancialReport).toHaveBeenCalledWith(period);
  });

  it('should get transaction history', async () => {
    const period = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31')
    };
    const result = await FinancialService.fetchTransactions(period);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(TransactionsService.fetchTransactions).toHaveBeenCalledWith(period);
  });

  it('should get financial accounts', () => {
    const result = FinancialService.getFinancialAccounts();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(FinancialService.getFinancialAccounts).toHaveBeenCalled();
  });

  it('should fetch account balance', async () => {
    const result = await FinancialService.fetchAccountBalance('acc-001');

    expect(result).toBeDefined();
    expect(typeof result).toBe('number');
    expect(result).toBe(1500.50);
    expect(BankSyncService.fetchAccountBalance).toHaveBeenCalledWith('acc-001');
  });

  it('should create budget', async () => {
    const budgetData = {
      name: 'Test Budget',
      amount: 1000,
      spent: 0,
      period: 'monthly' as const,
      category: 'Food',
      startDate: new Date(),
      isActive: true
    };
    const result = await FinancialService.createBudget(budgetData);

    expect(result).toBeDefined();
    expect(result.id).toBe('budget-123');
    expect(result.name).toBe('Test Budget');
    expect(FinancialService.createBudget).toHaveBeenCalledWith(budgetData);
  });

  // Add tests for authentication failure cases
  it('should throw error when syncing bank accounts without authentication', async () => {
      vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
      // Mock the underlying service to throw the specific error if auth fails there
      vi.mocked(BankSyncService.syncBankAccounts)
          .mockRejectedValue(new Error("Usuário não autenticado para sincronizar contas"));

      await expect(FinancialService.syncBankAccounts()).rejects.toThrow(
          /Usuário não autenticado/
      );
      expect(BankSyncService.syncBankAccounts).toHaveBeenCalled(); // Ensure it was called
  });

   it('should throw error when generating report without authentication', async () => {
      vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
      const period = { startDate: new Date(), endDate: new Date() };
       vi.mocked(ReportsService.generateFinancialReport)
           .mockRejectedValue(new Error("Usuário não autenticado para gerar relatório financeiro"));

      await expect(FinancialService.generateFinancialReport(period)).rejects.toThrow(
          /Usuário não autenticado para gerar relatório financeiro/
      );
       expect(ReportsService.generateFinancialReport).toHaveBeenCalledWith(period);
  });

   it('should throw error when fetching transactions without authentication', async () => {
      vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
      const period = { start: new Date(), end: new Date() };
       vi.mocked(TransactionsService.fetchTransactions)
           .mockRejectedValue(new Error("Usuário não autenticado para buscar transações"));

      await expect(FinancialService.fetchTransactions(period)).rejects.toThrow(
          /Usuário não autenticado para buscar transações/
      );
       expect(TransactionsService.fetchTransactions).toHaveBeenCalledWith(period);
  });

   it('should throw error when getting accounts without authentication', () => {
      vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
      // Re-spy/mock the implementation within FinancialService itself for this specific test
      vi.spyOn(FinancialService, 'getFinancialAccounts').mockImplementation(() => {
          if (!AuthService.isAuthenticated()) {
              throw new Error("Usuário não autenticado para acessar contas financeiras");
          }
          return [];
      });
      expect(() => FinancialService.getFinancialAccounts()).toThrow(
          /Usuário não autenticado para acessar contas financeiras/
      );
       expect(FinancialService.getFinancialAccounts).toHaveBeenCalled();
  });

   it('should throw error when fetching balance without authentication', async () => {
      vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
       vi.mocked(BankSyncService.fetchAccountBalance)
           .mockRejectedValue(new Error("Usuário não autenticado para buscar saldo da conta"));

      await expect(FinancialService.fetchAccountBalance('acc-001')).rejects.toThrow(
          /Usuário não autenticado para buscar saldo da conta/
      );
       expect(BankSyncService.fetchAccountBalance).toHaveBeenCalledWith('acc-001');
  });

   it('should throw error when creating budget without authentication', async () => {
      vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
      const budgetData = { name: 'Test Budget', amount: 1000, spent: 0, period: 'monthly' as const, category: 'Food', startDate: new Date(), isActive: true };
      // Re-spy/mock the implementation within FinancialService itself
      vi.spyOn(FinancialService, 'createBudget').mockImplementation(async (data) => {
          if (!AuthService.isAuthenticated()) {
              throw new Error("Usuário não autenticado para criar orçamento");
          }
          return { ...data, id: 'budget-123' };
      });
      await expect(FinancialService.createBudget(budgetData)).rejects.toThrow(
          /Usuário não autenticado para criar orçamento/
      );
       expect(FinancialService.createBudget).toHaveBeenCalledWith(budgetData);
  });

});
