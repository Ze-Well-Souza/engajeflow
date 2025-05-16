
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SidebarProvider as OriginalSidebarProvider, useSidebar } from "./context";

// Re-export all components
export { useSidebar } from "./context";
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
const SidebarProvider = (props: React.ComponentProps<typeof OriginalSidebarProvider>) => {
  const { children, className, ...restProps } = props;
  
  return (
    <OriginalSidebarProvider
      className={cn(
        "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
        className
      )}
      {...restProps}
    >
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    </OriginalSidebarProvider>
  );
};

// Export the enhanced SidebarProvider
export { SidebarProvider };
