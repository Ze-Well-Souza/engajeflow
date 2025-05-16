
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useLogsExport = (
  searchTerm: string,
  selectedAction: string,
  selectedModule: string,
  selectedStatus: string,
  selectedUser: string
) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const { toast } = useToast();
  
  const handleExportOpen = () => {
    setShowExportModal(true);
  };

  const handleExportClose = () => {
    setShowExportModal(false);
  };
  
  const handleExport = async (format: string, dateRange: string) => {
    try {
      let query = supabase.from("activity_logs").select("*");
      
      // Aplicar filtro de intervalo de data
      if (dateRange === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query = query.gte("timestamp", today.toISOString());
      } else if (dateRange === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte("timestamp", weekAgo.toISOString());
      } else if (dateRange === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte("timestamp", monthAgo.toISOString());
      }
      
      // Para "current" e "all", não precisamos de filtros adicionais
      
      // Também aplicar quaisquer filtros ativos
      if (searchTerm) {
        query = query.or(`user_email.ilike.%${searchTerm}%,details.ilike.%${searchTerm}%,ip.ilike.%${searchTerm}%`);
      }
      
      if (selectedAction) {
        query = query.eq("action", selectedAction);
      }
      
      if (selectedModule) {
        query = query.eq("module", selectedModule);
      }
      
      if (selectedStatus) {
        query = query.eq("status", selectedStatus);
      }
      
      if (selectedUser) {
        query = query.eq("user_email", selectedUser);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Em um aplicativo real, isso lidaria com a exportação com base no formato
      console.log(`Exportando ${data.length} logs no formato ${format} para o período ${dateRange}`);
      
      toast({
        title: "Exportação iniciada",
        description: `Exportando ${data.length} logs em formato ${format} para o período selecionado.`,
      });
    } catch (error) {
      console.error("Erro ao exportar logs:", error);
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os logs.",
        variant: "destructive",
      });
    }
    
    setShowExportModal(false);
  };
  
  return { 
    showExportModal, 
    handleExportOpen, 
    handleExportClose, 
    handleExport 
  };
};
