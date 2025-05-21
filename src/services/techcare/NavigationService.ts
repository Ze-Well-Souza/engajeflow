
/**
 * Serviço de navegação para o TechCare Connect Automator
 */

import logger from '../../utils/logger';
import { getEnvVariable } from '../../utils/environment';
import { CircuitBreaker } from '../../utils/circuit-breaker';

/**
 * Resultado da navegação
 */
interface NavigationResult {
  success: boolean;
  error?: string;
}

/**
 * Serviço responsável pela navegação no sistema TechCare
 */
class NavigationService {
  private static instance: NavigationService;
  private baseUrl: string;
  private lastPage: string | null = null;
  private circuitBreaker: CircuitBreaker;
  
  private constructor() {
    // Definir URL base padrão
    this.baseUrl = getEnvVariable('TECHCARE_BASE_URL', 'https://app.techcare.com');
    
    // Configurar circuit breaker
    this.circuitBreaker = new CircuitBreaker({
      failureThreshold: 3,
      resetTimeout: 30000
    });
    
    logger.info('[NavigationService] Inicializado com base URL:', this.baseUrl);
  }
  
  /**
   * Obtém a instância singleton do serviço
   */
  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }
  
  /**
   * Configura a URL base para o serviço
   * @param baseUrl URL base do sistema TechCare
   */
  public configure(baseUrl: string): void {
    this.baseUrl = baseUrl;
    logger.info('[NavigationService] URL base configurada:', baseUrl);
  }
  
  /**
   * Obtém a URL base atual
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }
  
  /**
   * Obtém a última página visitada
   */
  public getLastPage(): string | null {
    return this.lastPage;
  }
  
  /**
   * Navega para uma página específica
   * @param path Caminho da página (relativo à URL base)
   * @param params Parâmetros opcionais de consulta
   */
  public async navigateTo(path: string, params: Record<string, any> = {}): Promise<NavigationResult> {
    return this.circuitBreaker.execute(async () => {
      try {
        // Construir URL completa
        let url = this.baseUrl;
        
        // Garantir que o path começa com /
        if (path && !path.startsWith('/')) {
          path = '/' + path;
        }
        
        // Adicionar o caminho à URL base
        url += path;
        
        // Adicionar parâmetros de consulta, se houver
        if (Object.keys(params).length > 0) {
          const queryParams = new URLSearchParams();
          for (const key in params) {
            queryParams.append(key, params[key]);
          }
          url += '?' + queryParams.toString();
        }
        
        logger.info('[NavigationService] Navegando para:', url);
        
        // Em produção, aqui seria implementada a lógica real de navegação com Puppeteer
        // Por enquanto, apenas simulamos a navegação
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Atualizar última página
        this.lastPage = path;
        
        logger.info('[NavigationService] Navegação concluída com sucesso');
        
        return { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante navegação';
        logger.error('[NavigationService] Erro ao navegar:', errorMessage);
        return { success: false, error: errorMessage };
      }
    });
  }
  
  /**
   * Voltar para a página anterior
   */
  public async goBack(): Promise<NavigationResult> {
    return this.circuitBreaker.execute(async () => {
      try {
        logger.info('[NavigationService] Voltando para a página anterior');
        
        // Em produção, aqui seria implementada a lógica real com Puppeteer
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao voltar página';
        logger.error('[NavigationService] Erro ao voltar página:', errorMessage);
        return { success: false, error: errorMessage };
      }
    });
  }
  
  /**
   * Recarrega a página atual
   */
  public async refresh(): Promise<NavigationResult> {
    return this.circuitBreaker.execute(async () => {
      try {
        logger.info('[NavigationService] Recarregando a página atual');
        
        // Em produção, aqui seria implementada a lógica real com Puppeteer
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao recarregar página';
        logger.error('[NavigationService] Erro ao recarregar página:', errorMessage);
        return { success: false, error: errorMessage };
      }
    });
  }
}

export default NavigationService.getInstance();
