
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

// Disponibilizar mock globalmente para ser acessível pelo FinancialService
(window as any).AuthServiceMock = AuthService;

// Mock de NavigationService
vi.mock('../../services/techcare/NavigationService', () => ({
  default: {
    navigateTo: vi.fn().mockResolvedValue({ success: true })
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

  it('should get cash flow successfully when authenticated', async () => {
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-31');
    
    const result = await FinancialService.getCashFlow(startDate, endDate);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.period).toBeDefined();
    expect(result.data.summary).toBeDefined();
  });

  it('should fail when trying to get financial data without authentication', async () => {
    mockAuthIsAuthenticated.mockReturnValue(false);
    
    const result = await FinancialService.getAccountsReceivable();
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('Não autenticado');
  });

  it('should get accounts receivable with specific status', async () => {
    const result = await FinancialService.getAccountsReceivable('open');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    
    if (result.data.length > 0) {
      expect(result.data[0].status).toBe('open');
    }
  });

  it('should get accounts payable', async () => {
    const result = await FinancialService.getAccountsPayable();
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should get financial reports', async () => {
    const result = await FinancialService.getFinancialReport('income', 'monthly');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.title).toContain('Relatório Financeiro');
  });

  it('should register payment', async () => {
    const result = await FinancialService.registerPayment('INV-1001', 1500.75, 'Transferência Bancária');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.invoiceId).toBe('INV-1001');
    expect(result.data.amountPaid).toBe(1500.75);
    expect(result.data.method).toBe('Transferência Bancária');
    expect(result.data.receiptId).toBeDefined();
  });

  it('should export financial data', async () => {
    const result = await FinancialService.exportFinancialData('cash-flow', 'last-quarter', 'csv');
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.type).toBe('cash-flow');
    expect(result.data.format).toBe('csv');
    expect(result.data.url).toBeDefined();
  });
});
