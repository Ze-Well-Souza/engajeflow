import { ConsultantAIService } from '../../../services/techcare/ConsultantAIService';
import { AIService } from '../../../services/techcare/AIService';
import { NavigationService } from '../../../services/techcare/NavigationService';
import { ScrapingService } from '../../../services/techcare/ScrapingService';

// Mock das dependências
jest.mock('../../../services/techcare/AIService');
jest.mock('../../../services/techcare/NavigationService');
jest.mock('../../../services/techcare/ScrapingService');

describe('ConsultantAIService', () => {
  let consultantAIService: ConsultantAIService;
  let mockAIService: jest.Mocked<AIService>;
  let mockNavigationService: jest.Mocked<NavigationService>;
  let mockScrapingService: jest.Mocked<ScrapingService>;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    
    // Criar instâncias mockadas
    mockAIService = new AIService() as jest.Mocked<AIService>;
    mockNavigationService = new NavigationService() as jest.Mocked<NavigationService>;
    mockScrapingService = new ScrapingService() as jest.Mocked<ScrapingService>;
    
    // Criar instância do serviço a ser testado com as dependências mockadas
    consultantAIService = new ConsultantAIService(
      mockAIService,
      mockNavigationService,
      mockScrapingService
    );
  });

  describe('generateConsultantSuggestions', () => {
    it('deve gerar sugestões para consultores com base nos dados do cliente', async () => {
      // Configurar mocks
      const mockClientId = 'client-123';
      const mockClientData = {
        name: 'Cliente Teste',
        history: [
          { date: '2023-01-15', service: 'Consulta', notes: 'Primeira visita' },
          { date: '2023-02-20', service: 'Acompanhamento', notes: 'Progresso positivo' }
        ],
        preferences: ['Atendimento matutino', 'Prefere comunicação por WhatsApp']
      };
      
      const mockSuggestions = {
        nextSteps: ['Agendar acompanhamento em 30 dias', 'Oferecer pacote de serviços premium'],
        communicationTips: ['Manter contato via WhatsApp', 'Enviar lembretes 2 dias antes'],
        serviceRecommendations: ['Serviço X seria adequado para o perfil']
      };
      
      mockNavigationService.goToClients.mockResolvedValue();
      mockScrapingService.extractClientData.mockResolvedValue(mockClientData);
      mockAIService.generateConsultantRecommendations.mockResolvedValue(mockSuggestions);
      
      // Executar método a ser testado
      const result = await consultantAIService.generateConsultantSuggestions(mockClientId);
      
      // Verificar resultados
      expect(mockNavigationService.goToClients).toHaveBeenCalledTimes(1);
      expect(mockScrapingService.extractClientData).toHaveBeenCalledWith(mockClientId);
      expect(mockAIService.generateConsultantRecommendations).toHaveBeenCalledWith(
        expect.objectContaining({ clientData: mockClientData })
      );
      expect(result).toEqual(mockSuggestions);
    });

    it('deve lançar erro quando a navegação falha', async () => {
      // Configurar mock para falhar
      const mockClientId = 'client-123';
      const mockError = new Error('Falha na navegação');
      
      mockNavigationService.goToClients.mockRejectedValue(mockError);
      
      // Verificar que o método lança o erro esperado
      await expect(consultantAIService.generateConsultantSuggestions(mockClientId))
        .rejects
        .toThrow('Erro ao acessar dados do cliente');
      
      // Verificar que os outros métodos não foram chamados
      expect(mockScrapingService.extractClientData).not.toHaveBeenCalled();
      expect(mockAIService.generateConsultantRecommendations).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando a extração de dados falha', async () => {
      // Configurar mock para falhar na extração
      const mockClientId = 'client-123';
      const mockError = new Error('Falha na extração');
      
      mockNavigationService.goToClients.mockResolvedValue();
      mockScrapingService.extractClientData.mockRejectedValue(mockError);
      
      // Verificar que o método lança o erro esperado
      await expect(consultantAIService.generateConsultantSuggestions(mockClientId))
        .rejects
        .toThrow('Erro ao extrair dados do cliente');
      
      // Verificar que o AI service não foi chamado
      expect(mockAIService.generateConsultantRecommendations).not.toHaveBeenCalled();
    });
  });

  describe('generateClientReport', () => {
    it('deve gerar relatório personalizado para o cliente', async () => {
      // Configurar mocks
      const mockClientId = 'client-123';
      const mockClientData = {
        name: 'Cliente Teste',
        history: [
          { date: '2023-01-15', service: 'Consulta', notes: 'Primeira visita' },
          { date: '2023-02-20', service: 'Acompanhamento', notes: 'Progresso positivo' }
        ]
      };
      
      const mockReportContent = {
        summary: 'Resumo do progresso do cliente',
        achievements: ['Melhoria X', 'Progresso em Y'],
        recommendations: ['Continuar com Z', 'Adicionar W ao tratamento']
      };
      
      mockNavigationService.goToClients.mockResolvedValue();
      mockScrapingService.extractClientData.mockResolvedValue(mockClientData);
      mockAIService.generateClientProgressReport.mockResolvedValue(mockReportContent);
      
      // Executar método a ser testado
      const result = await consultantAIService.generateClientReport(mockClientId);
      
      // Verificar resultados
      expect(mockNavigationService.goToClients).toHaveBeenCalledTimes(1);
      expect(mockScrapingService.extractClientData).toHaveBeenCalledWith(mockClientId);
      expect(mockAIService.generateClientProgressReport).toHaveBeenCalledWith(
        expect.objectContaining({ clientData: mockClientData })
      );
      expect(result).toEqual(mockReportContent);
    });
  });

  describe('analyzeClientTrends', () => {
    it('deve analisar tendências de múltiplos clientes', async () => {
      // Configurar mocks
      const mockClientsData = [
        {
          id: 'client-1',
          name: 'Cliente A',
          history: [{ date: '2023-01-15', service: 'Serviço X' }]
        },
        {
          id: 'client-2',
          name: 'Cliente B',
          history: [{ date: '2023-02-20', service: 'Serviço Y' }]
        }
      ];
      
      const mockTrendsAnalysis = {
        popularServices: ['Serviço X', 'Serviço Y'],
        peakTimes: ['Segunda-feira manhã', 'Quarta-feira tarde'],
        recommendations: ['Aumentar disponibilidade nos horários de pico']
      };
      
      mockNavigationService.goToDashboard.mockResolvedValue();
      jest.spyOn(consultantAIService as any, 'extractMultipleClientsData').mockResolvedValue(mockClientsData);
      mockAIService.analyzeClientTrends.mockResolvedValue(mockTrendsAnalysis);
      
      // Executar método a ser testado
      const result = await consultantAIService.analyzeClientTrends();
      
      // Verificar resultados
      expect(mockNavigationService.goToDashboard).toHaveBeenCalledTimes(1);
      expect(mockAIService.analyzeClientTrends).toHaveBeenCalledWith(
        expect.objectContaining({ clientsData: mockClientsData })
      );
      expect(result).toEqual(mockTrendsAnalysis);
    });

    it('deve retornar análise vazia quando não há dados suficientes', async () => {
      // Configurar mocks para retornar dados insuficientes
      mockNavigationService.goToDashboard.mockResolvedValue();
      jest.spyOn(consultantAIService as any, 'extractMultipleClientsData').mockResolvedValue([]);
      
      const mockEmptyAnalysis = {
        popularServices: [],
        peakTimes: [],
        recommendations: ['Não há dados suficientes para análise']
      };
      
      mockAIService.analyzeClientTrends.mockResolvedValue(mockEmptyAnalysis);
      
      // Executar método a ser testado
      const result = await consultantAIService.analyzeClientTrends();
      
      // Verificar resultados
      expect(result.popularServices).toEqual([]);
      expect(result.recommendations).toContain('Não há dados suficientes para análise');
    });
  });

  describe('generateResponseSuggestions', () => {
    it('deve gerar sugestões de resposta para mensagens de clientes', async () => {
      // Configurar mocks
      const mockClientId = 'client-123';
      const mockMessage = 'Preciso remarcar minha consulta de amanhã';
      
      const mockClientData = {
        name: 'Cliente Teste',
        history: [{ date: '2023-01-15', service: 'Consulta' }],
        appointments: [{ date: '2023-03-15', time: '14:00', status: 'confirmed' }]
      };
      
      const mockSuggestions = [
        'Claro, posso remarcar sua consulta. Temos horários disponíveis na quinta e sexta.',
        'Sem problemas! Vamos encontrar um novo horário que funcione para você.'
      ];
      
      mockNavigationService.goToClients.mockResolvedValue();
      mockScrapingService.extractClientData.mockResolvedValue(mockClientData);
      mockAIService.generateResponseOptions.mockResolvedValue(mockSuggestions);
      
      // Executar método a ser testado
      const result = await consultantAIService.generateResponseSuggestions(mockClientId, mockMessage);
      
      // Verificar resultados
      expect(mockNavigationService.goToClients).toHaveBeenCalledTimes(1);
      expect(mockScrapingService.extractClientData).toHaveBeenCalledWith(mockClientId);
      expect(mockAIService.generateResponseOptions).toHaveBeenCalledWith(
        expect.objectContaining({ 
          clientData: mockClientData,
          clientMessage: mockMessage
        })
      );
      expect(result).toEqual(mockSuggestions);
    });
  });
});
