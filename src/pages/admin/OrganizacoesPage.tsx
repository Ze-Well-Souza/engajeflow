
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Users, Building, Search, X, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const mockOrganizacoes = [
  { 
    id: 1, 
    nome: "TechCare Solutions", 
    descricao: "Empresa de soluções tecnológicas para pequenos negócios",
    clientes: 5, 
    usuarios: 12,
    status: "ativo",
    dataCriacao: "2025-01-15"
  },
  { 
    id: 2, 
    nome: "AgTech Marketing", 
    descricao: "Agência especializada em marketing digital",
    clientes: 3, 
    usuarios: 7,
    status: "ativo",
    dataCriacao: "2025-02-20"
  },
  { 
    id: 3, 
    nome: "Digital Commerce", 
    descricao: "Soluções para e-commerce e vendas online",
    clientes: 8, 
    usuarios: 15,
    status: "ativo",
    dataCriacao: "2025-03-10"
  },
  { 
    id: 4, 
    nome: "InnovateTech", 
    descricao: "Consultoria em inovação tecnológica",
    clientes: 2, 
    usuarios: 5,
    status: "inativo",
    dataCriacao: "2025-04-05"
  }
];

const mockClientes = [
  { id: 1, nome: "Magazine Tech", tipo: "cliente", organizacaoId: 1 },
  { id: 2, nome: "Farmácia Vida", tipo: "cliente", organizacaoId: 1 },
  { id: 3, nome: "Restaurante Sabor", tipo: "cliente", organizacaoId: 2 },
  { id: 4, nome: "Auto Peças Silva", tipo: "cliente", organizacaoId: 3 },
  { id: 5, nome: "Padaria Pão Quente", tipo: "cliente", organizacaoId: 3 },
  { id: 6, nome: "Clínica Saúde", tipo: "cliente", organizacaoId: 4 }
];

const mockUsuarios = [
  { id: 1, nome: "João Silva", email: "joao@techcare.com", perfil: "administrador", organizacaoId: 1 },
  { id: 2, nome: "Maria Oliveira", email: "maria@techcare.com", perfil: "gerente", organizacaoId: 1 },
  { id: 3, nome: "Carlos Santos", email: "carlos@agtech.com", perfil: "operador", organizacaoId: 2 },
  { id: 4, nome: "Pedro Almeida", email: "pedro@digitalcommerce.com", perfil: "administrador", organizacaoId: 3 },
  { id: 5, nome: "Ana Lima", email: "ana@digitalcommerce.com", perfil: "operador", organizacaoId: 3 },
  { id: 6, nome: "Rodrigo Souza", email: "rodrigo@innovatetech.com", perfil: "gerente", organizacaoId: 4 }
];

const OrganizacoesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewOrgDialog, setShowNewOrgDialog] = useState(false);
  const [newOrg, setNewOrg] = useState({ nome: "", descricao: "" });
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<number | null>(null);
  
  const { toast } = useToast();

  const filteredOrgs = mockOrganizacoes.filter(org => 
    org.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOrg = () => {
    if (!newOrg.nome) {
      toast({
        title: "Erro ao criar",
        description: "Nome da organização é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    // Em uma aplicação real, você enviaria para o backend
    console.log("Criando organização:", newOrg);
    
    toast({
      title: "Organização criada",
      description: "A nova organização foi criada com sucesso."
    });
    
    setNewOrg({ nome: "", descricao: "" });
    setShowNewOrgDialog(false);
  };

  const handleDeleteOrg = () => {
    // Em uma aplicação real, você enviaria para o backend
    console.log("Excluindo organização:", orgToDelete);
    
    toast({
      title: "Organização excluída",
      description: "A organização foi excluída com sucesso."
    });
    
    setShowConfirmDelete(false);
    setOrgToDelete(null);
  };

  const clientesDaOrg = selectedOrg ? mockClientes.filter(c => c.organizacaoId === selectedOrg) : [];
  const usuariosDaOrg = selectedOrg ? mockUsuarios.filter(u => u.organizacaoId === selectedOrg) : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Organizações</h2>
        <p className="text-muted-foreground">
          Gerencie organizações, seus clientes e usuários associados
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Organizações</CardTitle>
          <Dialog open={showNewOrgDialog} onOpenChange={setShowNewOrgDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Organização
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Organização</DialogTitle>
                <DialogDescription>
                  Crie uma nova organização para gerenciar clientes e usuários.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Nome da Organização*</Label>
                  <Input 
                    id="org-name" 
                    value={newOrg.nome} 
                    onChange={(e) => setNewOrg({...newOrg, nome: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-desc">Descrição</Label>
                  <Input 
                    id="org-desc" 
                    value={newOrg.descricao} 
                    onChange={(e) => setNewOrg({...newOrg, descricao: e.target.value})} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewOrgDialog(false)}>Cancelar</Button>
                <Button onClick={handleCreateOrg}>Criar Organização</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end mb-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="org-search">Buscar Organização</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="org-search" 
                  placeholder="Nome ou descrição..." 
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
                <TableHead>Descrição</TableHead>
                <TableHead>Clientes</TableHead>
                <TableHead>Usuários</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="w-[200px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrgs.map(org => (
                <TableRow key={org.id} className={selectedOrg === org.id ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{org.nome}</TableCell>
                  <TableCell>{org.descricao}</TableCell>
                  <TableCell>{org.clientes}</TableCell>
                  <TableCell>{org.usuarios}</TableCell>
                  <TableCell>
                    <Badge variant={org.status === "ativo" ? "default" : "secondary"}>
                      {org.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{org.dataCriacao}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedOrg(selectedOrg === org.id ? null : org.id)}
                      >
                        {selectedOrg === org.id ? "Fechar" : "Detalhes"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setOrgToDelete(org.id);
                          setShowConfirmDelete(true);
                        }}
                      >
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

      {selectedOrg && (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Clientes da Organização
                  </div>
                </CardTitle>
                <CardDescription>
                  {mockOrganizacoes.find(o => o.id === selectedOrg)?.nome}
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Cliente
              </Button>
            </CardHeader>
            <CardContent>
              {clientesDaOrg.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientesDaOrg.map(cliente => (
                      <TableRow key={cliente.id}>
                        <TableCell>{cliente.nome}</TableCell>
                        <TableCell>{cliente.tipo}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">Nenhum cliente associado a esta organização.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Usuários da Organização
                  </div>
                </CardTitle>
                <CardDescription>
                  {mockOrganizacoes.find(o => o.id === selectedOrg)?.nome}
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Usuário
              </Button>
            </CardHeader>
            <CardContent>
              {usuariosDaOrg.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuariosDaOrg.map(usuario => (
                      <TableRow key={usuario.id}>
                        <TableCell>{usuario.nome}</TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell>
                          <Badge variant={usuario.perfil === "administrador" ? "default" : "outline"}>
                            {usuario.perfil}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Editar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">Nenhum usuário associado a esta organização.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Dialog de confirmação para exclusão */}
      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta organização? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDelete(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteOrg}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizacoesPage;
