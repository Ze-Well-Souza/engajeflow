
/**
 * Serviço de navegação para o TechCare Connect Automator
 */
import { toast } from "sonner";

// Interfaces
interface NavigationResult {
  success: boolean;
  error?: string;
}

interface PageState {
  url: string;
  title: string;
  isLoaded: boolean;
  loadTime: number;
}

/**
 * Serviço responsável pela navegação no sistema TechCare
 */
class NavigationService {
  private static instance: NavigationService;
  private baseUrl: string | null = null;
  private currentPage: PageState | null = null;
  private navigationHistory: PageState[] = [];
  private readonly MAX_HISTORY_SIZE = 50;

  private constructor() {
    console.log('[NavigationService] Inicializado');
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
    console.log(`[NavigationService] Configurado com baseUrl: ${baseUrl}`);
  }

  /**
   * Navega para uma URL específica
   */
  public async navigateTo(path: string): Promise<NavigationResult> {
    try {
      if (!this.baseUrl) {
        throw new Error("Serviço não configurado");
      }

      const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
      const startTime = Date.now();
      
      console.log(`[NavigationService] Navegando para: ${url}`);
      
      // Simula navegação - em produção, isto seria feito com Puppeteer/Playwright
      const result = await this.simulateNavigation(url);
      
      if (result.success) {
        const loadTime = Date.now() - startTime;
        const newPage: PageState = {
          url,
          title: result.title || 'Página sem título',
          isLoaded: true,
          loadTime
        };
        
        this.currentPage = newPage;
        this.addToHistory(newPage);
        
        console.log(`[NavigationService] Navegação bem-sucedida para: ${url} (${loadTime}ms)`);
        return { success: true };
      } else {
        console.error(`[NavigationService] Falha na navegação para: ${url}`, result.error);
        toast.error(`Erro de navegação: ${result.error}`);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante navegação';
      console.error('[NavigationService] Erro durante navegação:', errorMessage);
      toast.error(`Erro de navegação: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Recarrega a página atual
   */
  public async refresh(): Promise<NavigationResult> {
    if (!this.currentPage) {
      return { success: false, error: "Nenhuma página carregada" };
    }
    return this.navigateTo(this.currentPage.url);
  }

  /**
   * Obtém a página atual
   */
  public getCurrentPage(): PageState | null {
    return this.currentPage;
  }

  /**
   * Obtém o histórico de navegação
   */
  public getHistory(): PageState[] {
    return [...this.navigationHistory];
  }

  /**
   * Limpa o histórico de navegação
   */
  public clearHistory(): void {
    this.navigationHistory = [];
    console.log('[NavigationService] Histórico de navegação limpo');
  }

  /**
   * Adiciona uma página ao histórico
   */
  private addToHistory(page: PageState): void {
    this.navigationHistory.unshift(page);
    
    // Manter histórico com tamanho limitado
    if (this.navigationHistory.length > this.MAX_HISTORY_SIZE) {
      this.navigationHistory.pop();
    }
  }

  /**
   * Simula uma navegação
   * Em produção, isto seria substituído por navegação real com Puppeteer/Playwright
   */
  private async simulateNavigation(url: string): Promise<{success: boolean, title?: string, error?: string}> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular alguns erros ocasionais para testar tratamento de erros
        if (Math.random() > 0.9) {
          resolve({ 
            success: false, 
            error: 'Tempo limite de conexão excedido' 
          });
          return;
        }
        
        if (url.includes('error')) {
          resolve({ 
            success: false, 
            error: 'Página não encontrada' 
          });
          return;
        }
        
        resolve({ 
          success: true, 
          title: `TechCare - ${url.split('/').pop() || 'Página Inicial'}`
        });
      }, 1000 + Math.random() * 500); // Simular variação no tempo de resposta
    });
  }
}

export default NavigationService.getInstance();
