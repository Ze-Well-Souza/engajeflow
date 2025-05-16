
import React from "react";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import NavigationItem from "./NavigationItem";
import { NavigationItemProps } from "./NavigationItem";

export type NavigationGroupProps = {
  group: string;
  items: Omit<NavigationItemProps, "isCollapsed" | "isActive">[];
  isCollapsed: boolean;
  currentPath: string;
};

const NavigationGroup: React.FC<NavigationGroupProps> = ({ 
  group, 
  items, 
  isCollapsed, 
  currentPath 
}) => {
  // Verifica se algum item do grupo está ativo
  const isGroupActive = items.some(item => currentPath.startsWith(item.path));
  
  return (
    <SidebarGroup open={isGroupActive}>
      <SidebarGroupLabel className="flex items-center text-xs uppercase tracking-wider font-semibold text-sidebar-foreground/60">
        {!isCollapsed && group}
        {isCollapsed && <ChevronRight className="h-4 w-4" />}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavigationItem 
              key={item.path} 
              isCollapsed={isCollapsed} 
              isActive={currentPath.startsWith(item.path)}
              {...item}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavigationGroup;
