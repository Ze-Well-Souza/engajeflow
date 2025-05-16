
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, FileText } from "lucide-react";
import LogsFilter from "@/components/admin/activity-logs/LogsFilter";
import LogsTable from "@/components/admin/activity-logs/LogsTable";
import LogsPagination from "@/components/admin/activity-logs/LogsPagination";
import LogsExport from "@/components/admin/activity-logs/LogsExport";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useLogsFilters } from "@/hooks/useLogsFilters";
import { useLogsExport } from "@/hooks/useLogsExport";
import { usePagination } from "@/hooks/usePagination";

const ActivityLogsPage = () => {
  // Hooks para filtros
  const {
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
  } = useLogsFilters();
  
  // Hook para busca de logs
  const { logs, isLoading, handleRefresh } = useActivityLogs(
    searchTerm,
    selectedAction,
    selectedModule,
    selectedStatus,
    selectedUser
  );
  
  // Hook para paginação (10 itens por página)
  const { currentPage, setCurrentPage, currentItems, totalPages } = usePagination(logs, 10);
  
  // Hook para exportação
  const { 
    showExportModal, 
    handleExportOpen, 
    handleExportClose, 
    handleExport 
  } = useLogsExport(
    searchTerm,
    selectedAction,
    selectedModule,
    selectedStatus,
    selectedUser
  );
  
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
            <LogsTable logs={currentItems} isLoading={isLoading} />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-2" />
              <p>Nenhum log encontrado para os filtros selecionados.</p>
            </div>
          )}
          
          {logs.length > 10 && (
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
