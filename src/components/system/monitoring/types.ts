
import { ReactNode } from 'react';

export interface SystemMetric {
  name: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  icon: ReactNode;
}

export interface ServiceStatus {
  name: string;
  status: 'online' | 'degraded' | 'offline' | 'maintenance';
  uptime: string;
  lastIncident?: string;
}
