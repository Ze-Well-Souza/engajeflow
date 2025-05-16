
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export interface SecurityAlert {
  id: number;
  type: string;
  description: string;
  source: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
}

interface SecurityAlertsListProps {
  alerts: SecurityAlert[];
  title: string;
  description: string;
}

const SecurityAlertsList: React.FC<SecurityAlertsListProps> = ({
  alerts,
  title,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
              <div className={`p-2 rounded-full ${
                alert.severity === 'high' ? 'bg-red-100' : 
                alert.severity === 'medium' ? 'bg-yellow-100' : 
                'bg-blue-100'
              }`}>
                <AlertCircle className={`h-4 w-4 ${
                  alert.severity === 'high' ? 'text-red-600' : 
                  alert.severity === 'medium' ? 'text-yellow-600' : 
                  'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{alert.type}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' : 
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.severity === 'high' ? 'Alta' : 
                     alert.severity === 'medium' ? 'Média' : 
                     'Baixa'}
                  </span>
                </div>
                <p className="text-sm">{alert.description}</p>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{alert.source}</span>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SecurityAlertsList;
