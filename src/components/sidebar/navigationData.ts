import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  Users,
  Shield,
  Activity,
  HelpCircle,
  Brain,
  Link,
  Zap,
  UserCheck,
  Palette,
  FileVideo2,
  FileImage,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationItems: NavSection[] = [
  {
    title: "Principal",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "IA & Automação",
        url: "/ai",
        icon: Brain,
      },
      {
        title: "Conexões Sociais",
        url: "/social",
        icon: Link,
      },
    ],
  },
  {
    title: "Gestão",
    items: [
      {
        title: "Agendamentos",
        url: "/agendamentos",
        icon: Calendar,
      },
      {
        title: "Mensagens",
        url: "/messages",
        icon: MessageSquare,
      },
      {
        title: "Notificações",
        url: "/notificacoes",
        icon: Bell,
      },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      {
        title: "Posts",
        url: "/posts",
        icon: FileImage,
      },
      {
        title: "Vídeos",
        url: "/videos",
        icon: FileVideo2,
      },
    ],
  },
  {
    title: "Análises",
    items: [
      {
        title: "Relatórios",
        url: "/relatorios",
        icon: BarChart3,
      },
      {
        title: "Avaliações",
        url: "/ratings",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Administração",
    items: [
      {
        title: "Usuários",
        url: "/usuarios",
        icon: Users,
      },
      {
        title: "Planos",
        url: "/planos",
        icon: Shield,
        label: "Novo",
      },
      {
        title: "Configurações",
        url: "/configuracoes",
        icon: Settings,
      },
    ],
  },
  {
    title: "Outros",
    items: [
      {
        title: "Atividades",
        url: "/atividades",
        icon: Activity,
      },
      {
        title: "Aparência",
        url: "/aparencia",
        icon: Palette,
      },
      {
        title: "Suporte",
        url: "/suporte",
        icon: HelpCircle,
      },
    ],
  },
];
