
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Developer Pages
import ApiDocPage from "@/pages/developer/ApiDocPage";
import WebhooksPage from "@/pages/developer/WebhooksPage";
import PluginsPage from "@/pages/developer/PluginsPage";
import DataMigrationPage from "@/pages/developer/DataMigrationPage";
import ApiDocumentationPage from "@/pages/developer/ApiDocumentationPage";

const DeveloperRoutes = (): RouteObject[] => {
  return [
    {
      path: "/developer/api",
      element: <DashboardLayout><ApiDocPage /></DashboardLayout>
    },
    {
      path: "/developer/webhooks",
      element: <DashboardLayout><WebhooksPage /></DashboardLayout>
    },
    {
      path: "/developer/plugins",
      element: <DashboardLayout><PluginsPage /></DashboardLayout>
    },
    {
      path: "/developer/migration",
      element: <DashboardLayout><DataMigrationPage /></DashboardLayout>
    },
    {
      path: "/developer/documentation",
      element: <DashboardLayout><ApiDocumentationPage /></DashboardLayout>
    }
  ];
};

export default DeveloperRoutes;
