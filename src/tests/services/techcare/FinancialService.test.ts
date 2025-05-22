import { FinancialService } from '../../../services/techcare/FinancialService';
import { NavigationService } from '../../../services/techcare/NavigationService';
import { ScrapingService } from '../../../services/techcare/ScrapingService';

// Mock das dependências
jest.mock('../../../services/techcare/NavigationService');
jest.mock('../../../services/techcare/ScrapingService');

describe('FinancialService', () => {
  let financialService: FinancialService;
  let mockNavigationService: jest.Mocked<NavigationService>;
  let mockScrapingService: jest.Mocked<ScrapingService>;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    
    // Criar instâncias mockadas
    mockNavigationService = new NavigationService() as jest.Mocked<NavigationService>;
    mockScrapingService = new ScrapingService() as jest.Mocked<ScrapingService>;
    
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
    });
  });
});
