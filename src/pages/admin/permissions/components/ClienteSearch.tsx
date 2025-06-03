
import React from "react";
import SearchInput from "@/components/search/SearchInput";

interface ClienteSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ClienteSearch = ({ searchTerm, setSearchTerm }: ClienteSearchProps) => {
  return (
    <SearchInput
      id="client-search"
      label="Buscar Cliente"
      placeholder="Nome do cliente ou tipo..."
      value={searchTerm}
      onChange={setSearchTerm}
    />
  );
};

export default ClienteSearch;
