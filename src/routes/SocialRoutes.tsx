
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import SocialDashboardPage from "@/pages/SocialDashboardPage";

const SocialRoutes = (): RouteObject[] => {
  return [
    {
      path: "/social",
      element: <DashboardLayout><SocialDashboardPage /></DashboardLayout>
    }
  ];
};

export default SocialRoutes;
