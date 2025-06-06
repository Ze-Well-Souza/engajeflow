import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import AIPage from "./pages/AIPage";
import SocialConnectPage from "./pages/SocialConnectPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            } />
            
            <Route path="/ai" element={
              <DashboardLayout>
                <AIPage />
              </DashboardLayout>
            } />
            
            <Route path="/social" element={
              <DashboardLayout>
                <SocialConnectPage />
              </DashboardLayout>
            } />
            
            <Route path="/agendamentos" element={
              <DashboardLayout>
                <AgendamentosPage />
              </DashboardLayout>
            } />
            
            <Route path="/messages" element={
              <DashboardLayout>
                <MessagesPage />
              </DashboardLayout>
            } />
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
