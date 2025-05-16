
import React from "react";
import PageHeader from "@/components/reports/PageHeader";
import MetricsGrid from "@/components/reports/MetricsGrid";
import ChannelMetricsCard from "@/components/reports/ChannelMetricsCard";
import BotPerformanceCard from "@/components/reports/BotPerformanceCard";
import DailyActivityChart from "@/components/reports/DailyActivityChart";
import ReportsList from "@/components/reports/ReportsList";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Relatórios e Métricas" />
      <MetricsGrid />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChannelMetricsCard />
        <BotPerformanceCard />
      </div>
      
      <DailyActivityChart />
      <ReportsList />
    </div>
  );
};

export default ReportsPage;
