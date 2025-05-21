
/**
 * Exportação unificada dos serviços do TechCare Connect Automator
 */

import AuthService from './AuthService';
import NavigationService from './NavigationService';
import ScrapingService from './ScrapingService';

// Re-exportar todos os serviços
export {
  AuthService,
  NavigationService,
  ScrapingService
};

// Interface de configuração centralizada
export interface TechCareConfig {
  username: string;
  password: string;
  baseUrl: string;
}

/**
 * Configura todos os serviços do TechCare Connect Automator de uma vez
 */
export function configureTechCareServices(config: TechCareConfig): void {
  // Configurar serviço de autenticação
  AuthService.configure({
    username: config.username,
    password: config.password,
    baseUrl: config.baseUrl
  });
  
  // Configurar serviço de navegação
  NavigationService.configure(config.baseUrl);
  
  console.log('[TechCare] Todos os serviços configurados com sucesso');
}

/**
 * Inicializa uma nova sessão automatizada
 */
export async function initializeSession(config: TechCareConfig): Promise<boolean> {
  try {
    // Configurar todos os serviços
    configureTechCareServices(config);
    
    // Realizar login
    const loginResult = await AuthService.login();
    
    if (!loginResult.success) {
      console.error('[TechCare] Falha ao inicializar sessão:', loginResult.error);
      return false;
    }
    
    // Navegar para a página inicial
    const navResult = await NavigationService.navigateTo('/dashboard');
    
    if (!navResult.success) {
      console.error('[TechCare] Falha ao navegar para dashboard:', navResult.error);
      return false;
    }
    
    console.log('[TechCare] Sessão inicializada com sucesso');
    return true;
  } catch (error) {
    console.error('[TechCare] Erro ao inicializar sessão:', 
      error instanceof Error ? error.message : 'Erro desconhecido');
    return false;
  }
}
