
import React from 'react';
import { SecurityItem } from '../types';
import StatusIcon from './StatusIcon';
import StatusBadge from './StatusBadge';

interface SecurityItemCardProps {
  item: SecurityItem;
}

export const SecurityItemCard: React.FC<SecurityItemCardProps> = ({ item }) => {
  return (
    <div 
      className="p-3 rounded-lg border border-gray-700 space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-2">
          <StatusIcon status={item.status} />
          {item.title}
        </span>
        <StatusBadge status={item.status} />
      </div>
      <p className="text-xs text-muted-foreground">{item.description}</p>
      {item.details && (
        <p className="text-xs border-t border-gray-700 pt-2 mt-2">{item.details}</p>
      )}
    </div>
  );
};

export default SecurityItemCard;
