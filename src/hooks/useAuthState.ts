
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile } from "./useUserProfile";

export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const currentUser = useUserProfile(session);

  useEffect(() => {
    console.log("Setting up auth state listeners");
    
    // Verificar sessão atual ao iniciar
    const checkSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Initial session check:", currentSession ? "Session exists" : "No session");
        setSession(currentSession);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    // Configurar listener para alterações no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, updatedSession) => {
        console.log("Auth state changed:", event, updatedSession ? "Session exists" : "No session");
        setSession(updatedSession);
      }
    );

    checkSession();

    return () => {
      console.log("Cleaning up auth state listeners");
      subscription.unsubscribe();
    };
  }, []);

  return { currentUser, session, loading };
};
