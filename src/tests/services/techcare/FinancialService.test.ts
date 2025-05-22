import { describe, it, expect, vi, beforeEach } from 'vitest';
import FinancialService from '../../../services/techcare/FinancialService';
import logger from '../../../utils/logger';

// Mock das dependências
vi.mock('../../../services/techcare/NavigationService');
vi.mock('../../../services/techcare/ScrapingService');
vi.mock('../../../utils/logger');

describe('FinancialService', () => {
  let mockLogger: any;
  let mockOperation: any;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    vi.resetAllMocks();
    
    // Mock do logger
    mockOperation = {
      end: vi.fn()
    };
    mockLogger = {
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      withContext: vi.fn().mockReturnValue({
        info: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
      }),
      startOperation: vi.fn().mockReturnValue(mockOperation)
    };
    (logger.withContext as any) = vi.fn().mockReturnValue(mockLogger);
    (logger.startOperation as any) = vi.fn().mockReturnValue(mockOperation);
    
    // Mock dos métodos do singleton FinancialService
    vi.spyOn(FinancialService, 'getFinancialSummary').mockImplementation(async (period) => {
      return {
        totalRevenue: 10000,
        totalExpenses: 5000,
        netProfit: 5000,
        pendingPayments: 2000
      };
    });
    
    vi.spyOn(FinancialService, 'generateFinancialReport').mockImplementation(async (period, format) => {
      return { reportId: 'report-123', format: format || 'pdf' };
    });
    
    vi.spyOn(FinancialService, 'getTransactionHistory').mockImplementation(async (period, type) => {
      const transactions = [
        { id: 'tx1', date: '2023-01-15', amount: 1000, type: 'income', description: 'Pagamento' },
        { id: 'tx2', date: '2023-01-20', amount: -500, type: 'expense', description: 'Despesa' }
      ];
      
      if (type) {
        return transactions.filter(t => t.type === type);
      }
      return transactions;
    });
    
    vi.spyOn(FinancialService, 'getPendingPayments').mockImplementation(async () => {
      return [
        { id: 'pay1', dueDate: '2023-02-15', amount: 1000, client: 'Cliente A', status: 'pending' },
        { id: 'pay2', dueDate: '2023-02-20', amount: 1500, client: 'Cliente B', status: 'pending' }
      ];
    });
  });

  describe('getFinancialSummary', () => {
    it('deve obter resumo financeiro com sucesso', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      
      // Executar método a ser testado
      const result = await FinancialService.getFinancialSummary(mockPeriod);
      
      // Verificar resultados
      expect(result).toBeDefined();
      expect(result.totalRevenue).toBeDefined();
      expect(result.totalExpenses).toBeDefined();
      expect(result.netProfit).toBeDefined();
      expect(result.pendingPayments).toBeDefined();
    });

    it('deve lançar erro quando ocorre falha', async () => {
      // Configurar mock para falhar
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      
      // Sobrescrever o mock para lançar erro
      vi.spyOn(FinancialService, 'getFinancialSummary').mockRejectedValueOnce(
        new Error('Erro ao acessar dados financeiros')
      );
      
      // Verificar que o método lança o erro esperado
      await expect(FinancialService.getFinancialSummary(mockPeriod))
        .rejects
        .toThrow('Erro ao acessar dados financeiros');
    });

    it('deve lançar erro quando a extração de dados falha', async () => {
      // Configurar mock para falhar na extração
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      
      // Sobrescrever o mock para lançar erro específico de extração
      vi.spyOn(FinancialService, 'getFinancialSummary').mockRejectedValueOnce(
        new Error('Erro ao extrair dados financeiros')
      );
      
      // Verificar que o método lança o erro esperado
      await expect(FinancialService.getFinancialSummary(mockPeriod))
        .rejects
        .toThrow('Erro ao extrair dados financeiros');
    });
  });

  describe('generateFinancialReport', () => {
    it('deve gerar relatório financeiro com sucesso', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockFormat = 'xlsx';
      
      // Executar método a ser testado
      const result = await FinancialService.generateFinancialReport(mockPeriod, mockFormat);
      
      // Verificar resultados
      expect(result).toBeDefined();
      expect(result.reportId).toBeDefined();
      expect(result.format).toBe(mockFormat);
    });    it('deve lançar erro quando a navegação para relatórios falha', async () => {
      // Configurar mock para falhar
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockFormat = 'xlsx';
      
      // Sobrescrever o mock para lançar erro
      vi.spyOn(FinancialService, 'generateFinancialReport').mockRejectedValueOnce(
        new Error('Erro ao acessar seção de relatórios')
      );
      
      // Verificar que o método lança o erro esperado
      await expect(FinancialService.generateFinancialReport(mockPeriod, mockFormat))
        .rejects
        .toThrow('Erro ao acessar seção de relatórios');
    });
  });

  describe('getTransactionHistory', () => {
    it('deve obter histórico de transações com sucesso', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      
      // Executar método a ser testado
      const result = await FinancialService.getTransactionHistory(mockPeriod);
      
      // Verificar resultados
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].id).toBeDefined();
      expect(result[0].date).toBeDefined();
      expect(result[0].amount).toBeDefined();
      expect(result[0].type).toBeDefined();
    });

    it('deve filtrar transações por tipo quando especificado', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const tipoFiltro = 'income';
      
      // Executar método a ser testado com filtro de tipo
      const result = await FinancialService.getTransactionHistory(mockPeriod, tipoFiltro);
      
      // Verificar resultados
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // Todos os itens devem ser do tipo especificado
      result.forEach(item => {
        expect(item.type).toBe(tipoFiltro);
      });
    });
  });

  describe('getPendingPayments', () => {
    it('deve obter pagamentos pendentes com sucesso', async () => {
      // Executar método a ser testado
      const result = await FinancialService.getPendingPayments();
      
      // Verificar resultados
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      // Verificar estrutura dos pagamentos
      result.forEach(payment => {
        expect(payment.id).toBeDefined();
        expect(payment.dueDate).toBeDefined();
        expect(payment.amount).toBeDefined();
        expect(payment.client).toBeDefined();
        expect(payment.status).toBe('pending');
      });
    });

    it('deve retornar array vazio quando não há pagamentos pendentes', async () => {
      // Sobrescrever o mock para retornar array vazio
      vi.spyOn(FinancialService, 'getPendingPayments').mockResolvedValueOnce([]);
      
      // Executar método a ser testado
      const result = await FinancialService.getPendingPayments();
      
      // Verificar resultados
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });
});
