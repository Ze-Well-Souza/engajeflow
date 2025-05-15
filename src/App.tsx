
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import MessagesPage from "@/pages/MessagesPage";
import NotFound from "./pages/NotFound";
import ChannelsPage from "@/pages/channels/ChannelsPage";
import AutomationPage from "@/pages/automation/AutomationPage";
import SalesBotPage from "@/pages/salesbot/SalesBotPage";
import TemplatesPage from "@/pages/templates/TemplatesPage";
import GatewayPage from "@/pages/gateway/GatewayPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import TicketsPage from "@/pages/tickets/TicketsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="mensagens" element={<MessagesPage />} />
            <Route path="canais" element={<ChannelsPage />} />
            <Route path="automacao" element={<AutomationPage />} />
            <Route path="bot-vendas" element={<SalesBotPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="gateway" element={<GatewayPage />} />
            <Route path="relatorios" element={<ReportsPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
