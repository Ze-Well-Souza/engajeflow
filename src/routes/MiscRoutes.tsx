import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Security Pages
import MfaSetupPage from "@/pages/security/MfaSetupPage";
import SecurityAuditPage from "@/pages/security/SecurityAuditPage";

// Other Pages
import ChannelsPage from "@/pages/misc/ChannelsPage";
import FunilVendasPage from "@/pages/misc/FunilVendasPage";
import MarketplacePage from "@/pages/misc/MarketplacePage";
import TemplatesPage from "@/pages/misc/TemplatesPage";
import TicketsPage from "@/pages/misc/TicketsPage";
import CompliancePage from "@/pages/misc/CompliancePage";
import SalesBotPage from "@/pages/misc/SalesBotPage";
import NotFound from "@/pages/NotFound";

const MiscRoutes: React.FC = () => {
  return (
    <>
      <Route path="/channels" element={<DashboardLayout><ChannelsPage /></DashboardLayout>} />
      <Route path="/funnel" element={<DashboardLayout><FunilVendasPage /></DashboardLayout>} />
      <Route path="/marketplace" element={<DashboardLayout><MarketplacePage /></DashboardLayout>} />
      <Route path="/templates" element={<DashboardLayout><TemplatesPage /></DashboardLayout>} />
      <Route path="/tickets" element={<DashboardLayout><TicketsPage /></DashboardLayout>} />
      <Route path="/security/mfa" element={<DashboardLayout><MfaSetupPage /></DashboardLayout>} />
      <Route path="/security/audit" element={<DashboardLayout><SecurityAuditPage /></DashboardLayout>} />
      <Route path="/compliance" element={<DashboardLayout><CompliancePage /></DashboardLayout>} />
      <Route path="/salesbot" element={<DashboardLayout><SalesBotPage /></DashboardLayout>} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default MiscRoutes;
