
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import SocialDashboardPage from "@/pages/SocialDashboardPage";

const SocialRoutes: React.FC = () => {
  return (
    <>
      <Route path="/social" element={<DashboardLayout><SocialDashboardPage /></DashboardLayout>} />
    </>
  );
};

export default SocialRoutes;
