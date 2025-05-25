
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Gateway Pages
import GatewayPage from "@/pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "@/pages/gateway/GatewayIntegrationsPage";

const GatewayRoutes = (): RouteObject[] => {
  return [
    {
      path: "/gateway",
      element: <DashboardLayout><GatewayPage /></DashboardLayout>
    },
    {
      path: "/gateway/integrations",
      element: <DashboardLayout><GatewayIntegrationsPage /></DashboardLayout>
    }
  ];
};

export default GatewayRoutes;
