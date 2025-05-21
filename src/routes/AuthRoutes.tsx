
import React from "react";
import { Route } from "react-router-dom";

// Authentication Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

const AuthRoutes: React.FC = () => {
  return (
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </>
  );
};

export default AuthRoutes;
