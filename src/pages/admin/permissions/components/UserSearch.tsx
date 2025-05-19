
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface UserSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UserSearch = ({ searchTerm, setSearchTerm }: UserSearchProps) => {
  return (
    <div className="flex gap-4 items-end mb-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="user-search">Buscar Usuário</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id="user-search" 
            placeholder="Nome, email ou perfil..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
