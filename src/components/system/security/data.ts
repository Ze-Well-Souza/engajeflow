
import { SecurityItem } from './types';

export const securityItems: SecurityItem[] = [
  {
    id: 'auth-1',
    title: 'Proteção de senhas',
    description: 'Verificação do algoritmo de hash e armazenamento seguro',
    status: 'passed',
    category: 'auth',
    details: 'Usando Argon2id com fatores de custo adequados'
  },
  {
    id: 'auth-2',
    title: 'Autenticação de dois fatores',
    description: 'Implementação e disponibilidade do 2FA',
    status: 'passed',
    category: 'auth',
    details: 'Implementado via TOTP'
  },
  {
    id: 'auth-3',
    title: 'Gestão de sessões',
    description: 'Validade, revogação e controle de sessões',
    status: 'warning',
    category: 'auth',
    details: 'Sessões não expiram automaticamente em dispositivos inativos'
  },
  {
    id: 'data-1',
    title: 'Criptografia de dados sensíveis',
    description: 'Verificação de dados em repouso',
    status: 'passed',
    category: 'data',
    details: 'AES-256 para dados em repouso'
  },
  {
    id: 'data-2',
    title: 'Comunicação segura',
    description: 'Verificação de transporte de dados',
    status: 'passed',
    category: 'data',
    details: 'TLS 1.3 com certificados válidos'
  },
  {
    id: 'data-3',
    title: 'Backups criptografados',
    description: 'Proteção dos dados de backup',
    status: 'warning',
    category: 'data',
    details: 'Implementação parcial, falta rotação automática de chaves'
  },
  {
    id: 'api-1',
    title: 'Validação de entrada',
    description: 'Proteção contra injeção e entrada maliciosa',
    status: 'passed',
    category: 'api',
    details: 'Validação implementada com Zod e sanitização'
  },
  {
    id: 'api-2',
    title: 'Rate limiting',
    description: 'Proteção contra abuso de API',
    status: 'passed',
    category: 'api',
    details: 'Implementado com token bucket por IP e por usuário'
  },
  {
    id: 'api-3',
    title: 'CORS configurado',
    description: 'Verificação de política de CORS',
    status: 'warning',
    category: 'api',
    details: 'Configuração muito permissiva'
  },
  {
    id: 'comp-1',
    title: 'Política de privacidade',
    description: 'Verificação de conformidade legal',
    status: 'pending',
    category: 'compliance',
    details: 'Aguardando revisão legal'
  },
  {
    id: 'comp-2',
    title: 'Gestão de consentimento',
    description: 'Verificação LGPD/GDPR',
    status: 'warning',
    category: 'compliance',
    details: 'Rastreamento de consentimento implementado mas falta funcionalidade de revogação'
  },
  {
    id: 'comp-3',
    title: 'Direito ao esquecimento',
    description: 'Funcionalidade de exclusão de dados',
    status: 'pending',
    category: 'compliance',
    details: 'Em desenvolvimento'
  },
];
