
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SecurityItemStatus } from '../types';

interface StatusBadgeProps {
  status: SecurityItemStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'passed':
      return <Badge className="bg-green-500/20 text-green-500">Aprovado</Badge>;
    case 'warning':
      return <Badge className="bg-yellow-500/20 text-yellow-500">Atenção</Badge>;
    case 'failed':
      return <Badge className="bg-red-500/20 text-red-500">Falhou</Badge>;
    case 'pending':
      return <Badge className="bg-blue-500/20 text-blue-500">Pendente</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export default StatusBadge;
