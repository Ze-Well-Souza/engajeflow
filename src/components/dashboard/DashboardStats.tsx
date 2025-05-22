import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Activity, Calendar } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;
  positive?: boolean;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  positive, 
  isLoading = false 
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-24 bg-gray-700 mb-2" />
            <Skeleton className="h-4 w-32 bg-gray-700" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
              <p
                className={`text-xs ${
                  positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {change}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const DashboardStats: React.FC = () => {
  const { 
    activeAutomations,
    automationSuccessRate,
    scheduledPosts,
    recentActivities,
    isLoading,
    refreshMetrics,
    lastUpdated
  } = useDashboardMetrics();

  // Formatar a taxa de sucesso para exibição
  const formattedSuccessRate = `${automationSuccessRate}%`;
  
  // Calcular mudanças (simuladas por enquanto)
  // Em uma implementação real, isso viria de comparações com períodos anteriores
  const changes = {
    automations: "+8.5%",
    successRate: automationSuccessRate > 75 ? "+3.2%" : "-2.1%",
    posts: "+12.7%",
    activities: "+5.3%"
  };

  const statsCards = [
    {
      title: "Automações Ativas",
      value: activeAutomations,
      icon: Activity,
      change: changes.automations,
      positive: true,
    },
    {
      title: "Taxa de Sucesso",
      value: formattedSuccessRate,
      icon: Users,
      change: changes.successRate,
      positive: automationSuccessRate > 75,
    },
    {
      title: "Publicações Agendadas",
      value: scheduledPosts,
      icon: Calendar,
      change: changes.posts,
      positive: true,
    },
    {
      title: "Atividades Recentes",
      value: recentActivities,
      icon: MessageCircle,
      change: changes.activities,
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsCards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          change={card.change}
          positive={card.positive}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
