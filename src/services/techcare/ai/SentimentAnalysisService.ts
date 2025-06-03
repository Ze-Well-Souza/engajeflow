
import logger from "../../../utils/logger";

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
  keyPhrases: string[];
}

export class SentimentAnalysisService {
  /**
   * Analisa o sentimento de um texto
   */
  public static async analyzeSentiment(text: string, apiKey: string): Promise<{ success: boolean; data?: SentimentAnalysisResult; error?: string }> {
    try {
      logger.info(`[SentimentAnalysisService] Analisando sentimento do texto: "${text.substring(0, 50)}..."`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Análise simulada baseada em palavras-chave
      const lowercaseText = text.toLowerCase();
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      let score = 0;
      
      const negativeWords = ['problema', 'erro', 'falha', 'péssimo', 'ruim', 'horrível', 'insatisfeito', 'urgência', 'frustrado'];
      const positiveWords = ['bom', 'ótimo', 'excelente', 'satisfeito', 'feliz', 'agradeço', 'parabéns', 'incrível', 'funciona'];
      
      // Contar ocorrências de palavras negativas e positivas
      const negativeCount = negativeWords.filter(word => lowercaseText.includes(word)).length;
      const positiveCount = positiveWords.filter(word => lowercaseText.includes(word)).length;
      
      if (negativeCount > positiveCount) {
        sentiment = 'negative';
        score = -0.3 - (negativeCount * 0.1);
      } else if (positiveCount > negativeCount) {
        sentiment = 'positive';
        score = 0.3 + (positiveCount * 0.1);
      }
      
      // Limitar o score entre -1 e 1
      score = Math.max(-1, Math.min(1, score));
      
      const result: SentimentAnalysisResult = {
        sentiment,
        score,
        confidence: 0.85,
        keyPhrases: text.split('.').slice(0, 2).map(s => s.trim()).filter(s => s.length > 0)
      };

      return { success: true, data: result };
    } catch (error) {
      logger.error("[SentimentAnalysisService] Erro ao analisar sentimento:", error);
      return { success: false, error: "Falha na análise de sentimento" };
    }
  }
}
