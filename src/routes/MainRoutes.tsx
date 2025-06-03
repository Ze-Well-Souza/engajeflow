import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Main Pages
import Index from "@/pages/Index";
import DashboardPage from "@/pages/DashboardPage";
import MessagesPage from "@/pages/MessagesPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import AgendamentosPage from "@/pages/AgendamentosPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import NotificacoesPage from "@/pages/NotificacoesPage";
import RatingsPage from "@/pages/RatingsPage";
import SocialMediaPage from "@/pages/SocialMediaPage";

const MainRoutes = (): RouteObject[] => {
  // Retorna um array de objetos de rota
  return [
    {
      path: "/index",
      element: <Index />
    },
    {
      path: "/dashboard",
      element: <DashboardLayout><DashboardPage /></DashboardLayout>
    },
    {
      path: "/messages",
      element: <DashboardLayout><MessagesPage /></DashboardLayout>
    },
    {
      path: "/relatorios",
      element: <DashboardLayout><RelatoriosPage /></DashboardLayout>
    },
    {
      path: "/agendamentos",
      element: <DashboardLayout><AgendamentosPage /></DashboardLayout>
    },
    {
      path: "/configuracoes",
      element: <DashboardLayout><ConfiguracoesPage /></DashboardLayout>
    },
    {
      path: "/notificacoes",
      element: <DashboardLayout><NotificacoesPage /></DashboardLayout>
    },
    {
      path: "/ratings",
      element: <DashboardLayout><RatingsPage /></DashboardLayout>
    },
    {
      path: "/social-media",
      element: <DashboardLayout><SocialMediaPage /></DashboardLayout>
    }
  ];
};

export default MainRoutes;
