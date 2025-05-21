
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        {/* Usando o elemento Fragment para envolver os componentes de rotas */}
        <Route>
          {/* Usando o elemento como função para renderizar as rotas aninhadas */}
          <Route>{MainRoutes()}</Route>
          <Route>{AdminRoutes()}</Route>
          <Route>{SystemRoutes()}</Route>
          <Route>{AIRoutes()}</Route>
          <Route>{GatewayRoutes()}</Route>
          <Route>{StoreRoutes()}</Route>
          <Route>{DeveloperRoutes()}</Route>
          <Route>{LandingRoutes()}</Route>
          <Route>{ContentRoutes()}</Route>
          <Route>{AutomationRoutes()}</Route>
          <Route>{ReportsRoutes()}</Route>
          <Route>{AuthRoutes()}</Route>
          <Route>{MiscRoutes()}</Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
