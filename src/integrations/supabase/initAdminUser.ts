
import { supabase } from "./client";

export const createAdminUserIfNotExists = async () => {
  try {
    console.log("Verificando se usuários de teste já existem...");
    
    // Credenciais dos usuários de teste
    const adminEmail = 'admin@techcare.com';
    const userEmail = 'user@test.com';
    const testPassword = 'senha123';
    
    // Primeiro, verificar se os usuários já existem via autenticação
    const { data: adminExists, error: adminCheckError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: testPassword,
    });
    
    if (adminCheckError) {
      console.log("Usuário admin não encontrado, criando...");
      
      // Criar usuário admin
      const { data: adminData, error: adminCreateError } = await supabase.auth.signUp({
        email: adminEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Administrador TechCare',
            is_admin: true
          }
        }
      });
      
      if (adminCreateError) {
        console.error("Erro ao criar usuário admin:", adminCreateError);
      } else {
        console.log("Usuário admin criado com sucesso:", adminData?.user?.id);
        
        // Definir usuário como admin na tabela profiles
        if (adminData?.user) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('id', adminData.user.id);
          
          if (updateError) {
            console.error("Erro ao atualizar perfil do admin:", updateError);
          } else {
            console.log("Perfil do admin atualizado com sucesso");
          }
        }
      }
    } else {
      console.log("Usuário admin já existe");
      // Fazer logout após checagem
      await supabase.auth.signOut();
    }
    
    // Verificar usuário normal
    const { data: userExists, error: userCheckError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: testPassword,
    });
    
    if (userCheckError) {
      console.log("Usuário de teste não encontrado, criando...");
      
      // Criar usuário comum
      const { data: userData, error: userCreateError } = await supabase.auth.signUp({
        email: userEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Usuário Teste',
          }
        }
      });
      
      if (userCreateError) {
        console.error("Erro ao criar usuário teste:", userCreateError);
      } else {
        console.log("Usuário teste criado com sucesso:", userData?.user?.id);
      }
    } else {
      console.log("Usuário teste já existe");
      // Fazer logout após checagem
      await supabase.auth.signOut();
    }
    
  } catch (error) {
    console.error("Erro ao criar usuários para teste:", error);
  }
};
