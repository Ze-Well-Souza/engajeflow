
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

// Tipo para os itens de navegação
export type NavigationItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
  isCollapsed: boolean;
  isActive: boolean;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  icon: Icon, 
  label, 
  path, 
  badge, 
  isCollapsed, 
  isActive 
}) => {
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

export default NavigationItem;
