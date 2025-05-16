
import React, { createContext, useContext, ReactNode } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { currentUser, session, loading } = useAuthState();
  const { login, logout, register } = useAuthMethods();

  // Garantir que as assinaturas dos métodos correspondam às esperadas no tipo AuthContextType
  const loginWrapper = async (email: string, password: string): Promise<void> => {
    await login(email, password);
  };

  const registerWrapper = async (email: string, password: string, name: string): Promise<void> => {
    await register(email, password, name);
  };

  const value: AuthContextType = {
    currentUser,
    session,
    loading,
    login: loginWrapper,
    logout,
    register: registerWrapper,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
