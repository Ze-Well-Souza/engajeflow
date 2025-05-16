
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Search, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";

// Mock client data for the filter
const mockClients = [
  { id: 1, name: "TechSolutions Ltda", type: "juridica" },
  { id: 2, name: "Marcelo Silva", type: "fisica" },
  { id: 3, name: "ComércioFácil S.A.", type: "juridica" },
  { id: 4, name: "Ana Paula Ferreira", type: "fisica" }
];

// Mock permission modules
const modulesList = [
  {
    id: "dashboard",
    name: "Dashboard",
    permissions: ["view"]
  },
  {
    id: "messages",
    name: "Mensagens",
    permissions: ["view", "send", "delete"]
  },
  {
    id: "channels",
    name: "Canais",
    permissions: ["view", "create", "edit", "delete"]
  },
  {
    id: "automation",
    name: "Automação",
    permissions: ["view", "create", "edit", "delete"]
  },
  {
    id: "sales_bot",
    name: "Bot de Vendas",
    permissions: ["view", "configure", "analyze"]
  },
  {
    id: "templates",
    name: "Templates",
    permissions: ["view", "create", "edit", "delete"]
  },
  {
    id: "gateway",
    name: "Gateway",
    permissions: ["view", "configure"]
  },
  {
    id: "reports",
    name: "Relatórios",
    permissions: ["view", "export"]
  },
  {
    id: "store",
    name: "Loja",
    permissions: ["view", "manage_products", "manage_orders", "manage_customers"]
  },
  {
    id: "system",
    name: "Sistema",
    permissions: ["view", "notifications", "scheduling", "settings"]
  }
];

const PermissionsPage = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [clientPermissions, setClientPermissions] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

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

  const isPermissionChecked = (moduleId: string, permission: string) => {
    return clientPermissions[moduleId]?.includes(permission) || false;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Permissões</h2>
        <p className="text-muted-foreground">
          Configure as permissões de acesso para cada cliente
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Selecione um Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="client">Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              disabled={!selectedClient}
            >
              <Search className="h-4 w-4" />
              Carregar Permissões
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedClient && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Configurar Permissões</CardTitle>
            <Button onClick={handleSavePermissions} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Permissões
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Módulo</TableHead>
                  <TableHead>Permissões</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulesList.map(module => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {module.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-6">
                        {module.permissions.map(permission => (
                          <div key={`${module.id}-${permission}`} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${module.id}-${permission}`}
                              checked={isPermissionChecked(module.id, permission)}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.id, permission, !!checked)
                              }
                            />
                            <label 
                              htmlFor={`${module.id}-${permission}`} 
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                            >
                              {permission.replace('_', ' ')}
                            </label>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PermissionsPage;
