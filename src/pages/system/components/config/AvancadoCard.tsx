
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const AvancadoCard: React.FC = () => {
  return (
    <Card id="avancado">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2 text-gray-500" />
          Configurações Avançadas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="maintenance-mode" defaultChecked />
            <label htmlFor="maintenance-mode" className="text-sm">Modo de manutenção</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="advanced-logs" defaultChecked />
            <label htmlFor="advanced-logs" className="text-sm">Logs avançados</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="auto-backup" />
            <label htmlFor="auto-backup" className="text-sm">Backup automático diário</label>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Intervalo de sessão (minutos)</label>
          <Input type="number" defaultValue="30" />
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <Button variant="destructive" size="sm">Resetar configurações</Button>
          <Button variant="outline" size="sm">Limpar cache</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvancadoCard;
