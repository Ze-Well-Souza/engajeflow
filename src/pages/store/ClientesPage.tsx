
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Users, UserPlus, Search, Filter, Edit, 
  Trash, MoreHorizontal, Download, Mail 
} from "lucide-react";

// Dados mockados de clientes
const clientes = [
  { id: 'CLI001', nome: 'Maria Silva', email: 'maria.silva@email.com', telefone: '(11) 98765-4321', compras: 8, valor: 'R$ 2.450,00', status: 'Ativo' },
  { id: 'CLI002', nome: 'João Santos', email: 'joao.santos@email.com', telefone: '(11) 97654-3210', compras: 5, valor: 'R$ 1.890,75', status: 'Ativo' },
  { id: 'CLI003', nome: 'Ana Oliveira', email: 'ana.oliveira@email.com', telefone: '(11) 96543-2109', compras: 3, valor: 'R$ 780,00', status: 'Ativo' },
  { id: 'CLI004', nome: 'Carlos Souza', email: 'carlos.souza@email.com', telefone: '(11) 95432-1098', compras: 1, valor: 'R$ 159,90', status: 'Inativo' },
  { id: 'CLI005', nome: 'Pedro Lima', email: 'pedro.lima@email.com', telefone: '(11) 94321-0987', compras: 12, valor: 'R$ 3.780,50', status: 'Ativo' },
  { id: 'CLI006', nome: 'Juliana Costa', email: 'juliana.costa@email.com', telefone: '(11) 93210-9876', compras: 6, valor: 'R$ 1.250,00', status: 'Ativo' },
  { id: 'CLI007', nome: 'Roberto Almeida', email: 'roberto.almeida@email.com', telefone: '(11) 92109-8765', compras: 0, valor: 'R$ 0,00', status: 'Inativo' },
];

const ClientesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState(clientes);

  // Função para filtrar clientes com base no termo de busca
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredClientes(clientes);
    } else {
      const filtered = clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(term.toLowerCase()) ||
        cliente.email.toLowerCase().includes(term.toLowerCase()) ||
        cliente.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredClientes(filtered);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button variant="default" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Total de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">246</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-yellow-500" />
              Novos (Este mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Recorrentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">154</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 mt-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar cliente..." 
                className="pl-10 w-full md:w-64"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Compras</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhum cliente encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">{cliente.id}</TableCell>
                      <TableCell>{cliente.nome}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell>{cliente.telefone}</TableCell>
                      <TableCell>{cliente.compras}</TableCell>
                      <TableCell>{cliente.valor}</TableCell>
                      <TableCell>
                        <Badge variant={cliente.status === 'Ativo' ? 'default' : 'outline'}>
                          {cliente.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Mail className="h-4 w-4" /> Enviar email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash className="h-4 w-4" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Exibindo {filteredClientes.length} de {clientes.length} clientes
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Anterior</Button>
              <Button variant="outline" size="sm">Próximo</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientesPage;
