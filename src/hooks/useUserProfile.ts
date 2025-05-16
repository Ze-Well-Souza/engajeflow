
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";

export const useUserProfile = (session: Session | null) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!session?.user) {
      console.log("No session user, resetting profile to null");
      setUserProfile(null);
      return;
    }
    
    const { id, email } = session.user;
    console.log("Fetching profile for user:", id, email);
    
    // Criar um perfil básico do usuário
    const basicProfile: UserProfile = {
      id,
      email: email || "",
    };
    
    // Buscar informações adicionais do perfil
    const fetchProfile = async () => {
      try {
        console.log("Querying profiles table for user:", id);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();
          
        if (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(basicProfile);
          return;
        }
        
        console.log("Profile data retrieved:", data);
        
        if (data) {
          setUserProfile({
            ...basicProfile,
            name: data.full_name,
            is_admin: data.is_admin || false
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
