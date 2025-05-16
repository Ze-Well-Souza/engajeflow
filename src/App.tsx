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

// Adicione a importação da nova página
import ContentAssistantPage from "./pages/content/ContentAssistantPage";

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
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="store" element={<CatalogoProdutosPage />} />
          </Route>

          <Route path="/content-assistant" element={<ContentAssistantPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  return currentUser ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
