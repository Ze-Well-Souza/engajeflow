
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile } from "./useUserProfile";

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  // Definido como false para evitar o carregamento
  
  // Modo de bypass de autenticação - não usa o perfil real do usuário
  const currentUser = {
    id: "test-user-id",
    email: "test@techze.com",
    name: "Usuário de Teste",
    is_admin: true
  };

  // Desativando as chamadas ao Supabase
  useEffect(() => {
    console.log("Modo de bypass de autenticação ativado");
    // Não há chamadas ao Supabase neste modo
  }, []);

  return { currentUser, session, loading };
};
