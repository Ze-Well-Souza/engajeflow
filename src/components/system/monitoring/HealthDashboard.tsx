
import React from 'react';
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  Network
} from "lucide-react";
import { SystemMetric, ServiceStatus } from './types';
import SystemMetricsCard from './SystemMetricsCard';
import ServiceStatusCard from './ServiceStatusCard';
import ClockIcon from './icons/ClockIcon';

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
      icon: <HardDrive className="h-4 w-4" />
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
      icon: <ClockIcon className="h-4 w-4" />
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard de Saúde do Sistema</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SystemMetricsCard metrics={systemMetrics} />
        <ServiceStatusCard services={services} />
      </div>
    </div>
  );
};

export default HealthDashboard;
