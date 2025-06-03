
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building } from "lucide-react";
import ClientesTab from "./permissions/ClientesTab";
import OrganizacoesTab from "./permissions/OrganizacoesTab";
import UsuariosTab from "./permissions/UsuariosTab";

const PermissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("clientes");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Acessos</h2>
        <p className="text-muted-foreground">
          Configure permissões de acesso para clientes, organizações e usuários
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clientes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="organizacoes" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Organizações
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clientes" className="space-y-4 mt-4">
          <ClientesTab />
        </TabsContent>

        <TabsContent value="organizacoes" className="space-y-4 mt-4">
          <OrganizacoesTab />
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4 mt-4">
          <UsuariosTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionsPage;
