
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ListChecks,
  Users,
  BarChart2,
  TicketCheck,
  MessageCircle,
  Bell,
  Calendar,
  Settings,
  LogOut,
  Zap,
  Bot,
  Layers,
  FileText,
  Server,
  Shield,
  UserCheck,
  ImageIcon,
  Youtube,
  Instagram,
  Facebook,
  Mail,
  TrendingUp,
  ChartLine,
  ChartBar
} from "lucide-react";

// Tipos para os itens de navegação
export type NavigationItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
};

export type NavigationGroup = {
  group: string;
  items: NavigationItem[];
};

// Dados de navegação separados por grupos
export const navigationItems: NavigationGroup[] = [
  { 
    group: "Principal", 
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    ]
  },
  { 
    group: "Comunicação", 
    items: [
      { icon: MessageCircle, label: "Mensagens", path: "/mensagens", badge: "3" },
      { icon: Layers, label: "Canais", path: "/canais" },
      { icon: Zap, label: "Automação", path: "/automacao" },
      { icon: Bot, label: "Bot de Vendas", path: "/bot-vendas" },
      { icon: FileText, label: "Templates", path: "/templates" },
      { icon: Server, label: "Gateway", path: "/gateway" },
      { icon: Mail, label: "Funil de Vendas", path: "/funil-vendas", badge: "Novo" },
    ]
  },
  { 
    group: "Loja", 
    items: [
      { icon: ShoppingCart, label: "Vendas", path: "/vendas" },
      { icon: Package, label: "Produtos", path: "/produtos" },
      { icon: ImageIcon, label: "Catálogo Social", path: "/catalogo-produtos", badge: "Novo" },
      { icon: ListChecks, label: "Categorias", path: "/categorias" },
      { icon: Users, label: "Clientes", path: "/clientes" },
    ]
  },
  { 
    group: "Análises", 
    items: [
      { icon: BarChart2, label: "Relatórios", path: "/relatorios" },
      { icon: TrendingUp, label: "Desempenho Social", path: "/relatorios/social", badge: "Novo" },
      { icon: ChartLine, label: "Conversões", path: "/relatorios/conversoes" },
      { icon: ChartBar, label: "Relatórios Personalizados", path: "/relatorios/personalizados" },
    ]
  },
  { 
    group: "Sistema", 
    items: [
      { icon: Bell, label: "Notificações", path: "/notificacoes", badge: "5" },
      { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
      { icon: Settings, label: "Configurações", path: "/configuracoes" },
    ]
  },
  { 
    group: "Administração", 
    items: [
      { icon: Shield, label: "Admin Dashboard", path: "/admin" },
      { icon: UserCheck, label: "Gestão de Clientes", path: "/admin/clientes" },
      { icon: Shield, label: "Permissões", path: "/admin/permissoes" },
      { icon: FileText, label: "Logs de Atividade", path: "/admin/logs" },
    ]
  },
  { 
    group: "Conta", 
    items: [
      { icon: LogOut, label: "Sair", path: "/sair" },
    ]
  },
];
