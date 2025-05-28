
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, AuthContextType } from "@/types/auth";
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

// Usuários de teste para demonstração
const TEST_USERS = {
  'admin@techcare.com': {
    password: 'admin123',
    profile: {
      id: 'admin-test-id',
      email: 'admin@techcare.com',
      name: 'Administrador Engajeflow',
      is_admin: true
    }
  },
  'user@teste.com': {
    password: 'user123',
    profile: {
      id: 'user-test-id',
      email: 'user@teste.com',
      name: 'Usuário Teste',
      is_admin: false
    }
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('[AuthContext] Inicializando autenticação...');
    
    // Verificar se existe uma sessão no localStorage
    const savedSession = localStorage.getItem('engajeflow_session');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        setCurrentUser(sessionData);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Erro ao recuperar sessão:', error);
        localStorage.removeItem('engajeflow_session');
      }
    }

    // Configurar o listener de mudança de estado do Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthContext] Auth state change:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (data) {
              const userProfile = {
                id: session.user.id,
                email: session.user.email || "",
                name: data.full_name,
                is_admin: data.is_admin || false
              };
              setCurrentUser(userProfile);
              localStorage.setItem('engajeflow_session', JSON.stringify(userProfile));
            }
          } catch (error) {
            console.error("Erro ao carregar perfil:", error);
          }
        } else {
          setCurrentUser(null);
          localStorage.removeItem('engajeflow_session');
        }
        setLoading(false);
      }
    );

    // Verificar se há uma sessão ativa no Supabase
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
              
            if (data) {
              const userProfile = {
                id: session.user.id,
                email: session.user.email || "",
                name: data.full_name,
                is_admin: data.is_admin || false
              };
              setCurrentUser(userProfile);
              localStorage.setItem('engajeflow_session', JSON.stringify(userProfile));
            }
          } catch (error) {
            console.error("Erro ao carregar perfil:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Verificar se é um usuário de teste
      const testUser = TEST_USERS[email as keyof typeof TEST_USERS];
      if (testUser && testUser.password === password) {
        setCurrentUser(testUser.profile);
        localStorage.setItem('engajeflow_session', JSON.stringify(testUser.profile));
        toast.success("Login realizado com sucesso!");
        return;
      }

      // Tentar login real com Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro ao fazer login:", error);
        toast.error("Credenciais inválidas. Tente com as contas de teste.");
        throw error;
      }
      
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Limpar sessão local
      localStorage.removeItem('engajeflow_session');
      setCurrentUser(null);
      setSession(null);
      setUser(null);

      // Tentar logout do Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error);
      }
      
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Falha no logout.");
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error("Erro ao registrar:", error);
        toast.error("Erro ao registrar: " + error.message);
        throw error;
      }
      
      toast.success("Conta criada com sucesso! Verifique seu email.");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Falha no registro. Tente novamente.");
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) {
        console.error("Erro ao solicitar redefinição de senha:", error);
        toast.error("Erro: " + error.message);
        throw error;
      }
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      throw error;
    }
  };

  const updatePassword = async (newPassword: string, token?: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error("Erro ao atualizar senha:", error);
        toast.error("Erro: " + error.message);
        throw error;
      }

      toast.success("Senha atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    currentUser,
    session,
    loading,
    login,
    logout,
    register,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
