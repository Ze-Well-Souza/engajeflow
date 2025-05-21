
/**
 * Exportação unificada dos serviços do TechCare Connect Automator
 */

import AuthService from './AuthService';
import NavigationService from './NavigationService';
import ScrapingService from './ScrapingService';
import logger from '../../utils/logger';
import { getEnvVariable } from '../../utils/environment';

// Re-exportar todos os serviços
export {
  AuthService,
  NavigationService,
  ScrapingService
};

// Interface de configuração centralizada
export interface TechCareConfig {
  username?: string;
  password?: string;
  baseUrl?: string;
}

/**
 * Configura todos os serviços do TechCare Connect Automator de uma vez
 * Se não forem fornecidos parâmetros, usa variáveis de ambiente
 */
export function configureTechCareServices(config?: TechCareConfig): void {
  const baseUrl = config?.baseUrl || getEnvVariable('TECHCARE_BASE_URL', 'https://app.techcare.com') as string;
  
  // Configurar serviço de navegação
  NavigationService.configure(baseUrl);
  
  logger.info('[TechCare] Todos os serviços configurados com sucesso', { baseUrl });
}

/**
 * Inicializa uma nova sessão automatizada
 */
export async function initializeSession(config?: TechCareConfig): Promise<boolean> {
  try {
    // Configurar todos os serviços se uma configuração for fornecida
    if (config) {
      configureTechCareServices(config);
    } else {
      configureTechCareServices({
        baseUrl: getEnvVariable('TECHCARE_BASE_URL', 'https://app.techcare.com') as string
      });
    }
    
    // Realizar login
    const loginResult = await AuthService.login();
    
    if (!loginResult.success) {
      logger.error('[TechCare] Falha ao inicializar sessão:', loginResult.error);
      return false;
    }
    
    // Navegar para a página inicial
    const navResult = await NavigationService.navigateTo('/dashboard');
    
    if (!navResult.success) {
      logger.error('[TechCare] Falha ao navegar para dashboard:', navResult.error);
      return false;
    }
    
    logger.info('[TechCare] Sessão inicializada com sucesso');
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    logger.error('[TechCare] Erro ao inicializar sessão:', errorMessage);
    return false;
  }
}
