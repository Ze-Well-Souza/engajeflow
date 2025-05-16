
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando verificação de autenticação
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("techcare_user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulating API call
    try {
      // Simulando login bem-sucedido
      const user = { id: "1", email, name: "Usuário Demo" };
      setCurrentUser(user);
      localStorage.setItem("techcare_user", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = async () => {
    // Simulating API call
    try {
      setCurrentUser(null);
      localStorage.removeItem("techcare_user");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulating API call
    try {
      // Simulando registro bem-sucedido
      const user = { id: "1", email, name };
      setCurrentUser(user);
      localStorage.setItem("techcare_user", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
