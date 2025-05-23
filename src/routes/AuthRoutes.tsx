import React from "react";
import { Route, RouteObject } from "react-router-dom";

// Authentication Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

const AuthRoutes = (): RouteObject[] => {
  return [
    {
      path: "/auth/login",
      element: <LoginPage />
    },
    {
      path: "/auth/register",
      element: <RegisterPage />
    },
    {
      path: "/auth/forgot-password",
      element: <ForgotPasswordPage />
    },
    {
      path: "/auth/reset-password",
      element: <ResetPasswordPage />
    }
  ];
};

export default AuthRoutes;
