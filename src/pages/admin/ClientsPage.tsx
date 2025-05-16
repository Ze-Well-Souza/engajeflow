
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Edit, Trash, User, Building, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for clients
const mockClients = [
  { 
    id: 1, 
    name: "TechSolutions Ltda", 
    document: "12.345.678/0001-90", 
    type: "juridica", 
    email: "contato@techsolutions.com", 
    phone: "(11) 99999-8888",
    address: "Av. Paulista, 1000 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 2, 
    name: "Marcelo Silva", 
    document: "123.456.789-00", 
    type: "fisica", 
    email: "marcelo.silva@email.com", 
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 3, 
    name: "ComércioFácil S.A.", 
    document: "98.765.432/0001-10", 
    type: "juridica", 
    email: "suporte@comerciofacil.com", 
    phone: "(11) 3333-4444",
    address: "Rua Comercial, 500 - Rio de Janeiro/RJ",
    status: "inactive" 
  },
  { 
    id: 4, 
    name: "Ana Paula Ferreira", 
    document: "987.654.321-00", 
    type: "fisica", 
    email: "ana.ferreira@email.com", 
    phone: "(21) 91234-5678",
    address: "Av. Atlântica, 450 - Rio de Janeiro/RJ",
    status: "active" 
  }
];

const ClientsPage = () => {
  const [clients, setClients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    document: "",
    type: "fisica",
    email: "",
    phone: "",
    address: "",
    status: "active"
  });
  
  const { toast } = useToast();

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.document || !newClient.email) {
      toast({
        title: "Erro ao cadastrar",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    
    setClients([...clients, { ...newClient, id }]);
    setIsAddClientOpen(false);
    setNewClient({
      name: "",
      document: "",
      type: "fisica",
      email: "",
      phone: "",
      address: "",
      status: "active"
    });
    
    toast({
      title: "Cliente adicionado",
      description: "O cliente foi cadastrado com sucesso."
    });
  };

  const handleRemoveClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie os clientes e lojas cadastrados no sistema
          </p>
        </div>
        
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha as informações do cliente para cadastrá-lo no sistema.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clientType" className="text-right">
                  Tipo de Cliente
                </Label>
                <Select 
                  value={newClient.type}
                  onValueChange={(value) => setNewClient({...newClient, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fisica">Pessoa Física</SelectItem>
                    <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {newClient.type === "fisica" ? "Nome Completo" : "Razão Social"}
                </Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="document" className="text-right">
                  {newClient.type === "fisica" ? "CPF" : "CNPJ"}
                </Label>
                <Input
                  id="document"
                  value={newClient.document}
                  onChange={(e) => setNewClient({...newClient, document: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Endereço
                </Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Checkbox 
                    id="status" 
                    checked={newClient.status === "active"} 
                    onCheckedChange={(checked) => {
                      setNewClient({...newClient, status: checked ? "active" : "inactive"});
                    }}
                  />
                  <label htmlFor="status" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Ativo
                  </label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddClient}>
                Salvar Cliente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, documento ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="fisica">Pessoa Física</TabsTrigger>
          <TabsTrigger value="juridica">Pessoa Jurídica</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ClientsTable 
            clients={filteredClients} 
            onRemove={handleRemoveClient} 
          />
        </TabsContent>
        
        <TabsContent value="fisica">
          <ClientsTable 
            clients={filteredClients.filter(c => c.type === "fisica")} 
            onRemove={handleRemoveClient} 
          />
        </TabsContent>
        
        <TabsContent value="juridica">
          <ClientsTable 
            clients={filteredClients.filter(c => c.type === "juridica")} 
            onRemove={handleRemoveClient} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ClientsTable = ({ 
  clients, 
  onRemove 
}: { 
  clients: any[]; 
  onRemove: (id: number) => void;
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome/Razão Social</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium flex items-center">
                    {client.type === "juridica" ? (
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    ) : (
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    {client.name}
                  </TableCell>
                  <TableCell>{client.document}</TableCell>
                  <TableCell>
                    {client.type === "juridica" ? "Pessoa Jurídica" : "Pessoa Física"}
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {client.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onRemove(client.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientsPage;
