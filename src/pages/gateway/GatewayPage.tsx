
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GatewayStatus from "@/components/gateway/GatewayStatus";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, BarChart3, RefreshCw, Server, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const GatewayPage: React.FC = () => {
  // Estado simulado do gateway
  const gatewayState = {
    status: 'online' as const, // Tipando corretamente como 'online' | 'offline' | 'degraded'
    requestsPerMinute: 423,
    totalRequests: 1528964,
    avgResponseTime: 238,
    uptime: 99.98,
    lastIssue: "2025-05-12T14:32:18"
  };

  // Lista de integrações simuladas
  const integrations = [
    { id: 1, name: "WhatsApp API", status: 'online' as const, requests: 583, avgResponse: 210 },
    { id: 2, name: "Instagram DM", status: 'online' as const, requests: 247, avgResponse: 223 },
    { id: 3, name: "Facebook Messenger", status: 'online' as const, requests: 421, avgResponse: 189 },
    { id: 4, name: "SMS Gateway", status: 'degraded' as const, requests: 92, avgResponse: 412 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gateway</h1>
          <p className="text-muted-foreground">Monitore e configure seu gateway de integrações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Cartão de Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center">
            Status do Gateway
            <GatewayStatus status={gatewayState.status} />
          </CardTitle>
          <CardDescription>Relatório em tempo real do sistema de gateway</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-muted-foreground text-sm">Requisições/Minuto</div>
              <div className="text-2xl font-bold">{gatewayState.requestsPerMinute}</div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-muted-foreground text-sm">Tempo Médio de Resposta</div>
              <div className="text-2xl font-bold">{gatewayState.avgResponseTime}ms</div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-muted-foreground text-sm">Uptime</div>
              <div className="text-2xl font-bold">{gatewayState.uptime}%</div>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="text-muted-foreground text-sm">Total de Requisições</div>
              <div className="text-2xl font-bold">{gatewayState.totalRequests.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Integrações */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Integrações</CardTitle>
            <Link to="/gateway/integrations">
              <Button variant="outline" size="sm">Ver Todas</Button>
            </Link>
          </div>
          <CardDescription>Status das integrações conectadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 font-medium">
              <div className="col-span-4">Nome</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3 flex items-center">
                Requisições <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
              <div className="col-span-3 flex items-center">
                Tempo de Resposta <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </div>
            {integrations.map(integration => (
              <div key={integration.id} className="grid grid-cols-12 gap-2 p-4 border-t">
                <div className="col-span-4 font-medium flex items-center">
                  <Server className="w-4 h-4 mr-2 text-muted-foreground" />
                  {integration.name}
                </div>
                <div className="col-span-2">
                  <GatewayStatus status={integration.status} />
                </div>
                <div className="col-span-3">{integration.requests}/hora</div>
                <div className="col-span-3">{integration.avgResponse}ms</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Links para recursos aprimorados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
              Retry Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Sistema que tenta novamente requisições com falha usando backoff exponencial e análise de padrões.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
              Load Balancing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Distribui requisições entre múltiplos servidores para garantir alta disponibilidade e performance.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="w-5 h-5 mr-2 text-purple-500" />
              Cache Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Armazena respostas de APIs frequentemente acessadas para reduzir latência e tráfego.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-accent/5 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-orange-500" />
              Priorização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Gerencia prioridades das integrações críticas para garantir SLAs e tempo de resposta adequados.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GatewayPage;
