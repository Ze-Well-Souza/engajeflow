
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface ClienteSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ClienteSearch = ({ searchTerm, setSearchTerm }: ClienteSearchProps) => {
  return (
    <div className="flex gap-4 items-end">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="client-search">Buscar Cliente</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id="client-search" 
            placeholder="Nome do cliente ou tipo..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ClienteSearch;
