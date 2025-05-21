
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Layers,
  Server,
  Terminal,
  Settings,
  Zap,
  Cpu,
  BarChart4
} from "lucide-react";

import ServiceStatusCard from "@/components/microservices/ServiceStatusCard";
import ServicesList from "@/components/microservices/ServicesList";
import MetricsPanel from "@/components/microservices/MetricsPanel";
import LoadBalancingPanel from "@/components/microservices/LoadBalancingPanel";
import ScalingPanel from "@/components/microservices/ScalingPanel";

const MicroservicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("services");
  
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

      <Tabs 
        defaultValue="services" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
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

export default MicroservicesPage;
