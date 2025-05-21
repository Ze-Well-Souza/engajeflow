
import React from "react";
import { Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Store Pages
import ProdutosPage from "@/pages/store/ProdutosPage";
import ClientesPage from "@/pages/store/ClientesPage";
import VendasPage from "@/pages/store/VendasPage";
import CategoriasPage from "@/pages/store/CategoriasPage";
import CatalogoProdutosPage from "@/pages/store/CatalogoProdutosPage";
import PaymentTestPage from "@/pages/store/PaymentTestPage";
import StripeIntegrationPage from "@/pages/store/StripeIntegrationPage";

const StoreRoutes: React.FC = () => {
  return (
    <>
      <Route path="/store/produtos" element={<DashboardLayout><ProdutosPage /></DashboardLayout>} />
      <Route path="/store/clientes" element={<DashboardLayout><ClientesPage /></DashboardLayout>} />
      <Route path="/store/vendas" element={<DashboardLayout><VendasPage /></DashboardLayout>} />
      <Route path="/store/categorias" element={<DashboardLayout><CategoriasPage /></DashboardLayout>} />
      <Route path="/store/catalogo" element={<DashboardLayout><CatalogoProdutosPage /></DashboardLayout>} />
      <Route path="/store/payment" element={<DashboardLayout><PaymentTestPage /></DashboardLayout>} />
      <Route path="/store/stripe" element={<DashboardLayout><StripeIntegrationPage /></DashboardLayout>} />
    </>
  );
};

export default StoreRoutes;
