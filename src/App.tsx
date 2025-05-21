import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";

// Main Pages
import Index from "@/pages/Index";
import DashboardPage from "@/pages/DashboardPage";
import MessagesPage from "@/pages/MessagesPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import AgendamentosPage from "@/pages/AgendamentosPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import NotificacoesPage from "@/pages/NotificacoesPage";
import RatingsPage from "@/pages/RatingsPage";
import SocialMediaPage from "@/pages/SocialMediaPage";

// Admin Pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";
import ClientsPage from "@/pages/admin/ClientsPage";
import AutomationConfigPage from "@/pages/admin/AutomationConfigPage";
import PermissionsPage from "@/pages/admin/PermissionsPage";
import ModuleManagerPage from "@/pages/admin/ModuleManagerPage";
import OrganizacoesPage from "@/pages/admin/OrganizacoesPage";

// System Pages
import DistributedCachePage from "@/pages/system/DistributedCachePage";
import QueueSystemPage from "@/pages/system/QueueSystemPage";
import MicroservicesPage from "@/pages/system/MicroservicesPage";
import InternationalizationPage from "@/pages/system/InternationalizationPage";
import FinancialPage from "@/pages/system/FinancialPage";
import TechCareAutomatorPage from "@/pages/system/TechCareAutomatorPage";

// AI Pages
import SentimentAnalysisPage from "@/pages/ai/SentimentAnalysisPage";
import ContentGeneratorPage from "@/pages/ai/ContentGeneratorPage";
import SalesForecastPage from "@/pages/ai/SalesForecastPage";
import CampaignAnalyticsPage from "@/pages/ai/CampaignAnalyticsPage";
import ProductRecommendationsPage from "@/pages/ai/ProductRecommendationsPage";
import TechCareAIPage from "@/pages/ai/TechCareAIPage";
import TechCareConsultantPage from "@/pages/ai/TechCareConsultantPage";

// Gateway Pages
import GatewayPage from "@/pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "@/pages/gateway/GatewayIntegrationsPage";

// Store Pages
import ProdutosPage from "@/pages/store/ProdutosPage";
import ClientesPage from "@/pages/store/ClientesPage";
import VendasPage from "@/pages/store/VendasPage";
import CategoriasPage from "@/pages/store/CategoriasPage";
import CatalogoProdutosPage from "@/pages/store/CatalogoProdutosPage";
import PaymentTestPage from "@/pages/store/PaymentTestPage";
import StripeIntegrationPage from "@/pages/store/StripeIntegrationPage";

// Developer Pages
import ApiDocPage from "@/pages/developer/ApiDocPage";
import WebhooksPage from "@/pages/developer/WebhooksPage";
import PluginsPage from "@/pages/developer/PluginsPage";
import DataMigrationPage from "@/pages/developer/DataMigrationPage";
import ApiDocumentationPage from "@/pages/developer/ApiDocumentationPage";

// Landing Pages
import LandingPage from "@/pages/landing/LandingPage";
import LandingSegmentsPage from "@/pages/landing/LandingSegmentsPage";
import BeautyLandingPage from "@/pages/landing/BeautyLandingPage";
import FoodLandingPage from "@/pages/landing/FoodLandingPage";
import FreelancerLandingPage from "@/pages/landing/FreelancerLandingPage";
import EcommerceLandingPage from "@/pages/landing/EcommerceLandingPage";
import ContentCreatorLandingPage from "@/pages/landing/ContentCreatorLandingPage";
import EducationLandingPage from "@/pages/landing/EducationLandingPage";
import HRLandingPage from "@/pages/landing/HRLandingPage";
import AccountingLandingPage from "@/pages/landing/AccountingLandingPage";

// Content Pages
import ContentAssistantPage from "@/pages/content/ContentAssistantPage";

// Automation Pages
import AutomationPage from "@/pages/automation/AutomationPage";

// Reports Pages
import ReportsPage from "@/pages/reports/ReportsPage";
import CustomReportsPage from "@/pages/reports/CustomReportsPage";
import ConversionsReportPage from "@/pages/reports/ConversionsReportPage";
import SocialMediaPerformancePage from "@/pages/reports/SocialMediaPerformancePage";
import AdvancedAnalyticsPage from "@/pages/reports/AdvancedAnalyticsPage";

// Authentication Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Security Pages
import MfaSetupPage from "@/pages/security/MfaSetupPage";
import SecurityAuditPage from "@/pages/security/SecurityAuditPage";

// Other Pages
import PricingPage from "@/pages/misc/PricingPage";
import ChannelsPage from "@/pages/misc/ChannelsPage";
import FunilVendasPage from "@/pages/misc/FunilVendasPage";
import MarketplacePage from "@/pages/misc/MarketplacePage";
import TemplatesPage from "@/pages/misc/TemplatesPage";
import TicketsPage from "@/pages/misc/TicketsPage";
import CompliancePage from "@/pages/misc/CompliancePage";
import SalesBotPage from "@/pages/misc/SalesBotPage";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/messages" element={<DashboardLayout><MessagesPage /></DashboardLayout>} />
          <Route path="/relatorios" element={<DashboardLayout><RelatoriosPage /></DashboardLayout>} />
          <Route path="/agendamentos" element={<DashboardLayout><AgendamentosPage /></DashboardLayout>} />
          <Route path="/configuracoes" element={<DashboardLayout><ConfiguracoesPage /></DashboardLayout>} />
          <Route path="/notificacoes" element={<DashboardLayout><NotificacoesPage /></DashboardLayout>} />
          <Route path="/ratings" element={<DashboardLayout><RatingsPage /></DashboardLayout>} />
          <Route path="/socialmedia" element={<DashboardLayout><SocialMediaPage /></DashboardLayout>} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<DashboardLayout><AdminDashboardPage /></DashboardLayout>} />
          <Route path="/admin/logs" element={<DashboardLayout><ActivityLogsPage /></DashboardLayout>} />
          <Route path="/admin/clients" element={<DashboardLayout><ClientsPage /></DashboardLayout>} />
          <Route path="/admin/automation" element={<DashboardLayout><AutomationConfigPage /></DashboardLayout>} />
          <Route path="/admin/permissions" element={<DashboardLayout><PermissionsPage /></DashboardLayout>} />
          <Route path="/admin/modules" element={<DashboardLayout><ModuleManagerPage /></DashboardLayout>} />
          <Route path="/admin/organizacoes" element={<DashboardLayout><OrganizacoesPage /></DashboardLayout>} />
          
          {/* System Routes */}
          <Route path="/system/cache" element={<DashboardLayout><DistributedCachePage /></DashboardLayout>} />
          <Route path="/system/queue" element={<DashboardLayout><QueueSystemPage /></DashboardLayout>} />
          <Route path="/system/microservices" element={<DashboardLayout><MicroservicesPage /></DashboardLayout>} />
          <Route path="/system/i18n" element={<DashboardLayout><InternationalizationPage /></DashboardLayout>} />
          <Route path="/system/config" element={<DashboardLayout><ConfiguracoesPage /></DashboardLayout>} />
          <Route path="/system/notificacoes" element={<DashboardLayout><NotificacoesPage /></DashboardLayout>} />
          <Route path="/system/agendamentos" element={<DashboardLayout><AgendamentosPage /></DashboardLayout>} />
          <Route path="/system/financial" element={<DashboardLayout><FinancialPage /></DashboardLayout>} />
          <Route path="/system/techcare" element={<DashboardLayout><TechCareAutomatorPage /></DashboardLayout>} />
          
          {/* AI Routes */}
          <Route path="/ai/sentiment" element={<DashboardLayout><SentimentAnalysisPage /></DashboardLayout>} />
          <Route path="/ai/content" element={<DashboardLayout><ContentGeneratorPage /></DashboardLayout>} />
          <Route path="/ai/forecast" element={<DashboardLayout><SalesForecastPage /></DashboardLayout>} />
          <Route path="/ai/analytics" element={<DashboardLayout><CampaignAnalyticsPage /></DashboardLayout>} />
          <Route path="/ai/recommendations" element={<DashboardLayout><ProductRecommendationsPage /></DashboardLayout>} />
          <Route path="/ai/techcare" element={<DashboardLayout><TechCareAIPage /></DashboardLayout>} />
          <Route path="/ai/consultant" element={<DashboardLayout><TechCareConsultantPage /></DashboardLayout>} />
          
          {/* Gateway Routes */}
          <Route path="/gateway" element={<DashboardLayout><GatewayPage /></DashboardLayout>} />
          <Route path="/gateway/integrations" element={<DashboardLayout><GatewayIntegrationsPage /></DashboardLayout>} />
          
          {/* Store Routes */}
          <Route path="/store/produtos" element={<DashboardLayout><ProdutosPage /></DashboardLayout>} />
          <Route path="/store/clientes" element={<DashboardLayout><ClientesPage /></DashboardLayout>} />
          <Route path="/store/vendas" element={<DashboardLayout><VendasPage /></DashboardLayout>} />
          <Route path="/store/categorias" element={<DashboardLayout><CategoriasPage /></DashboardLayout>} />
          <Route path="/store/catalogo" element={<DashboardLayout><CatalogoProdutosPage /></DashboardLayout>} />
          <Route path="/store/payment" element={<DashboardLayout><PaymentTestPage /></DashboardLayout>} />
          <Route path="/store/stripe" element={<DashboardLayout><StripeIntegrationPage /></DashboardLayout>} />
          
          {/* Developer Routes */}
          <Route path="/developer/api" element={<DashboardLayout><ApiDocPage /></DashboardLayout>} />
          <Route path="/developer/webhooks" element={<DashboardLayout><WebhooksPage /></DashboardLayout>} />
          <Route path="/developer/plugins" element={<DashboardLayout><PluginsPage /></DashboardLayout>} />
          <Route path="/developer/migration" element={<DashboardLayout><DataMigrationPage /></DashboardLayout>} />
          <Route path="/developer/documentation" element={<DashboardLayout><ApiDocumentationPage /></DashboardLayout>} />
          
          {/* Landing Pages */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/landing/segments" element={<LandingSegmentsPage />} />
          <Route path="/landing/beauty" element={<BeautyLandingPage />} />
          <Route path="/landing/food" element={<FoodLandingPage />} />
          <Route path="/landing/freelancer" element={<FreelancerLandingPage />} />
          <Route path="/landing/ecommerce" element={<EcommerceLandingPage />} />
          <Route path="/landing/content-creator" element={<ContentCreatorLandingPage />} />
          <Route path="/landing/education" element={<EducationLandingPage />} />
          <Route path="/landing/hr" element={<HRLandingPage />} />
          <Route path="/landing/accounting" element={<AccountingLandingPage />} />
          
          {/* Content Routes */}
          <Route path="/content/assistant" element={<DashboardLayout><ContentAssistantPage /></DashboardLayout>} />
          
          {/* Automation Routes */}
          <Route path="/automation" element={<DashboardLayout><AutomationPage /></DashboardLayout>} />
          
          {/* Reports Routes */}
          <Route path="/reports" element={<DashboardLayout><ReportsPage /></DashboardLayout>} />
          <Route path="/reports/custom" element={<DashboardLayout><CustomReportsPage /></DashboardLayout>} />
          <Route path="/reports/conversions" element={<DashboardLayout><ConversionsReportPage /></DashboardLayout>} />
          <Route path="/reports/social" element={<DashboardLayout><SocialMediaPerformancePage /></DashboardLayout>} />
          <Route path="/reports/advanced" element={<DashboardLayout><AdvancedAnalyticsPage /></DashboardLayout>} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Other Routes */}
          <Route path="/plans" element={<PricingPage />} />
          <Route path="/channels" element={<DashboardLayout><ChannelsPage /></DashboardLayout>} />
          <Route path="/funnel" element={<DashboardLayout><FunilVendasPage /></DashboardLayout>} />
          <Route path="/marketplace" element={<DashboardLayout><MarketplacePage /></DashboardLayout>} />
          <Route path="/templates" element={<DashboardLayout><TemplatesPage /></DashboardLayout>} />
          <Route path="/tickets" element={<DashboardLayout><TicketsPage /></DashboardLayout>} />
          <Route path="/security/mfa" element={<DashboardLayout><MfaSetupPage /></DashboardLayout>} />
          <Route path="/security/audit" element={<DashboardLayout><SecurityAuditPage /></DashboardLayout>} />
          <Route path="/compliance" element={<DashboardLayout><CompliancePage /></DashboardLayout>} />
          <Route path="/salesbot" element={<DashboardLayout><SalesBotPage /></DashboardLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
