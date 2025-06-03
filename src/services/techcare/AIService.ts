
import { toast } from "sonner";
import { getEnvVariable } from "../../utils/environment";
import logger from "../../utils/logger";

// Importar serviços modulares
import { SentimentAnalysisService, type SentimentAnalysisResult } from "./ai/SentimentAnalysisService";
import { TextClassificationService, type TextClassificationResult } from "./ai/TextClassificationService";
import { ResponseGenerationService, type AIGeneratedResponse } from "./ai/ResponseGenerationService";
import { TextSummarizationService, type TextSummaryResult } from "./ai/TextSummarizationService";
import { InsightsGenerationService, type AIInsight } from "./ai/InsightsGenerationService";

// Re-exportar tipos para compatibilidade
export type { SentimentAnalysisResult, TextClassificationResult, AIGeneratedResponse, TextSummaryResult, AIInsight };

/**
 * Serviço principal para gerenciar operações de IA no TechCare Connect
 */
class AIService {
  private static instance: AIService;
  private apiKey: string | null = null;
  private useGemini: boolean = true;

  // Construtor privado para padrão Singleton
  private constructor() {
    logger.info('[AIService] Inicializado');
  }

  /**
   * Obtém a instância única do serviço (Padrão Singleton)
   */
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Configura o serviço de IA
   */
  public configure(config: { apiKey: string; useGemini?: boolean }): void {
    this.apiKey = config.apiKey;
    this.useGemini = config.useGemini !== undefined ? config.useGemini : true;
    
    logger.info(`[AIService] Serviço de IA configurado com sucesso. Usando Gemini: ${this.useGemini}`);
  }

  /**
   * Verifica se o serviço está configurado
   */
  public isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Verifica se está usando o Gemini
   */
  public isUsingGemini(): boolean {
    return this.useGemini;
  }

  /**
   * Analisa o sentimento de um texto
   */
  public async analyzeSentiment(text: string): Promise<{ success: boolean; data?: SentimentAnalysisResult; error?: string }> {
    if (!this.isConfigured()) {
      return { success: false, error: "Serviço de IA não configurado" };
    }

    try {
      return await SentimentAnalysisService.analyzeSentiment(text, this.apiKey!);
    } catch (error) {
      logger.error("[AIService] Erro ao analisar sentimento:", error);
      toast.error("Erro na análise de sentimento");
      return { success: false, error: "Falha na análise de sentimento" };
    }
  }

  /**
   * Classifica um ticket baseado no texto
   */
  public async classifyTicket(text: string): Promise<{ success: boolean; data?: TextClassificationResult; error?: string }> {
    if (!this.isConfigured()) {
      return { success: false, error: "Serviço de IA não configurado" };
    }

    try {
      return await TextClassificationService.classifyTicket(text, this.apiKey!);
    } catch (error) {
      logger.error("[AIService] Erro ao classificar ticket:", error);
      toast.error("Erro na classificação do ticket");
      return { success: false, error: "Falha na classificação do ticket" };
    }
  }

  /**
   * Alias para classifyTicket (compatibilidade)
   */
  public async classifyText(text: string): Promise<{ success: boolean; data?: TextClassificationResult; error?: string }> {
    return this.classifyTicket(text);
  }

  /**
   * Gera uma resposta baseada no contexto
   */
  public async generateResponse(prompt: string, options?: { context?: string }): Promise<{ success: boolean; data?: AIGeneratedResponse; error?: string }> {
    if (!this.isConfigured()) {
      return { success: false, error: "Serviço de IA não configurado" };
    }

    try {
      return await ResponseGenerationService.generateResponse(prompt, this.apiKey!, options);
    } catch (error) {
      logger.error("[AIService] Erro ao gerar resposta:", error);
      toast.error("Erro na geração de resposta");
      return { success: false, error: "Falha na geração de resposta" };
    }
  }

  /**
   * Sumariza um texto ou conversa
   */
  public async summarizeText(text: string, maxLength?: number): Promise<{ success: boolean; data?: TextSummaryResult; error?: string }> {
    if (!this.isConfigured()) {
      return { success: false, error: "Serviço de IA não configurado" };
    }

    try {
      return await TextSummarizationService.summarizeText(text, this.apiKey!, maxLength);
    } catch (error) {
      logger.error("[AIService] Erro ao sumarizar texto:", error);
      toast.error("Erro na sumarização de texto");
      return { success: false, error: "Falha na sumarização de texto" };
    }
  }

  /**
   * Gera insights baseados em dados do dashboard
   */
  public async generateInsights(data: any): Promise<{ success: boolean; data?: AIInsight[]; error?: string }> {
    if (!this.isConfigured()) {
      return { success: false, error: "Serviço de IA não configurado" };
    }

    try {
      return await InsightsGenerationService.generateInsights(data, this.apiKey!);
    } catch (error) {
      logger.error("[AIService] Erro ao gerar insights:", error);
      toast.error("Erro na geração de insights");
      return { success: false, error: "Falha na geração de insights" };
    }
  }
}

// Exportar singleton
export default AIService.getInstance();
