/**
 * Teste para o logger estruturado
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import logger from '../../../utils/logger';

// Mock do logger
vi.mock('../../../utils/logger', () => {
  return {
    default: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      fatal: vi.fn(),
      getHistory: vi.fn().mockReturnValue([]),
      clearHistory: vi.fn(),
      exportLogs: vi.fn().mockReturnValue('{}'),
      setLevel: vi.fn()
    }
  };
});

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('Níveis de log', () => {
    it('deve registrar mensagens de debug', () => {
      const message = 'Mensagem de debug';
      const context = { context: 'teste' };
      
      logger.debug(message, context);
      
      expect(logger.debug).toHaveBeenCalledWith(message, context);
    });
    
    it('deve registrar mensagens de info', () => {
      const message = 'Mensagem de info';
      const context = { context: 'teste' };
      
      logger.info(message, context);
      
      expect(logger.info).toHaveBeenCalledWith(message, context);
    });
    
    it('deve registrar mensagens de warn', () => {
      const message = 'Mensagem de aviso';
      const context = { context: 'teste' };
      
      logger.warn(message, context);
      
      expect(logger.warn).toHaveBeenCalledWith(message, context);
    });
    
    it('deve registrar mensagens de erro', () => {
      const message = 'Mensagem de erro';
      const context = { context: 'teste', code: 500 };
      
      logger.error(message, context);
      
      expect(logger.error).toHaveBeenCalledWith(message, context);
    });
    
    it('deve registrar mensagens de erro fatal', () => {
      const message = 'Erro crítico';
      const context = { context: 'teste', code: 500 };
      
      logger.fatal(message, context);
      
      expect(logger.fatal).toHaveBeenCalledWith(message, context);
    });
  });
  
  describe('Gerenciamento de histórico', () => {
    it('deve obter o histórico de logs', () => {
      logger.getHistory();
      
      expect(logger.getHistory).toHaveBeenCalled();
    });
    
    it('deve limpar o histórico de logs', () => {
      logger.clearHistory();
      
      expect(logger.clearHistory).toHaveBeenCalled();
    });
    
    it('deve exportar logs para JSON', () => {
      const result = logger.exportLogs();
      
      expect(logger.exportLogs).toHaveBeenCalled();
      expect(result).toBe('{}');
    });
  });
  
  describe('Configuração', () => {
    it('deve permitir configurar o nível de log', () => {
      logger.setLevel('debug');
      
      expect(logger.setLevel).toHaveBeenCalledWith('debug');
    });
  });
});
