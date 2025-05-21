
import NavigationService from './NavigationService';
import AuthService from './AuthService';

/**
 * Interface para representar uma instância de página
 */
interface PageInterface {
  waitForSelector: (selector: string, options?: any) => Promise<any>;
  evaluate: (fn: () => any) => Promise<any>;
}

/**
 * ScrapingService - Serviço responsável por extrair dados do TechCare
 * 
 * Esta classe fornece métodos para extrair informações do site do TechCare
 * como tickets, usuários, relatórios, etc.
 */
class ScrapingService {
  private static instance: ScrapingService;
  private page: PageInterface | null = null;

  private constructor() {}

  /**
   * Obtém a instância do serviço (Singleton)
   */
  public static getInstance(): ScrapingService {
    if (!ScrapingService.instance) {
      ScrapingService.instance = new ScrapingService();
    }
    return ScrapingService.instance;
  }

  /**
   * Configura a página para o serviço de scraping
   * @param page Instância de Page do Puppeteer
   */
  public setPage(page: PageInterface) {
    this.page = page;
  }

  /**
   * Extrai a lista de tickets do TechCare
   * @returns Lista de tickets ou null em caso de erro
   */
  public async extractTickets() {
    try {
      if (!this.page) {
        throw new Error("Página não inicializada");
      }

      // Navega para a página de tickets
      await NavigationService.getInstance().goToTickets(this.page);

      // Aguarda o carregamento da lista de tickets
      await this.page.waitForSelector('.ticket-list', { timeout: 10000 });

      // Extrai os dados dos tickets
      return await this.page.evaluate(() => {
        const ticketElements = document.querySelectorAll('.ticket-item');
        return Array.from(ticketElements).map(ticket => ({
          id: ticket.getAttribute('data-id'),
          title: ticket.querySelector('.ticket-title')?.textContent?.trim(),
          status: ticket.querySelector('.ticket-status')?.textContent?.trim(),
          date: ticket.querySelector('.ticket-date')?.textContent?.trim(),
          priority: ticket.querySelector('.ticket-priority')?.textContent?.trim()
        }));
      });
    } catch (error) {
      console.error("Erro ao extrair tickets:", error);
      return null;
    }
  }

  /**
   * Extrai a lista de clientes do TechCare
   * @returns Lista de clientes ou null em caso de erro
   */
  public async extractClients() {
    try {
      if (!this.page) {
        throw new Error("Página não inicializada");
      }

      // Navega para a página de clientes
      await NavigationService.getInstance().goToClients(this.page);

      // Aguarda o carregamento da lista de clientes
      await this.page.waitForSelector('.client-list', { timeout: 10000 });

      // Extrai os dados dos clientes
      return await this.page.evaluate(() => {
        const clientElements = document.querySelectorAll('.client-item');
        return Array.from(clientElements).map(client => ({
          id: client.getAttribute('data-id'),
          name: client.querySelector('.client-name')?.textContent?.trim(),
          email: client.querySelector('.client-email')?.textContent?.trim(),
          phone: client.querySelector('.client-phone')?.textContent?.trim(),
          status: client.querySelector('.client-status')?.textContent?.trim()
        }));
      });
    } catch (error) {
      console.error("Erro ao extrair clientes:", error);
      return null;
    }
  }

  /**
   * Extrai as métricas do dashboard do TechCare
   * @returns Métricas do dashboard ou null em caso de erro
   */
  public async extractDashboardMetrics() {
    try {
      if (!this.page) {
        throw new Error("Página não inicializada");
      }

      // Navega para a página do dashboard
      await NavigationService.getInstance().goToDashboard(this.page);

      // Aguarda o carregamento das métricas
      await this.page.waitForSelector('.dashboard-metrics', { timeout: 10000 });

      // Extrai as métricas
      return await this.page.evaluate(() => {
        const metricElements = document.querySelectorAll('.metric-card');
        return Array.from(metricElements).map(metric => ({
          label: metric.querySelector('.metric-label')?.textContent?.trim(),
          value: metric.querySelector('.metric-value')?.textContent?.trim(),
          trend: metric.querySelector('.metric-trend')?.textContent?.trim(),
          percentage: metric.querySelector('.metric-percentage')?.textContent?.trim()
        }));
      });
    } catch (error) {
      console.error("Erro ao extrair métricas do dashboard:", error);
      return null;
    }
  }

  /**
   * Extrai a lista de mensagens de um ticket específico
   * @param ticketId ID do ticket
   * @returns Lista de mensagens ou null em caso de erro
   */
  public async extractTicketMessages(ticketId: string) {
    try {
      if (!this.page) {
        throw new Error("Página não inicializada");
      }

      // Navega para a página do ticket específico
      await NavigationService.getInstance().goToTicketDetail(this.page, ticketId);

      // Aguarda o carregamento das mensagens
      await this.page.waitForSelector('.message-list', { timeout: 10000 });

      // Extrai as mensagens
      return await this.page.evaluate(() => {
        const messageElements = document.querySelectorAll('.message-item');
        return Array.from(messageElements).map(message => ({
          id: message.getAttribute('data-id'),
          sender: message.querySelector('.message-sender')?.textContent?.trim(),
          content: message.querySelector('.message-content')?.textContent?.trim(),
          timestamp: message.querySelector('.message-timestamp')?.textContent?.trim(),
          isAgent: message.classList.contains('agent-message')
        }));
      });
    } catch (error) {
      console.error("Erro ao extrair mensagens do ticket:", error);
      return null;
    }
  }
}

export default ScrapingService;
