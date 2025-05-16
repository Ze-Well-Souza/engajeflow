
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface NavigationItemProps {
  to: string;
  active: boolean;
  collapsed: boolean;
  icon: LucideIcon;
  children?: ReactNode;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  active,
  collapsed,
  icon: Icon,
  children
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center h-10 px-2 rounded-md text-sm font-medium transition-colors",
        collapsed ? "justify-center" : "justify-start",
        active
          ? "bg-sidebar-active text-sidebar-active-foreground hover:bg-sidebar-active/90"
          : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-hover"
      )}
    >
      <Icon 
        className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-2")} 
        aria-hidden="true" 
      />
      {!collapsed && <span>{children}</span>}
    </Link>
  );
};

export default NavigationItem;
