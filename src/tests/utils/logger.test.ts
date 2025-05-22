import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logger from '../../utils/logger';

describe('Logger', () => {
  // Backup do console original
  const originalConsole = { ...console };
  
  // Mocks para os métodos do console
  beforeEach(() => {
    // Espionar os métodos do console
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Limpar histórico de logs antes de cada teste
    logger.clearHistory();
    
    // Resetar os mocks após a limpeza do histórico
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    // Restaurar console original
    vi.restoreAllMocks();
  });
  
  describe('Níveis de log', () => {
    it('deve registrar mensagem de debug', () => {
      // Configurar nível para permitir debug
      logger.setLevel('debug');
      vi.clearAllMocks();
      
      // Executar
      logger.debug('Mensagem de debug', { teste: true });
      
      // Verificar
      expect(console.debug).toHaveBeenCalled();
      
      // Verificar histórico - filtrando apenas a mensagem que nos interessa
      const history = logger.getHistory().filter(entry => entry.message === 'Mensagem de debug');
      expect(history.length).toBe(1);
      expect(history[0].level).toBe('debug');
      expect(history[0].message).toBe('Mensagem de debug');
      expect(history[0].context).toEqual({ teste: true });
    });
    
    it('deve registrar mensagem de info', () => {
      // Executar
      logger.info('Mensagem de info');
      
      // Verificar
      expect(console.info).toHaveBeenCalled();
      
      // Verificar histórico - filtrando apenas a mensagem que nos interessa
      const history = logger.getHistory().filter(entry => entry.message === 'Mensagem de info');
      expect(history.length).toBe(1);
      expect(history[0].level).toBe('info');
      expect(history[0].message).toBe('Mensagem de info');
    });
    
    it('deve registrar mensagem de warn', () => {
      // Executar
      logger.warn('Mensagem de aviso');
      
      // Verificar
      expect(console.warn).toHaveBeenCalled();
      
      // Verificar histórico - filtrando apenas a mensagem que nos interessa
      const history = logger.getHistory().filter(entry => entry.message === 'Mensagem de aviso');
      expect(history.length).toBe(1);
      expect(history[0].level).toBe('warn');
      expect(history[0].message).toBe('Mensagem de aviso');
    });
    
    it('deve registrar mensagem de error', () => {
      // Executar
      logger.error('Mensagem de erro');
      
      // Verificar
      expect(console.error).toHaveBeenCalled();
      
      // Verificar histórico - filtrando apenas a mensagem que nos interessa
      const history = logger.getHistory().filter(entry => entry.message === 'Mensagem de erro');
      expect(history.length).toBe(1);
      expect(history[0].level).toBe('error');
      expect(history[0].message).toBe('Mensagem de erro');
    });
    
    it('deve registrar mensagem de fatal usando console.error', () => {
      // Executar
      logger.fatal('Mensagem fatal');
      
      // Verificar
      expect(console.error).toHaveBeenCalled();
      
      // Verificar histórico - filtrando apenas a mensagem que nos interessa
      const history = logger.getHistory().filter(entry => entry.message === 'Mensagem fatal');
      expect(history.length).toBe(1);
      expect(history[0].level).toBe('fatal');
      expect(history[0].message).toBe('Mensagem fatal');
    });
  });
  
  describe('Filtragem de logs', () => {
    beforeEach(() => {
      // Configurar nível para permitir debug
      logger.setLevel('debug');
      
      // Limpar mocks após a configuração inicial
      vi.clearAllMocks();
      
      // Configurar logs de diferentes níveis
      logger.debug('Mensagem debug');
      logger.info('Mensagem info');
      logger.warn('Mensagem warn');
      logger.error('Mensagem error');
      logger.fatal('Mensagem fatal');
    });
    
    it('deve filtrar logs por nível', () => {
      // Verificar filtragem por warn (deve incluir warn, error e fatal)
      const warnUp = logger.getHistory('warn').filter(entry => 
        ['Mensagem warn', 'Mensagem error', 'Mensagem fatal'].includes(entry.message)
      );
      
      expect(warnUp.length).toBe(3);
      expect(warnUp.some(entry => entry.level === 'fatal' && entry.message === 'Mensagem fatal')).toBe(true);
      expect(warnUp.some(entry => entry.level === 'error' && entry.message === 'Mensagem error')).toBe(true);
      expect(warnUp.some(entry => entry.level === 'warn' && entry.message === 'Mensagem warn')).toBe(true);
      
      // Verificar filtragem por error (deve incluir error e fatal)
      const errorUp = logger.getHistory('error').filter(entry => 
        ['Mensagem error', 'Mensagem fatal'].includes(entry.message)
      );
      
      expect(errorUp.length).toBe(2);
      expect(errorUp.some(entry => entry.level === 'fatal' && entry.message === 'Mensagem fatal')).toBe(true);
      expect(errorUp.some(entry => entry.level === 'error' && entry.message === 'Mensagem error')).toBe(true);
    });
  });
  
  describe('Gerenciamento de histórico', () => {
    it('deve limpar o histórico de logs', () => {
      // Configurar
      logger.info('Teste 1');
      logger.info('Teste 2');
      
      // Verificar que os logs foram adicionados
      const logsAntes = logger.getHistory().filter(entry => 
        ['Teste 1', 'Teste 2'].includes(entry.message)
      );
      expect(logsAntes.length).toBe(2);
      
      // Limpar mocks para não interferir no próximo teste
      vi.clearAllMocks();
      
      // Executar
      logger.clearHistory();
      
      // Verificar que os logs foram removidos
      const logsDepois = logger.getHistory().filter(entry => 
        ['Teste 1', 'Teste 2'].includes(entry.message)
      );
      expect(logsDepois.length).toBe(0);
      
      // Verificar que a mensagem de limpeza foi registrada
      const mensagemLimpeza = logger.getHistory().filter(entry => 
        entry.message === 'Histórico de logs limpo'
      );
      expect(mensagemLimpeza.length).toBe(1);
    });
    
    it('deve exportar logs para JSON', () => {
      // Configurar
      logger.info('Mensagem para exportar');
      
      // Executar
      const exported = logger.exportLogs();
      
      // Verificar
      const parsedJson = JSON.parse(exported);
      expect(parsedJson).toBeInstanceOf(Array);
      
      // Encontrar a entrada específica
      const targetEntry = parsedJson.find((entry: any) => entry.message === 'Mensagem para exportar');
      expect(targetEntry).toBeDefined();
      expect(targetEntry.level).toBe('info');
      
      // Deve ser um JSON válido
      expect(() => JSON.parse(exported)).not.toThrow();
    });
    
    it('deve exportar logs filtrados para JSON', () => {
      // Configurar
      logger.debug('Debug log');
      logger.info('Info log');
      logger.error('Error log');
      
      // Executar
      const exported = logger.exportLogs('error');
      
      // Verificar
      const parsedJson = JSON.parse(exported);
      
      // Encontrar a entrada específica
      const errorEntry = parsedJson.find((entry: any) => entry.message === 'Error log');
      expect(errorEntry).toBeDefined();
      
      // Verificar que entradas de nível inferior não estão presentes
      const infoEntry = parsedJson.find((entry: any) => entry.message === 'Info log');
      const debugEntry = parsedJson.find((entry: any) => entry.message === 'Debug log');
      
      expect(infoEntry).toBeUndefined();
      expect(debugEntry).toBeUndefined();
    });
  });
  
  describe('Configuração de nível', () => {
    it('deve respeitar o nível mínimo de log', () => {
      // Limpar histórico e mocks
      logger.clearHistory();
      vi.clearAllMocks();
      
      // Configurar
      logger.setLevel('warn');
      
      // Limpar novamente após setLevel (que gera logs)
      vi.clearAllMocks();
      
      // Executar
      logger.debug('Debug não deve aparecer');
      logger.info('Info não deve aparecer');
      logger.warn('Warn deve aparecer');
      logger.error('Error deve aparecer');
      
      // Verificar chamadas ao console
      expect(console.debug).not.toHaveBeenCalledWith(expect.stringContaining('Debug não deve aparecer'));
      expect(console.info).not.toHaveBeenCalledWith(expect.stringContaining('Info não deve aparecer'));
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Warn deve aparecer'));
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error deve aparecer'));
      
      // Verificar histórico
      const history = logger.getHistory();
      expect(history.filter(log => log.message === 'Debug não deve aparecer').length).toBe(0);
      expect(history.filter(log => log.message === 'Info não deve aparecer').length).toBe(0);
      expect(history.filter(log => log.message === 'Warn deve aparecer').length).toBe(1);
      expect(history.filter(log => log.message === 'Error deve aparecer').length).toBe(1);
    });
  });
});
