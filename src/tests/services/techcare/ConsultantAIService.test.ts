import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConsultantAIService from '../../../services/techcare/ConsultantAIService';
import logger from '../../../utils/logger';
import { NavigationService } from '../../../services/techcare/NavigationService';
import { ScrapingService } from '../../../services/techcare/ScrapingService';
import { AIService } from '../../../services/techcare/AIService';

// Mock das dependências
vi.mock('../../../services/techcare/NavigationService', () => {
  return {
    NavigationService: vi.fn().mockImplementation(() => ({
      goToClients: vi.fn().mockResolvedValue(undefined),
      goToDashboard: vi.fn().mockResolvedValue(undefined)
    }))
  };
});

vi.mock('../../../services/techcare/ScrapingService', () => {
  return {
    ScrapingService: vi.fn().mockImplementation(() => ({
      extractClientData: vi.fn().mockResolvedValue({
        id: 'client-123',
        name: 'Cliente Teste',
        history: [{ date: '2025-01-01', action: 'login' }]
      })
    }))
  };
});

vi.mock('../../../services/techcare/AIService', () => {
  return {
    AIService: vi.fn().mockImplementation(() => ({
      generateConsultantRecommendations: vi.fn().mockResolvedValue({
        recommendations: ['Recomendação 1', 'Recomendação 2'],
        insights: { key: 'value' }
      }),
      generateClientProgressReport: vi.fn().mockResolvedValue({
        summary: 'Resumo do progresso',
        sections: ['Seção 1', 'Seção 2']
      }),
      analyzeClientTrends: vi.fn().mockResolvedValue({
        trends: ['Tendência 1', 'Tendência 2'],
        analysis: 'Análise detalhada'
      })
    }))
  };
});

// Mock do logger
vi.mock('../../../utils/logger', () => {
  return {
    default: {
      info: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      startOperation: vi.fn().mockReturnValue({
        end: vi.fn()
      })
    }
  };
});

describe('ConsultantAIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('setApiKey', () => {
    it('deve configurar a API key corretamente', () => {
      // Arrange
      const apiKey = 'test-api-key-123';
      
      // Act
      ConsultantAIService.setApiKey(apiKey);
      
      // Assert
      expect(logger.info).toHaveBeenCalledWith('API Key configurada');
    });
  });

  describe('setModel', () => {
    it('deve configurar o modelo corretamente', () => {
      // Arrange
      const model = 'gpt-4-turbo';
      
      // Act
      ConsultantAIService.setModel(model);
      
      // Assert
      expect(logger.info).toHaveBeenCalledWith('Modelo configurado:', { model });
    });
  });

  describe('generateFinancialConsulting', () => {
    it('deve retornar erro quando API key não está configurada', async () => {
      // Arrange
      const businessData = { revenue: 10000, expenses: 5000 };
      const goal = 'Aumentar lucro';
      
      // Garantir que não há API key configurada
      ConsultantAIService.setApiKey('');
      
      // Act
      const result = await ConsultantAIService.generateFinancialConsulting(businessData, goal);
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('API Key não configurada');
    });

    it('deve gerar consultoria financeira com sucesso', async () => {
      // Arrange
      const businessData = { revenue: 10000, expenses: 5000 };
      const goal = 'Aumentar lucro';
      
      // Configurar API key
      ConsultantAIService.setApiKey('test-api-key-123');
      
      // Act
      const result = await ConsultantAIService.generateFinancialConsulting(businessData, goal);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.summary).toContain(goal);
      expect(result.data.recommendations).toHaveLength(3);
      expect(result.data.projections).toBeDefined();
      expect(logger.info).toHaveBeenCalledWith('Gerando consultoria financeira', { goal });
    });
  });

  describe('analyzeSentiment', () => {
    it('deve retornar erro quando API key não está configurada', async () => {
      // Arrange
      const texts = ['Produto excelente!', 'Atendimento péssimo'];
      
      // Garantir que não há API key configurada
      ConsultantAIService.setApiKey('');
      
      // Act
      const result = await ConsultantAIService.analyzeSentiment(texts);
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('API Key não configurada');
    });

    it('deve analisar sentimento com sucesso', async () => {
      // Arrange
      const texts = ['Produto excelente!', 'Atendimento péssimo'];
      
      // Configurar API key
      ConsultantAIService.setApiKey('test-api-key-123');
      
      // Act
      const result = await ConsultantAIService.analyzeSentiment(texts);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.overall).toBe('mixed');
      expect(result.data.aspects).toHaveLength(2);
      expect(result.data.suggestions).toHaveLength(2);
      expect(logger.info).toHaveBeenCalledWith('Analisando sentimento em textos', { count: texts.length });
    });
  });

  describe('generateSalesPlan', () => {
    it('deve retornar erro quando API key não está configurada', async () => {
      // Arrange
      const salesData = { '2023-Q1': 10000, '2023-Q2': 12000 };
      const growthTarget = 15;
      const timeframe = '2024';
      
      // Garantir que não há API key configurada
      ConsultantAIService.setApiKey('');
      
      // Act
      const result = await ConsultantAIService.generateSalesPlan(salesData, growthTarget, timeframe);
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('API Key não configurada');
    });

    it('deve gerar plano de vendas com sucesso', async () => {
      // Arrange
      const salesData = { '2023-Q1': 10000, '2023-Q2': 12000 };
      const growthTarget = 15;
      const timeframe = '2024';
      
      // Configurar API key
      ConsultantAIService.setApiKey('test-api-key-123');
      
      // Act
      const result = await ConsultantAIService.generateSalesPlan(salesData, growthTarget, timeframe);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.summary).toContain(`${growthTarget}%`);
      expect(result.data.summary).toContain(timeframe);
      expect(result.data.strategies).toHaveLength(3);
      expect(result.data.projections).toBeDefined();
      expect(logger.info).toHaveBeenCalledWith('Gerando plano de vendas', { 
        growthTarget, 
        timeframe 
      });
    });
  });
});
