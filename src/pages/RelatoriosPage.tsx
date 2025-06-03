
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsGrid from "@/components/reports/MetricsGrid";
import DailyActivityChart from "@/components/reports/DailyActivityChart";
import SocialMediaChart from "@/components/reports/SocialMediaChart";
import PageHeader from "@/components/reports/PageHeader";
import ReportsList from "@/components/reports/ReportsList";
import ChannelMetricsCard from "@/components/reports/ChannelMetricsCard";
import BotPerformanceCard from "@/components/reports/BotPerformanceCard";

const RelatoriosPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Relatórios e Análises" />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="custom">Relatórios Personalizados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <MetricsGrid />
          <div className="grid md:grid-cols-2 gap-4">
            <DailyActivityChart />
            <ChannelMetricsCard />
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <SocialMediaChart 
            data={[
              { name: 'Jan', instagram: 4000, facebook: 2400, youtube: 1200 },
              { name: 'Fev', instagram: 3000, facebook: 1398, youtube: 2210 },
              { name: 'Mar', instagram: 2000, facebook: 9800, youtube: 2290 },
              { name: 'Abr', instagram: 2780, facebook: 3908, youtube: 2000 },
              { name: 'Mai', instagram: 1890, facebook: 4800, youtube: 2181 },
              { name: 'Jun', instagram: 2390, facebook: 3800, youtube: 2500 }
            ]}
            title="Desempenho nas Redes Sociais"
          />
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <BotPerformanceCard />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Análise de Conversas</h3>
                <p className="text-gray-500">
                  Indicadores e métricas sobre as conversas com os clientes ainda não estão disponíveis.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <ReportsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosPage;
