
/**
 * Prompts para interações de IA consultiva
 */

import { ConsultingOptions } from './types';

/**
 * Constrói um prompt para consultoria financeira
 */
export function buildFinancialConsultingPrompt(
  businessData: Record<string, any>, 
  goal: string,
  detailed: boolean
): string {
  return `
    Atue como um consultor financeiro experiente analisando os seguintes dados de negócio:
    
    ${JSON.stringify(businessData, null, 2)}
    
    O objetivo do cliente é: ${goal}
    
    ${detailed ? 'Forneça uma análise detalhada e abrangente com recomendações específicas.' : 'Forneça uma análise resumida com recomendações principais.'}
    
    Sua resposta deve seguir este formato JSON:
    {
      "summary": "Resumo geral da situação financeira e principais insights",
      "key_metrics": [
        {
          "name": "Nome da métrica",
          "value": valor numérico,
          "interpretation": "O que este valor significa para o negócio",
          "trend": "up/down/stable"
        }
      ],
      "recommendations": [
        {
          "title": "Título da recomendação",
          "description": "Descrição detalhada",
          "estimated_impact": "high/medium/low",
          "implementation_difficulty": "high/medium/low",
          "timeline": "Tempo estimado para implementação",
          "key_steps": ["Passo 1", "Passo 2", ...]
        }
      ],
      "risk_assessment": {
        "level": "high/medium/low",
        "factors": ["Fator de risco 1", "Fator de risco 2", ...]
      }
    }
  `;
}

/**
 * Constrói um prompt para análise de sentimento
 */
export function buildSentimentAnalysisPrompt(texts: string[], context?: string): string {
  return `
    Atue como um analista de sentimento especializado. Analise os seguintes textos de clientes:
    
    ${texts.map((text, i) => `Texto ${i+1}: "${text}"`).join('\n\n')}
    
    ${context ? `Contexto adicional: ${context}` : ''}
    
    Forneça uma análise de sentimento detalhada no formato JSON com a seguinte estrutura:
    
    {
      "overall": {
        "score": número de -1.0 (muito negativo) a 1.0 (muito positivo),
        "sentiment": "positive/neutral/negative",
        "summary": "Resumo geral do sentimento"
      },
      "aspects": [
        {
          "name": "Aspecto mencionado (ex: atendimento, qualidade, preço)",
          "score": número de -1.0 a 1.0,
          "sentiment": "positive/neutral/negative",
          "key_phrases": ["frase 1", "frase 2", ...]
        }
      ],
      "suggestions": ["sugestão 1 para melhorar", "sugestão 2", ...]
    }
  `;
}

/**
 * Constrói um prompt para plano de vendas
 */
export function buildSalesPlanPrompt(
  salesData: Record<string, any>,
  targetGrowth: number,
  timeframe: string
): string {
  return `
    Analise os seguintes dados de vendas históricos e crie um plano estratégico para atingir um crescimento de ${targetGrowth}% em ${timeframe}.
    
    Dados históricos de vendas:
    ${JSON.stringify(salesData, null, 2)}
    
    O plano deve incluir:
    1. Análise de tendências atuais
    2. Identificação de oportunidades de crescimento
    3. Estratégias recomendadas
    4. Táticas específicas
    5. Cronograma de implementação
    6. KPIs para monitoramento
  `;
}
