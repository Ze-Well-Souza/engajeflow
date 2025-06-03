
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";

// Pages
import InitialPage from "@/pages/InitialPage";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/components/dashboard/Dashboard";
import AgendamentosContent from "@/components/agendamentos/AgendamentosContent";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Content Pages
import ContentPage from "@/pages/content/ContentPage";
import AutomationPage from "@/pages/automation/AutomationPage";
import ReportsPage from "@/pages/reports/ReportsPage";

// System Pages
import MicroservicesPage from "@/pages/system/MicroservicesPage";
import AdminPage from "@/pages/admin/AdminDashboardPage";
import AdminConfigPage from "@/pages/admin/AdminConfigPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";

// WhatsApp Components
import WhatsAppQRConnector from "@/components/whatsapp/WhatsAppQRConnector";

// Landing Pages
import LandingPage from "@/pages/landing/LandingPage";
import BeautyLandingPage from "@/pages/landing/BeautyLandingPage";
import RealEstateLandingPage from "@/pages/landing/RealEstateLandingPage";
import FreelancerLandingPage from "@/pages/landing/FreelancerLandingPage";
import FoodLandingPage from "@/pages/landing/FoodLandingPage";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/welcome" replace />;
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
    return <Navigate to="/dashboard" replace />;
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
                {/* Initial Welcome Route */}
                <Route path="/welcome" element={<InitialPage />} />
                <Route path="/" element={<Navigate to="/welcome" replace />} />

                {/* Public Landing Pages */}
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/beauty" element={<BeautyLandingPage />} />
                <Route path="/restaurant" element={<FoodLandingPage />} />
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

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
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
                
                <Route path="/content" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ContentPage />
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
                
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AdminPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />

                <Route path="/admin/config" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AdminConfigPage />
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
                
                <Route path="/system/microservices" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MicroservicesPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />

                {/* WhatsApp QR Integration Route */}
                <Route path="/whatsapp/connect" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <WhatsAppQRConnector />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />

                {/* Fallback for any other routes */}
                <Route path="*" element={<Navigate to="/welcome" replace />} />
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
