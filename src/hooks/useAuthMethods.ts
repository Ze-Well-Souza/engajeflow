
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useAuthMethods = () => {
  const login = async (email: string, password: string) => {
    try {
      console.log("Tentando fazer login com:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro ao fazer login:", error);
        toast.error("Erro ao fazer login: " + error.message);
        throw error;
      }
      
      console.log("Login bem-sucedido:", data);
      toast.success("Login realizado com sucesso!");
      return data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
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
      console.log("Tentando registrar:", email, name);
      const { data, error } = await supabase.auth.signUp({
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
      
      console.log("Registro bem-sucedido:", data);
      toast.success("Conta criada com sucesso! Verifique seu email.");
      return data;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Falha no registro. Tente novamente.");
      throw error;
    }
  };

  return {
    login,
    logout,
    register,
  };
};
