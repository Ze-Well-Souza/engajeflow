
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import OrganizacaoSearch from "./components/OrganizacaoSearch";
import OrganizacoesList from "./components/OrganizacoesList";
import { Organization } from "./types";

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
          <OrganizacaoSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <OrganizacoesList organizacoes={filteredOrganizacoes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizacoesTab;
