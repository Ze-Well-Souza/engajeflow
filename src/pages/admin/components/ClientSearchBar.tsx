
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ClientSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ClientSearchBar: React.FC<ClientSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center py-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, documento ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
};

export default ClientSearchBar;
