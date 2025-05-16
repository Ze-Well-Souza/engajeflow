
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/components/admin/activity-logs/types";

export const useLogsFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  
  // Buscar usuários distintos para o filtro
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("user_email")
        .order("user_email")
        .limit(100);
      
      if (error) throw error;
      
      // Remover duplicatas
      const uniqueUsers = Array.from(new Set(data.map(log => log.user_email)));
      return uniqueUsers.map(email => ({ id: email, email }));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  };
  
  // Buscar ações distintas para o filtro
  const fetchActions = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("action")
        .order("action")
        .limit(100);
      
      if (error) throw error;
      
      // Remover duplicatas
      return Array.from(new Set(data.map(log => log.action)));
    } catch (error) {
      console.error("Erro ao buscar ações:", error);
      return [];
    }
  };
  
  // Buscar módulos distintos para o filtro
  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("module")
        .order("module")
        .limit(100);
      
      if (error) throw error;
      
      // Remover duplicatas
      return Array.from(new Set(data.map(log => log.module)));
    } catch (error) {
      console.error("Erro ao buscar módulos:", error);
      return [];
    }
  };
  
  const { data: users = [] } = useQuery({
    queryKey: ["activityLogUsers"],
    queryFn: fetchUsers,
  });
  
  const { data: actions = [] } = useQuery({
    queryKey: ["activityLogActions"],
    queryFn: fetchActions,
  });
  
  const { data: modules = [] } = useQuery({
    queryKey: ["activityLogModules"],
    queryFn: fetchModules,
  });
  
  return {
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
    users,
    actions,
    modules
  };
};
