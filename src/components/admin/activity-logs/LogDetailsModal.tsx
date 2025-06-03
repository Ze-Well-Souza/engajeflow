
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivityLog } from "@/types";

interface LogDetailsModalProps {
  log: ActivityLog;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LogDetailsModal: React.FC<LogDetailsModalProps> = ({ log, open, setOpen }) => {
  const getVariantFromAction = (action: string) => {
    if (action === "create" || action === "login") {
      return "default";
    } else if (action === "delete") {
      return "destructive";
    } else {
      return "outline";
    }
  };

  if (!log) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detalhes do Log</AlertDialogTitle>
          <AlertDialogDescription>
            Informações detalhadas sobre a atividade.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="text-right font-bold">ID:</div>
            <div className="col-span-3">{log.id}</div>

            <div className="text-right font-bold">Usuário:</div>
            <div className="col-span-3">{log.user_email}</div>

            <div className="text-right font-bold">Ação:</div>
            <div className="col-span-3">
              <Badge variant={getVariantFromAction(log.action)}>
                {log.action}
              </Badge>
            </div>

            <div className="text-right font-bold">Timestamp:</div>
            <div className="col-span-3">{new Date(log.timestamp).toLocaleString()}</div>

            <div className="text-right font-bold">Detalhes:</div>
            <div className="col-span-3 max-h-40 overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">{log.details || "Sem detalhes disponíveis"}</pre>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Fechar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogDetailsModal;
