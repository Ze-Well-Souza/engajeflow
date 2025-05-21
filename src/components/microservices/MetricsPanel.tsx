
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight, Cpu, Database } from "lucide-react";

const MetricsPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral de Métricas</CardTitle>
          <CardDescription>Monitoramento em tempo real da performance do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-64 bg-muted/50 rounded-md flex items-center justify-center">
            <Activity className="h-12 w-12 text-muted-foreground/50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-muted/30 rounded">
              <div className="text-sm text-muted-foreground mb-1">Taxa de Requisições</div>
              <div className="text-2xl font-bold">3,421/min</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowRight className="h-3 w-3 mr-1" /> +8% desde ontem
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded">
              <div className="text-sm text-muted-foreground mb-1">Tempo Médio de Resposta</div>
              <div className="text-2xl font-bold">124ms</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowRight className="h-3 w-3 mr-1 transform rotate-90" /> -12ms desde ontem
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded">
              <div className="text-sm text-muted-foreground mb-1">Taxa de Erro</div>
              <div className="text-2xl font-bold">0.03%</div>
              <div className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowRight className="h-3 w-3 mr-1 transform rotate-90" /> -0.01% desde ontem
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver métricas detalhadas
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Utilização de CPU</CardTitle>
            <CardDescription>Por serviço nas últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 bg-muted/50 rounded-md flex items-center justify-center">
              <Cpu className="h-12 w-12 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Utilização de Memória</CardTitle>
            <CardDescription>Por serviço nas últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 bg-muted/50 rounded-md flex items-center justify-center">
              <Database className="h-12 w-12 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsPanel;
