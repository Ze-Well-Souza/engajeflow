
import { RetryOptions } from "@/types/gateway";

export class RetryService {
  /**
   * Executa uma função com lógica de retry inteligente
   */
  async executeWithRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions
  ): Promise<T> {
    let lastError: any;
    let attempt = 0;

    while (attempt <= options.maxRetries) {
      try {
        if (attempt > 0) {
          console.log(`Retry: Tentativa ${attempt} de ${options.maxRetries}`);
        }
        return await fn();
      } catch (error) {
        lastError = error;
        
        // Verifica se devemos continuar tentando
        if (!options.shouldRetry(error)) {
          console.log(`Retry: Erro não retentável`, error);
          break;
        }
        
        // Se esta foi a última tentativa, não espere mais
        if (attempt >= options.maxRetries) {
          break;
        }
        
        // Cálculo do tempo de espera com backoff exponencial
        const delayMs = options.initialDelayMs * Math.pow(options.backoffFactor, attempt);
        console.log(`Retry: Aguardando ${delayMs}ms antes da próxima tentativa`);
        
        // Espera antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, delayMs));
        
        attempt++;
      }
    }
    
    console.log(`Retry: Todas as tentativas falharam após ${attempt} tentativas`);
    throw lastError;
  }

  /**
   * Avalia se um erro deve ser retentado com base em seu tipo e código
   */
  isRetryableError(error: any): boolean {
    // Erros de rede geralmente são retentáveis
    if (!error.response) {
      return true;
    }
    
    // Códigos de status que geralmente são retentáveis
    const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
    return retryableStatusCodes.includes(error.response.status);
  }

  /**
   * Obtém opções de retry personalizadas para tipos específicos de requisição
   */
  getOptionsForEndpoint(url: string, defaultOptions: RetryOptions): RetryOptions {
    // Se for um endpoint crítico, aumentar número de retries
    if (url.includes('/pagamentos') || url.includes('/auth')) {
      return {
        ...defaultOptions,
        maxRetries: Math.max(5, defaultOptions.maxRetries)
      };
    }
    
    // Opções padrão para outros endpoints
    return defaultOptions;
  }
}

export const retryService = new RetryService();
