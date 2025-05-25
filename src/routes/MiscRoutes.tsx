
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import MessagesPage from "@/pages/MessagesPage";
import SocialTestingPage from "@/pages/SocialTestingPage";
import TestingDashboardPage from "@/pages/TestingDashboardPage";

const MiscRoutes = (): RouteObject[] => {
  return [
    {
      path: "/messages",
      element: <DashboardLayout><MessagesPage /></DashboardLayout>
    },
    {
      path: "/social-tests",
      element: <DashboardLayout><SocialTestingPage /></DashboardLayout>
    },
    {
      path: "/testing",
      element: <DashboardLayout><TestingDashboardPage /></DashboardLayout>
    }
  ];
};

export default MiscRoutes;
