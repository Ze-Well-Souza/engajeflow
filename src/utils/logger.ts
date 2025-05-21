
/**
 * Sistema de log para o TechCare Connect Automator
 */
import { getEnvVariable } from './environment';

// Níveis de log
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

// Interface para entradas de log
interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: any;
}

/**
 * Serviço de logging avançado
 */
class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logHistory: LogEntry[] = [];
  private maxHistorySize: number = 1000;

  private constructor() {
    // Obter nível de log da configuração
    const configuredLevel = getEnvVariable('LOG_LEVEL', 'info').toLowerCase();
    this.logLevel = this.parseLogLevel(configuredLevel);
    
    // Registrar inicialização
    this.info('Logger inicializado com nível', configuredLevel);
  }

  /**
   * Obtém a instância singleton do logger
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Registra uma mensagem de debug
   */
  public debug(message: string, ...context: any[]): void {
    this.log(LogLevel.DEBUG, message, ...context);
  }

  /**
   * Registra uma mensagem informativa
   */
  public info(message: string, ...context: any[]): void {
    this.log(LogLevel.INFO, message, ...context);
  }

  /**
   * Registra um aviso
   */
  public warn(message: string, ...context: any[]): void {
    this.log(LogLevel.WARN, message, ...context);
  }

  /**
   * Registra um erro
   */
  public error(message: string, ...context: any[]): void {
    this.log(LogLevel.ERROR, message, ...context);
  }

  /**
   * Configura o nível de log
   */
  public setLogLevel(level: LogLevel | string): void {
    if (typeof level === 'string') {
      this.logLevel = this.parseLogLevel(level);
    } else {
      this.logLevel = level;
    }
    this.info(`Nível de log alterado para ${this.logLevelToString(this.logLevel)}`);
  }

  /**
   * Obtém o histórico de logs
   */
  public getHistory(): LogEntry[] {
    return [...this.logHistory];
  }

  /**
   * Limpa o histórico de logs
   */
  public clearHistory(): void {
    this.logHistory = [];
    this.debug('Histórico de logs limpo');
  }

  /**
   * Registra uma mensagem de log
   */
  private log(level: LogLevel, message: string, ...context: any[]): void {
    // Verificar se o nível de log atual permite registrar esta mensagem
    if (level < this.logLevel) {
      return;
    }

    // Criar entrada de log
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: this.logLevelToString(level),
      message,
      context: context.length > 0 ? context : undefined
    };

    // Adicionar ao histórico
    this.addToHistory(entry);

    // Formatar mensagem para console
    const formattedMessage = `${entry.timestamp} ${entry.level}: ${entry.message}`;
    
    // Registrar no console
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, ...(context || []));
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, ...(context || []));
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...(context || []));
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, ...(context || []));
        break;
    }
  }

  /**
   * Adiciona uma entrada ao histórico de logs
   */
  private addToHistory(entry: LogEntry): void {
    this.logHistory.push(entry);
    
    // Limitar tamanho do histórico
    while (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }
  }

  /**
   * Converte uma string em LogLevel
   */
  private parseLogLevel(level: string): LogLevel {
    switch (level.toLowerCase()) {
      case 'debug': return LogLevel.DEBUG;
      case 'info': return LogLevel.INFO;
      case 'warn': return LogLevel.WARN;
      case 'error': return LogLevel.ERROR;
      case 'none': return LogLevel.NONE;
      default: return LogLevel.INFO;
    }
  }

  /**
   * Converte um LogLevel em string
   */
  private logLevelToString(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG: return 'debug';
      case LogLevel.INFO: return 'info';
      case LogLevel.WARN: return 'warn';
      case LogLevel.ERROR: return 'error';
      case LogLevel.NONE: return 'none';
      default: return 'unknown';
    }
  }
}

// Exporta a instância singleton
export default Logger.getInstance();
