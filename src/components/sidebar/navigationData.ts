
import { 
  Home, Package, LayoutDashboard, Users, Settings, 
  FileText, Sparkles, Database, BarChart2, Globe, 
  Shield, Lock, UserCog, ScrollText, Bell, Building,
  MessageCircle, Layers, GitBranch
} from "lucide-react";

export const navigationItems = [
  {
    group: "Geral",
    items: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/",
      },
    ],
  },
  {
    group: "Admin",
    items: [
      {
        title: "Painel de Admin",
        icon: UserCog,
        href: "/admin/dashboard",
      },
      {
        title: "Gerenciar Módulos",
        icon: Layers,
        href: "/admin/modules",
      },
      {
        title: "Automação",
        icon: GitBranch,
        href: "/admin/automation",
      },
      {
        title: "Gerenciar Clientes",
        icon: Users,
        href: "/admin/clientes",
      },
      {
        title: "Permissões",
        icon: Lock,
        href: "/admin/permissoes",
      },
      {
        title: "Logs de Atividade",
        icon: ScrollText,
        href: "/admin/activity-logs",
      },
      {
        title: "Organizações",
        icon: Building,
        href: "/admin/organizacoes",
      },
    ],
  },
  {
    group: "Comunicação",
    items: [
      {
        title: "Canais",
        icon: MessageCircle,
        href: "/channels",
      },
    ],
  },
  {
    group: "Agendamentos",
    items: [
      {
        title: "Novo Agendamento",
        icon: LayoutDashboard,
        href: "/agendamentos",
      },
      {
        title: "Lista de Agendamentos",
        icon: LayoutDashboard,
        href: "/agendamentos/lista",
      },
    ],
  },
  {
    group: "Store",
    items: [
      {
        title: "Catálogo de Produtos",
        icon: Package,
        href: "/produtos",
      },
    ],
  },
  {
    group: "Templates",
    items: [
      {
        title: "Templates de Mensagens",
        icon: FileText,
        href: "/templates",
      },
    ],
  },
  {
    group: "Marketing",
    items: [
      {
        title: "Assistente de Conteúdo",
        icon: Sparkles,
        href: "/content-assistant",
      },
    ]
  },
  {
    group: "Relatórios",
    items: [
      {
        title: "Desempenho Social",
        icon: Globe,
        href: "/social-media",
      },
      {
        title: "Análise Avançada",
        icon: BarChart2,
        href: "/reports/advanced",
      },
      {
        title: "Logs de Atividades",
        icon: Database,
        href: "/admin/activity-logs",
      },
    ],
  },
  {
    group: "IA",
    items: [
      {
        title: "Análise de Sentimentos",
        icon: Sparkles,
        href: "/ai/sentiment",
      },
      {
        title: "Gerador de Conteúdo",
        icon: Sparkles,
        href: "/ai/content-generator",
      },
      {
        title: "Análise de Campanhas",
        icon: Sparkles,
        href: "/ai/campaign-analytics",
      },
    ],
  },
  {
    group: "Desenvolvedor",
    items: [
      {
        title: "Migração de Dados",
        icon: Database,
        href: "/developer/data-migration",
      },
      {
        title: "API & Webhooks",
        icon: Globe,
        href: "/developer/api-docs",
      },
    ],
  },
  {
    group: "Configurações",
    items: [
      {
        title: "Configurações da Conta",
        icon: Settings,
        href: "/configuracoes",
      },
      {
        title: "Compliance",
        icon: Shield,
        href: "/compliance",
      },
      {
        title: "Notificações",
        icon: Bell,
        href: "/notificacoes",
      }
    ],
  },
];
