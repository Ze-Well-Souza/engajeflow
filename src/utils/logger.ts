
interface LogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: any;
  userId?: string;
  module?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogEntry['level'], message: string, context?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userId: this.getCurrentUserId(),
      module: this.extractModule(message)
    };

    this.logs.push(entry);
    
    // Manter apenas os logs mais recentes
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log no console para desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      console[level](
        `[${entry.timestamp}] [${level.toUpperCase()}] ${message}`,
        context ? context : ''
      );
    }

    // Em produção, enviar logs para serviço de monitoramento
    if (process.env.NODE_ENV === 'production' && level === 'error') {
      this.sendToMonitoring(entry);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Implementar lógica para obter ID do usuário atual
    return 'demo-user';
  }

  private extractModule(message: string): string | undefined {
    const match = message.match(/\[(\w+)\]/);
    return match ? match[1] : undefined;
  }

  private async sendToMonitoring(entry: LogEntry): Promise<void> {
    try {
      // Implementar envio para serviço de monitoramento (ex: Sentry, DataDog)
      console.error('PRODUCTION ERROR:', entry);
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

  public getLogs(level?: LogEntry['level'], limit?: number): LogEntry[] {
    let filteredLogs = level ? this.logs.filter(log => log.level === level) : this.logs;
    return limit ? filteredLogs.slice(-limit) : filteredLogs;
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export default Logger.getInstance();
