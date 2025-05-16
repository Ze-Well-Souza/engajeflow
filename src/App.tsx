
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
import GatewayIntegrationsPage from "@/pages/gateway/GatewayIntegrationsPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import SocialMediaPerformancePage from "@/pages/reports/SocialMediaPerformancePage";
import ConversionsReportPage from "@/pages/reports/ConversionsReportPage";
import CustomReportsPage from "@/pages/reports/CustomReportsPage";
import TicketsPage from "@/pages/tickets/TicketsPage";
// Store pages
import VendasPage from "@/pages/store/VendasPage";
import ProdutosPage from "@/pages/store/ProdutosPage";
import CatalogoProdutosPage from "@/pages/store/CatalogoProdutosPage";
import CategoriasPage from "@/pages/store/CategoriasPage";
import ClientesPage from "@/pages/store/ClientesPage";
// System pages
import NotificacoesPage from "@/pages/system/NotificacoesPage";
import AgendamentosPage from "@/pages/system/AgendamentosPage";
import ConfiguracoesPage from "@/pages/system/ConfiguracoesPage";
// Admin pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminClientsPage from "@/pages/admin/ClientsPage";
import PermissionsPage from "@/pages/admin/PermissionsPage";
import ActivityLogsPage from "@/pages/admin/ActivityLogsPage";
// Sales Funnel pages
import FunilVendasPage from "@/pages/funnel/FunilVendasPage";

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
            <Route path="gateway/integracoes" element={<GatewayIntegrationsPage />} />
            <Route path="relatorios" element={<ReportsPage />} />
            <Route path="relatorios/social" element={<SocialMediaPerformancePage />} />
            <Route path="relatorios/conversoes" element={<ConversionsReportPage />} />
            <Route path="relatorios/personalizados" element={<CustomReportsPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="funil-vendas" element={<FunilVendasPage />} />
            
            {/* Loja Routes */}
            <Route path="vendas" element={<VendasPage />} />
            <Route path="produtos" element={<ProdutosPage />} />
            <Route path="catalogo-produtos" element={<CatalogoProdutosPage />} />
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            
            {/* Sistema Routes */}
            <Route path="notificacoes" element={<NotificacoesPage />} />
            <Route path="agendamentos" element={<AgendamentosPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/clientes" element={<AdminClientsPage />} />
            <Route path="admin/permissoes" element={<PermissionsPage />} />
            <Route path="admin/logs" element={<ActivityLogsPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
