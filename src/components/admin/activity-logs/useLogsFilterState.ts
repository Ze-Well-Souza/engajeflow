
import { useState } from "react";
import { useFilterOptions } from "@/hooks/useFilterOptions";

export const useLogsFilterState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  
  // Buscar opções de filtro disponíveis
  const { users, actions, modules } = useFilterOptions();
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAction("");
    setSelectedModule("");
    setSelectedStatus("");
    setSelectedUser("");
  };
  
  return {
    // Estado dos filtros
    searchTerm,
    setSearchTerm,
    selectedAction,
    setSelectedAction,
    selectedModule,
    setSelectedModule,
    selectedStatus,
    setSelectedStatus,
    selectedUser,
    setSelectedUser,
    
    // Opções disponíveis para os filtros
    userOptions: users,
    actionOptions: actions,
    moduleOptions: modules,
    
    // Funções auxiliares
    resetFilters
  };
};
