import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from "react-router-dom";

// Routes imports
import MainRoutes from "./routes/MainRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SystemRoutes from "./routes/SystemRoutes";
import AIRoutes from "./routes/AIRoutes";
import GatewayRoutes from "./routes/GatewayRoutes";
import StoreRoutes from "./routes/StoreRoutes";
import DeveloperRoutes from "./routes/DeveloperRoutes";
import LandingRoutes from "./routes/LandingRoutes";
import ContentRoutes from "./routes/ContentRoutes";
import AutomationRoutes from "./routes/AutomationRoutes";
import ReportsRoutes from "./routes/ReportsRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import MiscRoutes from "./routes/MiscRoutes";
import SocialRoutes from "./routes/SocialRoutes";

// Componente que renderiza todas as rotas
const AppRoutes = () => {
  // Combinamos todas as rotas em um único array
  const routes = [
    {
      path: "/",
      element: <Navigate to="/landing" replace />
    },
    ...AuthRoutes(),
    ...MainRoutes({}),
    ...AdminRoutes({}),
    ...SystemRoutes({}),
    ...AIRoutes({}),
    ...GatewayRoutes({}),
    ...StoreRoutes({}),
    ...DeveloperRoutes({}),
    ...LandingRoutes({}),
    ...ContentRoutes({}),
    ...AutomationRoutes({}),
    ...ReportsRoutes({}),
    ...MiscRoutes({}),
    ...SocialRoutes({})
  ];

  // Usamos o hook useRoutes para renderizar as rotas
  const routeElements = useRoutes(routes);
  return routeElements;
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
