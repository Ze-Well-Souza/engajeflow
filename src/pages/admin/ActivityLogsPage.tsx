
import React from "react";
import LogsPageHeader from "@/components/admin/activity-logs/LogsPageHeader";
import LogsFilter from "@/components/admin/activity-logs/LogsFilter";
import LogsContent from "@/components/admin/activity-logs/LogsContent";
import LogsExport from "@/components/admin/activity-logs/LogsExport";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { usePagination } from "@/hooks/usePagination";
import { useLogsExport } from "@/hooks/useLogsExport";
import { useLogsFilterState } from "@/components/admin/activity-logs/useLogsFilterState";

const ActivityLogsPage = () => {
  // Hook para gerenciar o estado dos filtros
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
    userOptions,
    actionOptions,
    moduleOptions,
    resetFilters
  } = useLogsFilterState();
  
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
      <LogsPageHeader 
        onRefresh={handleRefresh}
        onExportOpen={handleExportOpen}
        isLoading={isLoading}
      />
      
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
        actionTypes={actionOptions}
        moduleTypes={moduleOptions}
        userList={userOptions}
        onResetFilters={resetFilters}
      />
      
      <LogsContent 
        logs={logs}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

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
