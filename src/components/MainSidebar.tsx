
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
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "Vendas", path: "/vendas" },
  { icon: Package, label: "Produtos", path: "/produtos" },
  { icon: ListChecks, label: "Categorias", path: "/categorias" },
  { icon: Users, label: "Clientes", path: "/clientes" },
  { icon: BarChart2, label: "Estatísticas", path: "/estatisticas" },
  { icon: TicketCheck, label: "Tickets", path: "/tickets" },
  { icon: MessageCircle, label: "Mensagens", path: "/mensagens" },
  { icon: Bell, label: "Notificações", path: "/notificacoes" },
  { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
  { icon: LogOut, label: "Sair", path: "/sair" },
];

const MainSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Active route detection
  const isActive = (path: string) => currentPath === path;
  
  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible>
      <SidebarTrigger className="m-2 self-end" />
      
      <div className={cn("flex items-center px-2 py-4", collapsed ? "justify-center" : "px-4")}>
        {!collapsed && (
          <span className="text-xl font-semibold text-white">Bot Vendas</span>
        )}
        {collapsed && <ShoppingCart className="h-6 w-6" />}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
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
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="mt-auto mb-4 px-4 text-center">
        {!collapsed && (
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
