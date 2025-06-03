
import React from "react";
import SearchInput from "@/components/search/SearchInput";

interface UserSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UserSearch = ({ searchTerm, setSearchTerm }: UserSearchProps) => {
  return (
    <SearchInput
      id="user-search"
      label="Buscar Usuário"
      placeholder="Nome, email ou perfil..."
      value={searchTerm}
      onChange={setSearchTerm}
      className="mb-4"
    />
  );
};

export default UserSearch;
