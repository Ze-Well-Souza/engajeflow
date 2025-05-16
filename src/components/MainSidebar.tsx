
import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Tipos para os itens de navegação
type NavigationItem = {
  icon: React.ElementType;
  label: string;
  path: string;
};

type NavigationGroup = {
  group: string;
  items: NavigationItem[];
};

// Dados de navegação separados por grupos
const navigationItems: NavigationGroup[] = [
  { 
    group: "Principal", 
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    ]
  },
  { 
    group: "Comunicação", 
    items: [
      { icon: MessageCircle, label: "Mensagens", path: "/mensagens" },
      { icon: Layers, label: "Canais", path: "/canais" },
      { icon: Zap, label: "Automação", path: "/automacao" },
      { icon: Bot, label: "Bot de Vendas", path: "/bot-vendas" },
      { icon: FileText, label: "Templates", path: "/templates" },
      { icon: Server, label: "Gateway", path: "/gateway" },
      { icon: BarChart2, label: "Relatórios", path: "/relatorios" },
      { icon: TicketCheck, label: "Tickets", path: "/tickets" },
    ]
  },
  { 
    group: "Loja", 
    items: [
      { icon: ShoppingCart, label: "Vendas", path: "/vendas" },
      { icon: Package, label: "Produtos", path: "/produtos" },
      { icon: ListChecks, label: "Categorias", path: "/categorias" },
      { icon: Users, label: "Clientes", path: "/clientes" },
    ]
  },
  { 
    group: "Sistema", 
    items: [
      { icon: Bell, label: "Notificações", path: "/notificacoes" },
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

// Componente para renderizar um grupo de navegação
const NavigationGroup: React.FC<{
  group: NavigationGroup;
  isCollapsed: boolean;
  currentPath: string;
}> = ({ group, isCollapsed, currentPath }) => {
  // Verifica se algum item do grupo está ativo
  const isGroupActive = group.items.some(item => currentPath === item.path);
  
  return (
    <SidebarGroup defaultOpen={isGroupActive}>
      <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <NavigationItem 
              key={item.path} 
              item={item} 
              isCollapsed={isCollapsed} 
              isActive={currentPath === item.path}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

// Componente para renderizar um item de navegação
const NavigationItem: React.FC<{
  item: NavigationItem;
  isCollapsed: boolean;
  isActive: boolean;
}> = ({ item, isCollapsed, isActive }) => {
  const { icon: Icon, label, path } = item;
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        tooltip={isCollapsed ? label : undefined}
        isActive={isActive}
      >
        <NavLink
          to={path}
          className={({ isActive }) =>
            cn(
              "flex items-center py-2 px-4 rounded-md",
              isActive
                ? "bg-sidebar-accent text-white font-medium"
                : "text-gray-300 hover:bg-sidebar-accent/50 hover:text-white"
            )
          }
        >
          <Icon className="h-5 w-5 mr-3" />
          {!isCollapsed && <span>{label}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// Componente para o rodapé do sidebar
const SidebarFooter: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  if (isCollapsed) return null;
  
  return (
    <div className="mt-auto mb-4 px-4 text-center">
      <div className="flex items-center text-xs text-gray-400">
        <span>Admin</span>
        <span className="ml-1 text-gray-500">admin@techcare.com</span>
      </div>
    </div>
  );
};

// Componente principal da sidebar
const MainSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Verifica se a sidebar está colapsada
  const isCollapsed = state === "collapsed";
  
  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <div className={cn("flex items-center px-2 py-4", isCollapsed ? "justify-center" : "px-4")}>
        {!isCollapsed && (
          <span className="text-xl font-semibold text-white">TechCare</span>
        )}
        {isCollapsed && <ShoppingCart className="h-6 w-6" />}
      </div>

      <SidebarContent>
        {navigationItems.map((group, index) => (
          <NavigationGroup 
            key={`${group.group}-${index}`}
            group={group}
            isCollapsed={isCollapsed}
            currentPath={currentPath}
          />
        ))}
      </SidebarContent>
      
      <SidebarFooter isCollapsed={isCollapsed} />
    </Sidebar>
  );
};

export default MainSidebar;
