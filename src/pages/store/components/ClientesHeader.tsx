
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface ClientesHeaderProps {
  onAddNew: () => void;
}

const ClientesHeader: React.FC<ClientesHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Clientes</h1>
      <Button variant="default" className="flex items-center gap-2" onClick={onAddNew}>
        <UserPlus className="h-4 w-4" />
        Novo Cliente
      </Button>
    </div>
  );
};

export default ClientesHeader;
