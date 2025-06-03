
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  RefreshCw,
  Info,
  Play,
  Pause,
  Check,
  AlertCircle,
  X
} from "lucide-react";

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

export default ServicesList;
