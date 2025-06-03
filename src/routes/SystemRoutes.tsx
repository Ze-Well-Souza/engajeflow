
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// System Pages
import DistributedCachePage from "@/pages/system/DistributedCachePage";
import QueueSystemPage from "@/pages/system/QueueSystemPage";
import MicroservicesPage from "@/pages/system/MicroservicesPage";
import InternationalizationPage from "@/pages/system/InternationalizationPage";
import FinancialPage from "@/pages/system/FinancialPage";
import TechCareAutomatorPage from "@/pages/system/TechCareAutomatorPage";
import ConfiguracoesPage from "@/pages/system/ConfiguracoesPage";
import NotificacoesPage from "@/pages/system/NotificacoesPage";
import AgendamentosPage from "@/pages/system/AgendamentosPage";

const SystemRoutes = (): RouteObject[] => {
  return [
    {
      path: "/system/cache",
      element: <DashboardLayout><DistributedCachePage /></DashboardLayout>
    },
    {
      path: "/system/queue",
      element: <DashboardLayout><QueueSystemPage /></DashboardLayout>
    },
    {
      path: "/system/microservices",
      element: <DashboardLayout><MicroservicesPage /></DashboardLayout>
    },
    {
      path: "/system/i18n",
      element: <DashboardLayout><InternationalizationPage /></DashboardLayout>
    },
    {
      path: "/system/config",
      element: <DashboardLayout><ConfiguracoesPage /></DashboardLayout>
    },
    {
      path: "/system/notificacoes",
      element: <DashboardLayout><NotificacoesPage /></DashboardLayout>
    },
    {
      path: "/system/agendamentos",
      element: <DashboardLayout><AgendamentosPage /></DashboardLayout>
    },
    {
      path: "/system/financial",
      element: <DashboardLayout><FinancialPage /></DashboardLayout>
    },
    {
      path: "/system/techcare",
      element: <DashboardLayout><TechCareAutomatorPage /></DashboardLayout>
    }
  ];
};

export default SystemRoutes;
