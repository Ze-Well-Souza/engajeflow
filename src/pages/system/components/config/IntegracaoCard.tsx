
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Globe } from "lucide-react";

const IntegracaoCard: React.FC = () => {
  return (
    <Card id="integracao">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-purple-500" />
          Integrações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mr-3">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">WhatsApp Business API</h3>
              <p className="text-xs text-muted-foreground">Integração para envio e recebimento de mensagens</p>
            </div>
          </div>
          <div>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-700/50">
              Conectado
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center mr-3">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Gateway de Pagamento</h3>
              <p className="text-xs text-muted-foreground">Processamento de pagamentos online</p>
            </div>
          </div>
          <div>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full border border-green-200 dark:border-green-700/50">
              Conectado
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full flex items-center justify-center mr-3">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Automação de Marketing</h3>
              <p className="text-xs text-muted-foreground">Criação de campanhas automatizadas</p>
            </div>
          </div>
          <div>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400 text-xs rounded-full border border-gray-200 dark:border-gray-700/50">
              Desconectado
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full flex items-center justify-center mr-3">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Sistema de Logística</h3>
              <p className="text-xs text-muted-foreground">Gerenciamento de envios e entregas</p>
            </div>
          </div>
          <div>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400 text-xs rounded-full border border-gray-200 dark:border-gray-700/50">
              Desconectado
            </span>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button>Adicionar Nova Integração</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegracaoCard;
