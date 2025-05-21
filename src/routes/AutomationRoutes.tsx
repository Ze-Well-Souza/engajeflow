
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Automation Pages
import AutomationPage from "@/pages/automation/AutomationPage";

const AutomationRoutes: React.FC = () => {
  return (
    <>
      <Route path="/automation" element={<DashboardLayout><AutomationPage /></DashboardLayout>} />
    </>
  );
};

export default AutomationRoutes;
