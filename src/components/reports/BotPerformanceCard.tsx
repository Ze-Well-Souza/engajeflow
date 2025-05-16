
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface PerformanceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const BotPerformanceCard: React.FC = () => {
  // Dados de desempenho do bot
  const performanceData: PerformanceData[] = [
    { 
      name: "Perguntas respondidas automaticamente", 
      value: 78, 
      percentage: 78, 
      color: "#10B981" 
    },
    { 
      name: "Taxa de qualificação de leads", 
      value: 45, 
      percentage: 45, 
      color: "#3B82F6" 
    },
    { 
      name: "Conversões de bot para venda", 
      value: 23, 
      percentage: 23, 
      color: "#8B5CF6" 
    },
    { 
      name: "Transferência para humano", 
      value: 12, 
      percentage: 12, 
      color: "#F59E0B" 
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Desempenho do Bot</CardTitle>
        <PieChart className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              respostas: { 
                color: "#10B981",
                label: "Respostas automáticas" 
              },
              leads: { 
                color: "#3B82F6",
                label: "Qualificação de leads" 
              },
              conversoes: { 
                color: "#8B5CF6",
                label: "Conversões para venda" 
              },
              transferencias: { 
                color: "#F59E0B",
                label: "Transferências" 
              }
            }}
          >
            <BarChart
              layout="vertical"
              data={performanceData}
              margin={{
                top: 5,
                right: 30,
                left: 100,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
                formatter={(value: number) => [`${value}%`, "Taxa"]}
              />
              <Bar 
                dataKey="percentage" 
                radius={[0, 4, 4, 0]} 
                barSize={30}
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotPerformanceCard;
