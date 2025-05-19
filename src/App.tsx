import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from "./pages/Index";
import GatewayPage from "./pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "./pages/gateway/GatewayIntegrationsPage";
import VendasPage from "./pages/store/VendasPage";
import SchedulerPage from "./pages/automation/SchedulerPage";
import CommunicationPage from "./pages/automation/CommunicationPage";
import SocialMediaPage from "./pages/social/SocialMediaPage";
import ClientsPage from "./pages/clients/ClientsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import LoginPage from "./pages/auth/LoginPage";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import SocialMediaScheduler from "@/pages/social/SocialMediaScheduler";
import SocialMediaAnalytics from "@/pages/social/SocialMediaAnalytics";
import StripeIntegrationPage from "./pages/store/StripeIntegrationPage";

function App() {
  return (
    <LocalizationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Gateway Routes */}
          <Route path="/gateway" element={<GatewayPage />} />
          <Route path="/gateway/integrations" element={<GatewayIntegrationsPage />} />
          
          {/* Automation Routes */}
          <Route path="/automation/scheduler" element={<SchedulerPage />} />
          <Route path="/automation/communication" element={<CommunicationPage />} />
          
          {/* Social Media Routes */}
          <Route path="/social" element={<SocialMediaPage />} />
          <Route path="/social/scheduler" element={<SocialMediaScheduler />} />
          <Route path="/social/analytics" element={<SocialMediaAnalytics />} />
          
          {/* Clients Route */}
          <Route path="/clients" element={<ClientsPage />} />
          
          {/* Settings Route */}
          <Route path="/settings" element={<SettingsPage />} />

          {/* Store Routes */}
          <Route path="/store/vendas" element={<VendasPage />} />
          <Route path="/store/stripe-integration" element={<StripeIntegrationPage />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
