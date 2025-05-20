
export interface PlanFeature {
  name: string;
  description: string;
  includedIn: ('basic' | 'essential' | 'professional')[];
}

export interface PricePlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;  // em centavos
  priceAnnual: number;   // em centavos
  popular?: boolean;
  features: string[];
}

export const plans: PricePlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Para quem está começando',
    priceMonthly: 0,
    priceAnnual: 0,
    features: [
      'Até 3 posts/semana',
      '1 rede social',
      '5 agendamentos/mês',
      'Modelos básicos',
      'Analytics básicos'
    ]
  },
  {
    id: 'essential',
    name: 'Essencial',
    description: 'Para profissionais autônomos',
    priceMonthly: 4990,
    priceAnnual: 47900,
    popular: true,
    features: [
      'Até 15 posts/semana',
      '3 redes sociais',
      'Agendamentos ilimitados',
      'Todos os modelos',
      'Analytics avançados',
      'Suporte prioritário',
      'Templates por segmento'
    ]
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Para empresas e equipes',
    priceMonthly: 9990,
    priceAnnual: 95900,
    features: [
      'Posts ilimitados',
      'Todas as redes sociais',
      'Agendamentos ilimitados',
      'Modelos premium exclusivos',
      'Analytics avançados',
      'Suporte prioritário 24/7',
      'Personalização avançada',
      'Recursos específicos do segmento',
      'API de integração',
      'Múltiplos usuários'
    ]
  }
];

export const segmentSpecificFeatures = {
  beauty: [
    'Templates específicos para beleza',
    'Galeria de antes e depois',
    'Sistema de agendamentos avançado'
  ],
  food: [
    'Cardápio digital interativo',
    'Integração com apps de delivery',
    'Templates para fotografias gastronômicas'
  ],
  home: [
    'Gestão de orçamentos',
    'Catálogo de serviços',
    'Análise de satisfação pós-serviço'
  ],
  education: [
    'Sala de aula virtual',
    'Sistema de avaliações',
    'Biblioteca de conteúdo'
  ],
  events: [
    'Galerias personalizadas',
    'Contratos digitais',
    'Timelines de eventos'
  ]
};
