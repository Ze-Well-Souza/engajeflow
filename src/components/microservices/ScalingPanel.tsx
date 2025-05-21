
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

const ScalingPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Auto-Scaling</CardTitle>
          <CardDescription>Configurações de escalabilidade automática</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <h3 className="font-medium text-amber-800 dark:text-amber-300">Auto-Scaling Ativo</h3>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              O sistema está configurado para escalar automaticamente baseado na carga de trabalho.
              Atualmente, 3 serviços estão configurados com políticas de auto-scaling.
            </p>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">auth-service</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Mínimo de instâncias</p>
                <p className="font-medium">2</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Máximo de instâncias</p>
                <p className="font-medium">5</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escala para cima</p>
                <p className="font-medium">CPU &gt; 70% por 2 minutos</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escala para baixo</p>
                <p className="font-medium">CPU &lt; 30% por 5 minutos</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">Editar</Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">payment-gateway</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Mínimo de instâncias</p>
                <p className="font-medium">2</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Máximo de instâncias</p>
                <p className="font-medium">4</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escala para cima</p>
                <p className="font-medium">Requisições &gt; 1000/min</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escala para baixo</p>
                <p className="font-medium">Requisições &lt; 500/min por 10 minutos</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">Editar</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Adicionar Política de Auto-Scaling
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Escalabilidade</CardTitle>
          <CardDescription>Eventos recentes de escalabilidade automática</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded">
              <div>
                <p className="font-medium">auth-service escalado para 4 instâncias</p>
                <p className="text-sm text-muted-foreground">Gatilho: CPU acima de 70%</p>
              </div>
              <Badge variant="outline">2025-05-20 09:45</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 rounded">
              <div>
                <p className="font-medium">payment-gateway escalado para 3 instâncias</p>
                <p className="text-sm text-muted-foreground">Gatilho: Requisições acima de 1000/min</p>
              </div>
              <Badge variant="outline">2025-05-20 08:30</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div>
                <p className="font-medium">analytics-engine escalado para 3 instâncias</p>
                <p className="text-sm text-muted-foreground">Gatilho: Utilização de memória acima de 80%</p>
              </div>
              <Badge variant="outline">2025-05-19 14:15</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver histórico completo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScalingPanel;
