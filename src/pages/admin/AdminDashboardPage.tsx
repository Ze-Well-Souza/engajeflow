
import React from "react";
import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import ActionCardsGrid from "@/components/admin/dashboard/ActionCardsGrid";
import DashboardTabs from "@/components/admin/dashboard/DashboardTabs";
import { Activity } from "@/components/admin/dashboard/ActivityList";
import { SecurityAlert } from "@/components/admin/dashboard/SecurityAlertsList";

const AdminDashboardPage = () => {
  // Mock statistics for the admin dashboard
  const stats = {
    totalClients: 42,
    activeClients: 38,
    newClientsLastMonth: 8,
    totalPermissionSets: 15,
    securityAlerts: 3,
    apiUsage: 87,
    averageUptime: 99.8,
    dataStorageUsed: "1.8 TB"
  };

  // Mock recent activities
  const recentActivities: Activity[] = [
    {
      id: 1,
      user: "admin@techcare.com",
      action: "Adicionou novo cliente",
      target: "MegaStore Ltda",
      timestamp: "Hoje, 14:32"
    },
    {
      id: 2,
      user: "suporte@comerciofacil.com",
      action: "Modificou permissões",
      target: "Módulo de Vendas",
      timestamp: "Hoje, 11:45"
    },
    {
      id: 3,
      user: "ana.ferreira@email.com",
      action: "Gerou relatório",
      target: "Vendas Mensais",
      timestamp: "Ontem, 17:12"
    },
    {
      id: 4,
      user: "admin@techcare.com",
      action: "Configurou webhook",
      target: "Gateway de Pagamento",
      timestamp: "Ontem, 10:08"
    },
    {
      id: 5,
      user: "marcelo.silva@email.com",
      action: "Enviou mensagem em massa",
      target: "120 clientes",
      timestamp: "15/05/2025"
    }
  ];

  // Mock security alerts
  const securityAlerts: SecurityAlert[] = [
    {
      id: 1,
      type: "Login Suspeito",
      description: "Várias tentativas de login mal sucedidas",
      source: "IP: 203.0.113.42",
      severity: "high",
      timestamp: "Hoje, 05:47"
    },
    {
      id: 2,
      type: "Permissão Incomum",
      description: "Acesso à área administrativa por usuário não autorizado",
      source: "Usuário: cliente3@example.com",
      severity: "medium",
      timestamp: "14/05/2025"
    },
    {
      id: 3,
      type: "API Rate Limit",
      description: "Excesso de requisições à API",
      source: "Aplicação: Mobile App",
      severity: "low",
      timestamp: "12/05/2025"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Administração do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie clientes, permissões e monitore as atividades do sistema
        </p>
      </div>

      {/* Quick Stats */}
      <StatsGrid stats={stats} />
      
      {/* Admin Actions */}
      <ActionCardsGrid />
      
      {/* Tabs for Activities and Security Alerts */}
      <DashboardTabs 
        activities={recentActivities} 
        securityAlerts={securityAlerts} 
      />
    </div>
  );
};

export default AdminDashboardPage;
