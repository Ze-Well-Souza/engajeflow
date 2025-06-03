
import React from "react";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type SidebarUserFooterProps = {
  isCollapsed: boolean;
};

const SidebarUserFooter: React.FC<SidebarUserFooterProps> = ({ isCollapsed }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Removido o handleLogout pois estamos em modo de teste sem autenticação
  const handleLogout = () => {
    navigate("/");
  };
  
  const userInitials = currentUser?.name 
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : currentUser?.email?.substring(0, 2).toUpperCase() || 'TZ';
  
  const userDisplayName = currentUser?.name || currentUser?.email || 'Usuário de Teste';
  const userRole = currentUser?.is_admin ? 'Administrador' : 'Usuário';
  
  if (isCollapsed) {
    return (
      <SidebarFooter className="px-2 pt-2 pb-4 flex flex-col items-center justify-center">
        <Avatar className="h-8 w-8 border-2 border-sidebar-accent cursor-pointer hover-scale">
          <AvatarImage src="" alt={userDisplayName} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 mt-2 text-gray-400 hover:text-gray-100"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </SidebarFooter>
    );
  }
  
  return (
    <SidebarFooter className="p-4 mt-auto border-t border-sidebar-border/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-sidebar-accent cursor-pointer hover-scale">
            <AvatarImage src="" alt={userDisplayName} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">{userDisplayName}</span>
            <span className="text-xs text-sidebar-foreground/60">{userRole}</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-gray-100"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </SidebarFooter>
  );
};

export default SidebarUserFooter;
