import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getEnvVariable, setEnvVariable, removeEnvVariable, validateEnvVariables } from '../../utils/environment';

describe('Environment Utilities', () => {
  // Backup do process.env original
  const originalEnv = { ...process.env };
  
  // Mock para localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  })();
  
  // Mock para window global
  beforeEach(() => {
    // Criar mock do objeto window se não existir
    if (typeof global.window === 'undefined') {
      global.window = {} as any;
    }
    
    // Configurar mock do localStorage
    Object.defineProperty(global.window, 'localStorage', { 
      value: localStorageMock,
      writable: true
    });
    
    localStorageMock.clear();
    
    // Limpar mocks entre testes
    vi.resetAllMocks();
  });
  
  afterEach(() => {
    // Restaurar process.env original
    process.env = { ...originalEnv };
    
    // Limpar mock do window
    if (typeof global.window !== 'undefined') {
      delete (global as any).window;
    }
  });
  
  describe('getEnvVariable', () => {
    it('deve retornar valor do localStorage quando disponível', () => {
      // Configurar
      localStorageMock.setItem('env.TEST_VAR', 'valor_local');
      process.env.TEST_VAR = 'valor_env';
      
      // Executar
      const result = getEnvVariable('TEST_VAR');
      
      // Verificar
      expect(result).toBe('valor_local');
    });
    
    it('deve retornar valor do process.env quando localStorage não disponível', () => {
      // Configurar
      process.env.TEST_VAR = 'valor_env';
      // Remover localStorage para simular ambiente sem ele
      Object.defineProperty(global.window, 'localStorage', { 
        value: undefined,
        writable: true
      });
      
      // Executar
      const result = getEnvVariable('TEST_VAR');
      
      // Verificar
      expect(result).toBe('valor_env');
    });
    
    it('deve retornar valor padrão quando variável não encontrada', () => {
      // Executar
      const result = getEnvVariable('VAR_INEXISTENTE', 'valor_padrao');
      
      // Verificar
      expect(result).toBe('valor_padrao');
    });
    
    it('deve retornar string vazia quando variável não encontrada e sem valor padrão', () => {
      // Executar
      const result = getEnvVariable('VAR_INEXISTENTE');
      
      // Verificar
      expect(result).toBe('');
    });
  });
  
  describe('setEnvVariable', () => {
    it('deve armazenar valor no localStorage', () => {
      // Executar
      setEnvVariable('TEST_VAR', 'novo_valor');
      
      // Verificar
      expect(localStorageMock.getItem('env.TEST_VAR')).toBe('novo_valor');
    });
    
    it('não deve falhar quando localStorage não disponível', () => {
      // Configurar - simular ambiente sem localStorage
      Object.defineProperty(global.window, 'localStorage', { 
        value: undefined,
        writable: true
      });
      
      // Executar e verificar que não lança exceção
      expect(() => setEnvVariable('TEST_VAR', 'novo_valor')).not.toThrow();
    });
  });
  
  describe('removeEnvVariable', () => {
    it('deve remover valor do localStorage', () => {
      // Configurar
      localStorageMock.setItem('env.TEST_VAR', 'valor_teste');
      
      // Executar
      removeEnvVariable('TEST_VAR');
      
      // Verificar
      expect(localStorageMock.getItem('env.TEST_VAR')).toBeNull();
    });
    
    it('não deve falhar quando localStorage não disponível', () => {
      // Configurar - simular ambiente sem localStorage
      Object.defineProperty(global.window, 'localStorage', { 
        value: undefined,
        writable: true
      });
      
      // Executar e verificar que não lança exceção
      expect(() => removeEnvVariable('TEST_VAR')).not.toThrow();
    });
  });
  
  describe('validateEnvVariables', () => {
    it('deve retornar valid=true quando todas as variáveis obrigatórias estão definidas', () => {
      // Configurar
      process.env.VAR1 = 'valor1';
      process.env.VAR2 = 'valor2';
      
      // Executar
      const result = validateEnvVariables(['VAR1', 'VAR2']);
      
      // Verificar
      expect(result.valid).toBe(true);
      expect(result.missing).toEqual([]);
    });
    
    it('deve retornar valid=false e lista de variáveis faltantes', () => {
      // Configurar
      process.env.VAR1 = 'valor1';
      // VAR2 não definida
      
      // Executar
      const result = validateEnvVariables(['VAR1', 'VAR2', 'VAR3']);
      
      // Verificar
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(['VAR2', 'VAR3']);
    });
    
    it('deve considerar variáveis definidas no localStorage', () => {
      // Configurar
      process.env.VAR1 = 'valor1';
      localStorageMock.setItem('env.VAR2', 'valor2');
      
      // Executar
      const result = validateEnvVariables(['VAR1', 'VAR2', 'VAR3']);
      
      // Verificar
      expect(result.valid).toBe(false);
      expect(result.missing).toEqual(['VAR3']);
    });
  });
});
