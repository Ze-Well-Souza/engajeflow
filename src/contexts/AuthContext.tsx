
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { AuthContextType } from "@/types/auth";
import { toast } from "sonner";

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para uso do contexto
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

// Provider do contexto de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { currentUser, session, loading } = useAuthState();
  const { login, logout, register } = useAuthMethods();

  // Log para debugging
  useEffect(() => {
    console.log("AuthProvider state:", { currentUser, session, loading });
  }, [currentUser, session, loading]);

  // Garantir que as assinaturas dos métodos correspondam às esperadas no tipo AuthContextType
  const loginWrapper = async (email: string, password: string): Promise<void> => {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error in AuthProvider:", error);
      throw error;
    }
  };

  const registerWrapper = async (email: string, password: string, name: string): Promise<void> => {
    try {
      await register(email, password, name);
    } catch (error) {
      console.error("Register error in AuthProvider:", error);
      throw error;
    }
  };

  // Criar um usuário simulado para o modo de teste
  const mockUser = {
    id: "test-user-id",
    email: "test@techze.com",
    name: "Usuário de Teste",
    is_admin: true
  };

  // Valor do contexto
  const value: AuthContextType = {
    // Sempre fornecer um usuário simulado em vez do currentUser real
    currentUser: mockUser,
    session: session,
    loading: false, // Definido como false para evitar o estado de carregamento
    login: loginWrapper,
    logout,
    register: registerWrapper,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
