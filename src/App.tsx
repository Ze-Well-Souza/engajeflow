
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
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
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

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
