
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, AuthContextType } from "@/types/auth";
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
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Modo de demonstração ativado
  const [demoMode] = useState<boolean>(true);

  useEffect(() => {
    console.log('[AuthContext] Inicializando...');
    
    // Se o modo de demonstração estiver ativado, criamos um usuário fictício
    if (demoMode) {
      const mockUser: UserProfile = {
        id: "demo-user-id",
        email: "demo@example.com",
        name: "Usuário Demonstração",
        is_admin: true
      };
      
      setCurrentUser(mockUser);
      setLoading(false);
      console.log('[AuthContext] Modo demo ativado');
      return;
    }
    
    // Configurar o listener de mudança de estado (apenas quando não estiver em modo demo)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthContext] Auth state change:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Se o usuário estiver logado, carregamos o perfil
        if (session?.user) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (data) {
              setCurrentUser({
                id: session.user.id,
                email: session.user.email || "",
                name: data.full_name,
                is_admin: data.is_admin || false
              });
            } else {
              setCurrentUser({
                id: session.user.id,
                email: session.user.email || ""
              });
            }
          } catch (error) {
            console.error("Erro ao carregar perfil:", error);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );

    // Verificar se há uma sessão ativa
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        // Se o usuário estiver logado, carregamos o perfil
        if (session?.user) {
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
              
            if (data) {
              setCurrentUser({
                id: session.user.id,
                email: session.user.email || "",
                name: data.full_name,
                is_admin: data.is_admin || false
              });
            } else {
              setCurrentUser({
                id: session.user.id,
                email: session.user.email || ""
              });
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

    if (!demoMode) {
      initializeAuth();
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [demoMode]);

  const login = async (email: string, password: string): Promise<void> => {
    // No modo de demonstração, simulamos um login bem-sucedido
    if (demoMode) {
      const mockUser: UserProfile = {
        id: "demo-user-id",
        email: email || "demo@example.com",
        name: "Usuário Demonstração",
        is_admin: true
      };
      
      setCurrentUser(mockUser);
      toast.success("Login realizado com sucesso no modo de demonstração!");
      return;
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro ao fazer login:", error);
        toast.error("Erro ao fazer login: " + error.message);
        throw error;
      }
      
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    // No modo de demonstração, simulamos um logout
    if (demoMode) {
      // Não removemos o usuário no modo demo para manter a navegação
      toast.success("Logout simulado no modo de demonstração!");
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout:", error);
        toast.error("Erro ao fazer logout: " + error.message);
        throw error;
      }
      
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Falha no logout.");
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    // No modo de demonstração, simulamos um registro bem-sucedido
    if (demoMode) {
      toast.success("Conta criada com sucesso no modo de demonstração!");
      return;
    }
    
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
    // No modo de demonstração, simulamos uma redefinição de senha
    if (demoMode) {
      toast.success("Email de redefinição de senha enviado no modo de demonstração!");
      return;
    }
    
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
    // No modo de demonstração, simulamos uma atualização de senha
    if (demoMode) {
      toast.success("Senha atualizada com sucesso no modo de demonstração!");
      return;
    }
    
    try {
      // Se um token for fornecido, usamos para definir a senha após redefinição
      if (token) {
        // Esta função não existe diretamente na API do Supabase - ajustamos para usar o fluxo correto
        console.error("Fluxo de redefinição via token precisa ser implementado com as funções apropriadas");
        toast.error("Função não implementada");
        return;
      }
      
      // Atualizar senha quando o usuário já está logado
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

  // Valor do contexto
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
