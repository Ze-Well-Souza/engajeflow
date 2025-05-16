
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
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
import ApiDocumentationPage from "./pages/developer/ApiDocumentationPage";
import PluginsPage from "./pages/developer/PluginsPage";
import DataMigrationPage from "./pages/developer/DataMigrationPage";
import WebhooksPage from "./pages/developer/WebhooksPage";
import SentimentAnalysisPage from "./pages/ai/SentimentAnalysisPage";
import ContentGeneratorPage from "./pages/ai/ContentGeneratorPage";
import ProductRecommendationsPage from "./pages/ai/ProductRecommendationsPage";
import SalesForecastPage from "./pages/ai/SalesForecastPage";
import CampaignAnalyticsPage from "./pages/ai/CampaignAnalyticsPage";

const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Redirecionando a rota de login direto para o dashboard */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            
            {/* Todas as rotas agora usam BypassAuthRoute para permitir acesso direto sem autenticação */}
            <Route
              path="/"
              element={<BypassAuthRoute><DashboardLayout /></BypassAuthRoute>}
            >
              <Route index element={<DashboardPage />} />
              <Route path="agendamentos" element={<AgendamentosPage />} />
              <Route path="social-media" element={<SocialMediaPage />} />
              <Route path="relatorios" element={<RelatoriosPage />} />
              <Route path="relatorios/advanced-analytics" element={<AdvancedAnalyticsPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="store" element={<CatalogoProdutosPage />} />
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="content-assistant" element={<ContentAssistantPage />} />
              <Route path="gateway" element={<GatewayPage />} />
              <Route path="gateway/integrations" element={<GatewayIntegrationsPage />} />
              <Route path="compliance" element={<CompliancePage />} />
              {/* Novas páginas para fase 5 e 6 */}
              <Route path="developer/api" element={<ApiDocumentationPage />} />
              <Route path="developer/plugins" element={<PluginsPage />} />
              <Route path="developer/data-migration" element={<DataMigrationPage />} />
              <Route path="developer/webhooks" element={<WebhooksPage />} />
              <Route path="ai/sentiment-analysis" element={<SentimentAnalysisPage />} />
              <Route path="ai/content-generator" element={<ContentGeneratorPage />} />
              <Route path="ai/product-recommendations" element={<ProductRecommendationsPage />} />
              <Route path="ai/sales-forecast" element={<SalesForecastPage />} />
              <Route path="ai/campaign-analytics" element={<CampaignAnalyticsPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </LocalizationProvider>
  );
};

// Componente que permite acesso sem autenticação
const BypassAuthRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Sem verificação de autenticação, permite acesso direto
  return <>{children}</>;
};

// Mantemos a versão original do PrivateRoute caso seja necessário voltar a usá-lo
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  return currentUser ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
