
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserSearch from "./components/UserSearch";
import UsersList from "./components/UsersList";
import { User } from "./types";

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
          <UserSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <UsersList users={filteredUsuarios} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsuariosTab;
