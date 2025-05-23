
import logger from "../../../utils/logger";

export interface TextClassificationResult {
  category: string;
  confidence: number;
  subcategories?: string[];
}

export class TextClassificationService {
  /**
   * Classifica um ticket baseado no texto
   */
  public static async classifyTicket(text: string, apiKey: string): Promise<{ success: boolean; data?: TextClassificationResult; error?: string }> {
    try {
      logger.info(`[TextClassificationService] Classificando ticket: "${text.substring(0, 50)}..."`);
      
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
      logger.error("[TextClassificationService] Erro ao classificar ticket:", error);
      return { success: false, error: "Falha na classificação do ticket" };
    }
  }
}
