
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, FileText } from "lucide-react";
import { mockLogs } from "@/components/admin/activity-logs/mock-data";
import LogsFilter from "@/components/admin/activity-logs/LogsFilter";
import LogsTable from "@/components/admin/activity-logs/LogsTable";
import LogsPagination from "@/components/admin/activity-logs/LogsPagination";
import LogsExport from "@/components/admin/activity-logs/LogsExport";
import { useToast } from "@/hooks/use-toast";

const ActivityLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const { toast } = useToast();
  const logsPerPage = 10;
  
  // Filter logs
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);
    
    const matchesAction = selectedAction === "" || log.action === selectedAction;
    const matchesModule = selectedModule === "" || log.module === selectedModule;
    const matchesStatus = selectedStatus === "" || log.status === selectedStatus;
    const matchesUser = selectedUser === "" || log.user === selectedUser;
    
    return matchesSearch && matchesAction && matchesModule && matchesStatus && matchesUser;
  });
  
  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  
  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, we would fetch new logs here
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logs atualizados",
        description: "Os logs de atividade foram atualizados com sucesso.",
      });
    }, 1000);
  };

  const handleExportOpen = () => {
    setShowExportModal(true);
  };

  const handleExportClose = () => {
    setShowExportModal(false);
  };
  
  const handleExport = (format: string, dateRange: string) => {
    // In a real app, this would trigger an actual export
    toast({
      title: "Exportação iniciada",
      description: `Exportando logs em formato ${format} para o período ${dateRange}.`,
    });
    setShowExportModal(false);
  };
  
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
      />
      
      <Card>
        <CardContent className="p-0">
          {filteredLogs.length > 0 ? (
            <LogsTable logs={currentLogs} />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-2" />
              <p>Nenhum log encontrado para os filtros selecionados.</p>
            </div>
          )}
          
          {filteredLogs.length > logsPerPage && (
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
          filteredCount={filteredLogs.length}
        />
      )}
    </div>
  );
};

export default ActivityLogsPage;
