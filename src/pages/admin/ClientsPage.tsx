
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientsTable from "./components/ClientsTable";
import ClientFormDialog from "./components/ClientFormDialog";
import ClientSearchBar from "./components/ClientSearchBar";
import ClientsPagination from "./components/ClientsPagination";
import { useClients } from "./hooks/useClients";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";

const ClientsPage = () => {
  const {
    filteredClients,
    currentItems,
    searchTerm,
    setSearchTerm,
    isAddClientOpen,
    setIsAddClientOpen,
    newClient,
    setNewClient,
    handleAddClient,
    handleRemoveClient,
    currentPage,
    setCurrentPage,
    totalPages
  } = useClients();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie os clientes e lojas cadastrados no sistema
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Button 
            onClick={() => setIsAddClientOpen(true)}
            className="transition-all flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Adicionar Cliente</span>
            <span className="sm:hidden">Adicionar</span>
          </Button>
        </div>
        
        <ClientFormDialog
          open={isAddClientOpen}
          onOpenChange={setIsAddClientOpen}
          newClient={newClient}
          setNewClient={setNewClient}
          onAddClient={handleAddClient}
        />
      </div>

      <div className="bg-card rounded-lg p-4 shadow-sm border">
        <ClientSearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        <Tabs defaultValue="all" className="w-full mt-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="fisica">Pessoa Física</TabsTrigger>
            <TabsTrigger value="juridica">Pessoa Jurídica</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ClientsTable 
              clients={currentItems} 
              onRemove={handleRemoveClient} 
            />
            <ClientsPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </TabsContent>
          
          <TabsContent value="fisica" className="mt-4">
            <ClientsTable 
              clients={filteredClients.filter(c => c.type === "fisica")} 
              onRemove={handleRemoveClient} 
            />
          </TabsContent>
          
          <TabsContent value="juridica" className="mt-4">
            <ClientsTable 
              clients={filteredClients.filter(c => c.type === "juridica")} 
              onRemove={handleRemoveClient} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientsPage;
