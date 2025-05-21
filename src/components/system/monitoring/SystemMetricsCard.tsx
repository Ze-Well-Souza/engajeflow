
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";
import { SystemMetric } from './types';
import MetricCard from './MetricCard';

interface SystemMetricsCardProps {
  metrics: SystemMetric[];
}

const SystemMetricsCard: React.FC<SystemMetricsCardProps> = ({ metrics }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Server className="h-5 w-5" />
          Métricas do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMetricsCard;
