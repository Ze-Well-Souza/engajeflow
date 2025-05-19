
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import TemplatesPage from "./pages/templates/TemplatesPage";
import CatalogoProdutosPage from "./pages/store/CatalogoProdutosPage";
import ContentAssistantPage from "./pages/content/ContentAssistantPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdvancedAnalyticsPage from "./pages/reports/AdvancedAnalyticsPage";
import GatewayPage from "./pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "./pages/gateway/GatewayIntegrationsPage";
import CompliancePage from "./pages/compliance/CompliancePage";
import ApiDocumentationPage from "./pages/developer/ApiDocumentationPage.jsx";
import PluginsPage from "./pages/developer/PluginsPage.jsx";
import DataMigrationPage from "./pages/developer/DataMigrationPage.jsx";
import WebhooksPage from "./pages/developer/WebhooksPage.jsx";
import SentimentAnalysisPage from "./pages/ai/SentimentAnalysisPage.jsx";
import ContentGeneratorPage from "./pages/ai/ContentGeneratorPage.jsx";
import ProductRecommendationsPage from "./pages/ai/ProductRecommendationsPage.jsx";
import SalesForecastPage from "./pages/ai/SalesForecastPage.jsx";
import CampaignAnalyticsPage from "./pages/ai/CampaignAnalyticsPage.jsx";

// Componente para contornar a autenticação (modo de teste)
const BypassAuthRoute = ({ children }) => {
  return children;
};

const App = () => {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Redirecionar login/registro para o dashboard, já que estamos ignorando autenticação */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            
            {/* Rota principal com layout do dashboard */}
            <Route path="/" element={<BypassAuthRoute><DashboardLayout /></BypassAuthRoute>}>
              {/* Rota index */}
              <Route index element={<DashboardPage />} />
              <Route path="agendamentos" element={<AgendamentosPage />} />
              <Route path="social-media" element={<SocialMediaPage />} />
              <Route path="relatorios" element={<RelatoriosPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="produtos" element={<CatalogoProdutosPage />} />
              <Route path="content-assistant" element={<ContentAssistantPage />} />
              
              {/* Rotas de admin */}
              <Route path="admin">
                <Route path="dashboard" element={<AdminDashboardPage />} />
              </Route>
              
              {/* Rotas de relatórios */}
              <Route path="reports">
                <Route path="advanced" element={<AdvancedAnalyticsPage />} />
              </Route>
              
              {/* Rotas de gateway */}
              <Route path="gateway">
                <Route path="dashboard" element={<GatewayPage />} />
                <Route path="integrations" element={<GatewayIntegrationsPage />} />
              </Route>
              
              {/* Rota de conformidade */}
              <Route path="compliance" element={<CompliancePage />} />
              
              {/* Rotas de desenvolvedor */}
              <Route path="developer">
                <Route path="api-docs" element={<ApiDocumentationPage />} />
                <Route path="plugins" element={<PluginsPage />} />
                <Route path="data-migration" element={<DataMigrationPage />} />
                <Route path="webhooks" element={<WebhooksPage />} />
              </Route>
              
              {/* Rotas de IA */}
              <Route path="ai">
                <Route path="sentiment" element={<SentimentAnalysisPage />} />
                <Route path="content-generator" element={<ContentGeneratorPage />} />
                <Route path="recommendations" element={<ProductRecommendationsPage />} />
                <Route path="sales-forecast" element={<SalesForecastPage />} />
                <Route path="campaign-analytics" element={<CampaignAnalyticsPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </LocalizationProvider>
  );
};

export default App;
