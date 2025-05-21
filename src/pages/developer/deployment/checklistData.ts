
import { ChecklistItem } from './types';

export const initialChecklist: ChecklistItem[] = [
  // Segurança
  {
    id: 'sec-1',
    title: 'Testes de penetração',
    description: 'Executar testes de penetração (pentest) completos em todos os endpoints da API e interfaces de usuário',
    completed: true,
    category: 'security',
    priority: 'high'
  },
  {
    id: 'sec-2',
    title: 'Gerenciamento de tokens',
    description: 'Verificar o ciclo de vida completo dos tokens JWT, incluindo emissão, expiração e renovação',
    completed: true,
    category: 'security',
    priority: 'high'
  },
  {
    id: 'sec-3',
    title: 'Conformidade com LGPD/GDPR',
    description: 'Confirmar que todos os processos de tratamento de dados pessoais estão em conformidade com a legislação',
    completed: true,
    category: 'security',
    priority: 'high'
  },
  
  // Performance
  {
    id: 'perf-1',
    title: 'Testes de carga',
    description: 'Realizar testes de carga nas APIs e serviços críticos para validar o comportamento sob alto tráfego',
    completed: true,
    category: 'performance',
    priority: 'high'
  },
  {
    id: 'perf-2',
    title: 'Tempos de resposta',
    description: 'Verificar tempos de resposta sob diferentes condições de carga e otimizar pontos críticos',
    completed: true,
    category: 'performance',
    priority: 'medium'
  },
  {
    id: 'perf-3',
    title: 'Escalabilidade horizontal',
    description: 'Validar que o sistema pode escalar horizontalmente para atender ao aumento de demanda',
    completed: true,
    category: 'performance',
    priority: 'high'
  },
  
  // Monitoramento
  {
    id: 'mon-1',
    title: 'Sistema de backup',
    description: 'Configurar sistema automatizado de backup com verificação periódica de integridade',
    completed: true,
    category: 'monitoring',
    priority: 'high'
  },
  {
    id: 'mon-2',
    title: 'Monitoramento 24/7',
    description: 'Implementar monitoramento contínuo com alertas para eventos críticos',
    completed: true,
    category: 'monitoring',
    priority: 'high'
  },
  {
    id: 'mon-3',
    title: 'Dashboard de saúde',
    description: 'Configurar dashboard para visualização em tempo real do status do sistema',
    completed: true,
    category: 'monitoring',
    priority: 'medium'
  },
  
  // Documentação
  {
    id: 'doc-1',
    title: 'Manuais técnicos',
    description: 'Finalizar documentação técnica para desenvolvedores e administradores de sistema',
    completed: true,
    category: 'documentation',
    priority: 'medium'
  },
  {
    id: 'doc-2',
    title: 'Material de treinamento',
    description: 'Preparar material de treinamento para equipes internas e usuários finais',
    completed: true,
    category: 'documentation',
    priority: 'medium'
  },
  {
    id: 'doc-3',
    title: 'Documentação de API',
    description: 'Documentar todas as APIs públicas e pontos de extensão do sistema',
    completed: true,
    category: 'documentation',
    priority: 'high'
  },
  
  // Lançamento gradual
  {
    id: 'roll-1',
    title: 'Estratégia de rollout',
    description: 'Implementar plano detalhado para lançamento em fases',
    completed: true,
    category: 'rollout',
    priority: 'high'
  },
  {
    id: 'roll-2',
    title: 'Programa beta',
    description: 'Iniciar com grupo seleto de usuários beta para validação final',
    completed: true,
    category: 'rollout',
    priority: 'high'
  },
  {
    id: 'roll-3',
    title: 'Expansão controlada',
    description: 'Planejar crescimento gradual até atingir base completa de usuários',
    completed: true,
    category: 'rollout',
    priority: 'medium'
  }
];
