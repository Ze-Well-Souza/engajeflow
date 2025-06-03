
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type MetricCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("bg-gray-800 border-gray-700", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs mt-1",
            trend.positive ? "text-green-500" : "text-red-500"
          )}>
            {trend.positive ? "+" : "-"}{trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
