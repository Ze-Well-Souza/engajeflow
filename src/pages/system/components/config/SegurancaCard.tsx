
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";

const SegurancaCard: React.FC = () => {
  return (
    <Card id="seguranca">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-500" />
          Segurança
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Alterar Senha</label>
          <Input 
            type="password" 
            className="mb-2"
            placeholder="Senha atual"
          />
          <Input 
            type="password" 
            className="mb-2"
            placeholder="Nova senha"
          />
          <Input 
            type="password" 
            placeholder="Confirmar nova senha"
          />
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="two-factor" defaultChecked />
            <label htmlFor="two-factor" className="text-sm">Autenticação de dois fatores</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notify-login" />
            <label htmlFor="notify-login" className="text-sm">Notificar sobre novos logins</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="require-auth" defaultChecked />
            <label htmlFor="require-auth" className="text-sm">Exigir autenticação para ações sensíveis</label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SegurancaCard;
