import { Home, Package, LayoutDashboard, Users, Settings, FileText, Sparkles } from "lucide-react";

export const navigationItems = [
  {
    group: "Geral",
    items: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/dashboard",
      },
    ],
  },
  {
    group: "Clientes",
    items: [
      {
        title: "Lista de Clientes",
        icon: Users,
        href: "/clientes",
      },
    ],
  },
  {
    group: "Agendamentos",
    items: [
      {
        title: "Novo Agendamento",
        icon: LayoutDashboard,
        href: "/agendamentos/novo",
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
        href: "/store/catalogo",
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
    group: "Configurações",
    items: [
      {
        title: "Configurações da Conta",
        icon: Settings,
        href: "/configuracoes",
      },
    ],
  },
];
