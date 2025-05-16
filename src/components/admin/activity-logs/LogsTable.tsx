
import React from "react";
import { format } from "date-fns";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { FileSearch } from "lucide-react";
import { ActivityLog } from "./mock-data";

interface LogsTableProps {
  logs: ActivityLog[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <FileSearch className="h-8 w-8 mb-2" />
                Nenhum log encontrado para os filtros selecionados.
              </div>
            </TableCell>
          </TableRow>
        ) : (
          logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.user}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.module}</TableCell>
              <TableCell>{log.ip}</TableCell>
              <TableCell>{format(log.timestamp, "dd/MM/yyyy HH:mm:ss")}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  log.status === "success" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {log.status === "success" ? "Sucesso" : "Erro"}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default LogsTable;
