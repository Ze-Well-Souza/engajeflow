
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientesStatCards from "./components/ClientesStatCards";
import ClientesTable from "./components/ClientesTable";
import ClientesHeader from "./components/ClientesHeader";
import ClientesSearch from "./components/ClientesSearch";
import { useClientes } from "./hooks/useClientes";

const ClientesPage: React.FC = () => {
  const {
    searchTerm,
    filteredClientes,
    handleSearch,
    handleAddNewCliente
  } = useClientes();

  return (
    <div className="space-y-6">
      <ClientesHeader onAddNew={handleAddNewCliente} />
      <ClientesStatCards />
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <ClientesSearch 
            searchTerm={searchTerm}
            onSearch={handleSearch}
          />
        </CardHeader>
        <CardContent>
          <ClientesTable clientes={filteredClientes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientesPage;
