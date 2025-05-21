
import React from "react";
import { Route } from "react-router-dom";
import RouteGroup from "./RouteGroup";

// Authentication Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

const AuthRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </RouteGroup>
  );
};

export default AuthRoutes;
