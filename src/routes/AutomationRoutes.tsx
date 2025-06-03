
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Automation Pages
import AutomationPage from "@/pages/automation/AutomationPage";

const AutomationRoutes = (): RouteObject[] => {
  return [
    {
      path: "/automation",
      element: <DashboardLayout><AutomationPage /></DashboardLayout>
    }
  ];
};

export default AutomationRoutes;
