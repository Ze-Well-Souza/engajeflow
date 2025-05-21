
/**
 * Serviço de navegação para o TechCare Connect Automator
 */
import AuthService from './AuthService';
import { getEnvVariable } from '../../utils/environment';
import logger from '../../utils/logger';

interface NavigationResult {
  success: boolean;
  error?: string;
  data?: any;
}

interface PageInfo {
  url: string;
  title?: string;
  isLoaded: boolean;
  timestamp: number;
}

/**
 * Serviço responsável pela navegação no sistema TechCare
 */
class NavigationService {
  private static instance: NavigationService;
  private baseUrl: string;
  private currentPage: PageInfo | null = null;
  private history: PageInfo[] = [];
  private readonly MAX_HISTORY = 50;

  private constructor() {
    this.baseUrl = getEnvVariable('TECHCARE_BASE_URL', 'https://app.techcare.com') as string;
    logger.info('[NavigationService] Inicializado com baseUrl:', this.baseUrl);
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
   * Configura o serviço de navegação
   */
  public configure(baseUrl: string): void {
    this.baseUrl = baseUrl;
    logger.info('[NavigationService] Configurado com baseUrl:', baseUrl);
  }

  /**
   * Navega para uma rota específica
   * @param route Rota para navegação (ex: '/dashboard', '/clients')
   * @param params Parâmetros opcionais da rota
   */
  public async navigateTo(route: string, params: Record<string, any> = {}): Promise<NavigationResult> {
    try {
      // Verificar autenticação
      if (!AuthService.isAuthenticated()) {
        logger.warn('[NavigationService] Tentativa de navegação sem autenticação');
        return { success: false, error: 'Não autenticado' };
      }

      // Construir URL
      const url = this.buildUrl(route, params);
      logger.info('[NavigationService] Navegando para:', url);

      // Em um ambiente real, usaríamos Puppeteer ou outra biblioteca de automação
      // para fazer a navegação efetiva. Aqui simulamos o comportamento.
      const result = await this.simulateNavigation(url);

      if (result.success) {
        // Atualizar página atual
        const pageInfo: PageInfo = {
          url,
          title: route,
          isLoaded: true,
          timestamp: Date.now()
        };
        
        this.currentPage = pageInfo;
        this.addToHistory(pageInfo);
        
        logger.info('[NavigationService] Navegação bem-sucedida para:', url);
      } else {
        logger.error('[NavigationService] Falha na navegação para:', url, result.error);
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante navegação';
      logger.error('[NavigationService] Erro durante navegação:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Recarrega a página atual
   */
  public async refresh(): Promise<NavigationResult> {
    if (!this.currentPage) {
      return { success: false, error: 'Nenhuma página carregada para atualizar' };
    }
    
    logger.info('[NavigationService] Recarregando página atual:', this.currentPage.url);
    return this.navigateTo(this.currentPage.url);
  }

  /**
   * Obtém a página atual
   */
  public getCurrentPage(): PageInfo | null {
    return this.currentPage;
  }

  /**
   * Obtém o histórico de navegação
   */
  public getHistory(): PageInfo[] {
    return [...this.history];
  }

  /**
   * Limpa o histórico de navegação
   */
  public clearHistory(): void {
    this.history = [];
    logger.info('[NavigationService] Histórico de navegação limpo');
  }

  /**
   * Adiciona uma página ao histórico
   */
  private addToHistory(page: PageInfo): void {
    this.history.unshift(page);
    
    // Limitar tamanho do histórico
    if (this.history.length > this.MAX_HISTORY) {
      this.history.pop();
    }
  }

  /**
   * Constrói uma URL a partir de uma rota e parâmetros
   */
  private buildUrl(route: string, params: Record<string, any>): string {
    // Garantir que a rota comece com '/'
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    
    // Construir URL base
    let url = `${this.baseUrl}${normalizedRoute}`;
    
    // Adicionar parâmetros se houver
    if (Object.keys(params).length > 0) {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
      
      url += `?${queryString}`;
    }
    
    return url;
  }

  /**
   * Simula a navegação para uma URL
   * Em produção, isto seria substituído por navegação real usando Puppeteer ou similar
   */
  private async simulateNavigation(url: string): Promise<NavigationResult> {
    return new Promise((resolve) => {
      // Simular delay de rede
      setTimeout(() => {
        // Validação básica da URL para simulação
        if (url.includes(this.baseUrl)) {
          // Páginas de erro para teste
          if (url.includes('/error-page')) {
            resolve({ success: false, error: 'Página não encontrada ou acesso negado' });
            return;
          }
          
          resolve({ success: true, data: { url } });
        } else {
          resolve({ success: false, error: 'URL inválida' });
        }
      }, 500);
    });
  }
}

export default NavigationService.getInstance();
