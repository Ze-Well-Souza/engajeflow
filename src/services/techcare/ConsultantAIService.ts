
/**
 * Serviço de IA consultiva para o TechCare Connect Automator
 */
import { getEnvVariable } from '../../utils/environment';
import logger from '../../utils/logger';
import { CircuitBreaker } from '../../utils/circuit-breaker';

interface AIResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ConsultingOptions {
  detailed?: boolean;
  format?: 'text' | 'json' | 'html';
  maxLength?: number;
}

interface SentimentAnalysisResult {
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

interface BusinessRecommendation {
  title: string;
  description: string;
  estimated_impact: 'high' | 'medium' | 'low';
  implementation_difficulty: 'high' | 'medium' | 'low';
  timeline: string;
  key_steps: string[];
}

interface FinancialConsultingResult {
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

/**
 * Serviço responsável por interações com IA para consultoria
 */
class ConsultantAIService {
  private static instance: ConsultantAIService;
  private apiKey: string | null = null;
  private baseUrl: string = 'https://api.openai.com/v1';
  private model: string = 'gpt-4';
  private circuitBreaker: CircuitBreaker;

  private constructor() {
    // Tentar obter a chave da API das variáveis de ambiente
    this.apiKey = getEnvVariable('OPENAI_API_KEY', null) as string | null;
    
    // Configurar circuit breaker
    this.circuitBreaker = new CircuitBreaker({
      failureThreshold: 2,
      resetTimeout: 60000 // 1 minuto
    });
    
    logger.info('[ConsultantAIService] Inicializado');
  }

  /**
   * Obtém a instância singleton do serviço
   */
  public static getInstance(): ConsultantAIService {
    if (!ConsultantAIService.instance) {
      ConsultantAIService.instance = new ConsultantAIService();
    }
    return ConsultantAIService.instance;
  }

  /**
   * Define a chave de API para OpenAI
   * @param apiKey Chave de API OpenAI
   */
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    logger.info('[ConsultantAIService] API Key configurada');
  }

  /**
   * Define o modelo a ser utilizado
   * @param model Nome do modelo OpenAI
   */
  public setModel(model: string): void {
    this.model = model;
    logger.info(`[ConsultantAIService] Modelo definido para: ${model}`);
  }

  /**
   * Gera uma consultoria financeira com base nos dados fornecidos
   * @param businessData Dados da empresa para análise
   * @param goal Objetivo de negócios
   * @param options Opções de geração
   */
  public async generateFinancialConsulting(
    businessData: Record<string, any>,
    goal: string,
    options: ConsultingOptions = {}
  ): Promise<AIResult<FinancialConsultingResult>> {
    return this.executeWithRetry(async () => {
      logger.info('[ConsultantAIService] Gerando consultoria financeira');
      
      // Validar API key
      if (!this.apiKey) {
        return { 
          success: false, 
          error: 'API Key não configurada. Use ConsultantAIService.setApiKey()' 
        };
      }
      
      try {
        // Construir prompt para o modelo de IA
        const prompt = this.buildFinancialConsultingPrompt(businessData, goal, options.detailed || false);
        
        // Fazer requisição para a API da OpenAI
        const response = await this.makeOpenAIRequest(prompt, options);
        
        // Processar e estruturar a resposta
        const result = this.processFinancialConsultingResponse(response);
        
        logger.info('[ConsultantAIService] Consultoria financeira gerada com sucesso');
        
        return {
          success: true,
          data: result
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante geração de consultoria';
        logger.error('[ConsultantAIService] Erro:', errorMessage);
        return { success: false, error: errorMessage };
      }
    });
  }

  /**
   * Faz análise de sentimento em textos de clientes
   * @param texts Textos a serem analisados
   * @param context Contexto opcional para análise
   */
  public async analyzeSentiment(
    texts: string[],
    context?: string
  ): Promise<AIResult<SentimentAnalysisResult>> {
    return this.executeWithRetry(async () => {
      logger.info('[ConsultantAIService] Analisando sentimento em textos');
      
      // Validar API key
      if (!this.apiKey) {
        return { 
          success: false, 
          error: 'API Key não configurada. Use ConsultantAIService.setApiKey()' 
        };
      }
      
      try {
        // Construir prompt para análise de sentimento
        const prompt = this.buildSentimentAnalysisPrompt(texts, context);
        
        // Fazer requisição para a API da OpenAI
        const response = await this.makeOpenAIRequest(prompt, { format: 'json' });
        
        // Processar e estruturar a resposta
        const result = this.processSentimentAnalysisResponse(response);
        
        logger.info('[ConsultantAIService] Análise de sentimento concluída com sucesso');
        
        return {
          success: true,
          data: result
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante análise de sentimento';
        logger.error('[ConsultantAIService] Erro:', errorMessage);
        return { success: false, error: errorMessage };
      }
    });
  }

  /**
   * Gera um plano de vendas baseado em dados históricos
   * @param salesData Dados históricos de vendas
   * @param targetGrowth Crescimento alvo (%)
   * @param timeframe Período de tempo para o plano
   */
  public async generateSalesPlan(
    salesData: Record<string, any>,
    targetGrowth: number,
    timeframe: string
  ): Promise<AIResult<any>> {
    return this.executeWithRetry(async () => {
      logger.info('[ConsultantAIService] Gerando plano de vendas');
      
      // Validar API key
      if (!this.apiKey) {
        return { 
          success: false, 
          error: 'API Key não configurada. Use ConsultantAIService.setApiKey()' 
        };
      }
      
      try {
        // Construir prompt para plano de vendas
        const prompt = `
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
        
        // Fazer requisição para a API da OpenAI
        const response = await this.makeOpenAIRequest(prompt, { detailed: true });
        
        logger.info('[ConsultantAIService] Plano de vendas gerado com sucesso');
        
        // Processar resposta
        return {
          success: true,
          data: JSON.parse(response)
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante geração do plano de vendas';
        logger.error('[ConsultantAIService] Erro:', errorMessage);
        return { success: false, error: errorMessage };
      }
    });
  }

  /**
   * Executa uma função com retry e circuit breaker
   */
  private async executeWithRetry<T>(fn: () => Promise<AIResult<T>>): Promise<AIResult<T>> {
    try {
      // Executar com circuit breaker
      return await this.circuitBreaker.execute(fn);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante operação com IA';
      
      if (errorMessage.includes('Circuit Breaker')) {
        logger.error('[ConsultantAIService] Circuit Breaker aberto, muitas falhas recentes');
      } else {
        logger.error('[ConsultantAIService] Erro:', errorMessage);
      }
      
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Constrói um prompt para consultoria financeira
   */
  private buildFinancialConsultingPrompt(
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
  private buildSentimentAnalysisPrompt(texts: string[], context?: string): string {
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
   * Faz uma requisição para a API da OpenAI
   */
  private async makeOpenAIRequest(prompt: string, options: ConsultingOptions): Promise<string> {
    // Em um ambiente real, utilizaria-se fetch ou uma biblioteca como axios
    // para fazer a requisição à API da OpenAI.
    // No contexto desta implementação, estamos simulando a requisição.
    
    logger.info('[ConsultantAIService] Enviando requisição para OpenAI');
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulação de resposta para fins de demonstração
    // Em produção, este código seria substituído por uma chamada real à API da OpenAI
    
    // Simular resposta com base no tipo de prompt
    if (prompt.includes('consultor financeiro')) {
      return JSON.stringify(this.generateMockFinancialConsulting());
    } else if (prompt.includes('analista de sentimento')) {
      return JSON.stringify(this.generateMockSentimentAnalysis());
    } else {
      return JSON.stringify({
        content: "Este é um texto gerado como demonstração. Em uma implementação real, este conteúdo seria gerado pela API da OpenAI com base no prompt fornecido."
      });
    }
  }

  /**
   * Processa a resposta de uma consultoria financeira
   */
  private processFinancialConsultingResponse(response: string): FinancialConsultingResult {
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
  private processSentimentAnalysisResponse(response: string): SentimentAnalysisResult {
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

  /**
   * Gera dados simulados de consultoria financeira
   */
  private generateMockFinancialConsulting(): FinancialConsultingResult {
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
  private generateMockSentimentAnalysis(): SentimentAnalysisResult {
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
}

export default ConsultantAIService.getInstance();
