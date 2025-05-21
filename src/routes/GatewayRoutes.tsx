
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Gateway Pages
import GatewayPage from "@/pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "@/pages/gateway/GatewayIntegrationsPage";

const GatewayRoutes: React.FC = () => {
  return (
    <>
      <Route path="/gateway" element={<DashboardLayout><GatewayPage /></DashboardLayout>} />
      <Route path="/gateway/integrations" element={<DashboardLayout><GatewayIntegrationsPage /></DashboardLayout>} />
    </>
  );
};

export default GatewayRoutes;
