/**
 * Serviço de scraping para o TechCare Connect Automator
 */
import { toast } from "sonner";
import NavigationService from "./NavigationService";

// Interfaces
interface ScrapeResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ScrapingOptions {
  timeout?: number;
  retries?: number;
  selector?: string;
}

/**
 * Serviço responsável pelo scraping de dados no sistema TechCare
 */
class ScrapingService {
  private static instance: ScrapingService;
  private readonly DEFAULT_TIMEOUT = 10000; // 10 segundos
  private readonly DEFAULT_RETRIES = 3;
  private lastError: Error | null = null;

  private constructor() {
    console.log('[ScrapingService] Inicializado');
  }

  /**
   * Obtém a instância singleton do serviço
   */
  public static getInstance(): ScrapingService {
    if (!ScrapingService.instance) {
      ScrapingService.instance = new ScrapingService();
    }
    return ScrapingService.instance;
  }

  /**
   * Extrai dados de uma tabela
   */
  public async scrapeTable<T>(selector: string, options: ScrapingOptions = {}): Promise<ScrapeResult<T[]>> {
    try {
      const timeout = options.timeout || this.DEFAULT_TIMEOUT;
      const retries = options.retries || this.DEFAULT_RETRIES;
      
      console.log(`[ScrapingService] Extraindo tabela com seletor: ${selector}`);
      
      // Verificar se a página está carregada
      const currentPage = NavigationService.getInstance().getCurrentPage();
      if (!currentPage || !currentPage.isLoaded) {
        throw new Error("Nenhuma página carregada ou página não finalizada");
      }
      
      // Simular extração de tabela - em produção seria com Puppeteer/Playwright
      const result = await this.simulateTableScraping<T>(selector, timeout, retries);
      
      if (result.success) {
        console.log(`[ScrapingService] Extração de tabela bem-sucedida, ${result.data?.length || 0} linhas encontradas`);
        return result;
      } else {
        console.error(`[ScrapingService] Falha na extração de tabela:`, result.error);
        this.lastError = new Error(result.error);
        toast.error(`Erro de extração: ${result.error}`);
        return result;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante extração';
      console.error('[ScrapingService] Erro durante extração de tabela:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro de extração: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Extrai um elemento específico
   */
  public async scrapeElement<T>(selector: string, options: ScrapingOptions = {}): Promise<ScrapeResult<T>> {
    try {
      const timeout = options.timeout || this.DEFAULT_TIMEOUT;
      const retries = options.retries || this.DEFAULT_RETRIES;
      
      console.log(`[ScrapingService] Extraindo elemento com seletor: ${selector}`);
      
      // Verificar se a página está carregada
      const currentPage = NavigationService.getInstance().getCurrentPage();
      if (!currentPage || !currentPage.isLoaded) {
        throw new Error("Nenhuma página carregada ou página não finalizada");
      }
      
      // Simular extração de elemento - em produção seria com Puppeteer/Playwright
      const result = await this.simulateElementScraping<T>(selector, timeout, retries);
      
      if (result.success) {
        console.log(`[ScrapingService] Extração de elemento bem-sucedida`);
        return result;
      } else {
        console.error(`[ScrapingService] Falha na extração de elemento:`, result.error);
        this.lastError = new Error(result.error);
        toast.error(`Erro de extração: ${result.error}`);
        return result;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante extração';
      console.error('[ScrapingService] Erro durante extração de elemento:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro de extração: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Preenche um formulário
   */
  public async fillForm(formData: Record<string, string>, options: ScrapingOptions = {}): Promise<ScrapeResult<void>> {
    try {
      console.log(`[ScrapingService] Preenchendo formulário com ${Object.keys(formData).length} campos`);
      
      // Verificar se a página está carregada
      const currentPage = NavigationService.getInstance().getCurrentPage();
      if (!currentPage || !currentPage.isLoaded) {
        throw new Error("Nenhuma página carregada ou página não finalizada");
      }
      
      // Simular preenchimento de formulário - em produção seria com Puppeteer/Playwright
      const result = await this.simulateFormFill(formData);
      
      if (result.success) {
        console.log(`[ScrapingService] Formulário preenchido com sucesso`);
        return result;
      } else {
        console.error(`[ScrapingService] Falha no preenchimento do formulário:`, result.error);
        this.lastError = new Error(result.error);
        toast.error(`Erro de preenchimento: ${result.error}`);
        return result;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante preenchimento';
      console.error('[ScrapingService] Erro durante preenchimento de formulário:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro de preenchimento: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Clica em um elemento
   */
  public async clickElement(selector: string, options: ScrapingOptions = {}): Promise<ScrapeResult<void>> {
    try {
      console.log(`[ScrapingService] Clicando em elemento com seletor: ${selector}`);
      
      // Verificar se a página está carregada
      const currentPage = NavigationService.getInstance().getCurrentPage();
      if (!currentPage || !currentPage.isLoaded) {
        throw new Error("Nenhuma página carregada ou página não finalizada");
      }
      
      // Simular clique em elemento - em produção seria com Puppeteer/Playwright
      const result = await this.simulateElementClick(selector);
      
      if (result.success) {
        console.log(`[ScrapingService] Clique em elemento bem-sucedido`);
        return result;
      } else {
        console.error(`[ScrapingService] Falha ao clicar em elemento:`, result.error);
        this.lastError = new Error(result.error);
        toast.error(`Erro ao clicar: ${result.error}`);
        return result;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao clicar';
      console.error('[ScrapingService] Erro ao clicar em elemento:', errorMessage);
      this.lastError = error instanceof Error ? error : new Error(errorMessage);
      toast.error(`Erro ao clicar: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Obtém o último erro ocorrido
   */
  public getLastError(): Error | null {
    return this.lastError;
  }

  /**
   * Limpa o último erro registrado
   */
  public clearLastError(): void {
    this.lastError = null;
  }

  /**
   * Simula extração de tabela
   * Em produção, isto seria substituído por scraping real com Puppeteer/Playwright
   */
  private async simulateTableScraping<T>(
    selector: string, 
    timeout: number, 
    retries: number
  ): Promise<ScrapeResult<T[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular alguns erros ocasionais para testar tratamento de erros
        if (Math.random() > 0.9) {
          resolve({ 
            success: false, 
            error: 'Elemento não encontrado na página' 
          });
          return;
        }
        
        if (selector.includes('error')) {
          resolve({ 
            success: false, 
            error: 'Seletor inválido' 
          });
          return;
        }
        
        // Simular dados de exemplo
        const mockData: any[] = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
          id: i + 1,
          name: `Item ${i + 1}`,
          value: Math.floor(Math.random() * 1000)
        }));
        
        resolve({ 
          success: true, 
          data: mockData as T[]
        });
      }, 800 + Math.random() * 500); // Simular variação no tempo de resposta
    });
  }

  /**
   * Simula extração de elemento
   * Em produção, isto seria substituído por scraping real com Puppeteer/Playwright
   */
  private async simulateElementScraping<T>(
    selector: string, 
    timeout: number, 
    retries: number
  ): Promise<ScrapeResult<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular alguns erros ocasionais para testar tratamento de erros
        if (Math.random() > 0.9) {
          resolve({ 
            success: false, 
            error: 'Elemento não encontrado na página' 
          });
          return;
        }
        
        if (selector.includes('error')) {
          resolve({ 
            success: false, 
            error: 'Seletor inválido' 
          });
          return;
        }
        
        // Simular dados de exemplo
        const mockData: any = {
          text: `Conteúdo do elemento ${selector}`,
          attributes: {
            class: 'sample-class',
            id: 'sample-id'
          }
        };
        
        resolve({ 
          success: true, 
          data: mockData as T
        });
      }, 500 + Math.random() * 300); // Simular variação no tempo de resposta
    });
  }

  /**
   * Simula preenchimento de formulário
   * Em produção, isto seria substituído por interação real com Puppeteer/Playwright
   */
  private async simulateFormFill(
    formData: Record<string, string>
  ): Promise<ScrapeResult<void>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular alguns erros ocasionais para testar tratamento de erros
        if (Math.random() > 0.9) {
          resolve({ 
            success: false, 
            error: 'Não foi possível encontrar um dos campos do formulário' 
          });
          return;
        }
        
        // Verificar se há algum campo problemático
        const problematicField = Object.keys(formData).find(key => key.includes('error'));
        if (problematicField) {
          resolve({ 
            success: false, 
            error: `Campo inválido: ${problematicField}` 
          });
          return;
        }
        
        resolve({ success: true });
      }, 600 + Math.random() * 400); // Simular variação no tempo de resposta
    });
  }

  /**
   * Simula clique em elemento
   * Em produção, isto seria substituído por interação real com Puppeteer/Playwright
   */
  private async simulateElementClick(
    selector: string
  ): Promise<ScrapeResult<void>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular alguns erros ocasionais para testar tratamento de erros
        if (Math.random() > 0.9) {
          resolve({ 
            success: false, 
            error: 'Elemento não encontrado na página' 
          });
          return;
        }
        
        if (selector.includes('error')) {
          resolve({ 
            success: false, 
            error: 'Seletor inválido' 
          });
          return;
        }
        
        resolve({ success: true });
      }, 300 + Math.random() * 200); // Simular variação no tempo de resposta
    });
  }
}

export default ScrapingService.getInstance();
