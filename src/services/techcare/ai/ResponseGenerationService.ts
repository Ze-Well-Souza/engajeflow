
import logger from "../../../utils/logger";

export interface AIGeneratedResponse {
  text: string;
  variations: string[];
  reasoning?: string;
}

export class ResponseGenerationService {
  /**
   * Gera uma resposta baseada no contexto
   */
  public static async generateResponse(prompt: string, apiKey: string, options?: { context?: string }): Promise<{ success: boolean; data?: AIGeneratedResponse; error?: string }> {
    try {
      const context = options?.context || '';
      logger.info(`[ResponseGenerationService] Gerando resposta para: "${context.substring(0, 50)}..."`);
      
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
      logger.error("[ResponseGenerationService] Erro ao gerar resposta:", error);
      return { success: false, error: "Falha na geração de resposta" };
    }
  }
}
