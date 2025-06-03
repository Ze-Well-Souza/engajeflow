
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePagination } from "@/hooks/usePagination";

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
  },
  { 
    id: 5, 
    name: "Mercado Bom Preço", 
    document: "45.678.901/0001-23", 
    type: "juridica", 
    email: "atendimento@bompreco.com", 
    phone: "(11) 5555-6666",
    address: "Rua dos Alimentos, 300 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 6, 
    name: "Carlos Mendes", 
    document: "456.789.012-34", 
    type: "fisica", 
    email: "carlos.mendes@email.com", 
    phone: "(21) 97777-8888",
    address: "Rua dos Viajantes, 50 - Rio de Janeiro/RJ",
    status: "active" 
  },
  { 
    id: 7, 
    name: "Padaria Bom Pão Ltda", 
    document: "56.789.012/0001-34", 
    type: "juridica", 
    email: "contato@bompao.com", 
    phone: "(11) 4444-5555",
    address: "Rua das Padarias, 150 - São Paulo/SP",
    status: "inactive" 
  },
  { 
    id: 8, 
    name: "Fernanda Lima", 
    document: "567.890.123-45", 
    type: "fisica", 
    email: "fernanda.lima@email.com", 
    phone: "(11) 96666-7777",
    address: "Av. Principal, 222 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 9, 
    name: "Autopeças Rápidas", 
    document: "67.890.123/0001-45", 
    type: "juridica", 
    email: "vendas@autopecasrapidas.com", 
    phone: "(11) 2222-3333",
    address: "Av. dos Automóveis, 800 - São Paulo/SP",
    status: "active" 
  },
  { 
    id: 10, 
    name: "Ricardo Santos", 
    document: "678.901.234-56", 
    type: "fisica", 
    email: "ricardo.santos@email.com", 
    phone: "(21) 95555-6666",
    address: "Rua Tranquila, 75 - Rio de Janeiro/RJ",
    status: "active" 
  },
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

  // Filtrar clientes com base no termo de busca
  const filteredClients = useMemo(() => {
    return clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  // Adicionar paginação
  const ITEMS_PER_PAGE = 5;
  const {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages
  } = usePagination<Client>(filteredClients, ITEMS_PER_PAGE);

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
    currentItems,
    searchTerm,
    setSearchTerm,
    isAddClientOpen,
    setIsAddClientOpen,
    newClient,
    setNewClient,
    handleAddClient,
    handleRemoveClient,
    resetNewClientForm,
    currentPage,
    setCurrentPage,
    totalPages
  };
};
