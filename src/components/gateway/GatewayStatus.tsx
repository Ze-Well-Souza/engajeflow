
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useLocalization } from "@/contexts/LocalizationContext";

interface GatewayStatusProps {
  status: 'online' | 'offline' | 'degraded';
}

const GatewayStatus: React.FC<GatewayStatusProps> = ({ status }) => {
  const { t } = useLocalization();
  
  let badgeVariant: "default" | "secondary" | "destructive" | "outline";

  switch (status) {
    case 'online':
      badgeVariant = 'outline';
      break;
    case 'offline':
      badgeVariant = 'destructive';
      break;
    case 'degraded':
      badgeVariant = 'secondary';
      break;
    default:
      badgeVariant = 'default';
  }

  return (
    <Badge variant={badgeVariant}>{t(`status.${status}`)}</Badge>
  );
};

export default GatewayStatus;
