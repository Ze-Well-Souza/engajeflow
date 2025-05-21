
/**
 * Dados simulados para o serviço de IA consultiva
 */

import { FinancialConsultingResult, SentimentAnalysisResult } from './types';

/**
 * Gera dados simulados de consultoria financeira
 */
export function generateMockFinancialConsulting(): FinancialConsultingResult {
  return {
    summary: "A empresa apresenta boa saúde financeira com crescimento de receita de 5% no último trimestre. No entanto, as margens de lucro estão menores que a média do setor devido ao aumento de custos operacionais. Há oportunidades significativas para otimização de despesas e expansão em novos mercados.",
    key_metrics: [
      {
        name: "ROI",
        value: 18.5,
        interpretation: "Retorno sobre investimento acima da média do setor (15.2%)",
        trend: "up"
      },
      {
        name: "Margem de Lucro",
        value: 16.0,
        interpretation: "Abaixo da média do setor (22%), indicando necessidade de revisão de custos",
        trend: "down"
      },
      {
        name: "Crescimento de Receita",
        value: 5.0,
        interpretation: "Crescimento consistente, dentro das expectativas",
        trend: "stable"
      },
      {
        name: "Fluxo de Caixa Operacional",
        value: 420000,
        interpretation: "Saudável, com capacidade para investimentos estratégicos",
        trend: "up"
      }
    ],
    recommendations: [
      {
        title: "Revisão de contratos com fornecedores",
        description: "Renegociação de contratos com os 5 principais fornecedores para obter melhores termos e reduzir custos em aproximadamente 12%.",
        estimated_impact: "high",
        implementation_difficulty: "medium",
        timeline: "2-3 meses",
        key_steps: [
          "Análise dos contratos atuais",
          "Benchmark com preços de mercado",
          "Preparação de estratégia de negociação",
          "Agendamento de reuniões com fornecedores",
          "Finalização de novos contratos"
        ]
      },
      {
        title: "Expansão para mercados adjacentes",
        description: "Expansão para 2 novos mercados geográficos com perfil de consumidor similar, aproveitando a infraestrutura existente.",
        estimated_impact: "high",
        implementation_difficulty: "high",
        timeline: "6-9 meses",
        key_steps: [
          "Pesquisa de mercado detalhada",
          "Desenvolvimento de estratégia de entrada",
          "Adaptação de produtos para novos mercados",
          "Contratação de equipe local",
          "Lançamento e campanha de marketing"
        ]
      },
      {
        title: "Implementação de sistema de automação",
        description: "Automação de processos operacionais para reduzir custos de mão de obra e aumentar eficiência em 15-20%.",
        estimated_impact: "medium",
        implementation_difficulty: "medium",
        timeline: "4-6 meses",
        key_steps: [
          "Mapeamento de processos atuais",
          "Seleção de tecnologia apropriada",
          "Implementação em fases",
          "Treinamento da equipe",
          "Monitoramento e otimização contínua"
        ]
      }
    ],
    risk_assessment: {
      level: "medium",
      factors: [
        "Aumento da concorrência no mercado principal",
        "Instabilidade econômica afetando poder de compra dos consumidores",
        "Possíveis mudanças regulatórias no setor",
        "Dependência de fornecedor-chave para componentes críticos"
      ]
    }
  };
}

/**
 * Gera dados simulados de análise de sentimento
 */
export function generateMockSentimentAnalysis(): SentimentAnalysisResult {
  return {
    overall: {
      score: 0.25,
      sentiment: "positive",
      summary: "Sentimento geral levemente positivo, com elogios ao produto mas críticas ao atendimento ao cliente."
    },
    aspects: [
      {
        name: "Produto",
        score: 0.75,
        sentiment: "positive",
        key_phrases: [
          "produto de qualidade",
          "funcionou como esperado",
          "design excelente",
          "vale o investimento"
        ]
      },
      {
        name: "Atendimento ao Cliente",
        score: -0.5,
        sentiment: "negative",
        key_phrases: [
          "demorou para responder",
          "atendente não soube resolver",
          "tive que ligar várias vezes",
          "processo complicado"
        ]
      },
      {
        name: "Preço",
        score: 0.1,
        sentiment: "neutral",
        key_phrases: [
          "preço justo",
          "um pouco caro mas vale a pena",
          "poderia ser mais barato",
          "preço na média do mercado"
        ]
      }
    ],
    suggestions: [
      "Investir em treinamento da equipe de atendimento ao cliente",
      "Simplificar processos de suporte técnico",
      "Reduzir tempo de resposta para solicitações de clientes",
      "Manter a qualidade do produto que já é bem avaliada",
      "Considerar um pequeno ajuste no preço ou oferecer promoções"
    ]
  };
}
