
import React from "react";
import { format, parseISO } from "date-fns";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { FileSearch, Info } from "lucide-react";
import { ActivityLog } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogDetails } from "@/hooks/useLogDetails";
import LogDetailsModal from "./LogDetailsModal";

interface LogsTableProps {
  logs: ActivityLog[];
  isLoading: boolean;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, isLoading }) => {
  const { selectedLog, handleShowDetails, handleCloseDetails } = useLogDetails();

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Ação</TableHead>
            <TableHead>Módulo</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-28" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-36" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Ação</TableHead>
            <TableHead>Módulo</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                <div className="flex flex-col items-center justify-center">
                  <FileSearch className="h-8 w-8 mb-2" />
                  Nenhum log encontrado para os filtros selecionados.
                </div>
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.user_email}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>{format(parseISO(log.timestamp), "dd/MM/yyyy HH:mm:ss")}</TableCell>
                <TableCell>
                  <Badge variant={log.status === "success" ? "success" : "destructive"}>
                    {log.status === "success" ? "Sucesso" : "Erro"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleShowDetails(log)}
                    className="p-0 h-8 w-8"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <LogDetailsModal log={selectedLog} onClose={handleCloseDetails} />
    </>
  );
};

export default LogsTable;
