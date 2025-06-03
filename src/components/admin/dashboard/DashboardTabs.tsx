
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityList, { Activity } from "./ActivityList";
import SecurityAlertsList, { SecurityAlert } from "./SecurityAlertsList";

interface DashboardTabsProps {
  activities: Activity[];
  securityAlerts: SecurityAlert[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activities,
  securityAlerts,
}) => {
  return (
    <Tabs defaultValue="activities" className="w-full">
      <TabsList>
        <TabsTrigger value="activities">Atividades Recentes</TabsTrigger>
        <TabsTrigger value="security">Alertas de Segurança</TabsTrigger>
      </TabsList>
      
      <TabsContent value="activities">
        <ActivityList
          activities={activities}
          title="Atividades Recentes"
          description="Últimas ações realizadas no sistema"
          linkTo="/admin/logs"
          linkText="Ver Todos os Logs"
        />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityAlertsList
          alerts={securityAlerts}
          title="Alertas de Segurança"
          description="Potenciais problemas de segurança detectados"
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
