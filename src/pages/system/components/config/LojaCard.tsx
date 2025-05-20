
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";

const LojaCard: React.FC = () => {
  return (
    <Card id="loja">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Store className="h-5 w-5 mr-2 text-green-500" />
          Configurações da Loja
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Loja</label>
          <Input defaultValue="TechCare" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <Textarea 
            rows={3}
            defaultValue="Sua loja completa de tecnologia e acessórios."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Moeda</label>
            <Select defaultValue="BRL">
              <SelectTrigger>
                <SelectValue placeholder="Selecione a moeda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">BRL (R$)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Formato de Data</label>
            <Select defaultValue="DD/MM/AAAA">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/AAAA">DD/MM/AAAA</SelectItem>
                <SelectItem value="MM/DD/AAAA">MM/DD/AAAA</SelectItem>
                <SelectItem value="AAAA-MM-DD">AAAA-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo da Loja</label>
          <div className="flex items-center mt-2">
            <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center mr-4">
              <Store className="h-8 w-8 text-muted-foreground" />
            </div>
            <Button variant="outline">Fazer upload do logo</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LojaCard;
