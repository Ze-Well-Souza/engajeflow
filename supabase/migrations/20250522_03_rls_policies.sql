-- Migration: 20250522_03_rls_policies.sql
-- Descrição: Adiciona políticas de segurança (RLS) para tabelas existentes e ajustes de índices

-- Garantir que RLS está habilitado em todas as tabelas principais
ALTER TABLE IF EXISTS public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.social_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.social_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.media_edits ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para activity_logs
CREATE POLICY IF NOT EXISTS "Usuários podem ver apenas logs de seus clientes"
ON public.activity_logs FOR SELECT
USING (
  auth.uid() IN (
    SELECT cm.user_id FROM client_members cm
    JOIN clients c ON cm.client_id = c.id
    WHERE c.id IN (
      SELECT client_id FROM client_members WHERE user_email = activity_logs.user_email
    )
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Políticas RLS para social_media
CREATE POLICY IF NOT EXISTS "Usuários podem ver apenas mídias de seus clientes"
ON public.social_media FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = social_media.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY IF NOT EXISTS "Usuários podem criar mídias para seus clientes"
ON public.social_media FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = social_media.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY IF NOT EXISTS "Usuários podem atualizar mídias de seus clientes"
ON public.social_media FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = social_media.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Políticas RLS para scheduled_posts
CREATE POLICY IF NOT EXISTS "Usuários podem ver apenas posts de seus clientes"
ON public.scheduled_posts FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = scheduled_posts.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY IF NOT EXISTS "Usuários podem criar posts para seus clientes"
ON public.scheduled_posts FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = scheduled_posts.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY IF NOT EXISTS "Usuários podem atualizar posts de seus clientes"
ON public.scheduled_posts FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = scheduled_posts.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Índices adicionais para otimização de consultas frequentes
CREATE INDEX IF NOT EXISTS idx_client_members_client_user ON client_members(client_id, user_id);
CREATE INDEX IF NOT EXISTS idx_social_media_client_id ON social_media(client_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_client_id ON scheduled_posts(client_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_email ON activity_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);

-- Trigger para atualizar o campo updated_at automaticamente em tabelas existentes
-- Verificar se o trigger já existe
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_social_media') THEN
    CREATE TRIGGER set_updated_at_social_media
    BEFORE UPDATE ON public.social_media
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_scheduled_posts') THEN
    CREATE TRIGGER set_updated_at_scheduled_posts
    BEFORE UPDATE ON public.scheduled_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_social_integrations') THEN
    CREATE TRIGGER set_updated_at_social_integrations
    BEFORE UPDATE ON public.social_integrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
