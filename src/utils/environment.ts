/**
 * Utilitários para gerenciamento de variáveis de ambiente
 */

/**
 * Obtém o valor de uma variável de ambiente
 * @param name Nome da variável de ambiente
 * @param defaultValue Valor padrão caso a variável não esteja definida
 * @returns Valor da variável de ambiente ou o valor padrão
 */
export function getEnvVariable(name: string, defaultValue: string = ''): string {
  // Em ambiente browser, procurar no localStorage
  if (typeof window !== 'undefined') {
    try {
      // Verificar se localStorage está disponível
      if (window.localStorage) {
        const localValue = window.localStorage.getItem(`env.${name}`);
        if (localValue) return localValue;
      }
    } catch (error) {
      // Ignorar erros de acesso ao localStorage (pode ocorrer em alguns navegadores)
      console.warn(`Erro ao acessar localStorage: ${error}`);
    }
  }
  
  // Em ambiente Node.js, procurar em process.env
  if (typeof process !== 'undefined' && process.env) {
    const envValue = process.env[name];
    if (envValue) return envValue;
  }
  
  // Valor padrão
  return defaultValue;
}

/**
 * Define o valor de uma variável de ambiente no localStorage
 * @param name Nome da variável de ambiente
 * @param value Valor da variável de ambiente
 */
export function setEnvVariable(name: string, value: string): void {
  // Armazenar no localStorage
  if (typeof window !== 'undefined') {
    try {
      // Verificar se localStorage está disponível
      if (window.localStorage) {
        window.localStorage.setItem(`env.${name}`, value);
      }
    } catch (error) {
      // Ignorar erros de acesso ao localStorage
      console.warn(`Erro ao escrever no localStorage: ${error}`);
    }
  }
}

/**
 * Remove uma variável de ambiente do localStorage
 * @param name Nome da variável de ambiente
 */
export function removeEnvVariable(name: string): void {
  // Remover do localStorage
  if (typeof window !== 'undefined') {
    try {
      // Verificar se localStorage está disponível
      if (window.localStorage) {
        window.localStorage.removeItem(`env.${name}`);
      }
    } catch (error) {
      // Ignorar erros de acesso ao localStorage
      console.warn(`Erro ao remover do localStorage: ${error}`);
    }
  }
}

/**
 * Verifica se todas as variáveis de ambiente obrigatórias estão definidas
 * @param requiredVars Lista de nomes de variáveis obrigatórias
 * @returns Objeto indicando se todas as variáveis estão definidas e lista de variáveis faltantes
 */
export function validateEnvVariables(requiredVars: string[]): { valid: boolean; missing: string[] } {
  const missing = requiredVars.filter(name => !getEnvVariable(name));
  return {
    valid: missing.length === 0,
    missing
  };
}
