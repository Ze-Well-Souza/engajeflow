
/**
 * Serviço de IA consultiva para o TechCare Connect Automator
 */
import { getEnvVariable } from '../../utils/environment';
import logger from '../../utils/logger';
import { CircuitBreaker } from '../../utils/circuit-breaker';
import { 
  AIResult, 
  ConsultingOptions, 
  SentimentAnalysisResult, 
  FinancialConsultingResult 
} from './ai/types';
import { 
  buildFinancialConsultingPrompt, 
  buildSentimentAnalysisPrompt, 
  buildSalesPlanPrompt 
} from './ai/prompts';
import { 
  generateMockFinancialConsulting, 
  generateMockSentimentAnalysis 
} from './ai/mocks';
import { ResponseProcessor } from './ai/ResponseProcessor';

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
        const prompt = buildFinancialConsultingPrompt(businessData, goal, options.detailed || false);
        
        // Fazer requisição para a API da OpenAI
        const response = await this.makeOpenAIRequest(prompt, options);
        
        // Processar e estruturar a resposta
        const result = ResponseProcessor.processFinancialConsultingResponse(response);
        
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
        const prompt = buildSentimentAnalysisPrompt(texts, context);
        
        // Fazer requisição para a API da OpenAI
        const response = await this.makeOpenAIRequest(prompt, { format: 'json' });
        
        // Processar e estruturar a resposta
        const result = ResponseProcessor.processSentimentAnalysisResponse(response);
        
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
        const prompt = buildSalesPlanPrompt(salesData, targetGrowth, timeframe);
        
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
   * Faz uma requisição para a API da OpenAI
   */
  private async makeOpenAIRequest(prompt: string, options: ConsultingOptions): Promise<string> {
    // Em um ambiente real, utilizaria-se fetch ou uma biblioteca como axios
    // para fazer a requisição à API da OpenAI.
    // No contexto desta implementação, estamos simulando a requisição.
    
    logger.info('[ConsultantAIService] Enviando requisição para OpenAI');
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular resposta com base no tipo de prompt
    if (prompt.includes('consultor financeiro')) {
      return JSON.stringify(generateMockFinancialConsulting());
    } else if (prompt.includes('analista de sentimento')) {
      return JSON.stringify(generateMockSentimentAnalysis());
    } else {
      return JSON.stringify({
        content: "Este é um texto gerado como demonstração. Em uma implementação real, este conteúdo seria gerado pela API da OpenAI com base no prompt fornecido."
      });
    }
  }
}

export default ConsultantAIService.getInstance();
