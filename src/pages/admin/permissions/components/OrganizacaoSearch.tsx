
import React from "react";
import SearchInput from "@/components/search/SearchInput";

interface OrganizacaoSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const OrganizacaoSearch = ({ searchTerm, setSearchTerm }: OrganizacaoSearchProps) => {
  return (
    <SearchInput
      id="org-search"
      label="Buscar Organização"
      placeholder="Nome da organização..."
      value={searchTerm}
      onChange={setSearchTerm}
      className="mb-4"
    />
  );
};

export default OrganizacaoSearch;
