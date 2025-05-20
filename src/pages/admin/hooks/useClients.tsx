
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock data for clients
const mockClients = [
  { 
    id: 1, 
    name: "TechSolutions Ltda", 
    document: "12.345.678/0001-90", 
    type: "juridica", 
    email: "contato@techsolutions.com", 
    phone: "(11) 99999-8888",
    address: "Av. Paulista, 1000 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 2, 
    name: "Marcelo Silva", 
    document: "123.456.789-00", 
    type: "fisica", 
    email: "marcelo.silva@email.com", 
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 3, 
    name: "ComércioFácil S.A.", 
    document: "98.765.432/0001-10", 
    type: "juridica", 
    email: "suporte@comerciofacil.com", 
    phone: "(11) 3333-4444",
    address: "Rua Comercial, 500 - Rio de Janeiro/RJ",
    status: "inactive" 
  },
  { 
    id: 4, 
    name: "Ana Paula Ferreira", 
    document: "987.654.321-00", 
    type: "fisica", 
    email: "ana.ferreira@email.com", 
    phone: "(21) 91234-5678",
    address: "Av. Atlântica, 450 - Rio de Janeiro/RJ",
    status: "active" 
  }
];

export interface Client {
  id: number;
  name: string;
  document: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

export interface ClientFormData {
  name: string;
  document: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClient, setNewClient] = useState<ClientFormData>({
    name: "",
    document: "",
    type: "fisica",
    email: "",
    phone: "",
    address: "",
    status: "active"
  });
  
  const { toast } = useToast();

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.document || !newClient.email) {
      toast({
        title: "Erro ao cadastrar",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    
    setClients([...clients, { ...newClient, id }]);
    setIsAddClientOpen(false);
    resetNewClientForm();
    
    toast({
      title: "Cliente adicionado",
      description: "O cliente foi cadastrado com sucesso."
    });
  };

  const handleRemoveClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso."
    });
  };

  const resetNewClientForm = () => {
    setNewClient({
      name: "",
      document: "",
      type: "fisica",
      email: "",
      phone: "",
      address: "",
      status: "active"
    });
  };

  return {
    clients,
    filteredClients,
    searchTerm,
    setSearchTerm,
    isAddClientOpen,
    setIsAddClientOpen,
    newClient,
    setNewClient,
    handleAddClient,
    handleRemoveClient,
    resetNewClientForm
  };
};
