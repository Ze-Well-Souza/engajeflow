
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// Developer Pages
import ApiDocPage from "@/pages/developer/ApiDocPage";
import WebhooksPage from "@/pages/developer/WebhooksPage";
import PluginsPage from "@/pages/developer/PluginsPage";
import DataMigrationPage from "@/pages/developer/DataMigrationPage";
import ApiDocumentationPage from "@/pages/developer/ApiDocumentationPage";

const DeveloperRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/developer/api" element={<DashboardLayout><ApiDocPage /></DashboardLayout>} />
      <Route path="/developer/webhooks" element={<DashboardLayout><WebhooksPage /></DashboardLayout>} />
      <Route path="/developer/plugins" element={<DashboardLayout><PluginsPage /></DashboardLayout>} />
      <Route path="/developer/migration" element={<DashboardLayout><DataMigrationPage /></DashboardLayout>} />
      <Route path="/developer/documentation" element={<DashboardLayout><ApiDocumentationPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default DeveloperRoutes;
