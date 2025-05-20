
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";

interface ClientesSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const ClientesSearch: React.FC<ClientesSearchProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 mt-4">
      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
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
  );
};

export default ClientesSearch;
