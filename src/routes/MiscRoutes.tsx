
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import MessagesPage from "@/pages/MessagesPage";
import SocialTestingPage from "@/pages/SocialTestingPage";

const MiscRoutes: React.FC = () => {
  return (
    <>
      <Route path="/messages" element={<DashboardLayout><MessagesPage /></DashboardLayout>} />
      <Route path="/social-tests" element={<DashboardLayout><SocialTestingPage /></DashboardLayout>} />
    </>
  );
};

export default MiscRoutes;
