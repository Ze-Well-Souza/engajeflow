
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface ChannelData {
  name: string;
  value: number;
  color: string;
}

const ChannelMetricsCard: React.FC = () => {
  // Dados dos canais
  const channelData: ChannelData[] = [
    { name: "WhatsApp", value: 12451, color: "#25D366" },
    { name: "Email", value: 8327, color: "#4267B2" },
    { name: "SMS", value: 3805, color: "#FFC107" },
    { name: "Telegram", value: 0, color: "#0088CC" }
  ];

  // Calcula o valor máximo para definir o domínio do eixo Y
  const maxValue = Math.max(...channelData.map(item => item.value));

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mensagens por Canal</CardTitle>
        <LineChart className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer
            config={{
              whatsapp: { 
                color: "#25D366",
                label: "WhatsApp" 
              },
              email: { 
                color: "#4267B2",
                label: "Email" 
              },
              sms: { 
                color: "#FFC107",
                label: "SMS" 
              },
              telegram: { 
                color: "#0088CC",
                label: "Telegram" 
              }
            }}
          >
            <BarChart
              layout="vertical"
              data={channelData}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
              <XAxis 
                type="number"
                domain={[0, maxValue * 1.1]} 
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
                formatter={(value: number) => [value.toLocaleString(), "Mensagens"]}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]} 
                barSize={30}
              >
                {channelData.map((entry, index) => (
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

export default ChannelMetricsCard;
