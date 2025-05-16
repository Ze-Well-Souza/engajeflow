
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  is_admin?: boolean;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  session: Session | null;
  loading: boolean;
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
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up auth state listener
  useEffect(() => {
    // Set up listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        
        if (session?.user) {
          const { id, email } = session.user;
          
          // Criar um perfil básico do usuario
          const userProfile: UserProfile = {
            id,
            email: email || "",
          };
          
          // Buscar informações adicionais do perfil
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", id)
                .single();
                
              if (error) {
                console.error("Error fetching user profile:", error);
              } else if (data) {
                setCurrentUser({
                  ...userProfile,
                  name: data.full_name,
                  is_admin: data.is_admin
                });
              } else {
                setCurrentUser(userProfile);
              }
            } catch (error) {
              console.error("Error processing profile data:", error);
              setCurrentUser(userProfile);
            }
          }, 0);
        } else {
          setCurrentUser(null);
        }
      }
    );

    // Verificar sessão atual ao iniciar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        const { id, email } = session.user;
        
        // Criar um perfil básico do usuario
        const userProfile: UserProfile = {
          id,
          email: email || "",
        };
        
        // Buscar informações adicionais do perfil
        supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error fetching user profile:", error);
              setCurrentUser(userProfile);
            } else if (data) {
              setCurrentUser({
                ...userProfile,
                name: data.full_name,
                is_admin: data.is_admin
              });
            } else {
              setCurrentUser(userProfile);
            }
            setLoading(false);
          });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
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
      toast.error("Falha no login. Verifique suas credenciais.");
      throw error;
    }
  };

  const logout = async () => {
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

  const register = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
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
      
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Falha no registro. Tente novamente.");
      throw error;
    }
  };

  const value = {
    currentUser,
    session,
    loading,
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
