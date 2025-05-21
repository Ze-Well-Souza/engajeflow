
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";

// Garantir que este hook seja chamado somente dentro de componentes React
export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Modo de bypass de autenticação - não usa o perfil real do usuário
  const [currentUser] = useState({
    id: "test-user-id",
    email: "test@techze.com",
    name: "Usuário de Teste",
    is_admin: true
  });

  // Simulação de estado para garantir compatibilidade com React
  useEffect(() => {
    console.log("Modo de bypass de autenticação ativado");
    // Não há chamadas ao Supabase neste modo
  }, []);

  return { currentUser, session, loading };
};
