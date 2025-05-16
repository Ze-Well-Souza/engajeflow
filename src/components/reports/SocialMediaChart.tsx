
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart/index";

type SocialMediaMetric = {
  name: string;
  instagram: number;
  facebook: number;
  youtube: number;
};

type SocialMediaChartProps = {
  data: SocialMediaMetric[];
  title: string;
};

const SocialMediaChart: React.FC<SocialMediaChartProps> = ({ data, title }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              instagram: { 
                color: "#E1306C",
                label: "Instagram" 
              },
              facebook: { 
                color: "#4267B2",
                label: "Facebook" 
              },
              youtube: { 
                color: "#FF0000",
                label: "YouTube" 
              }
            }}
          >
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="instagram" fill="var(--color-instagram)" />
              <Bar dataKey="facebook" fill="var(--color-facebook)" />
              <Bar dataKey="youtube" fill="var(--color-youtube)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaChart;
