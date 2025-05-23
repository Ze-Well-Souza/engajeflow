
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
  public async analyzeSentiment(text: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Serviço de IA não configurado");
    }

    try {
      console.log(`Analisando sentimento do texto: "${text.substring(0, 50)}..."`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Análise simulada baseada em palavras-chave
      const lowercaseText = text.toLowerCase();
      let sentiment = 'neutral';
      let score = 0;
      
      const negativeWords = ['problema', 'erro', 'falha', 'péssimo', 'ruim', 'horrível', 'insatisfeito', 'urgência', 'frustrado'];
      const positiveWords = ['bom', 'ótimo', 'excelente', 'satisfeito', 'feliz', 'agradeço', 'parabéns', 'incrível', 'funciona'];
      
      // Contar ocorrências de palavras negativas e positivas
      const negativeCount = negativeWords.filter(word => lowercaseText.includes(word)).length;
      const positiveCount = positiveWords.filter(word => lowercaseText.includes(word)).length;
      
      if (negativeCount > positiveCount) {
        sentiment = 'negative';
        score = -0.3 - (negativeCount * 0.1);  // Score negativo baseado na quantidade de palavras negativas
      } else if (positiveCount > negativeCount) {
        sentiment = 'positive';
        score = 0.3 + (positiveCount * 0.1);  // Score positivo baseado na quantidade de palavras positivas
      }
      
      // Limitar o score entre -1 e 1
      score = Math.max(-1, Math.min(1, score));
      
      return {
        sentiment,
        score,
        confidence: 0.85,
        analysis: {
          urgency: sentiment === 'negative' ? 'high' : 'low',
          emotionalTone: sentiment === 'negative' ? 'frustration' : (sentiment === 'positive' ? 'satisfaction' : 'neutral'),
          keyPhrases: text.split('.').slice(0, 2).map(s => s.trim()).filter(s => s.length > 0)
        }
      };
    } catch (error) {
      console.error("Erro ao analisar sentimento:", error);
      throw new Error("Falha na análise de sentimento");
    }
  }

  /**
   * Classifica um ticket baseado no texto
   */
  public async classifyTicket(text: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Serviço de IA não configurado");
    }

    try {
      console.log(`Classificando ticket: "${text.substring(0, 50)}..."`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Classificação simulada baseada em palavras-chave
      const lowercaseText = text.toLowerCase();
      
      const categoryKeywords = {
        'login': ['login', 'senha', 'acessar', 'acesso', 'conta', 'autenticação'],
        'payment': ['pagamento', 'cobrança', 'pagar', 'fatura', 'boleto', 'cartão'],
        'technical': ['erro', 'bug', 'travando', 'falha', 'problema técnico', 'não funciona'],
        'feature': ['funcionalidade', 'recurso', 'implementar', 'adicionar', 'nova função'],
        'account': ['minha conta', 'perfil', 'cadastro', 'dados', 'informações'],
        'other': []
      };
      
      // Contar ocorrências de palavras-chave por categoria
      const categoryMatches = Object.entries(categoryKeywords).map(([category, keywords]) => {
        const matches = keywords.filter(keyword => lowercaseText.includes(keyword)).length;
        return { category, matches };
      });
      
      // Ordenar por número de ocorrências
      categoryMatches.sort((a, b) => b.matches - a.matches);
      
      // Categoria principal e secundária
      const primaryCategory = categoryMatches[0].matches > 0 ? categoryMatches[0].category : 'other';
      const secondaryCategory = categoryMatches[1]?.matches > 0 ? categoryMatches[1].category : null;
      
      // Determinar prioridade baseada em palavras de urgência
      const urgencyKeywords = ['urgente', 'urgência', 'imediato', 'agora', 'crítico', 'emergência'];
      const hasUrgency = urgencyKeywords.some(keyword => lowercaseText.includes(keyword));
      
      return {
        category: primaryCategory,
        secondaryCategory,
        priority: hasUrgency ? 'high' : 'medium',
        confidence: 0.82,
        tags: [
          primaryCategory,
          ...(secondaryCategory ? [secondaryCategory] : []),
          ...(hasUrgency ? ['urgent'] : [])
        ]
      };
    } catch (error) {
      console.error("Erro ao classificar ticket:", error);
      throw new Error("Falha na classificação do ticket");
    }
  }

  /**
   * Gera uma resposta baseada no contexto
   */
  public async generateResponse(context: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Serviço de IA não configurado");
    }

    try {
      console.log(`Gerando resposta para: "${context.substring(0, 50)}..."`);
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Gerar resposta simulada baseada em templates
      const lowercaseContext = context.toLowerCase();
      
      // Templates de resposta por tipo de problema
      const responseTemplates = {
        login: [
          "Entendo sua dificuldade para acessar a conta. Por favor, tente redefinir sua senha através da opção 'Esqueci minha senha' na tela de login. Se o problema persistir, verifique se o e-mail está correto e se a mensagem não foi para a pasta de spam.",
          "Lamento pelo inconveniente com o acesso à sua conta. Uma solução simples seria limpar os cookies do navegador e tentar novamente. Também recomendo verificar se seu e-mail de cadastro está correto."
        ],
        payment: [
          "Compreendo sua preocupação com o pagamento. Poderia me informar o número da fatura e a data de vencimento para que eu possa verificar o status em nosso sistema?",
          "Em relação ao seu problema de pagamento, posso ajudar verificando os detalhes da transação. Por favor, confirme o método de pagamento utilizado e quando a tentativa foi realizada."
        ],
        technical: [
          "Sinto muito pelo problema técnico que está enfrentando. Para ajudar na resolução, poderia me informar qual sistema operacional e navegador está utilizando? Também seria útil saber se o erro começou após alguma atualização recente.",
          "Entendo sua frustração com esse problema técnico. Vamos tentar algumas soluções: primeiro, tente limpar o cache do navegador; segundo, verifique se está usando a versão mais recente do nosso aplicativo; por último, reinicie o dispositivo."
        ],
        general: [
          "Obrigado por entrar em contato conosco. Estou à disposição para ajudar com sua solicitação. Poderia fornecer mais detalhes sobre o que precisa para que eu possa oferecer a melhor solução?",
          "Agradeço seu contato. Nossa equipe está comprometida em resolver sua questão o mais rápido possível. Para um atendimento mais eficiente, poderia compartilhar mais informações sobre sua necessidade?"
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
      
      return {
        responseText,
        alternativeResponses: templates.filter(t => t !== responseText),
        context: {
          detectedIntent: responseType,
          confidence: 0.78
        }
      };
    } catch (error) {
      console.error("Erro ao gerar resposta:", error);
      throw new Error("Falha na geração de resposta");
    }
  }

  /**
   * Sumariza um texto ou conversa
   */
  public async summarizeText(text: string): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Serviço de IA não configurado");
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
        'Foi oferecida uma solução alternativa com um link de acesso temporário enviado para um e-mail secundário.' :
        'O atendente está trabalhando para resolver o problema.'
      } ${
        wasResolved ? 
        'O problema foi resolvido com sucesso e o cliente conseguiu acessar sua conta.' :
        'O caso ainda está em andamento.'
      }`;
      
      return {
        summary,
        keyPoints: [
          "Problema de acesso à conta",
          "Falha no recebimento de e-mails de redefinição de senha",
          ...(solutionPhrases.length > 0 ? ["Link de acesso temporário fornecido"] : []),
          ...(wasResolved ? ["Cliente conseguiu acessar a conta"] : [])
        ],
        sentiment: wasResolved ? "positive" : "neutral",
        resolved: wasResolved
      };
    } catch (error) {
      console.error("Erro ao sumarizar texto:", error);
      throw new Error("Falha na sumarização de texto");
    }
  }

  /**
   * Gera insights baseados em dados do dashboard
   */
  public async generateInsights(data: any): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error("Serviço de IA não configurado");
    }

    try {
      console.log("Gerando insights com base nos dados do dashboard");
      
      // Simular resposta para demonstração
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Insights simulados
      return {
        insights: [
          {
            title: "Aumento de problemas de login",
            description: "Detectamos um aumento de 32% em tickets relacionados a problemas de login na última semana, possivelmente relacionado à recente atualização de segurança.",
            priority: "high",
            recommendation: "Revisar as alterações de segurança implementadas na última atualização e considerar enviar um comunicado aos usuários."
          },
          {
            title: "Horário de pico de atendimento",
            description: "O volume de tickets é consistentemente mais alto entre 14h e 16h, especialmente às segundas-feiras.",
            priority: "medium",
            recommendation: "Considere reforçar a equipe de atendimento durante esse período para melhorar os tempos de resposta."
          },
          {
            title: "Feedback positivo sobre nova funcionalidade",
            description: "A recente implementação da funcionalidade de agendamento está recebendo 87% de feedback positivo.",
            priority: "low",
            recommendation: "Use este caso de sucesso como modelo para futuras implementações de funcionalidades."
          }
        ],
        trends: {
          increasing: ["problemas de login", "usuários mobile"],
          decreasing: ["tempo médio de resolução", "tickets reabertos"]
        },
        performanceMetrics: {
          resolutionTime: {
            current: "5h 23min",
            trend: "improving",
            changePercentage: -12
          },
          customerSatisfaction: {
            current: "4.2/5",
            trend: "stable",
            changePercentage: 2
          }
        }
      };
    } catch (error) {
      console.error("Erro ao gerar insights:", error);
      throw new Error("Falha na geração de insights");
    }
  }
}

// Exportar singleton
export default AIService.getInstance();
