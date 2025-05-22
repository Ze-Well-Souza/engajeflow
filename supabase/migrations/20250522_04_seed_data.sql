-- Migration: 20250522_04_seed_data.sql
-- Descrição: Adiciona dados iniciais para o sistema

-- Inserir planos básicos se não existirem
INSERT INTO public.plans (name, description, features, is_active)
SELECT 'Básico', 'Plano básico com funcionalidades essenciais', 
       '{"max_posts": 30, "max_media": 100, "max_users": 2, "features": ["scheduling", "basic_reports"]}', true
WHERE NOT EXISTS (SELECT 1 FROM public.plans WHERE name = 'Básico');

INSERT INTO public.plans (name, description, features, is_active)
SELECT 'Profissional', 'Plano intermediário com recursos avançados', 
       '{"max_posts": 100, "max_media": 500, "max_users": 5, "features": ["scheduling", "advanced_reports", "automation"]}', true
WHERE NOT EXISTS (SELECT 1 FROM public.plans WHERE name = 'Profissional');

INSERT INTO public.plans (name, description, features, is_active)
SELECT 'Empresarial', 'Plano completo para grandes empresas', 
       '{"max_posts": 500, "max_media": 2000, "max_users": 20, "features": ["scheduling", "advanced_reports", "automation", "api_access", "white_label"]}', true
WHERE NOT EXISTS (SELECT 1 FROM public.plans WHERE name = 'Empresarial');

-- Inserir módulos do sistema se não existirem
INSERT INTO public.modules (id, name, description, is_active)
SELECT 'dashboard', 'Dashboard', 'Painel principal do sistema', true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE id = 'dashboard');

INSERT INTO public.modules (id, name, description, is_active)
SELECT 'automation', 'Automação', 'Módulo de automação de tarefas', true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE id = 'automation');

INSERT INTO public.modules (id, name, description, is_active)
SELECT 'reports', 'Relatórios', 'Geração e visualização de relatórios', true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE id = 'reports');

INSERT INTO public.modules (id, name, description, is_active)
SELECT 'media', 'Mídia', 'Gerenciamento de mídias sociais', true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE id = 'media');

INSERT INTO public.modules (id, name, description, is_active)
SELECT 'scheduling', 'Agendamento', 'Agendamento de publicações', true
WHERE NOT EXISTS (SELECT 1 FROM public.modules WHERE id = 'scheduling');

-- Inserir permissões básicas se não existirem
INSERT INTO public.permissions (action, description, module_id)
SELECT 'dashboard:view', 'Visualizar dashboard', 'dashboard'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'dashboard:view');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'reports:view', 'Visualizar relatórios', 'reports'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'reports:view');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'reports:create', 'Criar relatórios', 'reports'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'reports:create');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'media:view', 'Visualizar mídias', 'media'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'media:view');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'media:create', 'Criar mídias', 'media'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'media:create');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'media:edit', 'Editar mídias', 'media'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'media:edit');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'scheduling:view', 'Visualizar agendamentos', 'scheduling'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'scheduling:view');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'scheduling:create', 'Criar agendamentos', 'scheduling'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'scheduling:create');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'automation:view', 'Visualizar automações', 'automation'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'automation:view');

INSERT INTO public.permissions (action, description, module_id)
SELECT 'automation:create', 'Criar automações', 'automation'
WHERE NOT EXISTS (SELECT 1 FROM public.permissions WHERE action = 'automation:create');
