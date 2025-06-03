
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SystemMetric } from './types';
import { getMetricStatusIcon } from './MetricStatusIcon';

interface MetricCardProps {
  metric: SystemMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center">
            {metric.icon}
            <span className="ml-2 text-xs font-medium">{metric.name}</span>
          </div>
          {getMetricStatusIcon({ status: metric.status })}
        </div>
        <div className="text-2xl font-bold mt-1">{metric.value}</div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
