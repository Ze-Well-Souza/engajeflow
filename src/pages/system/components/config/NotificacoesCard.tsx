
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell } from "lucide-react";

const NotificacoesCard: React.FC = () => {
  return (
    <Card id="notificacoes">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-yellow-500" />
          Configurações de Notificações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="notif-email" defaultChecked />
            <label htmlFor="notif-email" className="text-sm">Notificações por e-mail</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notif-system" defaultChecked />
            <label htmlFor="notif-system" className="text-sm">Notificações no sistema</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notif-summary" />
            <label htmlFor="notif-summary" className="text-sm">Resumo diário de atividades</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notif-estoque" defaultChecked />
            <label htmlFor="notif-estoque" className="text-sm">Alertas de estoque baixo</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notif-vendas" defaultChecked />
            <label htmlFor="notif-vendas" className="text-sm">Novas vendas</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notif-news" />
            <label htmlFor="notif-news" className="text-sm">Novidades e atualizações do sistema</label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificacoesCard;
