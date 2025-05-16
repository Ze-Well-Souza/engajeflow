
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
  ChevronRight,
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Tipos para os itens de navegação
type NavigationItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
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
      { icon: MessageCircle, label: "Mensagens", path: "/mensagens", badge: "3" },
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

// Componente para renderizar um item de navegação
const NavigationItem: React.FC<{
  item: NavigationItem;
  isCollapsed: boolean;
  isActive: boolean;
}> = ({ item, isCollapsed, isActive }) => {
  const { icon: Icon, label, path, badge } = item;
  
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
              "flex items-center py-2 px-3 rounded-md sidebar-item-hover",
              isActive
                ? "bg-sidebar-accent text-white font-medium"
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
            )
          }
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3 flex-1">{label}</span>}
          {badge && !isCollapsed && (
            <Badge 
              className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground hover-scale"
              variant="default"
            >
              {badge}
            </Badge>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// Componente para renderizar um grupo de navegação
const NavigationGroup: React.FC<{
  group: NavigationGroup;
  isCollapsed: boolean;
  currentPath: string;
}> = ({ group, isCollapsed, currentPath }) => {
  // Verifica se algum item do grupo está ativo
  const isGroupActive = group.items.some(item => currentPath.startsWith(item.path));
  
  return (
    <SidebarGroup defaultOpen={isGroupActive}>
      <SidebarGroupLabel className="flex items-center text-xs uppercase tracking-wider font-semibold text-sidebar-foreground/60">
        {!isCollapsed && group.group}
        {isCollapsed && <ChevronRight className="h-4 w-4" />}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <NavigationItem 
              key={item.path} 
              item={item} 
              isCollapsed={isCollapsed} 
              isActive={currentPath.startsWith(item.path)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

// Componente para o rodapé do sidebar
const SidebarUserFooter: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  if (isCollapsed) {
    return (
      <SidebarFooter className="px-2 pt-2 pb-4 flex justify-center">
        <Avatar className="h-8 w-8 border-2 border-sidebar-accent cursor-pointer hover-scale">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>
      </SidebarFooter>
    );
  }
  
  return (
    <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border/30">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-sidebar-accent cursor-pointer hover-scale">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-sidebar-foreground">Admin</span>
          <span className="text-xs text-sidebar-foreground/60">admin@techcare.com</span>
        </div>
      </div>
    </SidebarFooter>
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
    <Sidebar 
      className={cn(
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300 ease-in-out border-r border-sidebar-border/20"
      )} 
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end text-sidebar-foreground/60 hover:text-sidebar-foreground" />
      
      <div className={cn(
        "flex items-center px-3 py-5 mb-2", 
        isCollapsed ? "justify-center" : "px-4"
      )}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-sidebar-primary to-purple-400 bg-clip-text text-transparent">
              TechCare
            </span>
            <Badge variant="outline" className="text-xs font-normal text-sidebar-foreground/60 border-sidebar-border/30">
              v1.0
            </Badge>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-md bg-sidebar-primary flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
        )}
      </div>

      <SidebarContent className="px-2">
        {navigationItems.map((group, index) => (
          <NavigationGroup 
            key={`${group.group}-${index}`}
            group={group}
            isCollapsed={isCollapsed}
            currentPath={currentPath}
          />
        ))}
      </SidebarContent>
      
      <SidebarUserFooter isCollapsed={isCollapsed} />
    </Sidebar>
  );
};

export default MainSidebar;
