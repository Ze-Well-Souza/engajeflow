
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from "./pages/Index";
import GatewayPage from "./pages/gateway/GatewayPage";
import GatewayIntegrationsPage from "./pages/gateway/GatewayIntegrationsPage";
import VendasPage from "./pages/store/VendasPage";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import LoginPage from "./pages/auth/LoginPage";
import StripeIntegrationPage from "./pages/store/StripeIntegrationPage";
import PaymentTestPage from "./pages/store/PaymentTestPage";

function App() {
  return (
    <LocalizationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Gateway Routes */}
          <Route path="/gateway" element={<GatewayPage />} />
          <Route path="/gateway/integrations" element={<GatewayIntegrationsPage />} />
          
          {/* Store Routes */}
          <Route path="/store/vendas" element={<VendasPage />} />
          <Route path="/store/stripe-integration" element={<StripeIntegrationPage />} />
          <Route path="/store/payment-test" element={<PaymentTestPage />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
