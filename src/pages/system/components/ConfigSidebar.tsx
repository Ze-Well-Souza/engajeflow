
import React from "react";
import { User, Store, Bell, Shield, Database, Settings, Globe } from "lucide-react";

const ConfigSidebar: React.FC = () => {
  return (
    <div className="sticky top-4 space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-2 px-4">CONFIGURAÇÕES</h3>
      
      <a href="#conta" className="flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground">
        <User className="h-4 w-4 mr-3" />
        Conta
      </a>
      
      <a href="#loja" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
        <Store className="h-4 w-4 mr-3" />
        Loja
      </a>
      
      <a href="#notificacoes" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
        <Bell className="h-4 w-4 mr-3" />
        Notificações
      </a>
      
      <a href="#seguranca" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
        <Shield className="h-4 w-4 mr-3" />
        Segurança
      </a>
      
      <a href="#integracao" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
        <Database className="h-4 w-4 mr-3" />
        Integração
      </a>
      
      <a href="#avancado" className="flex items-center px-4 py-2 rounded-md hover:bg-muted text-foreground">
        <Settings className="h-4 w-4 mr-3" />
        Avançado
      </a>
    </div>
  );
};

export default ConfigSidebar;
