
/**
 * Tipos para resultados da IA
 */
export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
  keyPhrases: string[];
}

export interface TextClassificationResult {
  category: string;
  confidence: number;
  subcategories?: string[];
}

export interface AIGeneratedResponse {
  text: string;
  variations: string[];
  reasoning?: string;
}

export interface TextSummaryResult {
  summary: string;
  keyPoints: string[];
  originalLength: number;
  summaryLength: number;
}

export interface AIInsight {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  metrics: Record<string, any>;
  recommendations: string[];
}

/**
 * Serviço para gerenciar operações de IA no TechCare Connect
 */
class AIService {
  private static instance: AIService;
  private apiKey: string | null = null;
  private useGemini: boolean = true;

  // Construtor privado para padrão Singleton
  private constructor() {}

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
    
    console.log(`Serviço de IA configurado com sucesso. Usando Gemini: ${this.useGemini}`);
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
      console.log(`Analisando sentimento do texto: "${text.substring(0, 50)}..."`);
      
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
      console.error("Erro ao analisar sentimento:", error);
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
      console.log(`Classificando ticket: "${text.substring(0, 50)}..."`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Classificação simulada baseada em palavras-chave
      const lowercaseText = text.toLowerCase();
      
      const categoryKeywords = {
        'suporte_tecnico': ['login', 'senha', 'acessar', 'acesso', 'conta', 'autenticação', 'erro', 'bug', 'falha'],
        'cobranca': ['pagamento', 'cobrança', 'pagar', 'fatura', 'boleto', 'cartão'],
        'elogio': ['bom', 'ótimo', 'excelente', 'parabéns', 'agradeço'],
        'reclamacao': ['problema', 'insatisfeito', 'ruim', 'péssimo', 'reclamação'],
        'duvida': ['como', 'dúvida', 'pergunta', 'informação']
      };
      
      // Contar ocorrências de palavras-chave por categoria
      const categoryMatches = Object.entries(categoryKeywords).map(([category, keywords]) => {
        const matches = keywords.filter(keyword => lowercaseText.includes(keyword)).length;
        return { category, matches };
      });
      
      // Ordenar por número de ocorrências
      categoryMatches.sort((a, b) => b.matches - a.matches);
      
      // Categoria principal
      const primaryCategory = categoryMatches[0].matches > 0 ? categoryMatches[0].category : 'duvida';
      
      const result: TextClassificationResult = {
        category: primaryCategory,
        confidence: 0.82,
        subcategories: categoryMatches.filter(c => c.matches > 0 && c.category !== primaryCategory).map(c => c.category)
      };

      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao classificar ticket:", error);
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
      const context = options?.context || '';
      console.log(`Gerando resposta para: "${context.substring(0, 50)}..."`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Gerar resposta simulada baseada em templates
      const lowercaseContext = context.toLowerCase();
      
      // Templates de resposta por tipo de problema
      const responseTemplates = {
        login: [
          "Entendo sua dificuldade para acessar a conta. Por favor, tente redefinir sua senha através da opção 'Esqueci minha senha' na tela de login.",
          "Lamento pelo inconveniente com o acesso à sua conta. Uma solução simples seria limpar os cookies do navegador e tentar novamente."
        ],
        payment: [
          "Compreendo sua preocupação com o pagamento. Poderia me informar o número da fatura para que eu possa verificar o status?",
          "Em relação ao seu problema de pagamento, posso ajudar verificando os detalhes da transação."
        ],
        technical: [
          "Sinto muito pelo problema técnico. Para ajudar na resolução, poderia me informar qual navegador está utilizando?",
          "Entendo sua frustração com esse problema técnico. Vamos tentar algumas soluções: primeiro, tente limpar o cache do navegador."
        ],
        general: [
          "Obrigado por entrar em contato conosco. Estou à disposição para ajudar com sua solicitação.",
          "Agradeço seu contato. Nossa equipe está comprometida em resolver sua questão o mais rápido possível."
        ]
      };
      
      // Determinar qual tipo de problema baseado em palavras-chave
      let responseType = 'general';
      
      if (/login|senha|acessar|acesso|conta|autenticação/.test(lowercaseContext)) {
        responseType = 'login';
      } else if (/pagamento|cobrança|pagar|fatura|boleto|cartão/.test(lowercaseContext)) {
        responseType = 'payment';
      } else if (/erro|bug|travando|falha|problema técnico|não funciona/.test(lowercaseContext)) {
        responseType = 'technical';
      }
      
      // Selecionar uma resposta aleatória do template adequado
      const templates = responseTemplates[responseType as keyof typeof responseTemplates];
      const responseText = templates[Math.floor(Math.random() * templates.length)];
      
      const result: AIGeneratedResponse = {
        text: responseText,
        variations: templates,
        reasoning: `Resposta gerada baseada no contexto detectado: ${responseType}`
      };

      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao gerar resposta:", error);
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
      console.log(`Sumarizando texto de ${text.length} caracteres`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Extrair linhas da conversa
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      
      // Identificar problemas mencionados
      const problemPhrases = lines.filter(line => 
        /problema|erro|dificuldade|não consigo|falha/.test(line.toLowerCase())
      );
      
      // Identificar soluções ou ações
      const solutionPhrases = lines.filter(line => 
        /resolv|solucion|ajud|suporte|verificar|criar|enviar/.test(line.toLowerCase())
      );
      
      // Verificar se a conversa foi resolvida
      const wasResolved = /resolv|consegui|funciona|obrigado|agradeço/.test(text.toLowerCase().split('\n').slice(-3).join(' '));
      
      // Construir sumário
      const summary = `O cliente relatou problemas para acessar sua conta, não recebendo e-mails de confirmação para redefinição de senha. ${
        solutionPhrases.length > 0 ? 
        'Foi oferecida uma solução alternativa com um link de acesso temporário.' :
        'O atendente está trabalhando para resolver o problema.'
      } ${
        wasResolved ? 
        'O problema foi resolvido com sucesso.' :
        'O caso ainda está em andamento.'
      }`;
      
      const result: TextSummaryResult = {
        summary,
        keyPoints: [
          "Problema de acesso à conta",
          "Falha no recebimento de e-mails",
          ...(solutionPhrases.length > 0 ? ["Link temporário fornecido"] : []),
          ...(wasResolved ? ["Cliente conseguiu acessar"] : [])
        ],
        originalLength: text.length,
        summaryLength: summary.length
      };

      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao sumarizar texto:", error);
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
      console.log("Gerando insights com base nos dados do dashboard");
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Insights simulados
      const insights: AIInsight[] = [
        {
          title: "Aumento de problemas de login",
          description: "Detectamos um aumento de 32% em tickets relacionados a problemas de login na última semana.",
          priority: "high",
          metrics: {
            increase_percentage: 32,
            total_tickets: 45,
            trend: "up"
          },
          recommendations: [
            "Revisar as alterações de segurança implementadas",
            "Enviar comunicado aos usuários sobre mudanças"
          ]
        },
        {
          title: "Feedback positivo sobre nova funcionalidade",
          description: "A funcionalidade de agendamento está recebendo 87% de feedback positivo.",
          priority: "low",
          metrics: {
            satisfaction_rate: 87,
            total_feedback: 150,
            trend: "stable"
          },
          recommendations: [
            "Usar como modelo para futuras implementações",
            "Documentar práticas de sucesso"
          ]
        }
      ];

      return { success: true, data: insights };
    } catch (error) {
      console.error("Erro ao gerar insights:", error);
      return { success: false, error: "Falha na geração de insights" };
    }
  }
}

// Exportar singleton
export default AIService.getInstance();
