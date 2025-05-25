
/**
 * Sistema centralizado de gerenciamento de configuração e variáveis de ambiente
 */
import { toast } from "sonner";

type EnvVariableValue = string | number | boolean | null;

class EnvironmentConfig {
  private variables: Map<string, EnvVariableValue> = new Map();
  private readonly requiredVariables: string[] = [
    'TECHCARE_USER',
    'TECHCARE_PASS'
  ];

  constructor() {
    this.loadFromLocalStorage();
    console.log('EnvironmentConfig inicializado');
  }

  /**
   * Carrega variáveis do localStorage
   */
  private loadFromLocalStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      // Procurar todas as chaves que começam com 'env.'
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('env.')) {
          const envKey = key.substring(4); // Remover 'env.'
          const value = localStorage.getItem(key);
          if (value !== null) {
            this.variables.set(envKey, this.parseValue(value));
          }
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar variáveis do localStorage:', error);
    }
  }

  /**
   * Converte string em tipo apropriado (boolean, number, etc)
   */
  private parseValue(value: string): EnvVariableValue {
    // Converter 'true' e 'false' para boolean
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    
    // Converter números
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return Number(value);
    }
    
    // Manter como string
    return value;
  }

  /**
   * Obtém uma variável de ambiente
   */
  public get(name: string, defaultValue: EnvVariableValue = null): EnvVariableValue {
    // Verificar no Map interno
    if (this.variables.has(name)) {
      return this.variables.get(name) as EnvVariableValue;
    }
    
    // Verificar em process.env para Node.js (apenas se disponível)
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
      const value = process.env[name] as string;
      return this.parseValue(value);
    }
    
    // Verificar em import.meta.env para Vite
    try {
      const viteEnv = (import.meta as any).env;
      if (viteEnv && viteEnv[name]) {
        return this.parseValue(viteEnv[name]);
      }
    } catch (error) {
      // Ignorar erros de acesso ao import.meta em ambientes que não suportam
    }
    
    // Retornar valor padrão
    return defaultValue;
  }

  /**
   * Define uma variável de ambiente
   */
  public set(name: string, value: EnvVariableValue): void {
    // Armazenar no Map interno
    this.variables.set(name, value);
    
    // Armazenar no localStorage (apenas valores não-null)
    if (typeof window !== 'undefined' && window.localStorage && value !== null) {
      try {
        localStorage.setItem(`env.${name}`, String(value));
      } catch (error) {
        console.warn(`Erro ao salvar variável ${name} no localStorage:`, error);
      }
    }
  }

  /**
   * Remove uma variável de ambiente
   */
  public remove(name: string): void {
    // Remover do Map interno
    this.variables.delete(name);
    
    // Remover do localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(`env.${name}`);
      } catch (error) {
        console.warn(`Erro ao remover variável ${name} do localStorage:`, error);
      }
    }
  }

  /**
   * Lista todas as variáveis de ambiente configuradas
   */
  public listAll(): Record<string, EnvVariableValue> {
    const result: Record<string, EnvVariableValue> = {};
    
    // Adicionar variáveis do Map interno
    this.variables.forEach((value, key) => {
      result[key] = value;
    });
    
    return result;
  }

  /**
   * Verifica se todas as variáveis obrigatórias estão definidas
   */
  public validateRequiredVariables(): { valid: boolean; missing: string[] } {
    const missing = this.requiredVariables.filter(name => {
      const value = this.get(name);
      return value === null || value === undefined || value === '';
    });
    
    return {
      valid: missing.length === 0,
      missing
    };
  }

  /**
   * Carrega configurações de um objeto
   */
  public loadFromObject(config: Record<string, EnvVariableValue>): void {
    Object.entries(config).forEach(([key, value]) => {
      this.set(key, value);
    });
  }
}

// Instância singleton
export const env = new EnvironmentConfig();

/**
 * Helper para definir uma variável de ambiente
 */
export function setEnv(name: string, value: EnvVariableValue): void {
  env.set(name, value);
  if (typeof window !== 'undefined') {
    toast.success(`Configuração '${name}' atualizada`);
  }
}

/**
 * Helper para remover uma variável de ambiente
 */
export function removeEnv(name: string): void {
  env.remove(name);
  if (typeof window !== 'undefined') {
    toast.info(`Configuração '${name}' removida`);
  }
}

/**
 * Helper para verificar variáveis obrigatórias
 */
export function validateEnv(): boolean {
  const { valid, missing } = env.validateRequiredVariables();
  
  if (!valid && typeof window !== 'undefined') {
    toast.error(`Configurações obrigatórias ausentes: ${missing.join(', ')}`);
  }
  
  return valid;
}
