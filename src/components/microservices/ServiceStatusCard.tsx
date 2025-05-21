
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceStatusCardProps {
  title: string;
  value: string;
  status: "success" | "warning" | "error";
  icon: React.ReactNode;
  trend: string;
}

const ServiceStatusCard: React.FC<ServiceStatusCardProps> = ({ 
  title, 
  value, 
  status, 
  icon, 
  trend 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-600";
      case "warning":
        return "bg-amber-500/10 text-amber-600";
      case "error":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-blue-500/10 text-blue-600";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`p-2 rounded-full ${getStatusColor()}`}>
            {icon}
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {trend}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatusCard;
