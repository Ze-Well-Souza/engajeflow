import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAutomationStatusDistribution } from "@/hooks/useAutomationStatusDistribution";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Cores para os diferentes status
const STATUS_COLORS = {
  pending: "#3b82f6",    // Azul
  processing: "#f59e0b", // Amarelo
  completed: "#10b981",  // Verde
  failed: "#ef4444",     // Vermelho
  cancelled: "#6b7280"   // Cinza
};

// Tradução dos status para português
const STATUS_LABELS = {
  pending: "Pendente",
  processing: "Em Processamento",
  completed: "Concluído",
  failed: "Falhou",
  cancelled: "Cancelado"
};

export const AutomationStatusChart: React.FC = () => {
  const { 
    pending,
    processing,
    completed,
    failed,
    cancelled,
    total,
    isLoading,
    refreshDistribution
  } = useAutomationStatusDistribution();

  // Preparar dados para o gráfico
  const chartData = [
    { name: STATUS_LABELS.pending, value: pending, status: "pending" },
    { name: STATUS_LABELS.processing, value: processing, status: "processing" },
    { name: STATUS_LABELS.completed, value: completed, status: "completed" },
    { name: STATUS_LABELS.failed, value: failed, status: "failed" },
    { name: STATUS_LABELS.cancelled, value: cancelled, status: "cancelled" }
  ].filter(item => item.value > 0); // Remover status com contagem zero

  // Renderizador personalizado para o tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            <span className="font-medium">{data.value}</span> tarefas 
            ({Math.round((data.value / total) * 100)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Distribuição de Status de Automações</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Skeleton className="h-48 w-48 rounded-full bg-gray-700" />
          </div>
        ) : total === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            Nenhuma automação encontrada
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-400 text-center">
          Total de automações: {total}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationStatusChart;
