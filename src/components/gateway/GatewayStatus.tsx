import React from 'react';
import { Badge } from "@/components/ui/badge";

interface GatewayStatusProps {
  status: 'online' | 'offline' | 'degraded';
}

const GatewayStatus: React.FC<GatewayStatusProps> = ({ status }) => {
  let badgeText: string;
  let badgeVariant: "default" | "secondary" | "destructive" | "outline";

  switch (status) {
    case 'online':
      badgeText = 'Online';
      badgeVariant = 'outline';
      break;
    case 'offline':
      badgeText = 'Offline';
      badgeVariant = 'destructive';
      break;
    case 'degraded':
      badgeText = 'Degraded';
      badgeVariant = 'secondary'; // Alterado de "warning" para "secondary"
      break;
    default:
      badgeText = 'Unknown';
      badgeVariant = 'default';
  }

  return (
    <Badge variant={badgeVariant}>{badgeText}</Badge>
  );
};

export default GatewayStatus;
