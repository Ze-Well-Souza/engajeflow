import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActivityByModule } from "@/hooks/useActivityByModule";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const ActivityModuleChart: React.FC = () => {
  const { 
    modules,
    total,
    isLoading,
    refreshActivityData
  } = useActivityByModule(30); // Últimos 30 dias

  // Preparar dados para o gráfico
  const chartData = modules
    .filter(module => module.count > 0) // Filtrar módulos sem atividade
    .slice(0, 6); // Limitar aos 6 módulos mais ativos

  // Renderizador personalizado para o tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm">
            <span className="font-medium">{payload[0].value}</span> atividades 
            ({Math.round((payload[0].value / total) * 100)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Atividade por Módulo</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full bg-gray-700" />
            <Skeleton className="h-8 w-11/12 bg-gray-700" />
            <Skeleton className="h-8 w-10/12 bg-gray-700" />
            <Skeleton className="h-8 w-9/12 bg-gray-700" />
            <Skeleton className="h-8 w-8/12 bg-gray-700" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            Nenhuma atividade encontrada
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-400 text-center">
          Total de atividades: {total} (últimos 30 dias)
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityModuleChart;
