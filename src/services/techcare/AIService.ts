
/**
 * Serviço de IA para o TechCare Connect Automator
 */
import { toast } from "sonner";

// Tipos e interfaces
export interface AIAnalysisResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  processingTime?: number;
}

export interface SentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  confidence: number;
  keyPhrases: string[];
}

export interface TextClassificationResult {
  category: string;
  confidence: number;
  subcategories?: string[];
}

export interface TextSummaryResult {
  summary: string;
  keyPoints: string[];
  originalLength: number;
  summaryLength: number;
}

export interface AIGeneratedResponse {
  text: string;
  variations: string[];
  reasoning: string;
}

export interface AIInsight {
  title: string;
  description: string;
  metrics: Record<string, number>;
  recommendations: string[];
  priority: "high" | "medium" | "low";
}

/**
 * Serviço para integração com APIs de IA
 */
class AIService {
  private static instance: AIService;
  private apiKey: string | null = null;
  private apiEndpoint: string | null = null;
  private lastError: Error | null = null;
  private readonly DEFAULT_MODEL = "gpt-3.5-turbo";

  private constructor() {
    console.log('[AIService] Inicializado');
  }

  /**
   * Obtém a instância singleton do serviço
   */
  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  /**
   * Configura o serviço de IA
   * @param config Configuração do serviço
   */
  public configure(config: { apiKey: string; apiEndpoint?: string }): void {
    this.apiKey = config.apiKey;
    this.apiEndpoint = config.apiEndpoint || "https://api.openai.com/v1";
    console.log(`[AIService] Configurado com endpoint: ${this.apiEndpoint}`);
  }

  /**
   * Analisa o sentimento de um texto
   * @param text O texto a ser analisado
   */
  public async analyzeSentiment(text: string): Promise<AIAnalysisResult<SentimentAnalysisResult>> {
    try {
      if (!this.apiKey) {
        throw new Error("API de IA não configurada");
      }
      
      console.log(`[AIService] Analisando sentimento do texto: "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
      
      // Em uma implementação real, aqui faria uma chamada para a API de IA (OpenAI, Azure, etc)
      // Simulação de análise de sentimento
      const result = await this.simulateSentimentAnalysis(text);
      
      return {
        success: true,
        data: result,
        processingTime: 1.2 // segundos
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante análise de sentimento';
      console.error('[AIService] Erro na análise de sentimento:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro na análise: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Classifica o tipo de um texto (ex: suporte, cobrança, elogio, etc)
   * @param text Texto a ser classificado
   */
  public async classifyText(text: string): Promise<AIAnalysisResult<TextClassificationResult>> {
    try {
      if (!this.apiKey) {
        throw new Error("API de IA não configurada");
      }
      
      console.log(`[AIService] Classificando texto: "${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
      
      // Simulação de classificação
      const result = await this.simulateTextClassification(text);
      
      return {
        success: true,
        data: result,
        processingTime: 0.9 // segundos
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante classificação de texto';
      console.error('[AIService] Erro na classificação de texto:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro na classificação: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Gera um resumo de um texto longo
   * @param text Texto a ser resumido
   * @param maxLength Tamanho máximo do resumo (caracteres)
   */
  public async summarizeText(text: string, maxLength?: number): Promise<AIAnalysisResult<TextSummaryResult>> {
    try {
      if (!this.apiKey) {
        throw new Error("API de IA não configurada");
      }
      
      console.log(`[AIService] Resumindo texto de ${text.length} caracteres`);
      
      // Simulação de resumo
      const result = await this.simulateTextSummarization(text, maxLength);
      
      return {
        success: true,
        data: result,
        processingTime: 2.1 // segundos
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante resumo de texto';
      console.error('[AIService] Erro no resumo de texto:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro no resumo: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Gera uma resposta automática com base em um contexto
   * @param prompt Contexto ou pergunta para gerar resposta
   * @param options Opções de geração
   */
  public async generateResponse(
    prompt: string, 
    options?: { temperature?: number; maxTokens?: number; context?: string }
  ): Promise<AIAnalysisResult<AIGeneratedResponse>> {
    try {
      if (!this.apiKey) {
        throw new Error("API de IA não configurada");
      }
      
      console.log(`[AIService] Gerando resposta para: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"`);
      
      // Simulação de geração de resposta
      const result = await this.simulateResponseGeneration(prompt, options);
      
      return {
        success: true,
        data: result,
        processingTime: 2.4 // segundos
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante geração de resposta';
      console.error('[AIService] Erro na geração de resposta:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro na geração: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Gera insights com base em dados de conversas e métricas
   * @param data Dados para análise
   */
  public async generateInsights(data: any): Promise<AIAnalysisResult<AIInsight[]>> {
    try {
      if (!this.apiKey) {
        throw new Error("API de IA não configurada");
      }
      
      console.log('[AIService] Gerando insights com base nos dados fornecidos');
      
      // Simulação de geração de insights
      const result = await this.simulateInsightsGeneration(data);
      
      return {
        success: true,
        data: result,
        processingTime: 3.2 // segundos
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante geração de insights';
      console.error('[AIService] Erro na geração de insights:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro nos insights: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Obtém o último erro ocorrido
   */
  public getLastError(): Error | null {
    return this.lastError;
  }

  /**
   * Limpa o último erro registrado
   */
  public clearLastError(): void {
    this.lastError = null;
  }

  /**
   * Verifica se o serviço de IA está configurado
   */
  public isConfigured(): boolean {
    return this.apiKey !== null;
  }

  // Métodos de simulação privados para desenvolvimento e teste

  /**
   * Simula análise de sentimento
   * Em produção, seria substituído por integração real com API de IA
   */
  private async simulateSentimentAnalysis(text: string): Promise<SentimentAnalysisResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Lógica simples para demonstração
        const lowerText = text.toLowerCase();
        const positiveWords = ['bom', 'ótimo', 'excelente', 'gostei', 'perfeito', 'feliz', 'satisfeito'];
        const negativeWords = ['ruim', 'péssimo', 'problema', 'erro', 'falha', 'insatisfeito', 'triste'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        for (const word of positiveWords) {
          if (lowerText.includes(word)) positiveCount += 1;
        }
        
        for (const word of negativeWords) {
          if (lowerText.includes(word)) negativeCount += 1;
        }
        
        let sentiment: "positive" | "negative" | "neutral" = "neutral";
        let score = 0;
        
        if (positiveCount > negativeCount) {
          sentiment = "positive";
          score = Math.min(0.5 + 0.1 * positiveCount, 0.95);
        } else if (negativeCount > positiveCount) {
          sentiment = "negative";
          score = Math.min(0.5 + 0.1 * negativeCount, 0.95);
        } else {
          score = 0.5;
        }
        
        // Extrair frases-chave simples
        const sentences = text.split(/[.!?]/g).filter(s => s.trim().length > 0);
        const keyPhrases = sentences
          .filter((_, i) => i < 3) // Apenas as primeiras 3 frases para simplificar
          .map(s => s.trim());
        
        resolve({
          sentiment,
          score,
          confidence: 0.7 + Math.random() * 0.2,
          keyPhrases
        });
      }, 800);
    });
  }

  /**
   * Simula classificação de texto
   */
  private async simulateTextClassification(text: string): Promise<TextClassificationResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulação de classificação com regras simples
        const lowerText = text.toLowerCase();
        
        // Categorias simuladas
        const categories = [
          { name: "suporte_tecnico", keywords: ["ajuda", "problema", "erro", "não funciona", "bug", "quebrou"] },
          { name: "cobranca", keywords: ["pagamento", "fatura", "cobrar", "preço", "valor", "plano", "assinatura"] },
          { name: "elogio", keywords: ["parabéns", "obrigado", "gostei", "excelente", "ótimo", "maravilhoso"] },
          { name: "reclamacao", keywords: ["insatisfeito", "ruim", "péssimo", "horrível", "cancelar", "decepcionado"] },
          { name: "duvida", keywords: ["como", "quando", "onde", "porquê", "qual", "quero saber"] },
        ];
        
        const matches = categories.map(category => {
          const matchCount = category.keywords.filter(kw => lowerText.includes(kw)).length;
          return {
            category: category.name,
            matches: matchCount,
            confidence: matchCount > 0 ? Math.min(0.5 + matchCount * 0.1, 0.95) : 0.1
          };
        });
        
        // Ordenar por número de matches
        matches.sort((a, b) => b.matches - a.matches);
        
        const bestMatch = matches[0];
        
        // Encontrar subcategorias baseado em regras simples
        let subcategories: string[] = [];
        
        if (bestMatch.category === "suporte_tecnico") {
          if (lowerText.includes("instalação") || lowerText.includes("instalar")) {
            subcategories.push("instalacao");
          }
          if (lowerText.includes("login") || lowerText.includes("senha")) {
            subcategories.push("acesso");
          }
          if (lowerText.includes("lentidão") || lowerText.includes("lento")) {
            subcategories.push("desempenho");
          }
        }
        
        resolve({
          category: bestMatch.category,
          confidence: bestMatch.confidence,
          subcategories: subcategories.length > 0 ? subcategories : undefined
        });
      }, 600);
    });
  }

  /**
   * Simula resumo de texto
   */
  private async simulateTextSummarization(text: string, maxLength?: number): Promise<TextSummaryResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sentences = text.split(/[.!?]/g).filter(s => s.trim().length > 0);
        
        // Simples simulação de resumo pegando apenas algumas sentenças
        const numSentencesToKeep = Math.min(3, Math.ceil(sentences.length * 0.3));
        const summaryText = sentences.slice(0, numSentencesToKeep).join(". ") + ".";
        
        // Simulação de pontos-chave
        const keyPoints = sentences
          .filter((_, i) => i % Math.ceil(sentences.length / 3) === 0)
          .slice(0, 3)
          .map(s => s.trim());
        
        resolve({
          summary: summaryText,
          keyPoints,
          originalLength: text.length,
          summaryLength: summaryText.length
        });
      }, 1200);
    });
  }

  /**
   * Simula geração de resposta
   */
  private async simulateResponseGeneration(
    prompt: string, 
    options?: { temperature?: number; maxTokens?: number; context?: string }
  ): Promise<AIGeneratedResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Respostas pré-definidas para simulação
        const responses = {
          support: [
            "Entendi seu problema. Vou ajudar a resolver isso o mais rápido possível. Primeiro, poderia tentar reiniciar o sistema e me dizer se o erro persiste?",
            "Obrigado por reportar esse problema. Nossa equipe técnica já foi notificada e estamos trabalhando na solução. Enquanto isso, você pode tentar esta solução alternativa..."
          ],
          billing: [
            "Verificamos seu histórico de pagamentos e identificamos que houve uma cobrança duplicada no último ciclo. Já providenciamos o estorno, que aparecerá em sua fatura em 3-5 dias úteis.",
            "Sua fatura foi emitida corretamente de acordo com o plano contratado. O valor aumentou devido ao uso excedente de recursos, conforme detalhado na seção 'Uso adicional'."
          ],
          general: [
            "Agradecemos seu contato. Um especialista analisará sua mensagem e retornará em até 24 horas com uma resposta personalizada.",
            "Recebemos sua mensagem e já encaminhamos para o setor responsável. Você receberá uma notificação assim que tivermos uma atualização sobre o assunto."
          ]
        };
        
        // Determinar qual tipo de resposta gerar com base no prompt
        let responseType: keyof typeof responses = "general";
        
        if (prompt.toLowerCase().includes("problema") || 
            prompt.toLowerCase().includes("erro") || 
            prompt.toLowerCase().includes("ajuda")) {
          responseType = "support";
        } else if (prompt.toLowerCase().includes("pagamento") || 
                   prompt.toLowerCase().includes("cobrar") || 
                   prompt.toLowerCase().includes("fatura")) {
          responseType = "billing";
        }
        
        // Pegar respostas para o tipo identificado
        const availableResponses = responses[responseType];
        const primaryResponse = availableResponses[0];
        
        // Simular variações adicionando pequenas modificações
        const variations = [
          primaryResponse,
          availableResponses[1] || primaryResponse
        ];
        
        resolve({
          text: primaryResponse,
          variations,
          reasoning: `Esta resposta foi selecionada porque o prompt foi categorizado como ${responseType}.`
        });
      }, 1500);
    });
  }

  /**
   * Simula geração de insights
   */
  private async simulateInsightsGeneration(data: any): Promise<AIInsight[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Insights simulados
        const insights: AIInsight[] = [
          {
            title: "Alta taxa de problemas técnicos",
            description: "Houve um aumento de 23% nas mensagens relacionadas a problemas técnicos nos últimos 7 dias.",
            metrics: {
              "aumento_percentual": 23,
              "total_mensagens": 157,
              "tempo_medio_resolucao": 3.5 // horas
            },
            recommendations: [
              "Verificar recentes atualizações do sistema que possam ter causado problemas",
              "Considerar adicionar mais informações na seção de FAQ sobre os problemas mais comuns"
            ],
            priority: "high"
          },
          {
            title: "Feedback positivo sobre nova funcionalidade",
            description: "A nova funcionalidade de exportação de relatórios está recebendo avaliações positivas.",
            metrics: {
              "media_avaliacao": 4.7,
              "total_avaliacoes": 43,
              "taxa_utilizacao": 0.62 // 62%
            },
            recommendations: [
              "Destacar esta funcionalidade em materiais de marketing",
              "Considerar expandir com recursos semelhantes"
            ],
            priority: "medium"
          },
          {
            title: "Oportunidade de cross-sell identificada",
            description: "Clientes do plano básico estão frequentemente perguntando sobre recursos premium.",
            metrics: {
              "conversoes_potenciais": 28,
              "receita_estimada": 4200,
              "intencao_de_compra": 0.35 // 35%
            },
            recommendations: [
              "Oferecer período de teste gratuito dos recursos premium para esses clientes",
              "Criar campanha específica destacando as vantagens do upgrade"
            ],
            priority: "medium"
          }
        ];
        
        resolve(insights);
      }, 2000);
    });
  }
}

export default AIService.getInstance();
