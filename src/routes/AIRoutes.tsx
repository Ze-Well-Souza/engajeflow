
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// AI Pages
import SentimentAnalysisPage from "@/pages/ai/SentimentAnalysisPage";
import ContentGeneratorPage from "@/pages/ai/ContentGeneratorPage";
import SalesForecastPage from "@/pages/ai/SalesForecastPage";
import CampaignAnalyticsPage from "@/pages/ai/CampaignAnalyticsPage";
import ProductRecommendationsPage from "@/pages/ai/ProductRecommendationsPage";
import TechCareAIPage from "@/pages/ai/TechCareAIPage";
import TechCareConsultantPage from "@/pages/ai/TechCareConsultantPage";

const AIRoutes = (): RouteObject[] => {
  return [
    {
      path: "/ai/sentiment",
      element: <DashboardLayout><SentimentAnalysisPage /></DashboardLayout>
    },
    {
      path: "/ai/content",
      element: <DashboardLayout><ContentGeneratorPage /></DashboardLayout>
    },
    {
      path: "/ai/forecast",
      element: <DashboardLayout><SalesForecastPage /></DashboardLayout>
    },
    {
      path: "/ai/analytics",
      element: <DashboardLayout><CampaignAnalyticsPage /></DashboardLayout>
    },
    {
      path: "/ai/recommendations",
      element: <DashboardLayout><ProductRecommendationsPage /></DashboardLayout>
    },
    {
      path: "/ai/techcare",
      element: <DashboardLayout><TechCareAIPage /></DashboardLayout>
    },
    {
      path: "/ai/consultant",
      element: <DashboardLayout><TechCareConsultantPage /></DashboardLayout>
    }
  ];
};

export default AIRoutes;
