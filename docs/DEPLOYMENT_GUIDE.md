
# Guia de Deploy - TechCare Connect Automator

## Configuração para Produção

### 1. Variáveis de Ambiente Necessárias

Configure estas variáveis no Vercel ou em seu provedor de hosting:

```bash
# Supabase (Obrigatório)
VITE_SUPABASE_URL=https://pkefwvvkydzzfstzwppv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWZ3dnZreWR6emZzdHp3cHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDI2NzUsImV4cCI6MjA2MjkxODY3NX0.ACpmG9nW2riQTsNZznHviEMNCcRr1KlaXfMfFpq4ps4

# Google AI (Configurado)
GOOGLE_API_KEY=AIzaSyA5-poSVcry1lqivwoNazFbWr2n3Q_VFtE

# URL Base da Aplicação
VITE_TECHCARE_BASE_URL=https://your-app-domain.vercel.app
```

### 2. Configuração do Supabase

#### Autenticação:
1. Acesse: https://supabase.com/dashboard/project/pkefwvvkydzzfstzwppv/auth/providers
2. Configure Email/Password como habilitado
3. Desabilite "Confirm email" para testes mais rápidos
4. Configure URLs de redirecionamento:
   - Site URL: https://your-app-domain.vercel.app
   - Redirect URLs: https://your-app-domain.vercel.app/**

#### Usuários de Teste:
Execute no SQL Editor do Supabase:

```sql
-- Criar usuário admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@techcare.com',
  crypt('admin123', gen_salt('bf')),
  current_timestamp,
  current_timestamp,
  current_timestamp,
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Administrador TechCare"}',
  current_timestamp,
  current_timestamp,
  '',
  '',
  '',
  ''
);
```

### 3. Deploy no Vercel

#### Via CLI:
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Via GitHub:
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### 4. Pós-Deploy

#### Testes Obrigatórios:
- [ ] Login/Logout funcionando
- [ ] Criação de agendamentos
- [ ] Geração de conteúdo com IA
- [ ] Cadastro de novos usuários
- [ ] Navegação entre páginas

#### Monitoramento:
- [ ] Health checks em /api/health
- [ ] Logs de erro configurados
- [ ] Analytics funcionando

### 5. Funcionalidades Implementadas

✅ **Core:**
- Autenticação completa (login/register/logout)
- Dashboard administrativo
- Sistema de agendamentos de posts
- Integração com Google AI/Gemini
- Geração automática de conteúdo
- Análise de sentimento
- Tradução de textos

✅ **Interface:**
- Landing pages para todos os segmentos
- Dashboard responsivo
- Componentes reutilizáveis
- Sistema de temas
- Internacionalização

✅ **Backend:**
- Banco de dados Supabase configurado
- Row Level Security (RLS)
- Políticas de acesso
- Triggers automáticos

### 6. Próximos Passos (Pós-MVP)

- [ ] Integração com APIs de redes sociais
- [ ] Upload e processamento de mídia
- [ ] Sistema de pagamentos
- [ ] Webhooks para automação
- [ ] Push notifications
- [ ] Mobile app

### 7. Suporte

Para questões técnicas:
- Documentação: /docs
- Logs: Vercel Dashboard
- Banco: Supabase Dashboard
- IA: Google AI Studio

### 8. Credenciais de Acesso Pós-Deploy

**Admin:**
- Email: admin@techcare.com
- Senha: admin123

**URLs Importantes:**
- App: https://your-app-domain.vercel.app
- Admin: https://your-app-domain.vercel.app/admin
- Landing: https://your-app-domain.vercel.app/landing

O sistema está pronto para produção! 🚀
