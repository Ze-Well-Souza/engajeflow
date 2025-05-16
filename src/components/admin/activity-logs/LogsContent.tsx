
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
}

const LogsContent: React.FC<LogsContentProps> = ({
  logs,
  currentItems,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
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
