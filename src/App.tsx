
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import GatewayPage from "./pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "./pages/gateway/GatewayIntegrationsPage";
import VendasPage from "./pages/store/VendasPage";
import ClientesPage from "./pages/store/ClientesPage";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
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

function App() {
  return (
    <LocalizationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/index" replace />} />
          
          {/* Landing Pages */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/landing/beauty" element={<BeautyLandingPage />} />
          <Route path="/landing/food" element={<FoodLandingPage />} />
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
            
            {/* System Routes */}
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Routes>
        
        <SonnerToaster />
      </Router>
    </LocalizationProvider>
  );
}

export default App;
