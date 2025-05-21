
import React from 'react';
import { ServiceStatus } from './types';
import { getStatusBadge } from './StatusBadge';

interface ServiceRowProps {
  service: ServiceStatus;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ service }) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg border border-gray-700">
      <div className="flex items-center">
        <div 
          className={`w-2 h-2 rounded-full mr-2 ${
            service.status === 'online' ? 'bg-green-500' :
            service.status === 'degraded' ? 'bg-yellow-500' :
            service.status === 'offline' ? 'bg-red-500' :
            'bg-blue-500'
          }`}
        />
        <div>
          <div className="text-sm font-medium">{service.name}</div>
          <div className="text-xs text-muted-foreground">
            Uptime: {service.uptime}
            {service.lastIncident && ` • Último incidente: ${service.lastIncident}`}
          </div>
        </div>
      </div>
      {getStatusBadge({ status: service.status })}
    </div>
  );
};

export default ServiceRow;
