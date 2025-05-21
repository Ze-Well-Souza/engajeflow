
import React from 'react';
import { Badge } from "@/components/ui/badge";

type ServiceStatus = 'online' | 'degraded' | 'offline' | 'maintenance';

interface StatusBadgeProps {
  status: ServiceStatus;
}

export const getStatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'online':
      return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Online</Badge>;
    case 'degraded':
      return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Degradado</Badge>;
    case 'offline':
      return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">Offline</Badge>;
    case 'maintenance':
      return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">Manutenção</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export default StatusBadge;
