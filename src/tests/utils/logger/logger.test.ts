/**
 * Teste para o logger estruturado
 */

import logger from '../../../utils/logger';
import winston from 'winston';

// Mock do winston
jest.mock('winston', () => {
  const mockFormat = {
    combine: jest.fn().mockReturnThis(),
    timestamp: jest.fn().mockReturnThis(),
    printf: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    colorize: jest.fn().mockReturnThis(),
    errors: jest.fn().mockReturnThis(),
    splat: jest.fn().mockReturnThis()
  };
  
  const mockLogger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    add: jest.fn()
  };
  
  const mockTransports = {
    Console: jest.fn(),
    File: jest.fn()
  };
  
  return {
    format: mockFormat,
    createLogger: jest.fn().mockReturnValue(mockLogger),
    transports: mockTransports
  };
});

describe('Logger', () => {
  let mockWinstonLogger;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockWinstonLogger = winston.createLogger();
  });
  
  describe('Níveis de log', () => {
    it('deve registrar mensagens de debug', () => {
      const message = 'Mensagem de debug';
      const meta = { context: 'teste' };
      
      logger.debug(message, meta);
      
      expect(mockWinstonLogger.debug).toHaveBeenCalledWith(message, meta);
    });
    
    it('deve registrar mensagens de info', () => {
      const message = 'Mensagem de info';
      const meta = { context: 'teste' };
      
      logger.info(message, meta);
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message, meta);
    });
    
    it('deve registrar mensagens de warn', () => {
      const message = 'Mensagem de aviso';
      const meta = { context: 'teste' };
      
      logger.warn(message, meta);
      
      expect(mockWinstonLogger.warn).toHaveBeenCalledWith(message, meta);
    });
    
    it('deve registrar mensagens de erro com objeto Error', () => {
      const message = 'Mensagem de erro';
      const error = new Error('Erro de teste');
      
      logger.error(message, error);
      
      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, {
        error: error.message,
        stack: error.stack
      });
    });
    
    it('deve registrar mensagens de erro com metadados', () => {
      const message = 'Mensagem de erro';
      const meta = { context: 'teste', code: 500 };
      
      logger.error(message, meta);
      
      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, meta);
    });
  });
  
  describe('Logger com contexto', () => {
    it('deve criar um logger com contexto específico', () => {
      const contextLogger = logger.withContext('TestContext');
      const message = 'Mensagem com contexto';
      
      contextLogger.info(message);
      
      expect(winston.createLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultMeta: expect.objectContaining({
            context: 'TestContext'
          })
        })
      );
    });
  });
  
  describe('Medição de operações', () => {
    it('deve registrar início e fim de operação com duração', () => {
      // Mock para Date.now
      const originalDateNow = Date.now;
      Date.now = jest.fn()
        .mockReturnValueOnce(1000) // Primeira chamada: início
        .mockReturnValueOnce(1500); // Segunda chamada: fim (500ms depois)
      
      const operation = logger.startOperation('TestOperation');
      const duration = operation.end('success', { result: 'ok' });
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        'Iniciando operação: TestOperation'
      );
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        'Operação finalizada: TestOperation',
        expect.objectContaining({
          duration: 500,
          status: 'success',
          result: 'ok'
        })
      );
      
      expect(duration).toBe(500);
      
      // Restaurar Date.now
      Date.now = originalDateNow;
    });
  });
});
