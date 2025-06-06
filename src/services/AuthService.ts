
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  name?: string; // Adicionar campo name para compatibilidade
  avatarUrl?: string;
  isAdmin: boolean;
  is_admin?: boolean; // Adicionar para compatibilidade
  planType: string;
  subscriptionStatus: string;
}

export class AuthService {
  // Login com email e senha
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  }

  // Registro de novo usuário
  static async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    return data;
  }

  // Login com Google
  static async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    
    if (error) throw error;
    return data;
  }

  // Logout
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Reset de senha
  static async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) throw error;
    return data;
  }

  // Atualizar senha
  static async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    
    if (error) throw error;
    return data;
  }

  // Obter sessão atual
  static async getSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  // Obter usuário atual
  static async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  // Obter perfil completo do usuário
  static async getUserProfile(userId: string): Promise<AuthUser | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    
    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      name: data.full_name, // Compatibilidade
      avatarUrl: data.avatar_url,
      isAdmin: data.is_admin,
      is_admin: data.is_admin, // Compatibilidade
      planType: data.plan_type,
      subscriptionStatus: data.subscription_status,
    };
  }

  // Atualizar perfil do usuário
  static async updateProfile(userId: string, updates: Partial<AuthUser>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.fullName || updates.name,
        avatar_url: updates.avatarUrl,
        display_name: updates.fullName || updates.name,
      })
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  }
}
