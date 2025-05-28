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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('[AuthContext] Inicializando autenticação real...');
    
    // Configurar o listener de mudança de estado
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
              setCurrentUser({
                id: session.user.id,
                email: session.user.email || "",
                name: data.full_name,
                is_admin: data.role === 'admin'
              });
            } else {
              // Criar perfil se não existir
              const { error: insertError } = await supabase
                .from("profiles")
                .insert({
                  id: session.user.id,
                  email: session.user.email,
                  full_name: session.user.user_metadata?.full_name || session.user.email,
                  role: 'user'
                });

              if (!insertError) {
                setCurrentUser({
                  id: session.user.id,
                  email: session.user.email || "",
                  name: session.user.user_metadata?.full_name || session.user.email,
                  is_admin: false
                });
              }
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
                is_admin: data.role === 'admin'
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

    initializeAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
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
