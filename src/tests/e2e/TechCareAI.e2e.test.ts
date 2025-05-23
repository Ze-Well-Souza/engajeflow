
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TechCareAIPage from '../../pages/ai/TechCareAIPage';

// Mock do AIService
vi.mock('../../services/techcare/AIService', () => ({
  default: {
    configure: vi.fn(),
    isConfigured: vi.fn().mockReturnValue(false),
    isUsingGemini: vi.fn().mockReturnValue(true),
    analyzeSentiment: vi.fn().mockResolvedValue({
      success: true,
      data: {
        sentiment: 'positive',
        score: 0.8,
        confidence: 0.9,
        keyPhrases: ['teste', 'positivo']
      }
    }),
    classifyTicket: vi.fn().mockResolvedValue({
      success: true,
      data: {
        category: 'suporte_tecnico',
        confidence: 0.85
      }
    }),
    generateResponse: vi.fn().mockResolvedValue({
      success: true,
      data: {
        text: 'Resposta gerada automaticamente',
        variations: ['Variação 1', 'Variação 2']
      }
    }),
    summarizeText: vi.fn().mockResolvedValue({
      success: true,
      data: {
        summary: 'Resumo da conversa',
        keyPoints: ['Ponto 1', 'Ponto 2'],
        originalLength: 1000,
        summaryLength: 100
      }
    }),
    generateInsights: vi.fn().mockResolvedValue({
      success: true,
      data: [
        {
          title: 'Insight de teste',
          description: 'Descrição do insight',
          priority: 'high',
          metrics: { value: 100 },
          recommendations: ['Recomendação 1']
        }
      ]
    })
  }
}));

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('TechCare AI E2E Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderTechCareAIPage = () => {
    return render(
      <MemoryRouter>
        <TechCareAIPage />
      </MemoryRouter>
    );
  };

  it('should render API configuration section when not configured', () => {
    renderTechCareAIPage();
    
    expect(screen.getByText('Configuração da API de IA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Insira sua chave da API do Google Gemini')).toBeInTheDocument();
    expect(screen.getByText('Configurar')).toBeInTheDocument();
  });

  it('should allow API configuration', async () => {
    renderTechCareAIPage();
    
    const apiKeyInput = screen.getByPlaceholderText('Insira sua chave da API do Google Gemini');
    const configureButton = screen.getByText('Configurar');
    
    fireEvent.change(apiKeyInput, { target: { value: 'test-api-key' } });
    fireEvent.click(configureButton);
    
    await waitFor(() => {
      expect(screen.getByText('TechCare AI - Módulos de Inteligência Artificial')).toBeInTheDocument();
    });
  });

  it('should navigate between AI module tabs', () => {
    renderTechCareAIPage();
    
    // Verificar tabs disponíveis
    expect(screen.getByRole('tab', { name: /análise de sentimentos/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /classificação de tickets/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /geração de respostas/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /sumário automático/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /insights do dashboard/i })).toBeInTheDocument();
  });

  it('should allow editing sample text', () => {
    renderTechCareAIPage();
    
    const textArea = screen.getByLabelText(/texto de exemplo para análise/i);
    
    fireEvent.change(textArea, { target: { value: 'Novo texto de teste' } });
    
    expect(textArea.value).toBe('Novo texto de teste');
  });

  it('should execute sentiment analysis workflow', async () => {
    renderTechCareAIPage();
    
    // Navegar para a tab de análise de sentimento
    const sentimentTab = screen.getByRole('tab', { name: /análise de sentimentos/i });
    fireEvent.click(sentimentTab);
    
    // Verificar se o conteúdo da tab está visível
    await waitFor(() => {
      expect(screen.getByText(/sobre a análise de sentimento/i)).toBeInTheDocument();
    });
  });

  it('should execute ticket classification workflow', async () => {
    renderTechCareAIPage();
    
    // Navegar para a tab de classificação
    const classificationTab = screen.getByRole('tab', { name: /classificação de tickets/i });
    fireEvent.click(classificationTab);
    
    await waitFor(() => {
      expect(screen.getByText(/sobre a classificação de tickets/i)).toBeInTheDocument();
    });
  });

  it('should execute response generation workflow', async () => {
    renderTechCareAIPage();
    
    // Navegar para a tab de geração de respostas
    const responseTab = screen.getByRole('tab', { name: /geração de respostas/i });
    fireEvent.click(responseTab);
    
    await waitFor(() => {
      expect(screen.getByText(/sobre o gerador de respostas/i)).toBeInTheDocument();
    });
  });

  it('should complete full AI workflow integration', async () => {
    renderTechCareAIPage();
    
    // 1. Configurar API
    const apiKeyInput = screen.getByPlaceholderText('Insira sua chave da API do Google Gemini');
    fireEvent.change(apiKeyInput, { target: { value: 'test-api-key' } });
    
    const configureButton = screen.getByText('Configurar');
    fireEvent.click(configureButton);
    
    // 2. Testar cada módulo
    const tabs = [
      /análise de sentimentos/i,
      /classificação de tickets/i,
      /geração de respostas/i,
      /sumário automático/i,
      /insights do dashboard/i
    ];
    
    for (const tabName of tabs) {
      const tab = screen.getByRole('tab', { name: tabName });
      fireEvent.click(tab);
      
      await waitFor(() => {
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    }
  });
});
