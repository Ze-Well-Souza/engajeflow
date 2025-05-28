import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";

// Pages
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/components/dashboard/Dashboard";
import AgendamentosContent from "@/components/agendamentos/AgendamentosContent";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Landing Pages
import LandingPage from "@/pages/LandingPage";
import BeautyLandingPage from "@/pages/segments/BeautyLandingPage";
import RestaurantLandingPage from "@/pages/segments/RestaurantLandingPage";
import RealEstateLandingPage from "@/pages/segments/RealEstateLandingPage";
import FreelancerLandingPage from "@/pages/segments/FreelancerLandingPage";

// Admin Pages
import AdminPage from "@/pages/admin/AdminPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";

// System Pages
import MicroservicesPage from "@/pages/system/MicroservicesPage";

// Other pages
import TeamsPage from "@/pages/TeamsPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import ContentHub from "@/pages/ContentHub";
import AutomationPage from "@/pages/AutomationPage";
import ReportsPage from "@/pages/ReportsPage";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

// Auth Route Component (redirect if already logged in)
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LocalizationProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/beauty" element={<BeautyLandingPage />} />
                <Route path="/restaurant" element={<RestaurantLandingPage />} />
                <Route path="/realestate" element={<RealEstateLandingPage />} />
                <Route path="/freelancer" element={<FreelancerLandingPage />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={
                  <AuthRoute>
                    <LoginPage />
                  </AuthRoute>
                } />
                <Route path="/auth/register" element={
                  <AuthRoute>
                    <RegisterPage />
                  </AuthRoute>
                } />
                <Route path="/auth/forgot-password" element={
                  <AuthRoute>
                    <ForgotPasswordPage />
                  </AuthRoute>
                } />
                <Route path="/auth/reset-password" element={
                  <AuthRoute>
                    <ResetPasswordPage />
                  </AuthRoute>
                } />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/agendamentos" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AgendamentosContent />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AdminPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/logs" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ActivityLogsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/teams" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <TeamsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/integrations" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <IntegrationsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/content" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ContentHub />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/automation" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AutomationPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ReportsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/system/microservices" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MicroservicesPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
