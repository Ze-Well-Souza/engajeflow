
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile } from "./useUserProfile";

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const currentUser = useUserProfile(session);

  useEffect(() => {
    // Configurar listener para alterações no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, updatedSession) => {
        console.log("Auth state changed:", event);
        setSession(updatedSession);
      }
    );

    // Verificar sessão atual ao iniciar
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { currentUser, session, loading };
};
