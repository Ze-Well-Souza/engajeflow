
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// Automation Pages
import AutomationPage from "@/pages/automation/AutomationPage";

const AutomationRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/automation" element={<DashboardLayout><AutomationPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default AutomationRoutes;
