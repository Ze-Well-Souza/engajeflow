
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// Admin Pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";
import ClientsPage from "@/pages/admin/ClientsPage";
import AutomationConfigPage from "@/pages/admin/AutomationConfigPage";
import PermissionsPage from "@/pages/admin/PermissionsPage";
import ModuleManagerPage from "@/pages/admin/ModuleManagerPage";
import OrganizacoesPage from "@/pages/admin/OrganizacoesPage";

const AdminRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/admin/dashboard" element={<DashboardLayout><AdminDashboardPage /></DashboardLayout>} />
      <Route path="/admin/logs" element={<DashboardLayout><ActivityLogsPage /></DashboardLayout>} />
      <Route path="/admin/clients" element={<DashboardLayout><ClientsPage /></DashboardLayout>} />
      <Route path="/admin/automation" element={<DashboardLayout><AutomationConfigPage /></DashboardLayout>} />
      <Route path="/admin/permissions" element={<DashboardLayout><PermissionsPage /></DashboardLayout>} />
      <Route path="/admin/modules" element={<DashboardLayout><ModuleManagerPage /></DashboardLayout>} />
      <Route path="/admin/organizacoes" element={<DashboardLayout><OrganizacoesPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default AdminRoutes;
