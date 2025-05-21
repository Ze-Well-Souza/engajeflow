
import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

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
        <MainRoutes />
        <AdminRoutes />
        <SystemRoutes />
        <AIRoutes />
        <GatewayRoutes />
        <StoreRoutes />
        <DeveloperRoutes />
        <LandingRoutes />
        <ContentRoutes />
        <AutomationRoutes />
        <ReportsRoutes />
        <AuthRoutes />
        <MiscRoutes />
      </Routes>
    </Router>
  );
}

export default App;
