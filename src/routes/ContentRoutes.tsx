import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Content Pages
import ContentPage from "@/pages/content/ContentPage";
import SocialMediaPage from "@/pages/SocialMediaPage";
import RifaOnlinePage from "@/pages/RifaOnlinePage";
import PostsPage from "@/pages/posts";
import AutomationPage from "@/pages/automation";

const ContentRoutes = (): RouteObject[] => {
  return [
    {
      path: "/content",
      element: <DashboardLayout><ContentPage /></DashboardLayout>
    },
    {
      path: "/content/posts",
      element: <DashboardLayout><PostsPage /></DashboardLayout>
    },
    {
      path: "/posts",
      element: <DashboardLayout><PostsPage /></DashboardLayout>
    },
    {
      path: "/automation",
      element: <DashboardLayout><AutomationPage /></DashboardLayout>
    },
    {
      path: "/automations",
      element: <DashboardLayout><AutomationPage /></DashboardLayout>
    },
    {
      path: "/content/social",
      element: <DashboardLayout><SocialMediaPage /></DashboardLayout>
    },
    {
      path: "/content/rifa",
      element: <DashboardLayout><RifaOnlinePage /></DashboardLayout>
    }
  ];
};

export default ContentRoutes;
