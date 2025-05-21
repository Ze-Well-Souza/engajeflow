
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Content Pages
import ContentAssistantPage from "@/pages/content/ContentAssistantPage";

const ContentRoutes: React.FC = () => {
  return (
    <>
      <Route path="/content/assistant" element={<DashboardLayout><ContentAssistantPage /></DashboardLayout>} />
    </>
  );
};

export default ContentRoutes;
