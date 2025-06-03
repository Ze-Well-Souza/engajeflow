
import { useState } from "react";
import { Cliente } from "../components/ClientesTable";

// Dados mockados de clientes
const clientesMock = [
  { id: 'CLI001', nome: 'Maria Silva', email: 'maria.silva@email.com', telefone: '(11) 98765-4321', compras: 8, valor: 'R$ 2.450,00', status: 'Ativo' },
  { id: 'CLI002', nome: 'João Santos', email: 'joao.santos@email.com', telefone: '(11) 97654-3210', compras: 5, valor: 'R$ 1.890,75', status: 'Ativo' },
  { id: 'CLI003', nome: 'Ana Oliveira', email: 'ana.oliveira@email.com', telefone: '(11) 96543-2109', compras: 3, valor: 'R$ 780,00', status: 'Ativo' },
  { id: 'CLI004', nome: 'Carlos Souza', email: 'carlos.souza@email.com', telefone: '(11) 95432-1098', compras: 1, valor: 'R$ 159,90', status: 'Inativo' },
  { id: 'CLI005', nome: 'Pedro Lima', email: 'pedro.lima@email.com', telefone: '(11) 94321-0987', compras: 12, valor: 'R$ 3.780,50', status: 'Ativo' },
  { id: 'CLI006', nome: 'Juliana Costa', email: 'juliana.costa@email.com', telefone: '(11) 93210-9876', compras: 6, valor: 'R$ 1.250,00', status: 'Ativo' },
  { id: 'CLI007', nome: 'Roberto Almeida', email: 'roberto.almeida@email.com', telefone: '(11) 92109-8765', compras: 0, valor: 'R$ 0,00', status: 'Inativo' },
];

export const useClientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>(clientesMock);

  // Função para adicionar novo cliente (mock)
  const handleAddNewCliente = () => {
    console.log("Adicionar novo cliente");
    // Implementação futura
  };

  // Função para filtrar clientes com base no termo de busca
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredClientes(clientesMock);
    } else {
      const filtered = clientesMock.filter(cliente => 
        cliente.nome.toLowerCase().includes(term.toLowerCase()) ||
        cliente.email.toLowerCase().includes(term.toLowerCase()) ||
        cliente.id.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredClientes(filtered);
    }
  };

  return {
    searchTerm,
    filteredClientes,
    handleSearch,
    handleAddNewCliente
  };
};
