
/**
 * Tipos para o serviço de IA consultiva
 */

/**
 * Resultado genérico da IA
 */
export interface AIResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Opções para consultoria
 */
export interface ConsultingOptions {
  detailed?: boolean;
  format?: 'text' | 'json' | 'html';
  maxLength?: number;
}

/**
 * Resultado de análise de sentimento
 */
export interface SentimentAnalysisResult {
  overall: {
    score: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    summary: string;
  };
  aspects: {
    name: string;
    score: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    key_phrases: string[];
  }[];
  suggestions: string[];
}

/**
 * Recomendação de negócios
 */
export interface BusinessRecommendation {
  title: string;
  description: string;
  estimated_impact: 'high' | 'medium' | 'low';
  implementation_difficulty: 'high' | 'medium' | 'low';
  timeline: string;
  key_steps: string[];
}

/**
 * Resultado de consultoria financeira
 */
export interface FinancialConsultingResult {
  summary: string;
  key_metrics: {
    name: string;
    value: number;
    interpretation: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  recommendations: BusinessRecommendation[];
  risk_assessment: {
    level: 'high' | 'medium' | 'low';
    factors: string[];
  };
}
