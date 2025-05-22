import { FinancialService } from '../../../services/techcare/FinancialService';
import { NavigationService } from '../../../services/techcare/NavigationService';
import { ScrapingService } from '../../../services/techcare/ScrapingService';
import logger from '../../../utils/logger';

// Mock das dependências
jest.mock('../../../services/techcare/NavigationService');
jest.mock('../../../services/techcare/ScrapingService');
jest.mock('../../../utils/logger');

describe('FinancialService', () => {
  let financialService: FinancialService;
  let mockNavigationService: jest.Mocked<NavigationService>;
  let mockScrapingService: jest.Mocked<ScrapingService>;
  let mockLogger: any;
  let mockOperation: any;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    
    // Criar instâncias mockadas
    mockNavigationService = new NavigationService() as jest.Mocked<NavigationService>;
    mockScrapingService = new ScrapingService() as jest.Mocked<ScrapingService>;
    
    // Mock do logger
    mockOperation = {
      end: jest.fn()
    };
    mockLogger = {
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      withContext: jest.fn().mockReturnValue({
        info: jest.fn(),
        debug: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
      }),
      startOperation: jest.fn().mockReturnValue(mockOperation)
    };
    (logger.withContext as jest.Mock).mockReturnValue(mockLogger);
    (logger.startOperation as jest.Mock).mockReturnValue(mockOperation);
    
    // Criar instância do serviço a ser testado com as dependências mockadas
    financialService = new FinancialService(
      mockNavigationService,
      mockScrapingService
    );
  });

  describe('getFinancialSummary', () => {
    it('deve navegar para a seção financeira e extrair o resumo financeiro', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockSummary = {
        totalRevenue: 10000,
        totalExpenses: 5000,
        netProfit: 5000,
        pendingPayments: 2000
      };
      
      mockNavigationService.goToFinancial.mockResolvedValue();
      mockScrapingService.extractFinancialData.mockResolvedValue(mockSummary);
      
      // Executar método a ser testado
      const result = await financialService.getFinancialSummary(mockPeriod);
      
      // Verificar resultados
      expect(mockNavigationService.goToFinancial).toHaveBeenCalledTimes(1);
      expect(mockScrapingService.extractFinancialData).toHaveBeenCalledWith(mockPeriod);
      expect(result).toEqual(mockSummary);
      
      // Verificar logs
      expect(logger.startOperation).toHaveBeenCalledWith('getFinancialSummary');
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Obtendo resumo financeiro'),
        expect.objectContaining({ period: mockPeriod })
      );
      expect(mockOperation.end).toHaveBeenCalledWith('success', expect.any(Object));
    });

    it('deve lançar erro quando a navegação falha', async () => {
      // Configurar mock para falhar
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockError = new Error('Falha na navegação');
      
      mockNavigationService.goToFinancial.mockRejectedValue(mockError);
      
      // Verificar que o método lança o erro esperado
      await expect(financialService.getFinancialSummary(mockPeriod))
        .rejects
        .toThrow('Erro ao acessar dados financeiros');
      
      // Verificar que a extração de dados não foi chamada
      expect(mockScrapingService.extractFinancialData).not.toHaveBeenCalled();
      
      // Verificar logs de erro
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Erro ao obter resumo financeiro'),
        mockError
      );
      expect(mockOperation.end).toHaveBeenCalledWith('failure', expect.objectContaining({
        error: expect.any(String)
      }));
    });

    it('deve lançar erro quando a extração de dados falha', async () => {
      // Configurar mock para falhar na extração
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockError = new Error('Falha na extração');
      
      mockNavigationService.goToFinancial.mockResolvedValue();
      mockScrapingService.extractFinancialData.mockRejectedValue(mockError);
      
      // Verificar que o método lança o erro esperado
      await expect(financialService.getFinancialSummary(mockPeriod))
        .rejects
        .toThrow('Erro ao extrair dados financeiros');
      
      // Verificar logs de erro
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Erro ao obter resumo financeiro'),
        mockError
      );
    });
  });

  describe('generateFinancialReport', () => {
    it('deve gerar relatório financeiro com sucesso', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockFormat = 'xlsx';
      const mockReportId = 'report-123';
      
      mockNavigationService.goToFinancial.mockResolvedValue();
      mockNavigationService.goToReports.mockResolvedValue();
      
      // Mock para simular a geração de relatório
      jest.spyOn(financialService as any, 'submitReportForm').mockResolvedValue(mockReportId);
      
      // Executar método a ser testado
      const result = await financialService.generateFinancialReport(mockPeriod, mockFormat);
      
      // Verificar resultados
      expect(mockNavigationService.goToFinancial).toHaveBeenCalledTimes(1);
      expect(mockNavigationService.goToReports).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ reportId: mockReportId, format: mockFormat });
      
      // Verificar logs
      expect(logger.startOperation).toHaveBeenCalledWith('generateFinancialReport');
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Gerando relatório financeiro'),
        expect.objectContaining({ period: mockPeriod, format: mockFormat })
      );
      expect(mockOperation.end).toHaveBeenCalledWith('success', expect.objectContaining({
        reportId: mockReportId
      }));
    });

    it('deve lançar erro quando a navegação para relatórios falha', async () => {
      // Configurar mock para falhar
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockFormat = 'xlsx';
      const mockError = new Error('Falha na navegação');
      
      mockNavigationService.goToReports.mockRejectedValue(mockError);
      
      // Verificar que o método lança o erro esperado
      await expect(financialService.generateFinancialReport(mockPeriod, mockFormat))
        .rejects
        .toThrow('Erro ao acessar seção de relatórios');
      
      // Verificar logs de erro
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.stringContaining('Erro ao gerar relatório financeiro'),
        mockError
      );
      expect(mockOperation.end).toHaveBeenCalledWith('failure', expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('getTransactionHistory', () => {
    it('deve obter histórico de transações com sucesso', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockTransactions = [
        { id: 'tx1', date: '2023-01-15', amount: 1000, type: 'income', description: 'Pagamento' },
        { id: 'tx2', date: '2023-01-20', amount: -500, type: 'expense', description: 'Despesa' }
      ];
      
      mockNavigationService.goToFinancial.mockResolvedValue();
      jest.spyOn(financialService as any, 'extractTransactions').mockResolvedValue(mockTransactions);
      
      // Executar método a ser testado
      const result = await financialService.getTransactionHistory(mockPeriod);
      
      // Verificar resultados
      expect(mockNavigationService.goToFinancial).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTransactions);
      
      // Verificar logs
      expect(logger.startOperation).toHaveBeenCalledWith('getTransactionHistory');
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Obtendo histórico de transações'),
        expect.objectContaining({ period: mockPeriod })
      );
      expect(mockOperation.end).toHaveBeenCalledWith('success', expect.objectContaining({
        count: mockTransactions.length
      }));
    });

    it('deve filtrar transações por tipo quando especificado', async () => {
      // Configurar mocks
      const mockPeriod = { startDate: '2023-01-01', endDate: '2023-01-31' };
      const mockTransactions = [
        { id: 'tx1', date: '2023-01-15', amount: 1000, type: 'income', description: 'Pagamento' },
        { id: 'tx2', date: '2023-01-20', amount: -500, type: 'expense', description: 'Despesa' }
      ];
      
      mockNavigationService.goToFinancial.mockResolvedValue();
      jest.spyOn(financialService as any, 'extractTransactions').mockResolvedValue(mockTransactions);
      
      // Executar método a ser testado com filtro de tipo
      const result = await financialService.getTransactionHistory(mockPeriod, 'income');
      
      // Verificar resultados
      expect(result).toEqual([mockTransactions[0]]);
      expect(result.length).toBe(1);
      expect(result[0].type).toBe('income');
      
      // Verificar logs
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Obtendo histórico de transações'),
        expect.objectContaining({ period: mockPeriod, type: 'income' })
      );
    });
  });

  describe('getPendingPayments', () => {
    it('deve obter pagamentos pendentes com sucesso', async () => {
      // Configurar mocks
      const mockPendingPayments = [
        { id: 'pay1', dueDate: '2023-02-15', amount: 1000, client: 'Cliente A', status: 'pending' },
        { id: 'pay2', dueDate: '2023-02-20', amount: 1500, client: 'Cliente B', status: 'pending' }
      ];
      
      mockNavigationService.goToFinancial.mockResolvedValue();
      jest.spyOn(financialService as any, 'extractPendingPayments').mockResolvedValue(mockPendingPayments);
      
      // Executar método a ser testado
      const result = await financialService.getPendingPayments();
      
      // Verificar resultados
      expect(mockNavigationService.goToFinancial).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPendingPayments);
      
      // Verificar logs
      expect(logger.startOperation).toHaveBeenCalledWith('getPendingPayments');
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Obtendo pagamentos pendentes')
      );
      expect(mockOperation.end).toHaveBeenCalledWith('success', expect.objectContaining({
        count: mockPendingPayments.length
      }));
    });

    it('deve retornar array vazio quando não há pagamentos pendentes', async () => {
      // Configurar mocks
      mockNavigationService.goToFinancial.mockResolvedValue();
      jest.spyOn(financialService as any, 'extractPendingPayments').mockResolvedValue([]);
      
      // Executar método a ser testado
      const result = await financialService.getPendingPayments();
      
      // Verificar resultados
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
      
      // Verificar logs
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Pagamentos pendentes obtidos com sucesso'),
        expect.objectContaining({ count: 0 })
      );
    });
  });
});
