
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "./DashboardStats";
import { AutomationStatusChart } from "./AutomationStatusChart";
import { ActivityModuleChart } from "./ActivityModuleChart";
import { RecentAutomationsTable } from "./RecentAutomationsTable";
import ScheduledPostsTable from "./ScheduledPostsTable";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calendar, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState("30");
  const [activeTab, setActiveTab] = useState("automations");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Função para atualizar todos os componentes do dashboard
  const refreshDashboard = () => {
    // Esta função seria implementada para chamar os métodos de atualização
    // de cada componente individual
    console.log("Atualizando dashboard...");
    setLastUpdated(new Date());
    // Em uma implementação real, chamaríamos os métodos refresh de cada componente
  };

  // Atualizar a cada 5 minutos
  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshDashboard();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel de controle do TechCare Connect Automator
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            onClick={refreshDashboard}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <DashboardStats />

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AutomationStatusChart />
        <ActivityModuleChart />
      </div>

      {/* Tabs para tabelas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="automations">Automações</TabsTrigger>
          <TabsTrigger value="posts">Publicações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automations">
          <RecentAutomationsTable />
        </TabsContent>
        
        <TabsContent value="posts">
          <ScheduledPostsTable />
        </TabsContent>
        
        <TabsContent value="reports">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Relatórios Gerados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400 p-4 text-center">
                Componente de relatórios será implementado aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status de Integrações */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle>Status de Integrações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 border border-gray-700 rounded-md">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-xs text-gray-400">Conectado</p>
              </div>
            </div>
            <div className="flex items-center p-3 border border-gray-700 rounded-md">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
              <div>
                <p className="font-medium">Instagram</p>
                <p className="text-xs text-gray-400">Conectado</p>
              </div>
            </div>
            <div className="flex items-center p-3 border border-gray-700 rounded-md">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-3"></div>
              <div>
                <p className="font-medium">Facebook</p>
                <p className="text-xs text-gray-400">Desconectado</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Última atualização */}
      <div className="flex items-center justify-end text-sm text-gray-400">
        <Clock className="h-4 w-4 mr-2" />
        Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
      </div>
    </div>
  );
};

export default Dashboard;
