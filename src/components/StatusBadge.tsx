
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
      case 'active':
        return { variant: 'default', label: 'Ativo' };
      case 'inativo':
      case 'inactive':
        return { variant: 'secondary', label: 'Inativo' };
      case 'recurring':
        return { variant: 'outline', label: 'Recorrente' };
      case 'pending':
        return { variant: 'destructive', label: 'Pendente' };
      default:
        return { variant: 'secondary', label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant as any}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
