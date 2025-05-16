
import React, { useState } from "react";
import { format } from "date-fns";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { FileSearch, Info } from "lucide-react";
import { ActivityLog } from "./mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LogsTableProps {
  logs: ActivityLog[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const handleShowDetails = (log: ActivityLog) => {
    setSelectedLog(log);
  };

  const handleCloseDetails = () => {
    setSelectedLog(null);
  };

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
                <TableCell className="font-medium">{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>{format(log.timestamp, "dd/MM/yyyy HH:mm:ss")}</TableCell>
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

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Log</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre a atividade registrada
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p>{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedLog.status === "success" ? "success" : "destructive"}>
                    {selectedLog.status === "success" ? "Sucesso" : "Erro"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Usuário</p>
                  <p>{selectedLog.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IP</p>
                  <p>{selectedLog.ip}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ação</p>
                  <p>{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Módulo</p>
                  <p>{selectedLog.module}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Data/Hora</p>
                  <p>{format(selectedLog.timestamp, "dd/MM/yyyy HH:mm:ss")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Detalhes</p>
                  <p>{selectedLog.details}</p>
                </div>
                {selectedLog.metadata && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Metadados</p>
                    <div className="bg-gray-800 p-2 rounded-md mt-1">
                      <pre className="text-xs whitespace-pre-wrap">
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogsTable;
