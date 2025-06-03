
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ClienteSearch from "./components/ClienteSearch";
import ClientesList from "./components/ClientesList";
import PermissionsConfig from "./components/PermissionsConfig";
import { Client, PermissionModule, Profile } from "./types";

// Mock client data for the filter
const mockClients = [
  { id: 1, name: "TechSolutions Ltda", type: "juridica", plano: "Enterprise" },
  { id: 2, name: "Marcelo Silva", type: "fisica", plano: "Standard" },
  { id: 3, name: "ComércioFácil S.A.", type: "juridica", plano: "Enterprise" },
  { id: 4, name: "Ana Paula Ferreira", type: "fisica", plano: "Basic" }
];

// Mock permission modules
const modulesList = [
  { id: "dashboard", name: "Dashboard", permissions: ["view"] },
  { id: "messages", name: "Mensagens", permissions: ["view", "send", "delete"] },
  { id: "channels", name: "Canais", permissions: ["view", "create", "edit", "delete"] },
  { id: "automation", name: "Automação", permissions: ["view", "create", "edit", "delete"] },
  { id: "sales_bot", name: "Bot de Vendas", permissions: ["view", "configure", "analyze"] },
  { id: "templates", name: "Templates", permissions: ["view", "create", "edit", "delete"] },
  { id: "gateway", name: "Gateway", permissions: ["view", "configure"] },
  { id: "reports", name: "Relatórios", permissions: ["view", "export"] },
  { id: "store", name: "Loja", permissions: ["view", "manage_products", "manage_orders", "manage_customers"] },
  { id: "system", name: "Sistema", permissions: ["view", "notifications", "scheduling", "settings"] }
];

// Perfis predefinidos
const predefinedProfiles = [
  { 
    id: 1, 
    name: "Administrador", 
    description: "Acesso completo ao sistema",
    permissions: modulesList.reduce((acc, module) => {
      acc[module.id] = module.permissions;
      return acc;
    }, {} as Record<string, string[]>)
  },
  { 
    id: 2, 
    name: "Gerente", 
    description: "Pode gerenciar a maioria das funções exceto configurações de sistema",
    permissions: modulesList.reduce((acc, module) => {
      if (module.id !== "system") {
        acc[module.id] = module.permissions;
      } else {
        acc[module.id] = ["view"];
      }
      return acc;
    }, {} as Record<string, string[]>)
  },
  { 
    id: 3, 
    name: "Operador", 
    description: "Pode operar funções diárias mas sem acesso administrativo",
    permissions: modulesList.reduce((acc, module) => {
      if (["dashboard", "messages", "channels", "templates"].includes(module.id)) {
        acc[module.id] = ["view"];
      }
      if (module.id === "messages") {
        acc[module.id] = acc[module.id] || [];
        acc[module.id].push("send");
      }
      return acc;
    }, {} as Record<string, string[]>)
  }
];

const ClientesTab: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [clientPermissions, setClientPermissions] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toast } = useToast();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileDesc, setNewProfileDesc] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>(predefinedProfiles);

  useEffect(() => {
    // Se um perfil predefinido for selecionado, carregar suas permissões
    if (selectedProfile) {
      const profile = profiles.find(p => p.id.toString() === selectedProfile);
      if (profile) {
        setClientPermissions(profile.permissions);
      }
    }
  }, [selectedProfile, profiles]);

  const handlePermissionChange = (moduleId: string, permission: string, checked: boolean) => {
    setClientPermissions(prevState => {
      const currentPermissions = prevState[moduleId] || [];
      
      if (checked) {
        return {
          ...prevState,
          [moduleId]: [...currentPermissions, permission]
        };
      } else {
        return {
          ...prevState,
          [moduleId]: currentPermissions.filter(p => p !== permission)
        };
      }
    });
  };

  const handleSavePermissions = () => {
    if (!selectedClient) {
      toast({
        title: "Erro ao salvar",
        description: "Selecione um cliente primeiro.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, you would save the permissions to a backend
    console.log("Saving permissions for client", selectedClient, clientPermissions);
    
    toast({
      title: "Permissões salvas",
      description: "As permissões do cliente foram atualizadas com sucesso."
    });
  };

  const handleSaveProfile = () => {
    if (!newProfileName) {
      toast({
        title: "Erro ao salvar",
        description: "Nome do perfil é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    const newProfile = {
      id: profiles.length + 1,
      name: newProfileName,
      description: newProfileDesc,
      permissions: clientPermissions
    };

    setProfiles([...profiles, newProfile]);
    setShowProfileDialog(false);
    setNewProfileName("");
    setNewProfileDesc("");

    toast({
      title: "Perfil salvo",
      description: "O novo perfil de permissões foi criado com sucesso."
    });
  };

  const isPermissionChecked = (moduleId: string, permission: string) => {
    return clientPermissions[moduleId]?.includes(permission) || false;
  };

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Selecione um Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <ClienteSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />

          <div className="mt-4">
            <ClientesList 
              filteredClients={filteredClients}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
          </div>
        </CardContent>
      </Card>

      {selectedClient && (
        <PermissionsConfig 
          selectedClient={selectedClient}
          clients={mockClients}
          clientPermissions={clientPermissions}
          profiles={profiles}
          modulesList={modulesList}
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          isPermissionChecked={isPermissionChecked}
          handlePermissionChange={handlePermissionChange}
          handleSavePermissions={handleSavePermissions}
          showProfileDialog={showProfileDialog}
          setShowProfileDialog={setShowProfileDialog}
          newProfileName={newProfileName}
          setNewProfileName={setNewProfileName}
          newProfileDesc={newProfileDesc}
          setNewProfileDesc={setNewProfileDesc}
          handleSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default ClientesTab;
