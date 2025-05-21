
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// Reports Pages
import ReportsPage from "@/pages/reports/ReportsPage";
import CustomReportsPage from "@/pages/reports/CustomReportsPage";
import ConversionsReportPage from "@/pages/reports/ConversionsReportPage";
import SocialMediaPerformancePage from "@/pages/reports/SocialMediaPerformancePage";
import AdvancedAnalyticsPage from "@/pages/reports/AdvancedAnalyticsPage";

const ReportsRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/reports" element={<DashboardLayout><ReportsPage /></DashboardLayout>} />
      <Route path="/reports/custom" element={<DashboardLayout><CustomReportsPage /></DashboardLayout>} />
      <Route path="/reports/conversions" element={<DashboardLayout><ConversionsReportPage /></DashboardLayout>} />
      <Route path="/reports/social" element={<DashboardLayout><SocialMediaPerformancePage /></DashboardLayout>} />
      <Route path="/reports/advanced" element={<DashboardLayout><AdvancedAnalyticsPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default ReportsRoutes;
