
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const ContaCard: React.FC = () => {
  return (
    <Card id="conta">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-500" />
          Configurações de Conta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input defaultValue="Administrador" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" defaultValue="admin@techcare.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <Input type="tel" defaultValue="(11) 98765-4321" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-28 w-28 bg-muted rounded-full flex items-center justify-center mb-2">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <Button variant="link" size="sm">Alterar foto</Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Idioma</label>
          <Select defaultValue="pt-br">
            <SelectTrigger>
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-br">Português (Brasil)</SelectItem>
              <SelectItem value="en-us">English (US)</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContaCard;
