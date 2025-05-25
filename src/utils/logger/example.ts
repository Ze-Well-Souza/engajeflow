
import logger from '../logger';

export function exampleUsage() {
  // Exemplo de uso básico do logger
  logger.info('Aplicação iniciada');
  logger.warn('Aviso: configuração não encontrada');
  logger.error('Erro crítico na aplicação');
  logger.debug('Informação de debug');
}

export function logWithData(data: any) {
  logger.info('Processando dados', { data });
}
