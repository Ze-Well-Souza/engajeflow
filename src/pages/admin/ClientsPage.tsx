
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientsTable from "./components/ClientsTable";
import ClientFormDialog from "./components/ClientFormDialog";
import ClientSearchBar from "./components/ClientSearchBar";
import { useClients } from "./hooks/useClients";

const ClientsPage = () => {
  const {
    filteredClients,
    searchTerm,
    setSearchTerm,
    isAddClientOpen,
    setIsAddClientOpen,
    newClient,
    setNewClient,
    handleAddClient,
    handleRemoveClient
  } = useClients();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie os clientes e lojas cadastrados no sistema
          </p>
        </div>
        
        <ClientFormDialog
          open={isAddClientOpen}
          onOpenChange={setIsAddClientOpen}
          newClient={newClient}
          setNewClient={setNewClient}
          onAddClient={handleAddClient}
        />
      </div>

      <ClientSearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="fisica">Pessoa Física</TabsTrigger>
          <TabsTrigger value="juridica">Pessoa Jurídica</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ClientsTable 
            clients={filteredClients} 
            onRemove={handleRemoveClient} 
          />
        </TabsContent>
        
        <TabsContent value="fisica">
          <ClientsTable 
            clients={filteredClients.filter(c => c.type === "fisica")} 
            onRemove={handleRemoveClient} 
          />
        </TabsContent>
        
        <TabsContent value="juridica">
          <ClientsTable 
            clients={filteredClients.filter(c => c.type === "juridica")} 
            onRemove={handleRemoveClient} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientsPage;
