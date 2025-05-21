
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  Cpu, 
  Memory, 
  Network, 
  AlertCircle,
  CheckCircle, 
  HelpCircle
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  icon: React.ReactNode;
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'degraded' | 'offline' | 'maintenance';
  uptime: string;
  lastIncident?: string;
}

const HealthDashboard: React.FC = () => {
  // Dados simulados para demonstração
  const systemMetrics: SystemMetric[] = [
    { 
      name: 'CPU', 
      value: '32%', 
      status: 'healthy',
      icon: <Cpu className="h-4 w-4" />
    },
    { 
      name: 'Memória', 
      value: '45%', 
      status: 'healthy',
      icon: <Memory className="h-4 w-4" />
    },
    { 
      name: 'Disco', 
      value: '68%', 
      status: 'warning',
      icon: <Database className="h-4 w-4" />
    },
    { 
      name: 'Rede', 
      value: '125 Mbps', 
      status: 'healthy',
      icon: <Network className="h-4 w-4" />
    },
    { 
      name: 'Banco de Dados', 
      value: '215 ms', 
      status: 'healthy',
      icon: <Database className="h-4 w-4" />
    },
    { 
      name: 'Tempo de Resposta', 
      value: '320 ms', 
      status: 'warning',
      icon: <Clock className="h-4 w-4" />
    }
  ];

  const services: ServiceStatus[] = [
    { 
      name: 'API Gateway', 
      status: 'online', 
      uptime: '22d 14h 35m',
    },
    { 
      name: 'Serviço de Autenticação', 
      status: 'online', 
      uptime: '22d 14h 35m',
    },
    { 
      name: 'Processamento de Mensagens', 
      status: 'degraded', 
      uptime: '8h 12m',
      lastIncident: 'Há 8 horas'
    },
    { 
      name: 'Sistema de Armazenamento', 
      status: 'online', 
      uptime: '15d 7h 22m',
    },
    { 
      name: 'Cache Distribuído', 
      status: 'online', 
      uptime: '7d 3h 45m',
    },
    { 
      name: 'Notificações Push', 
      status: 'maintenance', 
      uptime: '3h 40m',
      lastIncident: 'Manutenção programada'
    },
  ];

  const getStatusBadge = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Online</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Degradado</Badge>;
      case 'offline':
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">Offline</Badge>;
      case 'maintenance':
        return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">Manutenção</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getMetricStatusIcon = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard de Saúde do Sistema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Métricas do Sistema */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="h-5 w-5" />
              Métricas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="flex items-center">
                        {metric.icon}
                        <span className="ml-2 text-xs font-medium">{metric.name}</span>
                      </div>
                      {getMetricStatusIcon(metric.status)}
                    </div>
                    <div className="text-2xl font-bold mt-1">{metric.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status dos Serviços */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Status dos Serviços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center">
                    <div 
                      className={`w-2 h-2 rounded-full mr-2 ${
                        service.status === 'online' ? 'bg-green-500' :
                        service.status === 'degraded' ? 'bg-yellow-500' :
                        service.status === 'offline' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}
                    />
                    <div>
                      <div className="text-sm font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Uptime: {service.uptime}
                        {service.lastIncident && ` • Último incidente: ${service.lastIncident}`}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Componente faltante no escopo inicial
const Clock: React.FC<{ className?: string }> = ({ className }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
};

// Componente faltante no escopo inicial
const Activity: React.FC<{ className?: string }> = ({ className }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
};

export default HealthDashboard;
