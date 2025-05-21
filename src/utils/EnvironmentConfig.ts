
/**
 * Utilitário para gerenciar variáveis de ambiente
 */

// Classe para gerenciar variáveis de ambiente
class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private envCache: Record<string, string> = {};
  
  // Variáveis de ambiente obrigatórias
  private requiredVariables = [
    'TECHCARE_USER',
    'TECHCARE_PASS'
  ];

  private constructor() {
    // Carregar variáveis do localStorage em ambiente de desenvolvimento
    if (import.meta.env.DEV) {
      this.loadFromLocalStorage();
    }
    
    // No ambiente de produção, as variáveis de ambiente são injetadas pelo Docker
  }

  /**
   * Obtém a instância singleton
   */
  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  /**
   * Obtém uma variável de ambiente
   */
  public get(key: string): string | undefined {
    // Primeiro verificar o cache
    if (this.envCache[key]) {
      return this.envCache[key];
    }
    
    // Em ambiente de produção, buscar do process.env
    // Em ambiente de desenvolvimento, buscar do localStorage
    let value;
    
    if (import.meta.env.DEV) {
      // Em dev, buscar de localStorage
      value = localStorage.getItem(`env_${key}`);
    } else {
      // Em produção, buscar do window.env (que é injetado pelo Dockerfile)
      value = (window as any).env?.[key];
    }
    
    // Armazenar no cache se encontrou
    if (value) {
      this.envCache[key] = value;
    }
    
    return value;
  }

  /**
   * Define uma variável de ambiente (apenas em desenvolvimento)
   */
  public set(key: string, value: string): void {
    if (!import.meta.env.DEV) {
      console.warn('Tentativa de definir variável de ambiente em produção ignorada.');
      return;
    }
    
    // Armazenar no localStorage
    localStorage.setItem(`env_${key}`, value);
    
    // Atualizar o cache
    this.envCache[key] = value;
    
    console.log(`Variável de ambiente ${key} definida.`);
  }

  /**
   * Verifica se todas as variáveis de ambiente obrigatórias estão definidas
   */
  public validateRequiredVariables(): { valid: boolean; missing: string[] } {
    const missing: string[] = [];
    
    this.requiredVariables.forEach(key => {
      if (!this.get(key)) {
        missing.push(key);
      }
    });
    
    return {
      valid: missing.length === 0,
      missing
    };
  }

  /**
   * Carrega variáveis de ambiente do localStorage (apenas para desenvolvimento)
   */
  private loadFromLocalStorage(): void {
    if (!import.meta.env.DEV) return;
    
    this.requiredVariables.forEach(key => {
      const value = localStorage.getItem(`env_${key}`);
      if (value) {
        this.envCache[key] = value;
      }
    });
  }
}

// Exportar uma instância singleton
export const env = EnvironmentConfig.getInstance();

// Função de conveniência para obter uma variável de ambiente
export function getEnv(key: string): string | undefined {
  return env.get(key);
}

// Função de conveniência para definir uma variável de ambiente (apenas em desenvolvimento)
export function setEnv(key: string, value: string): void {
  env.set(key, value);
}
