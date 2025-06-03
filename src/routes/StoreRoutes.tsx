
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

// Store Pages
import ProdutosPage from "@/pages/store/ProdutosPage";
import ClientesPage from "@/pages/store/ClientesPage";
import VendasPage from "@/pages/store/VendasPage";
import CategoriasPage from "@/pages/store/CategoriasPage";
import CatalogoProdutosPage from "@/pages/store/CatalogoProdutosPage";
import PaymentTestPage from "@/pages/store/PaymentTestPage";
import StripeIntegrationPage from "@/pages/store/StripeIntegrationPage";

const StoreRoutes = (): RouteObject[] => {
  return [
    {
      path: "/store/produtos",
      element: <DashboardLayout><ProdutosPage /></DashboardLayout>
    },
    {
      path: "/store/clientes",
      element: <DashboardLayout><ClientesPage /></DashboardLayout>
    },
    {
      path: "/store/vendas",
      element: <DashboardLayout><VendasPage /></DashboardLayout>
    },
    {
      path: "/store/categorias",
      element: <DashboardLayout><CategoriasPage /></DashboardLayout>
    },
    {
      path: "/store/catalogo",
      element: <DashboardLayout><CatalogoProdutosPage /></DashboardLayout>
    },
    {
      path: "/store/payment",
      element: <DashboardLayout><PaymentTestPage /></DashboardLayout>
    },
    {
      path: "/store/stripe",
      element: <DashboardLayout><StripeIntegrationPage /></DashboardLayout>
    }
  ];
};

export default StoreRoutes;
