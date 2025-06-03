
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Client } from "../types";

interface ClientesListProps {
  filteredClients: Client[];
  selectedClient: string;
  setSelectedClient: (id: string) => void;
}

const ClientesList = ({ filteredClients, selectedClient, setSelectedClient }: ClientesListProps) => {
  return (
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
  );
};

export default ClientesList;
