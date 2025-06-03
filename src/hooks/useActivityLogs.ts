
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ActivityLog } from "@/components/admin/activity-logs/types";

export const useActivityLogs = (
  searchTerm: string,
  selectedAction: string,
  selectedModule: string,
  selectedStatus: string,
  selectedUser: string
) => {
  const { toast } = useToast();
  
  const fetchLogs = async () => {
    try {
      let query = supabase
        .from("activity_logs")
        .select("*")
        .order("timestamp", { ascending: false });
      
      // Aplicar filtros se existirem
      if (searchTerm) {
        query = query.or(`user_email.ilike.%${searchTerm}%,details.ilike.%${searchTerm}%,ip.ilike.%${searchTerm}%`);
      }
      
      if (selectedAction && selectedAction !== "all") {
        query = query.eq("action", selectedAction);
      }
      
      if (selectedModule && selectedModule !== "all") {
        query = query.eq("module", selectedModule);
      }
      
      if (selectedStatus && selectedStatus !== "all") {
        query = query.eq("status", selectedStatus);
      }
      
      if (selectedUser && selectedUser !== "all") {
        query = query.eq("user_email", selectedUser);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Erro ao buscar logs:", error);
        throw error;
      }
      
      // Garantir que o status está corretamente tipado como "success" ou "error"
      return data?.map(log => ({
        ...log,
        status: log.status === "success" ? "success" : "error"
      })) as ActivityLog[] || [];
    } catch (error) {
      console.error("Erro em fetchLogs:", error);
      toast({
        title: "Erro ao carregar logs",
        description: "Não foi possível carregar os logs de atividade.",
        variant: "destructive",
      });
      return [];
    }
  };
  
  const { data: logs = [], isLoading, refetch } = useQuery({
    queryKey: ["activityLogs", searchTerm, selectedAction, selectedModule, selectedStatus, selectedUser],
    queryFn: fetchLogs,
    refetchOnWindowFocus: false,
  });
  
  const handleRefresh = () => {
    refetch();
    toast({
      title: "Logs atualizados",
      description: "Os logs de atividade foram atualizados com sucesso.",
    });
  };
  
  return { logs, isLoading, handleRefresh };
};
