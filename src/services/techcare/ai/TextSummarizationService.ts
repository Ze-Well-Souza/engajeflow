
import logger from "../../../utils/logger";

export interface TextSummaryResult {
  summary: string;
  keyPoints: string[];
  originalLength: number;
  summaryLength: number;
}

export class TextSummarizationService {
  /**
   * Sumariza um texto ou conversa
   */
  public static async summarizeText(text: string, apiKey: string, maxLength?: number): Promise<{ success: boolean; data?: TextSummaryResult; error?: string }> {
    try {
      logger.info(`[TextSummarizationService] Sumarizando texto de ${text.length} caracteres`);
      
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
      logger.error("[TextSummarizationService] Erro ao sumarizar texto:", error);
      return { success: false, error: "Falha na sumarização de texto" };
    }
  }
}
