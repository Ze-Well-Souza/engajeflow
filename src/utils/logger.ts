
/**
 * Sistema de logs avançado para o TechCare Connect Automator
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
}

class Logger {
  private static instance: Logger;
  private logHistory: LogEntry[] = [];
  private readonly MAX_HISTORY = 1000;
  private readonly LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4
  };

  private minLevel: LogLevel = 'info';

  private constructor() {
    // Inicializar configurações de log
    this.setLevel((typeof process !== 'undefined' && process.env.LOG_LEVEL as LogLevel) || 'info');
    this.info('Logger inicializado');
  }

  /**
   * Obtém a instância singleton do Logger
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Define o nível mínimo de log
   */
  public setLevel(level: LogLevel): void {
    this.minLevel = level;
    this.debug(`Nível de log definido para: ${level}`);
  }

  /**
   * Registra uma mensagem de log
   */
  private log(level: LogLevel, message: string, context?: any): void {
    if (this.LOG_LEVELS[level] < this.LOG_LEVELS[this.minLevel]) {
      return; // Não registrar se o nível for menor que o mínimo
    }

    const timestamp = new Date().toISOString();
    const entry: LogEntry = {
      timestamp,
      level,
      message,
      context
    };

    // Adicionar ao histórico
    this.logHistory.unshift(entry);
    if (this.logHistory.length > this.MAX_HISTORY) {
      this.logHistory.pop();
    }

    // Exibir no console
    const formattedContext = context ? `, ${JSON.stringify(context)}` : '';
    console[level !== 'fatal' ? level : 'error'](`${timestamp} ${level}: ${message}${formattedContext}`);
  }

  /**
   * Log de nível DEBUG
   */
  public debug(message: string, context?: any): void {
    this.log('debug', message, context);
  }

  /**
   * Log de nível INFO
   */
  public info(message: string, context?: any): void {
    this.log('info', message, context);
  }

  /**
   * Log de nível WARN
   */
  public warn(message: string, context?: any): void {
    this.log('warn', message, context);
  }

  /**
   * Log de nível ERROR
   */
  public error(message: string, context?: any): void {
    this.log('error', message, context);
  }

  /**
   * Log de nível FATAL (crítico)
   */
  public fatal(message: string, context?: any): void {
    this.log('fatal', message, context);
  }

  /**
   * Inicia uma operação de log
   */
  public startOperation(operation: string, context?: any): string {
    const operationId = Math.random().toString(36).substr(2, 9);
    this.info(`Iniciando operação: ${operation}`, { operationId, ...context });
    return operationId;
  }

  /**
   * Adiciona contexto ao logger
   */
  public withContext(context: any): Logger {
    // Retorna uma nova instância com contexto
    const logger = Object.create(Logger.prototype);
    logger.logHistory = this.logHistory;
    logger.MAX_HISTORY = this.MAX_HISTORY;
    logger.LOG_LEVELS = this.LOG_LEVELS;
    logger.minLevel = this.minLevel;
    logger.defaultContext = context;
    return logger;
  }

  /**
   * Obtém o histórico de logs
   */
  public getHistory(level?: LogLevel): LogEntry[] {
    if (!level) {
      return [...this.logHistory];
    }
    
    return this.logHistory.filter(entry => 
      this.LOG_LEVELS[entry.level] >= this.LOG_LEVELS[level]
    );
  }

  /**
   * Limpa o histórico de logs
   */
  public clearHistory(): void {
    this.logHistory = [];
    this.info('Histórico de logs limpo');
  }

  /**
   * Exporta logs para JSON
   */
  public exportLogs(level?: LogLevel): string {
    const logs = level ? this.getHistory(level) : this.logHistory;
    return JSON.stringify(logs, null, 2);
  }
}

export default Logger.getInstance();
