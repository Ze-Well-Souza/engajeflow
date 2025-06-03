-- Migration: 20250522_02_automation_tables.sql
-- Descrição: Adiciona tabelas para automações e tarefas

-- Tabela de tarefas de automação
CREATE TABLE IF NOT EXISTS public.automation_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    task_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    parameters JSONB DEFAULT '{}',
    result JSONB DEFAULT '{}',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    executed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    CONSTRAINT automation_tasks_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled'))
);

-- Índices para tarefas de automação
CREATE INDEX IF NOT EXISTS idx_automation_tasks_client_id ON public.automation_tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_automation_tasks_user_id ON public.automation_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_tasks_status ON public.automation_tasks(status);
CREATE INDEX IF NOT EXISTS idx_automation_tasks_scheduled_for ON public.automation_tasks(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_automation_tasks_task_type ON public.automation_tasks(task_type);

-- Tabela de templates de automação
CREATE TABLE IF NOT EXISTS public.automation_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    task_type VARCHAR(50) NOT NULL,
    parameters JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para templates de automação
CREATE INDEX IF NOT EXISTS idx_automation_templates_client_id ON public.automation_templates(client_id);
CREATE INDEX IF NOT EXISTS idx_automation_templates_task_type ON public.automation_templates(task_type);
CREATE INDEX IF NOT EXISTS idx_automation_templates_is_active ON public.automation_templates(is_active);

-- Trigger para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas
CREATE TRIGGER set_updated_at_automation_tasks
BEFORE UPDATE ON public.automation_tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_automation_templates
BEFORE UPDATE ON public.automation_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS para tarefas de automação
ALTER TABLE public.automation_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas tarefas de seus clientes"
ON public.automation_tasks FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = automation_tasks.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem criar tarefas para seus clientes"
ON public.automation_tasks FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = automation_tasks.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem atualizar tarefas de seus clientes"
ON public.automation_tasks FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = automation_tasks.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Políticas RLS para templates de automação
ALTER TABLE public.automation_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas templates de seus clientes"
ON public.automation_templates FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = automation_templates.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem criar templates para seus clientes"
ON public.automation_templates FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = automation_templates.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem atualizar templates de seus clientes"
ON public.automation_templates FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = automation_templates.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);
