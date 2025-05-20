
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from "./pages/Index";
import GatewayPage from "./pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "./pages/gateway/GatewayIntegrationsPage";
import VendasPage from "./pages/store/VendasPage";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import StripeIntegrationPage from "./pages/store/StripeIntegrationPage";
import PaymentTestPage from "./pages/store/PaymentTestPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import SocialMediaPerformancePage from "./pages/reports/SocialMediaPerformancePage";
import AgendamentosPage from "./pages/AgendamentosPage";
import RatingsPage from "./pages/RatingsPage";
import { Toaster as SonnerToaster } from "sonner";

function App() {
  return (
    <LocalizationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Gateway Routes */}
          <Route path="/gateway" element={<GatewayPage />} />
          <Route path="/gateway/integrations" element={<GatewayIntegrationsPage />} />
          
          {/* Store Routes */}
          <Route path="/store/vendas" element={<VendasPage />} />
          <Route path="/store/stripe-integration" element={<StripeIntegrationPage />} />
          <Route path="/store/payment-test" element={<PaymentTestPage />} />

          {/* Reports Routes */}
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/reports/social-media" element={<SocialMediaPerformancePage />} />
          
          {/* Agendamentos & Ratings Routes */}
          <Route path="/agendamentos" element={<AgendamentosPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
        </Routes>
        
        <SonnerToaster />
      </Router>
    </LocalizationProvider>
  );
}

export default App;
