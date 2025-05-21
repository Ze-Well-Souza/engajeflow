
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// Gateway Pages
import GatewayPage from "@/pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "@/pages/gateway/GatewayIntegrationsPage";

const GatewayRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/gateway" element={<DashboardLayout><GatewayPage /></DashboardLayout>} />
      <Route path="/gateway/integrations" element={<DashboardLayout><GatewayIntegrationsPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default GatewayRoutes;
