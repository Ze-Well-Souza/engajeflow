
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  ShoppingCart, 
  Users, 
  Settings, 
  Bell, 
  BarChart2,
  Star,
  Globe,
  Share2
} from "lucide-react";

export const navigationItems = [
  {
    group: "Principal",
    items: [
      { title: "Dashboard", href: "/index", icon: LayoutDashboard },
      { title: "Mensagens", href: "/messages", icon: MessageSquare },
      { title: "Agendamentos", href: "/agendamentos", icon: Calendar },
      { title: "Notificações", href: "/notificacoes", icon: Bell },
    ],
  },
  {
    group: "Analytics",
    items: [
      { title: "Relatórios", href: "/relatorios", icon: BarChart2 },
      { title: "Social Media", href: "/social-media", icon: Share2 },
      { title: "Avaliações", href: "/ratings", icon: Star },
    ],
  },
  {
    group: "E-commerce",
    items: [
      { title: "Vendas", href: "/store/vendas", icon: ShoppingCart },
      { title: "Clientes", href: "/store/clientes", icon: Users },
    ],
  },
  {
    group: "Sistema",
    items: [
      { title: "Gateway", href: "/gateway", icon: Globe },
      { title: "Configurações", href: "/configuracoes", icon: Settings },
    ],
  },
];
