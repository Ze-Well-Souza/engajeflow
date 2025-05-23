
// Importação de serviços principais do TechCare
import AIService from './AIService';
import NotificationService from './NotificationService';
import AnalyticsService from './AnalyticsService';
import FinancialService from './FinancialService';
import NavigationService from './NavigationService'; // Importado corretamente como default
import IntegrationService from './IntegrationService';

// Configurações comuns para serviços
export interface ServiceConfig {
  apiKey?: string;
  baseUrl?: string;
  debug?: boolean;
  timeout?: number;
}

// Interface para registro global de serviços
export interface ServiceRegistry {
  [key: string]: any;
}

// Classe de inicialização dos serviços TechCare
class TechCareServices {
  // Registro de serviços
  private registry: ServiceRegistry = {};
  
  // Inicialização padrão
  constructor() {
    // Registrar serviços principais
    this.register('ai', AIService);
    this.register('notifications', NotificationService);
    this.register('analytics', AnalyticsService);
    this.register('financial', FinancialService);
    this.register('navigation', NavigationService);
    this.register('integration', IntegrationService);
  }
  
  // Inicializar todos os serviços com configuração padrão
  initialize(config: ServiceConfig): void {
    console.info('[TechCare] Inicializando serviços com configuração:', config);
    
    // Configurar serviços que suportam configuração
    if (AIService.configure) {
      AIService.configure({
        apiKey: config.apiKey,
        useGemini: true
      });
    }
    
    if (NavigationService.configureNavigation) {
      NavigationService.configureNavigation({
        baseUrl: config.baseUrl,
        timeout: config.timeout || 30000
      });
    }
    
    // Inicializar analíticas
    if (config.debug) {
      AnalyticsService.enableDebugMode();
    }
    
    console.info('[TechCare] Serviços inicializados com sucesso');
  }
  
  // Registrar serviço no registro central
  register(name: string, service: any): void {
    this.registry[name] = service;
  }
  
  // Obter serviço do registro
  getService(name: string): any {
    return this.registry[name] || null;
  }
  
  // Navegação simplificada
  navigateTo(path: string, options?: any): void {
    const navService = this.getService('navigation');
    if (navService && navService.navigateToUrl) {
      navService.navigateToUrl(path, options);
    }
  }
  
  // Utilitário para obter serviço tipado
  get<T>(name: string): T | null {
    return this.getService(name) as T;
  }
}

// Exportar instância singleton
const techCareServices = new TechCareServices();
export default techCareServices;
