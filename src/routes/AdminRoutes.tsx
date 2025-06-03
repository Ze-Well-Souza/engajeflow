import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Admin Pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";
import ClientsPage from "@/pages/admin/ClientsPage";
import AutomationConfigPage from "@/pages/admin/AutomationConfigPage";
import PermissionsPage from "@/pages/admin/PermissionsPage";
import ModuleManagerPage from "@/pages/admin/ModuleManagerPage";
import OrganizacoesPage from "@/pages/admin/OrganizacoesPage";

const AdminRoutes = (): RouteObject[] => {
  return [
    {
      path: "/admin/dashboard",
      element: <DashboardLayout><AdminDashboardPage /></DashboardLayout>
    },
    {
      path: "/admin/logs",
      element: <DashboardLayout><ActivityLogsPage /></DashboardLayout>
    },
    {
      path: "/admin/clients",
      element: <DashboardLayout><ClientsPage /></DashboardLayout>
    },
    {
      path: "/admin/automation",
      element: <DashboardLayout><AutomationConfigPage /></DashboardLayout>
    },
    {
      path: "/admin/permissions",
      element: <DashboardLayout><PermissionsPage /></DashboardLayout>
    },
    {
      path: "/admin/modules",
      element: <DashboardLayout><ModuleManagerPage /></DashboardLayout>
    },
    {
      path: "/admin/organizacoes",
      element: <DashboardLayout><OrganizacoesPage /></DashboardLayout>
    }
  ];
};

export default AdminRoutes;
