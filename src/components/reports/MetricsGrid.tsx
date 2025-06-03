
import React from "react";
import { BarChart2, MessageCircle, LineChart, PieChart } from "lucide-react";
import MetricCard from "./MetricCard";

const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Total de Mensagens"
        value="24,583"
        icon={<MessageCircle className="h-4 w-4" />}
        trend={{ value: "12.5%", positive: true }}
      />
      
      <MetricCard
        title="Taxa de Abertura"
        value="68.3%"
        icon={<LineChart className="h-4 w-4" />}
        trend={{ value: "3.7%", positive: true }}
      />
      
      <MetricCard
        title="Taxa de Resposta"
        value="42.1%"
        icon={<PieChart className="h-4 w-4" />}
        trend={{ value: "5.2%", positive: true }}
      />
      
      <MetricCard
        title="Conversões"
        value="341"
        icon={<BarChart2 className="h-4 w-4" />}
        trend={{ value: "8.3%", positive: true }}
      />
    </div>
  );
};

export default MetricsGrid;
