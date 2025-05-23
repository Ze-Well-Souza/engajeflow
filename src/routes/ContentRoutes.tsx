
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Content Pages
import ContentPage from "@/pages/content/ContentPage";
import SocialMediaPage from "@/pages/SocialMediaPage";
import RifaOnlinePage from "@/pages/RifaOnlinePage";

const ContentRoutes: React.FC = () => {
  return (
    <>
      <Route path="/content" element={<DashboardLayout><ContentPage /></DashboardLayout>} />
      <Route path="/content/social" element={<DashboardLayout><SocialMediaPage /></DashboardLayout>} />
      <Route path="/content/rifa" element={<DashboardLayout><RifaOnlinePage /></DashboardLayout>} />
    </>
  );
};

export default ContentRoutes;
