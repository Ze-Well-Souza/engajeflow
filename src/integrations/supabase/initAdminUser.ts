
import { supabase } from "./client";

export const createAdminUserIfNotExists = async () => {
  try {
    // Verificar se o usuário admin já existe
    const { data: existingUser, error: searchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@techcare.com')
      .single();
    
    if (searchError && searchError.code !== 'PGRST116') {
      console.error("Erro ao verificar usuário admin:", searchError);
      return;
    }
    
    // Se o usuário já existe, não fazer nada
    if (existingUser) {
      console.log("Usuário admin já existe");
      return;
    }
    
    // Criar usuário admin
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@techcare.com',
      password: 'senha123',
      options: {
        data: {
          full_name: 'Administrador TechCare',
        }
      }
    });
    
    if (authError) {
      console.error("Erro ao criar usuário admin:", authError);
      return;
    }
    
    if (!authData.user) {
      console.error("Falha ao criar usuário admin: dados de usuário não retornados");
      return;
    }
    
    // Atualizar perfil para ser admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', authData.user.id);
    
    if (updateError) {
      console.error("Erro ao atualizar perfil do admin:", updateError);
      return;
    }
    
    console.log("Usuário admin criado com sucesso");
    
    // Criar também um usuário comum para teste
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: 'user@test.com',
      password: 'senha123',
      options: {
        data: {
          full_name: 'Usuário Teste',
        }
      }
    });
    
    if (userError) {
      console.error("Erro ao criar usuário teste:", userError);
      return;
    }
    
    console.log("Usuário teste criado com sucesso");
    
  } catch (error) {
    console.error("Erro ao criar usuários para teste:", error);
  }
};
