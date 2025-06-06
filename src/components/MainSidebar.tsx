
import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import NavigationGroup from "./sidebar/NavigationGroup";
import NavigationItem from "./sidebar/NavigationItem";
import SidebarUserFooter from "./sidebar/SidebarUserFooter";
import { navigationItems } from "./sidebar/navigationData";

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
            key={`${group.title}-${index}`}
            title={group.title}
            defaultOpen={group.items.some(item => currentPath.startsWith(item.url || ''))}
          >
            {group.items.map((item) => {
              const isActive = currentPath.startsWith(item.url || '');
              
              return (
                <NavigationItem
                  key={item.title}
                  to={item.url || '#'}
                  active={isActive}
                  collapsed={isCollapsed}
                  icon={item.icon!}
                >
                  {item.title}
                </NavigationItem>
              );
            })}
          </NavigationGroup>
        ))}
      </SidebarContent>
      
      <SidebarUserFooter isCollapsed={isCollapsed} />
    </Sidebar>
  );
};

export default MainSidebar;
