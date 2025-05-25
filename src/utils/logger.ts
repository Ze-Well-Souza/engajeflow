
import { productionConfig } from '../config/production';

interface LogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  context?: any;
  userId?: string;
  module?: string;
  environment?: string;
  sessionId?: string;
  requestId?: string;
  traceId?: string;
  resourceId?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs: number;
  private config: any;
  private sessionId: string;
  private traceId: string;

  private constructor() {
    this.config = this.loadConfig();
    this.maxLogs = this.config.maxLogs || 1000;
    this.sessionId = this.generateId();
    this.traceId = this.generateId();

    if (this.isProduction() && this.config.enableRemote) {
      this.initRemoteLogging();
    }
    this.setupLogMaintenance();
  }

  private loadConfig() {
    // Verificar se estamos em produção baseado no hostname ou variável de ambiente
    const isProduction = typeof window !== 'undefined' 
      ? window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovableproject.com')
      : false;

    if (isProduction) {
      return productionConfig.logging;
    }

    return {
      level: 'debug',
      enableConsole: true,
      enableFile: false,
      maxFileSize: '10MB',
      maxFiles: 5,
      enableRemote: false,
      maxLogs: 1000
    };
  }

  private isProduction(): boolean {
    if (typeof window !== 'undefined') {
      return window.location.hostname !== 'localhost' && !window.location.hostname.includes('lovableproject.com');
    }
    return false;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  private initRemoteLogging() {
    console.info('[Logger] Inicializando conexão com serviço de log remoto...');
  }

  private setupLogMaintenance() {
    setInterval(() => {
      if (this.logs.length > this.maxLogs) {
        this.logs = this.logs.slice(-Math.floor(this.maxLogs * 0.9));
      }
    }, 60000);
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLevel(level: LogEntry['level']): void {
    const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    if (validLevels.includes(level)) {
      this.config.level = level;
      this.info(`[Logger] Nível de log alterado para: ${level}`);
    } else {
      this.warn(`[Logger] Tentativa de definir nível de log inválido: ${level}`);
    }
  }

  private log(level: LogEntry['level'], message: string, context?: any): void {
    const logLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const configLevelIndex = logLevels.indexOf(this.config.level);
    const currentLevelIndex = logLevels.indexOf(level);

    if (currentLevelIndex < configLevelIndex) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userId: this.getCurrentUserId(),
      module: this.extractModule(message),
      environment: this.isProduction() ? 'production' : 'development',
      sessionId: this.sessionId,
      requestId: this.getRequestId(),
      traceId: this.traceId
    };

    // Log first, then push to history
    if (this.config.enableConsole) {
      this.writeToConsole(entry);
    }
    if (this.config.enableFile) {
      this.writeToFile(entry);
    }
    if (this.isProduction() && this.config.enableRemote && (level === 'error' || level === 'warn' || level === 'fatal')) {
      this.sendToMonitoring(entry);
    }

    // Add to history after logging
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private writeToConsole(entry: LogEntry): void {
    const colors = {
      debug: '\x1b[34m', // azul
      info: '\x1b[32m',  // verde
      warn: '\x1b[33m',  // amarelo
      error: '\x1b[31m', // vermelho
      fatal: '\x1b[31m', // vermelho (igual error)
      reset: '\x1b[0m'   // reset
    };

    const moduleInfo = entry.module ? `[${entry.module}] ` : '';
    const timeInfo = entry.timestamp.split('T')[1].split('.')[0];

    const consoleMethod = (level: LogEntry['level']) => {
        if (level === 'fatal' || level === 'error') return console.error;
        if (level === 'warn') return console.warn;
        if (level === 'info') return console.info;
        return console.debug;
    }

    consoleMethod(entry.level)(
      `${colors[entry.level]}[${timeInfo}] [${entry.level.toUpperCase()}]${colors.reset} ${moduleInfo}${entry.message}`,
      entry.context ? entry.context : ''
    );
  }

  private writeToFile(entry: LogEntry): void {
    try {
      const logLine = JSON.stringify({
        ...entry,
        context: entry.context ? JSON.stringify(entry.context) : undefined
      });
      // fs.appendFile('logs/app.log', logLine + '\n', err => { ... });
    } catch (error) {
      console.error('Erro ao formatar log para arquivo:', error);
    }
  }

  private getCurrentUserId(): string | undefined {
    return 'demo-user';
  }

  private getRequestId(): string | undefined {
    return undefined;
  }

  private extractModule(message: string): string | undefined {
    const match = message.match(/\[(\w+)\]/);
    return match ? match[1] : undefined;
  }

  private async sendToMonitoring(entry: LogEntry): Promise<void> {
    try {
      if (entry.level === 'error' || entry.level === 'fatal') {
        // Potencialmente enviar alerta
      }
    } catch (error) {
      console.error('Failed to send log to monitoring service:', error);
    }
  }

  public debug(message: string, context?: any): void {
    this.log('debug', message, context);
  }

  public info(message: string, context?: any): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: any): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: any): void {
    this.log('error', message, context);
  }

  public fatal(message: string, context?: any): void {
    this.log('fatal', message, context);
  }

  public getHistory(level?: LogEntry['level'], limit?: number): LogEntry[] {
    const logLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    let filteredLogs = this.logs;

    if (level) {
        const levelIndex = logLevels.indexOf(level);
        filteredLogs = this.logs.filter(log => logLevels.indexOf(log.level) >= levelIndex);
    }

    return limit ? filteredLogs.slice(-limit) : filteredLogs;
  }

  // Log before clearing history
  public clearHistory(): void {
    // Log first
    this.info('[Logger] Histórico de logs limpo');
    // Then clear
    this.logs = [];
  }

  public exportLogs(level?: LogEntry['level']): string {
    const logsToExport = this.getHistory(level);
    return JSON.stringify(logsToExport, null, 2);
  }

  public getLogCount(level?: LogEntry['level']): number {
    if (level) {
      return this.logs.filter(log => log.level === level).length;
    }
    return this.logs.length;
  }

  public getErrorRate(timeWindowMs: number = 3600000): number {
    const now = Date.now();
    const cutoff = now - timeWindowMs;
    const recentLogs = this.logs.filter(log => new Date(log.timestamp).getTime() > cutoff);
    if (recentLogs.length === 0) return 0;
    const errorCount = recentLogs.filter(log => log.level === 'error' || log.level === 'fatal').length;
    return (errorCount / recentLogs.length) * 100;
  }

  public getModuleStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.logs.forEach(log => {
      const moduleKey = log.module || 'unknown';
      stats[moduleKey] = (stats[moduleKey] || 0) + 1;
    });
    return stats;
  }

  public startOperation(operationName: string) {
    const startTime = Date.now();
    this.info(`Iniciando operação: ${operationName}`);
    
    return {
      end: (status: 'success' | 'failure' = 'success', meta: any = {}) => {
        const duration = Date.now() - startTime;
        this.info(`Operação finalizada: ${operationName}`, {
          ...meta,
          duration,
          status
        });
        return duration;
      }
    };
  }
}

export default Logger.getInstance();
