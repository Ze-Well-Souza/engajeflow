
import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

type MetricStatus = 'healthy' | 'warning' | 'critical' | 'unknown';

interface MetricStatusIconProps {
  status: MetricStatus;
}

export const MetricStatusIcon = ({ status }: MetricStatusIconProps) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'critical':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

export const getMetricStatusIcon = MetricStatusIcon;

export default MetricStatusIcon;
