
import { supabase } from "./client";

export const createAdminUserIfNotExists = async () => {
  try {
    console.log("Verificando se usuários de teste já existem...");
    
    // Checar se o admin já existe pelo email diretamente na auth
    const { data: existingAdminAuth, error: adminAuthError } = await supabase.auth.admin.listUsers();
    
    if (adminAuthError) {
      console.error("Erro ao verificar usuários existentes:", adminAuthError);
      // Continuar mesmo com erro para tentar criar os usuários
    }
    
    const adminExists = existingAdminAuth?.users?.some(user => 
      user.email === 'admin@techcare.com'
    );
    
    const userExists = existingAdminAuth?.users?.some(user => 
      user.email === 'user@test.com'
    );

    // Se ambos usuários existem, não fazer nada
    if (adminExists && userExists) {
      console.log("Usuários admin e teste já existem");
      return;
    }
    
    // Criar usuário admin se não existir
    if (!adminExists) {
      console.log("Tentando criar usuário admin...");
      const { data: adminData, error: adminError } = await supabase.auth.signUp({
        email: 'admin@techcare.com',
        password: 'senha123',
        options: {
          data: {
            full_name: 'Administrador TechCare',
          }
        }
      });
      
      if (adminError) {
        console.error("Erro ao criar usuário admin:", adminError);
      } else {
        console.log("Usuário admin criado com sucesso", adminData);
        
        // Definir usuário como admin
        if (adminData.user) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('id', adminData.user.id);
          
          if (updateError) {
            console.error("Erro ao atualizar perfil do admin:", updateError);
          }
        }
      }
    }
    
    // Criar usuário teste se não existir
    if (!userExists) {
      console.log("Tentando criar usuário de teste...");
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
      } else {
        console.log("Usuário teste criado com sucesso", userData);
      }
    }
    
  } catch (error) {
    console.error("Erro ao criar usuários para teste:", error);
  }
};
