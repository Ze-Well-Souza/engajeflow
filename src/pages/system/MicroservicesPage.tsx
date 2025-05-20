
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Layers,
  Server,
  Database,
  Activity,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Play,
  Pause,
  Info,
  Settings,
  Terminal,
  Zap,
  Cpu,
  Gauge,
  BarChart4
} from "lucide-react";

const MicroservicesPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Layers className="text-primary" />
            Arquitetura de Microserviços
          </h1>
          <p className="text-muted-foreground">
            Gerenciamento e monitoramento dos serviços distribuídos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Terminal
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ServiceStatusCard
          title="Serviços"
          value="12/14"
          status="warning"
          icon={<Server className="h-5 w-5" />}
          trend="Dois serviços com problemas"
        />
        <ServiceStatusCard
          title="Tempo de Resposta"
          value="124ms"
          status="success"
          icon={<Zap className="h-5 w-5" />}
          trend="↓ 12ms desde ontem"
        />
        <ServiceStatusCard
          title="Uso de CPU"
          value="47%"
          status="success"
          icon={<Cpu className="h-5 w-5" />}
          trend="↑ 5% na última hora"
        />
        <ServiceStatusCard
          title="Erros"
          value="0.03%"
          status="success"
          icon={<BarChart4 className="h-5 w-5" />}
          trend="↓ 0.01% desde ontem"
        />
      </div>

      <Tabs defaultValue="services">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="load-balancing">Balanceamento</TabsTrigger>
          <TabsTrigger value="scaling">Escalabilidade</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Buscar serviços..."
              className="max-w-sm"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filtrar</Button>
              <Button variant="default" size="sm">Adicionar Serviço</Button>
            </div>
          </div>

          <ServicesList />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4 pt-4">
          <MetricsPanel />
        </TabsContent>

        <TabsContent value="load-balancing" className="space-y-4 pt-4">
          <LoadBalancingPanel />
        </TabsContent>

        <TabsContent value="scaling" className="space-y-4 pt-4">
          <ScalingPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ServiceStatusCardProps {
  title: string;
  value: string;
  status: "success" | "warning" | "error";
  icon: React.ReactNode;
  trend: string;
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ title, value, status, icon, trend }) => {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-600";
      case "warning":
        return "bg-amber-500/10 text-amber-600";
      case "error":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-blue-500/10 text-blue-600";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`p-2 rounded-full ${getStatusColor()}`}>
            {icon}
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {trend}
        </div>
      </CardContent>
    </Card>
  );
};

const ServicesList: React.FC = () => {
  const services = [
    {
      id: 1,
      name: "auth-service",
      description: "Autenticação e autorização",
      status: "running",
      health: "healthy",
      instances: 3,
      cpu: "32%",
      memory: "128MB",
      version: "1.3.2",
    },
    {
      id: 2,
      name: "payment-gateway",
      description: "Processamento de pagamentos",
      status: "running",
      health: "healthy",
      instances: 2,
      cpu: "45%",
      memory: "256MB",
      version: "2.1.0",
    },
    {
      id: 3,
      name: "notification-service",
      description: "Envio de notificações",
      status: "degraded",
      health: "warning",
      instances: 2,
      cpu: "78%",
      memory: "192MB",
      version: "1.2.5",
    },
    {
      id: 4,
      name: "analytics-engine",
      description: "Processamento de dados analíticos",
      status: "running",
      health: "healthy",
      instances: 4,
      cpu: "56%",
      memory: "512MB",
      version: "3.0.1",
    },
    {
      id: 5,
      name: "file-storage",
      description: "Armazenamento e recuperação de arquivos",
      status: "stopped",
      health: "error",
      instances: 0,
      cpu: "0%",
      memory: "0MB",
      version: "1.1.0",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-600/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1"></div>
            Em execução
          </Badge>
        );
      case "degraded":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-600/20">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1"></div>
            Degradado
          </Badge>
        );
      case "stopped":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-600/20">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1"></div>
            Parado
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-600/20">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1"></div>
            Desconhecido
          </Badge>
        );
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <Check className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "error":
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  {service.name}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(service.status)}
                <Badge variant="outline">v{service.version}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-2 bg-muted/50 rounded flex flex-col">
                <span className="text-xs text-muted-foreground">Saúde</span>
                <div className="flex items-center mt-1">
                  {getHealthIcon(service.health)}
                  <span className="ml-1 capitalize">{service.health}</span>
                </div>
              </div>
              <div className="p-2 bg-muted/50 rounded flex flex-col">
                <span className="text-xs text-muted-foreground">Instâncias</span>
                <div className="font-medium mt-1">{service.instances}</div>
              </div>
              <div className="p-2 bg-muted/50 rounded flex flex-col">
                <span className="text-xs text-muted-foreground">CPU</span>
                <div className="font-medium mt-1">{service.cpu}</div>
              </div>
              <div className="p-2 bg-muted/50 rounded flex flex-col">
                <span className="text-xs text-muted-foreground">Memória</span>
                <div className="font-medium mt-1">{service.memory}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Reiniciar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-1" />
                Detalhes
              </Button>
              {service.status === "running" ? (
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-1" />
                  Pausar
                </Button>
              ) : (
                <Button variant="default" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Iniciar
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

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
                <p className="font-medium">CPU > 70% por 2 minutos</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escala para baixo</p>
                <p className="font-medium">CPU < 30% por 5 minutos</p>
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
                <p className="font-medium">Requisições > 1000/min</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Escala para baixo</p>
                <p className="font-medium">Requisições < 500/min por 10 minutos</p>
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

export default MicroservicesPage;
