
import { useState } from "react";
import { useFilterOptions } from "@/hooks/useFilterOptions";

export const useLogsFilterState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  
  // Buscar opções de filtro disponíveis
  const { users, actions, modules } = useFilterOptions();
  
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAction("all");
    setSelectedModule("all");
    setSelectedStatus("all");
    setSelectedUser("all");
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
