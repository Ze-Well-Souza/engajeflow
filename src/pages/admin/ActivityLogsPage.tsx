
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, FileText } from "lucide-react";
import { ActivityLog } from "@/components/admin/activity-logs/types";
import LogsFilter from "@/components/admin/activity-logs/LogsFilter";
import LogsTable from "@/components/admin/activity-logs/LogsTable";
import LogsPagination from "@/components/admin/activity-logs/LogsPagination";
import LogsExport from "@/components/admin/activity-logs/LogsExport";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const ActivityLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);
  const { toast } = useToast();
  const logsPerPage = 10;
  
  const fetchLogs = async () => {
    try {
      let query = supabase
        .from("activity_logs")
        .select("*")
        .order("timestamp", { ascending: false });
      
      // Apply filters if they exist
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
        console.error("Error fetching logs:", error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchLogs:", error);
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
  
  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);
  
  const handleRefresh = () => {
    refetch();
    toast({
      title: "Logs atualizados",
      description: "Os logs de atividade foram atualizados com sucesso.",
    });
  };

  const handleExportOpen = () => {
    setShowExportModal(true);
  };

  const handleExportClose = () => {
    setShowExportModal(false);
  };
  
  const handleExport = async (format: string, dateRange: string) => {
    try {
      let query = supabase.from("activity_logs").select("*");
      
      // Apply date range filter
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
      
      // For "current" and "all", we don't need additional filters
      
      // Also apply any active filters
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
      
      // In a real app, this would handle the export based on format
      console.log(`Exporting ${data.length} logs in ${format} format for period ${dateRange}`);
      
      toast({
        title: "Exportação iniciada",
        description: `Exportando ${data.length} logs em formato ${format} para o período selecionado.`,
      });
    } catch (error) {
      console.error("Error exporting logs:", error);
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os logs.",
        variant: "destructive",
      });
    }
    
    setShowExportModal(false);
  };
  
  // Fetch distinct users for the filter
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("user_email")
        .order("user_email")
        .limit(100);
      
      if (error) throw error;
      
      // Remove duplicates
      const uniqueUsers = Array.from(new Set(data.map(log => log.user_email)));
      return uniqueUsers.map(email => ({ id: email, email }));
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };
  
  // Fetch distinct actions for the filter
  const fetchActions = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("action")
        .order("action")
        .limit(100);
      
      if (error) throw error;
      
      // Remove duplicates
      return Array.from(new Set(data.map(log => log.action)));
    } catch (error) {
      console.error("Error fetching actions:", error);
      return [];
    }
  };
  
  // Fetch distinct modules for the filter
  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("module")
        .order("module")
        .limit(100);
      
      if (error) throw error;
      
      // Remove duplicates
      return Array.from(new Set(data.map(log => log.module)));
    } catch (error) {
      console.error("Error fetching modules:", error);
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Logs de Atividades</h2>
          <p className="text-muted-foreground">
            Visualize todas as atividades realizadas pelos usuários no sistema
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="outline" onClick={handleExportOpen}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>
      
      <LogsFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        actionTypes={actions}
        moduleTypes={modules}
        userList={users}
      />
      
      <Card>
        <CardContent className="p-0">
          {logs.length > 0 ? (
            <LogsTable logs={currentLogs} isLoading={isLoading} />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-2" />
              <p>Nenhum log encontrado para os filtros selecionados.</p>
            </div>
          )}
          
          {logs.length > logsPerPage && (
            <LogsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </CardContent>
      </Card>

      {showExportModal && (
        <LogsExport 
          onExport={handleExport} 
          onClose={handleExportClose} 
          filteredCount={logs.length}
        />
      )}
    </div>
  );
};

export default ActivityLogsPage;
