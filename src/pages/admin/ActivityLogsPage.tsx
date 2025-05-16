
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { mockLogs } from "@/components/admin/activity-logs/mock-data";
import LogsFilter from "@/components/admin/activity-logs/LogsFilter";
import LogsTable from "@/components/admin/activity-logs/LogsTable";
import LogsPagination from "@/components/admin/activity-logs/LogsPagination";

const ActivityLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
    
    return matchesSearch && matchesAction && matchesModule && matchesStatus;
  });
  
  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
          <Button variant="outline">
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
      />
      
      <Card>
        <CardContent className="p-0">
          <LogsTable logs={currentLogs} />
          
          {filteredLogs.length > logsPerPage && (
            <LogsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogsPage;
