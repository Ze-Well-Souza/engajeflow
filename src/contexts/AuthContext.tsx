
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { AuthContextType } from "@/types/auth";
import { toast } from "sonner";

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
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Carregando...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
