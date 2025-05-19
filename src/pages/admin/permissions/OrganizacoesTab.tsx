
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Trash } from "lucide-react";

// Mock organizações
const mockOrganizacoes = [
  { id: 1, nome: "TechCare Solutions", clientes: 5, usuarios: 12 },
  { id: 2, nome: "AgTech Marketing", clientes: 3, usuarios: 7 },
  { id: 3, nome: "Digital Commerce", clientes: 8, usuarios: 15 }
];

const OrganizacoesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOrganizacoes = mockOrganizacoes.filter(org => 
    org.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default OrganizacoesTab;
