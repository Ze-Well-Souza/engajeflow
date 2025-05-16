
import React from "react";
import { format, parseISO } from "date-fns";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ActivityLog } from "./types";

interface LogDetailsModalProps {
  log: ActivityLog | null;
  onClose: () => void;
}

const LogDetailsModal: React.FC<LogDetailsModalProps> = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <Dialog open={!!log} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes do Log</DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre a atividade registrada
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID</p>
              <p>{log.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={log.status === "success" ? "success" : "destructive"}>
                {log.status === "success" ? "Sucesso" : "Erro"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Usuário</p>
              <p>{log.user_email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">IP</p>
              <p>{log.ip}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ação</p>
              <p>{log.action}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Módulo</p>
              <p>{log.module}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Data/Hora</p>
              <p>{format(parseISO(log.timestamp), "dd/MM/yyyy HH:mm:ss")}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Detalhes</p>
              <p>{log.details}</p>
            </div>
            {log.metadata && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Metadados</p>
                <div className="bg-gray-800 p-2 rounded-md mt-1">
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogDetailsModal;
