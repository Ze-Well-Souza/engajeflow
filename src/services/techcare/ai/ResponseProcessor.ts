
/**
 * Processador de respostas da IA
 */

import logger from '../../../utils/logger';
import { FinancialConsultingResult, SentimentAnalysisResult } from './types';

export class ResponseProcessor {
  /**
   * Processa a resposta de uma consultoria financeira
   */
  static processFinancialConsultingResponse(response: string): FinancialConsultingResult {
    try {
      // Tentar fazer parse da resposta como JSON
      return JSON.parse(response) as FinancialConsultingResult;
    } catch (error) {
      // Se falhar, tentar extrair JSON da resposta
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                      response.match(/{[\s\S]*}/);
      
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[1] || jsonMatch[0]) as FinancialConsultingResult;
        } catch {
          // Se ainda falhar, criar uma estrutura básica
          logger.warn('[ConsultantAIService] Falha ao processar JSON da resposta, usando estrutura básica');
        }
      }
      
      // Estrutura básica se não conseguir extrair JSON válido
      return {
        summary: "Não foi possível processar a resposta em formato estruturado.",
        key_metrics: [],
        recommendations: [
          {
            title: "Consulte o texto completo da resposta",
            description: response.slice(0, 200) + "...",
            estimated_impact: "medium",
            implementation_difficulty: "medium",
            timeline: "Não disponível",
            key_steps: ["Verificar resposta completa"]
          }
        ],
        risk_assessment: {
          level: "medium",
          factors: ["Dados insuficientes para avaliação completa"]
        }
      };
    }
  }

  /**
   * Processa a resposta de uma análise de sentimento
   */
  static processSentimentAnalysisResponse(response: string): SentimentAnalysisResult {
    try {
      // Tentar fazer parse da resposta como JSON
      return JSON.parse(response) as SentimentAnalysisResult;
    } catch (error) {
      // Se falhar, tentar extrair JSON da resposta
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                      response.match(/{[\s\S]*}/);
      
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[1] || jsonMatch[0]) as SentimentAnalysisResult;
        } catch {
          // Se ainda falhar, criar uma estrutura básica
          logger.warn('[ConsultantAIService] Falha ao processar JSON da resposta, usando estrutura básica');
        }
      }
      
      // Estrutura básica se não conseguir extrair JSON válido
      return {
        overall: {
          score: 0,
          sentiment: "neutral",
          summary: "Não foi possível processar a análise de sentimento."
        },
        aspects: [],
        suggestions: ["Verifique o texto original da resposta para mais detalhes."]
      };
    }
  }
}
