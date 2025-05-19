
import { Home, Package, LayoutDashboard, Users, Settings, FileText, Sparkles, Database, BarChart2, Globe, Shield } from "lucide-react";

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
    group: "Clientes",
    items: [
      {
        title: "Lista de Clientes",
        icon: Users,
        href: "/admin/dashboard",
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
        href: "/agendamentos",
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
        href: "/admin/dashboard",
      },
      {
        title: "Compliance",
        icon: Shield,
        href: "/compliance",
      },
    ],
  },
];
