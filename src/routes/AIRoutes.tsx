
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import RouteGroup from "./RouteGroup";

// AI Pages
import SentimentAnalysisPage from "@/pages/ai/SentimentAnalysisPage";
import ContentGeneratorPage from "@/pages/ai/ContentGeneratorPage";
import SalesForecastPage from "@/pages/ai/SalesForecastPage";
import CampaignAnalyticsPage from "@/pages/ai/CampaignAnalyticsPage";
import ProductRecommendationsPage from "@/pages/ai/ProductRecommendationsPage";
import TechCareAIPage from "@/pages/ai/TechCareAIPage";
import TechCareConsultantPage from "@/pages/ai/TechCareConsultantPage";

const AIRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/ai/sentiment" element={<DashboardLayout><SentimentAnalysisPage /></DashboardLayout>} />
      <Route path="/ai/content" element={<DashboardLayout><ContentGeneratorPage /></DashboardLayout>} />
      <Route path="/ai/forecast" element={<DashboardLayout><SalesForecastPage /></DashboardLayout>} />
      <Route path="/ai/analytics" element={<DashboardLayout><CampaignAnalyticsPage /></DashboardLayout>} />
      <Route path="/ai/recommendations" element={<DashboardLayout><ProductRecommendationsPage /></DashboardLayout>} />
      <Route path="/ai/techcare" element={<DashboardLayout><TechCareAIPage /></DashboardLayout>} />
      <Route path="/ai/consultant" element={<DashboardLayout><TechCareConsultantPage /></DashboardLayout>} />
    </RouteGroup>
  );
};

export default AIRoutes;
