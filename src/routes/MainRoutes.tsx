
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

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

const MainRoutes: React.FC = () => {
  // Retorna os elementos Route diretamente, sem o componente RouteGroup
  return (
    <>
      <Route path="/index" element={<Index />} />
      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/messages" element={<DashboardLayout><MessagesPage /></DashboardLayout>} />
      <Route path="/relatorios" element={<DashboardLayout><RelatoriosPage /></DashboardLayout>} />
      <Route path="/agendamentos" element={<DashboardLayout><AgendamentosPage /></DashboardLayout>} />
      <Route path="/configuracoes" element={<DashboardLayout><ConfiguracoesPage /></DashboardLayout>} />
      <Route path="/notificacoes" element={<DashboardLayout><NotificacoesPage /></DashboardLayout>} />
      <Route path="/ratings" element={<DashboardLayout><RatingsPage /></DashboardLayout>} />
      <Route path="/social-media" element={<DashboardLayout><SocialMediaPage /></DashboardLayout>} />
    </>
  );
};

export default MainRoutes;
