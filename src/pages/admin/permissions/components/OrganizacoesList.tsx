
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Organization } from "../types";

interface OrganizacoesListProps {
  organizacoes: Organization[];
}

const OrganizacoesList = ({ organizacoes }: OrganizacoesListProps) => {
  return (
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
        {organizacoes.map(org => (
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
  );
};

export default OrganizacoesList;
