
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface DailyActivityData {
  day: string;
  atividade: number;
}

const DailyActivityChart: React.FC = () => {
  // Dados de atividade para cada dia da semana
  const activityData: DailyActivityData[] = [
    { day: "Dom", atividade: 30 },
    { day: "Seg", atividade: 65 },
    { day: "Ter", atividade: 45 },
    { day: "Qua", atividade: 80 },
    { day: "Qui", atividade: 55 },
    { day: "Sex", atividade: 40 },
    { day: "Sáb", atividade: 25 }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Atividade por Dia</CardTitle>
        <BarChart2 className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              atividade: {
                color: "#4F46E5",
                label: "Atividade"
              }
            }}
          >
            <BarChart
              data={activityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                tickLine={false}
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis 
                tickLine={false}
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar
                dataKey="atividade"
                fill="var(--color-atividade)"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyActivityChart;
