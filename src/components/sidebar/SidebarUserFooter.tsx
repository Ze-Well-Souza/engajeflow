
import React from "react";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SidebarUserFooterProps = {
  isCollapsed: boolean;
};

const SidebarUserFooter: React.FC<SidebarUserFooterProps> = ({ isCollapsed }) => {
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

export default SidebarUserFooter;
