import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LogDetailsModalProps {
  log: any;
}

const LogDetailsModal: React.FC<LogDetailsModalProps> = ({ log }) => {
  const getVariantFromAction = (action: string) => {
    if (action === "create" || action === "login") {
      return "default"; // Alterado de "success" para "default"
    } else if (action === "delete") {
      return "destructive";
    } else {
      return "outline";
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Detalhes</Button>
      </AlertDialogTrigger>
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
            <div className="col-span-3">{log.user_id}</div>

            <div className="text-right font-bold">Ação:</div>
            <div className="col-span-3">
              <Badge variant={getVariantFromAction(log.action)}>
                {log.action}
              </Badge>
            </div>

            <div className="text-right font-bold">Timestamp:</div>
            <div className="col-span-3">{log.created_at}</div>

            <div className="text-right font-bold">Detalhes:</div>
            <div className="col-span-3">
              <pre>{JSON.stringify(log.details, null, 2)}</pre>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="secondary">Fechar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogDetailsModal;
