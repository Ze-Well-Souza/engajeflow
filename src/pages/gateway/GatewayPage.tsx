
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GatewayStatus from '@/components/gateway/GatewayStatus';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpDown, Layers, RefreshCw, Zap } from 'lucide-react';

const GatewayPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gateway Aprimorado</h1>
          <p className="text-muted-foreground">Gerencie e monitore seu sistema de gateway de API</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Retry Inteligente
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Taxa de resolução automática
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Load Balancing
            </CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Disponibilidade do serviço
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cache Inteligente
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72ms</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tempo médio de resposta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Integrações Críticas
            </CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Taxa de entrega prioritária
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GatewayStatus />
            
            <Card>
              <CardHeader>
                <CardTitle>Requisições por API</CardTitle>
                <CardDescription>
                  Volume de tráfego por endpoint nas últimas 24h
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* Visualização simulada de gráfico */}
                <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-sm text-gray-500">Gráfico de Requisições</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>
                Registros de atividade recentes do gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full">
                <div className="space-y-2 text-sm">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex gap-2 text-xs border-b pb-2">
                      <div className="text-gray-500 w-24 flex-shrink-0">
                        {new Date(Date.now() - i * 600000).toLocaleTimeString()}
                      </div>
                      <div className={`px-1 rounded ${i % 3 === 0 ? "bg-yellow-100 text-yellow-800" : i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                        {i % 3 === 0 ? "AVISO" : i % 2 === 0 ? "INFO" : "DEBUG"}
                      </div>
                      <div>
                        {i % 5 === 0 ? "Circuit breaker mudou para half-open após tempo limite" :
                         i % 4 === 0 ? "Cache invalidado para API de pagamentos" :
                         i % 3 === 0 ? "Retry bem-sucedido após 2 tentativas" :
                         i % 2 === 0 ? "Balanceador redirecionou tráfego para endpoint secundário" :
                         "Nova configuração de priorização aplicada para APIs críticas"}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Desempenho</CardTitle>
              <CardDescription>
                Análise detalhada de métricas do gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Painel de métricas detalhadas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>
                Histórico completo de operações do gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Visualização completa de logs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Gateway</CardTitle>
              <CardDescription>
                Ajuste os parâmetros do sistema de gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Configurações do sistema</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GatewayPage;
