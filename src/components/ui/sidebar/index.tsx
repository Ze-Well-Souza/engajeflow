
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Re-export all components
export { useSidebar, SidebarProvider } from "./context";
export { 
  Sidebar, 
  SidebarTrigger, 
  SidebarRail, 
  SidebarInset 
} from "./sidebar";
export { 
  SidebarInput, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarSeparator, 
  SidebarContent 
} from "./sidebar-sections";
export { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupAction, 
  SidebarGroupContent 
} from "./sidebar-group";
export { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarMenuAction, 
  SidebarMenuBadge 
} from "./sidebar-menu";
export { 
  SidebarMenuSkeleton, 
  SidebarMenuSub, 
  SidebarMenuSubItem, 
  SidebarMenuSubButton 
} from "./sidebar-menu-utils";

// Adapt SidebarProvider to include TooltipProvider
const EnhancedSidebarProvider: typeof SidebarProvider = (props) => {
  const { children, className, ...restProps } = props;
  
  return (
    <SidebarProvider
      className={cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
        className
      )}
      {...restProps}
    >
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    </SidebarProvider>
  );
};

// Override the original export with the enhanced one
export { EnhancedSidebarProvider as SidebarProvider };
