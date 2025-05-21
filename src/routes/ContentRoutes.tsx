
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// Content Pages
import ContentAssistantPage from "@/pages/content/ContentAssistantPage";

const ContentRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/content/assistant" element={<DashboardLayout><ContentAssistantPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default ContentRoutes;
