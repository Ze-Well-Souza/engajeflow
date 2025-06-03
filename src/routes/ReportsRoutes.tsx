
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Reports Pages
import ReportsPage from "@/pages/reports/ReportsPage";
import CustomReportsPage from "@/pages/reports/CustomReportsPage";
import ConversionsReportPage from "@/pages/reports/ConversionsReportPage";
import SocialMediaPerformancePage from "@/pages/reports/SocialMediaPerformancePage";
import AdvancedAnalyticsPage from "@/pages/reports/AdvancedAnalyticsPage";

const ReportsRoutes = (): RouteObject[] => {
  return [
    {
      path: "/reports",
      element: <DashboardLayout><ReportsPage /></DashboardLayout>
    },
    {
      path: "/reports/custom",
      element: <DashboardLayout><CustomReportsPage /></DashboardLayout>
    },
    {
      path: "/reports/conversions",
      element: <DashboardLayout><ConversionsReportPage /></DashboardLayout>
    },
    {
      path: "/reports/social",
      element: <DashboardLayout><SocialMediaPerformancePage /></DashboardLayout>
    },
    {
      path: "/reports/advanced",
      element: <DashboardLayout><AdvancedAnalyticsPage /></DashboardLayout>
    }
  ];
};

export default ReportsRoutes;
