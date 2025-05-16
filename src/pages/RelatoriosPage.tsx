
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsGrid } from "@/components/reports/MetricsGrid";
import { DailyActivityChart } from "@/components/reports/DailyActivityChart";
import { SocialMediaChart } from "@/components/reports/SocialMediaChart";
import { PageHeader } from "@/components/reports/PageHeader";
import { ReportsList } from "@/components/reports/ReportsList";
import { ChannelMetricsCard } from "@/components/reports/ChannelMetricsCard";
import { BotPerformanceCard } from "@/components/reports/BotPerformanceCard";

const RelatoriosPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Relatórios e Análises" />
      
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Diárias</CardTitle>
          </CardHeader>
          <CardContent>
            <DailyActivityChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance nas Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChannelMetricsCard />
        <BotPerformanceCard />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosPage;
