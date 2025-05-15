
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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { group: "Principal", items: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  ]},
  { group: "Comunicação", items: [
    { icon: MessageCircle, label: "Mensagens", path: "/mensagens" },
    { icon: Layers, label: "Canais", path: "/canais" },
    { icon: Zap, label: "Automação", path: "/automacao" },
    { icon: Bot, label: "Bot de Vendas", path: "/bot-vendas" },
    { icon: FileText, label: "Templates", path: "/templates" },
    { icon: Server, label: "Gateway", path: "/gateway" },
    { icon: BarChart2, label: "Relatórios", path: "/relatorios" },
    { icon: TicketCheck, label: "Tickets", path: "/tickets" },
  ]},
  { group: "Loja", items: [
    { icon: ShoppingCart, label: "Vendas", path: "/vendas" },
    { icon: Package, label: "Produtos", path: "/produtos" },
    { icon: ListChecks, label: "Categorias", path: "/categorias" },
    { icon: Users, label: "Clientes", path: "/clientes" },
  ]},
  { group: "Sistema", items: [
    { icon: Bell, label: "Notificações", path: "/notificacoes" },
    { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
    { icon: LogOut, label: "Sair", path: "/sair" },
  ]},
];

const MainSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if sidebar is collapsed
  const isCollapsed = state === "collapsed";
  
  // Active route detection
  const isActive = (path: string) => currentPath === path;
  
  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <div className={cn("flex items-center px-2 py-4", isCollapsed ? "justify-center" : "px-4")}>
        {!isCollapsed && (
          <span className="text-xl font-semibold text-white">Bot Vendas</span>
        )}
        {isCollapsed && <ShoppingCart className="h-6 w-6" />}
      </div>

      <SidebarContent>
        {navigationItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center py-2 px-4 rounded-md",
                            isActive
                              ? "bg-sidebar-accent text-white font-medium"
                              : "text-gray-300 hover:bg-sidebar-accent/50 hover:text-white"
                          )
                        }
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <div className="mt-auto mb-4 px-4 text-center">
        {!isCollapsed && (
          <div className="flex items-center text-xs text-gray-400">
            <span>Admin</span>
            <span className="ml-1 text-gray-500">admin@techcare.com</span>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default MainSidebar;
