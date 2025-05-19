
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Trash } from "lucide-react";

// Mock usuários
const mockUsuarios = [
  { id: 1, nome: "João Silva", email: "joao@techcare.com", perfil: "administrador", organizacao: "TechCare Solutions" },
  { id: 2, nome: "Maria Oliveira", email: "maria@techcare.com", perfil: "gerente", organizacao: "TechCare Solutions" },
  { id: 3, nome: "Carlos Santos", email: "carlos@agtech.com", perfil: "operador", organizacao: "AgTech Marketing" },
  { id: 4, nome: "Pedro Almeida", email: "pedro@digitalcommerce.com", perfil: "administrador", organizacao: "Digital Commerce" }
];

const UsuariosTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsuarios = mockUsuarios.filter(user => 
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.perfil.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organizacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default UsuariosTab;
