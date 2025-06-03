
import React from "react";
import { UsersRound, UserCheck, AlertCircle, BarChart2 } from "lucide-react";
import StatCard from "./StatCard";

interface AdminStats {
  totalClients: number;
  activeClients: number;
  newClientsLastMonth: number;
  securityAlerts: number;
  apiUsage: number;
}

interface StatsGridProps {
  stats: AdminStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const activePercentage = Math.round(stats.activeClients / stats.totalClients * 100);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total de Clientes"
        value={stats.totalClients}
        description={`${stats.activeClients} ativos (${activePercentage}%)`}
        icon={UsersRound}
      />
      
      <StatCard
        title="Novos Clientes"
        value={`+${stats.newClientsLastMonth}`}
        description="No último mês"
        icon={UserCheck}
      />
      
      <StatCard
        title="Alertas de Segurança"
        value={stats.securityAlerts}
        description="Requer atenção"
        icon={AlertCircle}
        iconClassName="text-destructive"
      />
      
      <StatCard
        title="Uso da API"
        value={`${stats.apiUsage}%`}
        description="Da capacidade total"
        icon={BarChart2}
      />
    </div>
  );
};

export default StatsGrid;
