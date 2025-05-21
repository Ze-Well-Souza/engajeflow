
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import GatewayPage from "./pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "./pages/gateway/GatewayIntegrationsPage";
import VendasPage from "./pages/store/VendasPage";
import ClientesPage from "./pages/store/ClientesPage";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StripeIntegrationPage from "./pages/store/StripeIntegrationPage";
import PaymentTestPage from "./pages/store/PaymentTestPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import SocialMediaPerformancePage from "./pages/reports/SocialMediaPerformancePage";
import SocialMediaPage from "./pages/SocialMediaPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import RatingsPage from "./pages/RatingsPage";
import { Toaster as SonnerToaster } from "sonner";
import DashboardLayout from "./components/DashboardLayout";
import ConfiguracoesPage from "./pages/system/ConfiguracoesPage";
import NotificacoesPage from "./pages/NotificacoesPage";
import LandingPage from "./pages/landing/LandingPage";
import BeautyLandingPage from "./pages/landing/BeautyLandingPage";
import FoodLandingPage from "./pages/landing/FoodLandingPage";
import PricingPage from "./pages/plans/PricingPage";
import MessagesPage from "./pages/MessagesPage";
import DashboardPage from "./pages/DashboardPage";
import ApiDocPage from "./pages/developer/ApiDocPage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";
import ApiDocumentationPage from "./pages/developer/ApiDocumentationPage";
import DataMigrationPage from "./pages/developer/DataMigrationPage";

// Fase 4: Segurança e Conformidade
import SecurityAuditPage from "./pages/security/SecurityAuditPage";
import MfaSetupPage from "./pages/security/MfaSetupPage";
import CompliancePage from "./pages/compliance/CompliancePage";
import PermissionsPage from "./pages/admin/PermissionsPage";

// Fase 5: Escalabilidade
import MicroservicesPage from "./pages/system/MicroservicesPage";
import QueueSystemPage from "./pages/system/QueueSystemPage";
import DistributedCachePage from "./pages/system/DistributedCachePage";

// Fase 6: Internacionalização
import InternationalizationPage from "./pages/system/InternationalizationPage";

// AI Pages
import SentimentAnalysisPage from "./pages/ai/SentimentAnalysisPage";
import SalesForecastPage from "./pages/ai/SalesForecastPage";
import ContentGeneratorPage from "./pages/ai/ContentGeneratorPage";
import CampaignAnalyticsPage from "./pages/ai/CampaignAnalyticsPage";
import ProductRecommendationsPage from "./pages/ai/ProductRecommendationsPage";
import LandingSegmentsPage from "./pages/landing/LandingSegmentsPage";
import TechCareAIPage from "./pages/ai/TechCareAIPage";

// TechCare Pages
import TechCareAutomatorPage from "./pages/system/TechCareAutomatorPage";

function App() {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/index" replace />} />
            
            {/* Landing Pages */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/landing/beauty" element={<BeautyLandingPage />} />
            <Route path="/landing/food" element={<FoodLandingPage />} />
            <Route path="/landing/segments" element={<LandingSegmentsPage />} />
            <Route path="/landing/pricing" element={<PricingPage />} />
            
            {/* Auth Routes */}
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rotas principais com layout de Dashboard */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Messages Route */}
              <Route path="/messages" element={<MessagesPage />} />
              
              {/* Gateway Routes */}
              <Route path="/gateway" element={<GatewayPage />} />
              <Route path="/gateway/integrations" element={<GatewayIntegrationsPage />} />
              
              {/* Store Routes */}
              <Route path="/store/vendas" element={<VendasPage />} />
              <Route path="/store/clientes" element={<ClientesPage />} />
              <Route path="/store/stripe-integration" element={<StripeIntegrationPage />} />
              <Route path="/store/payment-test" element={<PaymentTestPage />} />

              {/* Reports Routes */}
              <Route path="/relatorios" element={<RelatoriosPage />} />
              <Route path="/reports/social-media" element={<SocialMediaPerformancePage />} />
              
              {/* Social Media Route */}
              <Route path="/social-media" element={<SocialMediaPage />} />
              
              {/* Agendamentos & Ratings Routes */}
              <Route path="/agendamentos" element={<AgendamentosPage />} />
              <Route path="/ratings" element={<RatingsPage />} />
              
              {/* Developer Routes - Fase 3 */}
              <Route path="/developer/api" element={<ApiDocPage />} />
              <Route path="/developer/api/docs" element={<ApiDocumentationPage />} />
              <Route path="/developer/data-migration" element={<DataMigrationPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              
              {/* AI Pages - Fase 2 */}
              <Route path="/ai/sentiment" element={<SentimentAnalysisPage />} />
              <Route path="/ai/forecast" element={<SalesForecastPage />} />
              <Route path="/ai/content" element={<ContentGeneratorPage />} />
              <Route path="/ai/campaign" element={<CampaignAnalyticsPage />} />
              <Route path="/ai/recommendations" element={<ProductRecommendationsPage />} />
              <Route path="/ai/techcare" element={<TechCareAIPage />} />
              
              {/* Security Routes - Fase 4 */}
              <Route path="/security/audit" element={<SecurityAuditPage />} />
              <Route path="/security/mfa" element={<MfaSetupPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/admin/permissions" element={<PermissionsPage />} />
              
              {/* Scalability Routes - Fase 5 */}
              <Route path="/system/microservices" element={<MicroservicesPage />} />
              <Route path="/system/queue" element={<QueueSystemPage />} />
              <Route path="/system/cache" element={<DistributedCachePage />} />
              
              {/* Internationalization Routes - Fase 6 */}
              <Route path="/system/internationalization" element={<InternationalizationPage />} />
              
              {/* TechCare Routes */}
              <Route path="/system/techcare" element={<TechCareAutomatorPage />} />
              
              {/* System Routes */}
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="/notificacoes" element={<NotificacoesPage />} />
              <Route path="/system/notificacoes" element={<NotificacoesPage />} />
            </Route>
          </Routes>
          
          <SonnerToaster />
        </Router>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
