
import React from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
}

interface NavigationGroupProps {
  group: string;
  items: NavItem[];
  isCollapsed: boolean;
  currentPath: string;
}

const NavigationGroup: React.FC<NavigationGroupProps> = ({
  group,
  items,
  isCollapsed,
  currentPath,
}) => {
  // Verifica se algum item do grupo está ativo
  const isGroupActive = items.some(
    (item) => item.href && currentPath.startsWith(item.href)
  );

  return (
    <div className="mb-4">
      {!isCollapsed && (
        <div className="px-3 mb-2">
          <h4 className="text-xs font-semibold text-sidebar-foreground/50">
            {group}
          </h4>
        </div>
      )}
      
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = currentPath.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <NavigationItem
              key={item.title}
              to={item.href}
              active={isActive}
              collapsed={isCollapsed}
              icon={<Icon className="h-4 w-4" />}
            >
              {item.title}
            </NavigationItem>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationGroup;
