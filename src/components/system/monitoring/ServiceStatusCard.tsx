
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { ServiceStatus } from './types';
import ServiceRow from './ServiceRow';

interface ServiceStatusCardProps {
  services: ServiceStatus[];
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ services }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Status dos Serviços
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((service, index) => (
            <ServiceRow key={index} service={service} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatusCard;
