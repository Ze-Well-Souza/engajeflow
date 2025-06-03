
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AgendamentosHeaderProps {
  onCreateNew: () => void;
}

const AgendamentosHeader: React.FC<AgendamentosHeaderProps> = ({ onCreateNew }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Agendamentos</h1>
      <Button 
        variant="default" 
        onClick={onCreateNew}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Novo Agendamento
      </Button>
    </div>
  );
};

export default AgendamentosHeader;
