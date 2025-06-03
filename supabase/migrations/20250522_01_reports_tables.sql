-- Migration: 20250522_01_reports_tables.sql
-- Descrição: Adiciona tabelas para relatórios e métricas

-- Tabela de relatórios
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    parameters JSONB DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    file_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT reports_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

-- Índices para relatórios
CREATE INDEX IF NOT EXISTS idx_reports_client_id ON public.reports(client_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at);

-- Tabela de métricas
CREATE TABLE IF NOT EXISTS public.metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL,
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    value NUMERIC NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para métricas
CREATE INDEX IF NOT EXISTS idx_metrics_client_id ON public.metrics(client_id);
CREATE INDEX IF NOT EXISTS idx_metrics_period ON public.metrics(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_metrics_type ON public.metrics(metric_type);

-- Políticas RLS para relatórios
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas relatórios de seus clientes"
ON public.reports FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = reports.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem criar relatórios para seus clientes"
ON public.reports FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = reports.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Usuários podem atualizar relatórios de seus clientes"
ON public.reports FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = reports.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

-- Políticas RLS para métricas
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver apenas métricas de seus clientes"
ON public.metrics FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_members WHERE client_id = metrics.client_id
  ) OR 
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);

CREATE POLICY "Apenas administradores podem inserir métricas"
ON public.metrics FOR INSERT
WITH CHECK (
  (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);
