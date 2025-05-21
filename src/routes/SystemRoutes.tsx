
import React from "react";
import { Route } from "react-router-dom";
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

const SystemRoutes: React.FC = () => {
  return (
    <>
      <Route path="/system/cache" element={<DashboardLayout><DistributedCachePage /></DashboardLayout>} />
      <Route path="/system/queue" element={<DashboardLayout><QueueSystemPage /></DashboardLayout>} />
      <Route path="/system/microservices" element={<DashboardLayout><MicroservicesPage /></DashboardLayout>} />
      <Route path="/system/i18n" element={<DashboardLayout><InternationalizationPage /></DashboardLayout>} />
      <Route path="/system/config" element={<DashboardLayout><ConfiguracoesPage /></DashboardLayout>} />
      <Route path="/system/notificacoes" element={<DashboardLayout><NotificacoesPage /></DashboardLayout>} />
      <Route path="/system/agendamentos" element={<DashboardLayout><AgendamentosPage /></DashboardLayout>} />
      <Route path="/system/financial" element={<DashboardLayout><FinancialPage /></DashboardLayout>} />
      <Route path="/system/techcare" element={<DashboardLayout><TechCareAutomatorPage /></DashboardLayout>} />
    </>
  );
};

export default SystemRoutes;
