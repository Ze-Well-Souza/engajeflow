
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Search, Save, Users, Building, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock client data for the filter
const mockClients = [
  { id: 1, name: "TechSolutions Ltda", type: "juridica", plano: "Enterprise" },
  { id: 2, name: "Marcelo Silva", type: "fisica", plano: "Standard" },
  { id: 3, name: "ComércioFácil S.A.", type: "juridica", plano: "Enterprise" },
  { id: 4, name: "Ana Paula Ferreira", type: "fisica", plano: "Basic" }
];

// Mock organizações
const mockOrganizacoes = [
  { id: 1, nome: "TechCare Solutions", clientes: 5, usuarios: 12 },
  { id: 2, nome: "AgTech Marketing", clientes: 3, usuarios: 7 },
  { id: 3, nome: "Digital Commerce", clientes: 8, usuarios: 15 }
];

// Mock usuários
const mockUsuarios = [
  { id: 1, nome: "João Silva", email: "joao@techcare.com", perfil: "administrador", organizacao: "TechCare Solutions" },
  { id: 2, nome: "Maria Oliveira", email: "maria@techcare.com", perfil: "gerente", organizacao: "TechCare Solutions" },
  { id: 3, nome: "Carlos Santos", email: "carlos@agtech.com", perfil: "operador", organizacao: "AgTech Marketing" },
  { id: 4, nome: "Pedro Almeida", email: "pedro@digitalcommerce.com", perfil: "administrador", organizacao: "Digital Commerce" }
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

// Perfis predefinidos
const predefinedProfiles = [
  { 
    id: 1, 
    name: "Administrador", 
    description: "Acesso completo ao sistema",
    permissions: modulesList.reduce((acc, module) => {
      acc[module.id] = module.permissions;
      return acc;
    }, {})
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
    }, {})
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
        acc[module.id].push("send");
      }
      return acc;
    }, {})
  }
];

const PermissionsPage = () => {
  const [activeTab, setActiveTab] = useState("clientes");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [clientPermissions, setClientPermissions] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toast } = useToast();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileDesc, setNewProfileDesc] = useState("");
  const [profiles, setProfiles] = useState(predefinedProfiles);

  useEffect(() => {
    // Se um perfil predefinido for selecionado, carregar suas permissões
    if (selectedProfile) {
      const profile = profiles.find(p => p.id.toString() === selectedProfile);
      if (profile) {
        setClientPermissions(profile.permissions);
      }
    }
  }, [selectedProfile]);

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

  const filteredOrganizacoes = mockOrganizacoes.filter(org => 
    org.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsuarios = mockUsuarios.filter(user => 
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.perfil.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organizacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Tab de Clientes */}
        <TabsContent value="clientes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Selecione um Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="client-search">Buscar Cliente</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="client-search" 
                      placeholder="Nome do cliente ou tipo..." 
                      className="pl-8" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map(client => (
                      <TableRow key={client.id} className={selectedClient === client.id.toString() ? "bg-muted/50" : ""}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>
                          <Badge variant={client.type === "juridica" ? "outline" : "secondary"}>
                            {client.type === "juridica" ? "Pessoa Jurídica" : "Pessoa Física"}
                          </Badge>
                        </TableCell>
                        <TableCell>{client.plano}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedClient(client.id.toString())}
                          >
                            Selecionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedClient && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Configurar Permissões</CardTitle>
                  <CardDescription>
                    Cliente: {mockClients.find(c => c.id.toString() === selectedClient)?.name}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Salvar como Perfil
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Perfil de Permissões</DialogTitle>
                        <DialogDescription>
                          Salve as permissões atuais como um perfil reutilizável.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="profile-name">Nome do Perfil</Label>
                          <Input 
                            id="profile-name" 
                            value={newProfileName} 
                            onChange={(e) => setNewProfileName(e.target.value)} 
                            placeholder="Ex: Administrador, Usuário Básico, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profile-desc">Descrição (opcional)</Label>
                          <Input 
                            id="profile-desc" 
                            value={newProfileDesc} 
                            onChange={(e) => setNewProfileDesc(e.target.value)} 
                            placeholder="Descreva o objetivo deste perfil de permissões"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowProfileDialog(false)}>Cancelar</Button>
                        <Button onClick={handleSaveProfile}>Salvar Perfil</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={handleSavePermissions} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Permissões
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="profile">Aplicar perfil predefinido</Label>
                  <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                    <SelectTrigger className="w-[280px] mt-2">
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map(profile => (
                        <SelectItem key={profile.id} value={profile.id.toString()}>
                          {profile.name} - {profile.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
        </TabsContent>

        {/* Tab de Organizações */}
        <TabsContent value="organizacoes" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Organizações</CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Organização
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end mb-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="org-search">Buscar Organização</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="org-search" 
                      placeholder="Nome da organização..." 
                      className="pl-8" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Clientes</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead className="w-[200px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrganizacoes.map(org => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.nome}</TableCell>
                      <TableCell>{org.clientes}</TableCell>
                      <TableCell>{org.usuarios}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                          <Button variant="destructive" size="sm" className="flex items-center">
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Usuários */}
        <TabsContent value="usuarios" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Usuários</CardTitle>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Usuário
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end mb-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="user-search">Buscar Usuário</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="user-search" 
                      placeholder="Nome, email ou perfil..." 
                      className="pl-8" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Organização</TableHead>
                    <TableHead className="w-[200px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsuarios.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.nome}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.perfil === "administrador" ? "default" : "outline"}>
                          {user.perfil}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.organizacao}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm" className="flex items-center">
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PermissionsPage;
