
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gauge } from "lucide-react";

const LoadBalancingPanel: React.FC = () => {
  const loadBalancers = [
    {
      id: 1,
      name: "primary-lb",
      algorithm: "Round Robin",
      status: "active",
      nodes: 3,
      throughput: "4.2 GB/s",
      connections: 1235
    },
    {
      id: 2,
      name: "api-gateway-lb",
      algorithm: "Least Connections",
      status: "active",
      nodes: 2,
      throughput: "2.8 GB/s",
      connections: 854
    }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Balanceadores de Carga</CardTitle>
          <CardDescription>Configuração e status dos balanceadores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loadBalancers.map(lb => (
            <div key={lb.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{lb.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Algoritmo: {lb.algorithm}
                  </p>
                </div>
                <Badge className="bg-green-500/10 text-green-600 border-green-600/20">
                  {lb.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-2 bg-muted/30 rounded text-center">
                  <div className="text-xs text-muted-foreground mb-1">Nós</div>
                  <div className="font-medium">{lb.nodes}</div>
                </div>
                <div className="p-2 bg-muted/30 rounded text-center">
                  <div className="text-xs text-muted-foreground mb-1">Throughput</div>
                  <div className="font-medium">{lb.throughput}</div>
                </div>
                <div className="p-2 bg-muted/30 rounded text-center">
                  <div className="text-xs text-muted-foreground mb-1">Conexões</div>
                  <div className="font-medium">{lb.connections}</div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Adicionar Balanceador
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Tráfego</CardTitle>
          <CardDescription>Visualização da distribuição entre nós</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/50 rounded-md flex items-center justify-center">
            <Gauge className="h-12 w-12 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadBalancingPanel;
