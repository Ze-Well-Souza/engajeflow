
import React from 'react';
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { SecurityItemStatus } from '../types';

interface StatusIconProps {
  status: SecurityItemStatus;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case 'passed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'failed':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-blue-500" />;
    default:
      return null;
  }
};

export default StatusIcon;
