
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityLog } from "@/types";
import { LogsTable } from "@/components/admin/activity-logs/LogsTable";
import LogsPagination from "@/components/admin/activity-logs/LogsPagination";
import EmptyLogs from "@/components/admin/activity-logs/EmptyLogs";

interface LogsContentProps {
  logs: ActivityLog[];
  currentItems: ActivityLog[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isLoading?: boolean;
}

const LogsContent: React.FC<LogsContentProps> = ({
  logs,
  currentItems,
  currentPage,
  totalPages,
  setCurrentPage,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center h-64">
          <p className="text-muted-foreground">Carregando logs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        {logs.length > 0 ? (
          <LogsTable data={currentItems} />
        ) : (
          <EmptyLogs />
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
  );
};

export default LogsContent;
