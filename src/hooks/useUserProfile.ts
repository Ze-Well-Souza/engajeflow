
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";

export const useUserProfile = (session: Session | null) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setUserProfile(null);
      return;
    }
    
    const { id, email } = session.user;
    
    // Criar um perfil básico do usuário
    const basicProfile: UserProfile = {
      id,
      email: email || "",
    };
    
    // Buscar informações adicionais do perfil
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .maybeSingle();
          
        if (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(basicProfile);
          return;
        }
        
        if (data) {
          setUserProfile({
            ...basicProfile,
            name: data.full_name,
            is_admin: data.is_admin
          });
        } else {
          setUserProfile(basicProfile);
        }
      } catch (error) {
        console.error("Error processing profile data:", error);
        setUserProfile(basicProfile);
      }
    };
    
    fetchProfile();
  }, [session]);

  return userProfile;
};
