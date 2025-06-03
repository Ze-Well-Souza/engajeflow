/**
 * Logger estruturado para TechCare Connect Automator
 * Implementa um sistema de logs com níveis, timestamps e formatos configuráveis
 * usando Winston para substituir console.log em toda a aplicação.
 */

import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Garantir que o diretório de logs exista
const logDir = process.env.LOG_DIR || 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Determinar o modo de operação para nomear os arquivos de log
const operationMode = process.env.OPERATION_MODE || 'app';

// Configurar formatos
const formats = [
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
];

// Formato personalizado para console
const consoleFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let metaStr = '';
  if (Object.keys(metadata).length > 0 && metadata.stack !== undefined) {
    metaStr = `\n${metadata.stack}`;
  } else if (Object.keys(metadata).length > 0) {
    metaStr = Object.keys(metadata).length ? `\n${JSON.stringify(metadata, null, 2)}` : '';
  }
  
  return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
});

// Criar o logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: operationMode },
  transports: [
    // Arquivo de log para todos os níveis
    new winston.transports.File({
      filename: path.join(logDir, `${operationMode}.log`),
      format: winston.format.combine(...formats)
    }),
    
    // Arquivo separado para erros
    new winston.transports.File({
      filename: path.join(logDir, `${operationMode}-error.log`),
      level: 'error',
      format: winston.format.combine(...formats)
    })
  ]
});

// Adicionar transporte de console em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS'
      }),
      consoleFormat
    )
  }));
}

// Métodos de log com suporte a contexto
export default {
  /**
   * Log de nível debug
   * @param message Mensagem de log
   * @param meta Metadados adicionais (opcional)
   */
  debug: (message: string, meta: object = {}) => {
    logger.debug(message, meta);
  },
  
  /**
   * Log de nível info
   * @param message Mensagem de log
   * @param meta Metadados adicionais (opcional)
   */
  info: (message: string, meta: object = {}) => {
    logger.info(message, meta);
  },
  
  /**
   * Log de nível warn
   * @param message Mensagem de log
   * @param meta Metadados adicionais (opcional)
   */
  warn: (message: string, meta: object = {}) => {
    logger.warn(message, meta);
  },
  
  /**
   * Log de nível error
   * @param message Mensagem de log
   * @param error Erro ou metadados adicionais (opcional)
   */
  error: (message: string, error: Error | object = {}) => {
    if (error instanceof Error) {
      logger.error(message, { error: error.message, stack: error.stack });
    } else {
      logger.error(message, error);
    }
  },
  
  /**
   * Cria um logger com contexto específico
   * @param context Nome do contexto
   * @returns Logger com contexto
   */
  withContext: (context: string) => {
    const contextLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      defaultMeta: { service: operationMode, context },
      transports: logger.transports
    });
    
    return {
      debug: (message: string, meta: object = {}) => {
        contextLogger.debug(message, meta);
      },
      info: (message: string, meta: object = {}) => {
        contextLogger.info(message, meta);
      },
      warn: (message: string, meta: object = {}) => {
        contextLogger.warn(message, meta);
      },
      error: (message: string, error: Error | object = {}) => {
        if (error instanceof Error) {
          contextLogger.error(message, { error: error.message, stack: error.stack });
        } else {
          contextLogger.error(message, error);
        }
      }
    };
  },
  
  /**
   * Registra início de operação com medição de tempo
   * @param operationName Nome da operação
   * @returns Função para finalizar e registrar o tempo da operação
   */
  startOperation: (operationName: string) => {
    const startTime = Date.now();
    logger.info(`Iniciando operação: ${operationName}`);
    
    return {
      end: (status: 'success' | 'failure' = 'success', meta: object = {}) => {
        const duration = Date.now() - startTime;
        logger.info(`Operação finalizada: ${operationName}`, {
          ...meta,
          duration,
          status
        });
        return duration;
      }
    };
  }
};
