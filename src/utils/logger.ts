
import { productionConfig } from '../config/production';

interface LogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
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
    // Carregar configuração com base no ambiente
    this.config = this.loadConfig();
    this.maxLogs = this.config.maxLogs || 1000;
    this.sessionId = this.generateId();
    this.traceId = this.generateId();
    
    // Inicializar conexão para log remoto se estiver configurado
    if (this.isProduction() && this.config.enableRemote) {
      this.initRemoteLogging();
    }
    
    // Inicializar tarefas de manutenção
    this.setupLogMaintenance();
  }

  private loadConfig() {
    if (process.env.NODE_ENV === 'production') {
      return productionConfig.logging;
    }
    
    return {
      level: process.env.LOG_LEVEL || 'debug',
      enableConsole: true,
      enableFile: process.env.LOG_FILE === 'true',
      maxFileSize: '10MB',
      maxFiles: 5,
      enableRemote: false,
      maxLogs: 1000
    };
  }

  private isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
  
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  private initRemoteLogging() {
    // Inicializar conexão com serviço de logging externo
    console.info('[Logger] Inicializando conexão com serviço de log remoto...');
    
    // Este é apenas um esboço - em uma implementação real, 
    // aqui seria estabelecida uma conexão com um serviço como 
    // Sentry, LogRocket, Datadog, etc.
  }
  
  private setupLogMaintenance() {
    // Configurar limpeza periódica de logs em memória
    setInterval(() => {
      if (this.logs.length > this.maxLogs) {
        this.logs = this.logs.slice(-Math.floor(this.maxLogs * 0.9)); // Manter 90% dos logs mais recentes
      }
    }, 60000); // Verificar a cada minuto
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogEntry['level'], message: string, context?: any): void {
    // Verificar nível de logging configurado
    const logLevels = ['debug', 'info', 'warn', 'error'];
    const configLevelIndex = logLevels.indexOf(this.config.level);
    const currentLevelIndex = logLevels.indexOf(level);
    
    // Não registrar se o nível atual for menor que o configurado
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
      environment: process.env.NODE_ENV,
      sessionId: this.sessionId,
      requestId: this.getRequestId(),
      traceId: this.traceId
    };

    this.logs.push(entry);
    
    // Manter apenas os logs mais recentes
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log no console se habilitado
    if (this.config.enableConsole) {
      this.writeToConsole(entry);
    }
    
    // Log em arquivo se habilitado
    if (this.config.enableFile) {
      this.writeToFile(entry);
    }

    // Em produção, enviar logs de erro para serviço de monitoramento
    if (this.isProduction() && this.config.enableRemote && (level === 'error' || level === 'warn')) {
      this.sendToMonitoring(entry);
    }
  }

  private writeToConsole(entry: LogEntry): void {
    const colors = {
      debug: '\x1b[34m', // azul
      info: '\x1b[32m',  // verde
      warn: '\x1b[33m',  // amarelo
      error: '\x1b[31m', // vermelho
      reset: '\x1b[0m'   // reset
    };
    
    const moduleInfo = entry.module ? `[${entry.module}] ` : '';
    const timeInfo = entry.timestamp.split('T')[1].split('.')[0];
    
    console[entry.level](
      `${colors[entry.level]}[${timeInfo}] [${entry.level.toUpperCase()}]${colors.reset} ${moduleInfo}${entry.message}`,
      entry.context ? entry.context : ''
    );
  }
  
  private writeToFile(entry: LogEntry): void {
    // Em uma implementação real, isso escreveria em um arquivo
    // usando fs.appendFile ou uma biblioteca como winston
    // Este é apenas um esboço
    
    try {
      const logLine = JSON.stringify({
        ...entry,
        context: entry.context ? JSON.stringify(entry.context) : undefined
      });
      
      // fs.appendFile('logs/app.log', logLine + '\n', err => {
      //   if (err) console.error('Erro ao escrever log em arquivo:', err);
      // });
    } catch (error) {
      console.error('Erro ao formatar log para arquivo:', error);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Implementar lógica para obter ID do usuário atual
    // Em uma aplicação real, isso viria do contexto de autenticação
    return 'demo-user';
  }
  
  private getRequestId(): string | undefined {
    // Em uma implementação real, isso viria do contexto da requisição HTTP
    // através de um middleware que gera um ID único para cada requisição
    return undefined;
  }

  private extractModule(message: string): string | undefined {
    const match = message.match(/\[(\w+)\]/);
    return match ? match[1] : undefined;
  }

  private async sendToMonitoring(entry: LogEntry): Promise<void> {
    try {
      // Implementar envio para serviço de monitoramento externo
      // Este é apenas um esboço - em uma implementação real,
      // aqui enviaria dados para Sentry, DataDog, etc.
      
      // Em caso de erro crítico, tambem pode notificar por outros canais
      if (entry.level === 'error') {
        // Potencialmente enviar alerta por email, SMS, webhook, etc.
      }
    } catch (error) {
      // Garantir que problemas de monitoramento não afetem o fluxo principal
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
  
  // Métodos adicionais para métricas e diagnóstico
  
  public getLogCount(level?: LogEntry['level']): number {
    if (level) {
      return this.logs.filter(log => log.level === level).length;
    }
    return this.logs.length;
  }
  
  public getErrorRate(timeWindowMs: number = 3600000): number {
    const now = Date.now();
    const cutoff = now - timeWindowMs;
    
    const recentLogs = this.logs.filter(log => 
      new Date(log.timestamp).getTime() > cutoff
    );
    
    if (recentLogs.length === 0) {
      return 0;
    }
    
    const errorCount = recentLogs.filter(log => log.level === 'error').length;
    return (errorCount / recentLogs.length) * 100;
  }
  
  public getModuleStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    this.logs.forEach(log => {
      if (log.module) {
        stats[log.module] = (stats[log.module] || 0) + 1;
      } else {
        stats['unknown'] = (stats['unknown'] || 0) + 1;
      }
    });
    
    return stats;
  }
}

// Exportar instância singleton
export default Logger.getInstance();
