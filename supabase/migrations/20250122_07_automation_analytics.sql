-- Migration: Automation and Analytics Tables
-- Created: 2025-01-22
-- Description: Tabelas para automação, analytics e sistema de notificações

-- ============================================================================
-- AUTOMATIONS TABLE
-- Sistema de workflows e automações
-- ============================================================================
CREATE TABLE IF NOT EXISTS automations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  
  -- Trigger configuration
  trigger_type text NOT NULL CHECK (trigger_type IN ('schedule', 'event', 'webhook', 'manual', 'ai_suggestion')),
  trigger_config jsonb NOT NULL DEFAULT '{}',
  
  -- Conditions and filters
  conditions jsonb DEFAULT '{}',
  filters jsonb DEFAULT '{}',
  
  -- Actions to execute
  actions jsonb NOT NULL DEFAULT '[]',
  
  -- Status and control
  is_active boolean DEFAULT true,
  is_paused boolean DEFAULT false,
  priority integer DEFAULT 0,
  
  -- Execution tracking
  last_run_at timestamptz,
  next_run_at timestamptz,
  run_count integer DEFAULT 0,
  success_count integer DEFAULT 0,
  error_count integer DEFAULT 0,
  
  -- Limits and quotas
  max_executions integer,
  daily_limit integer,
  monthly_limit integer,
  
  -- Metadata
  tags text[],
  category text,
  version integer DEFAULT 1,
  metadata jsonb DEFAULT '{}',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_automations_updated_at
  BEFORE UPDATE ON automations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_automations_user_id ON automations(user_id);
CREATE INDEX idx_automations_active ON automations(is_active);
CREATE INDEX idx_automations_trigger_type ON automations(trigger_type);
CREATE INDEX idx_automations_next_run ON automations(next_run_at);

-- ============================================================================
-- AUTOMATION LOGS TABLE
-- Logs de execução de automações
-- ============================================================================
CREATE TABLE IF NOT EXISTS automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id uuid REFERENCES automations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Execution details
  execution_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
  
  -- Timing
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  duration_ms integer,
  
  -- Results
  trigger_data jsonb DEFAULT '{}',
  actions_executed jsonb DEFAULT '[]',
  results jsonb DEFAULT '{}',
  
  -- Error handling
  error_message text,
  error_code text,
  error_details jsonb,
  retry_count integer DEFAULT 0,
  
  -- Context
  context jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_automation_logs_automation_id ON automation_logs(automation_id);
CREATE INDEX idx_automation_logs_user_id ON automation_logs(user_id);
CREATE INDEX idx_automation_logs_status ON automation_logs(status);
CREATE INDEX idx_automation_logs_started_at ON automation_logs(started_at DESC);

-- ============================================================================
-- POST METRICS TABLE
-- Métricas detalhadas de posts
-- ============================================================================
CREATE TABLE IF NOT EXISTS post_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  social_account_id uuid REFERENCES social_accounts(id) ON DELETE SET NULL,
  
  -- Basic engagement metrics
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  saves_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  reach integer DEFAULT 0,
  impressions integer DEFAULT 0,
  
  -- Advanced metrics
  engagement_rate decimal(5,4),
  click_through_rate decimal(5,4),
  conversion_rate decimal(5,4),
  
  -- Time-based metrics
  avg_watch_time_seconds integer,
  completion_rate decimal(5,4),
  
  -- Audience insights
  audience_demographics jsonb DEFAULT '{}',
  top_locations jsonb DEFAULT '{}',
  audience_interests jsonb DEFAULT '{}',
  
  -- Performance tracking
  performance_score decimal(5,2),
  viral_score decimal(5,2),
  
  -- Platform-specific metrics
  platform_specific_metrics jsonb DEFAULT '{}',
  
  -- Collection timestamp
  collected_at timestamptz NOT NULL DEFAULT now(),
  metric_date date NOT NULL DEFAULT CURRENT_DATE,
  
  -- Metadata
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_post_metrics_post_id ON post_metrics(post_id);
CREATE INDEX idx_post_metrics_platform ON post_metrics(platform);
CREATE INDEX idx_post_metrics_metric_date ON post_metrics(metric_date DESC);
CREATE INDEX idx_post_metrics_collected_at ON post_metrics(collected_at DESC);

-- Unique constraint para evitar duplicatas
CREATE UNIQUE INDEX idx_post_metrics_unique 
ON post_metrics(post_id, platform, metric_date);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- Sistema de notificações
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Notification content
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error', 'automation', 'post', 'metric', 'system')),
  
  -- Status
  is_read boolean DEFAULT false,
  is_important boolean DEFAULT false,
  
  -- Action and navigation
  action_url text,
  action_label text,
  
  -- Related entities
  related_entity_type text, -- 'post', 'automation', 'social_account', etc.
  related_entity_id uuid,
  
  -- Scheduling
  scheduled_for timestamptz,
  sent_at timestamptz,
  
  -- Delivery channels
  channels text[] DEFAULT '{app}', -- 'app', 'email', 'sms', 'push'
  delivery_status jsonb DEFAULT '{}',
  
  -- Metadata
  metadata jsonb DEFAULT '{}',
  expires_at timestamptz,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_scheduled ON notifications(scheduled_for);

-- ============================================================================
-- API USAGE TABLE
-- Controle de uso de APIs e rate limiting
-- ============================================================================
CREATE TABLE IF NOT EXISTS api_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- API details
  api_provider text NOT NULL, -- 'facebook', 'instagram', 'youtube', 'google_ai', etc.
  endpoint text NOT NULL,
  method text NOT NULL,
  
  -- Usage tracking
  request_count integer DEFAULT 1,
  success_count integer DEFAULT 0,
  error_count integer DEFAULT 0,
  
  -- Rate limiting
  rate_limit_remaining integer,
  rate_limit_reset timestamptz,
  
  -- Response details
  avg_response_time_ms decimal(8,2),
  last_response_code integer,
  last_error_message text,
  
  -- Time period
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  period_type text NOT NULL CHECK (period_type IN ('hour', 'day', 'month')),
  
  -- Costs (if applicable)
  cost_per_request decimal(10,6),
  total_cost decimal(10,2),
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_api_usage_updated_at
  BEFORE UPDATE ON api_usage
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_provider ON api_usage(api_provider);
CREATE INDEX idx_api_usage_period ON api_usage(period_start, period_end);

-- Unique constraint para evitar duplicatas por período
CREATE UNIQUE INDEX idx_api_usage_unique 
ON api_usage(user_id, api_provider, endpoint, period_start, period_type);

-- ============================================================================
-- FEATURE FLAGS TABLE
-- Controle de funcionalidades por usuário/plano
-- ============================================================================
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Feature identification
  feature_key text NOT NULL,
  feature_name text NOT NULL,
  
  -- Flag status
  is_enabled boolean DEFAULT false,
  
  -- Targeting
  plan_types text[], -- ['free', 'pro', 'business'] or null for all
  user_groups text[],
  
  -- Rollout control
  rollout_percentage integer DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  
  -- Configuration
  configuration jsonb DEFAULT '{}',
  
  -- Validity
  starts_at timestamptz,
  expires_at timestamptz,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_feature_flags_updated_at
  BEFORE UPDATE ON feature_flags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_feature_flags_user_id ON feature_flags(user_id);
CREATE INDEX idx_feature_flags_feature_key ON feature_flags(feature_key);
CREATE INDEX idx_feature_flags_enabled ON feature_flags(is_enabled);

-- ============================================================================
-- RLS (Row Level Security) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

-- Automations policies
CREATE POLICY "Users can manage own automations" ON automations FOR ALL USING (user_id = auth.uid());

-- Automation logs policies
CREATE POLICY "Users can view own automation logs" ON automation_logs FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can insert automation logs" ON automation_logs FOR INSERT WITH CHECK (true);

-- Post metrics policies
CREATE POLICY "Users can view own post metrics" ON post_metrics FOR SELECT USING (
  EXISTS (SELECT 1 FROM posts WHERE posts.id = post_metrics.post_id AND posts.user_id = auth.uid())
);
CREATE POLICY "System can manage post metrics" ON post_metrics FOR ALL USING (true);

-- Notifications policies
CREATE POLICY "Users can manage own notifications" ON notifications FOR ALL USING (user_id = auth.uid());

-- API usage policies
CREATE POLICY "Users can view own API usage" ON api_usage FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can manage API usage" ON api_usage FOR ALL USING (true);

-- Feature flags policies
CREATE POLICY "Users can view applicable feature flags" ON feature_flags FOR SELECT USING (
  user_id = auth.uid() OR user_id IS NULL
);

-- ============================================================================
-- USEFUL FUNCTIONS
-- ============================================================================

-- Function to get user's current API usage for a provider
CREATE OR REPLACE FUNCTION get_api_usage_current(
  p_user_id uuid,
  p_api_provider text,
  p_period_type text DEFAULT 'day'
)
RETURNS TABLE (
  total_requests bigint,
  successful_requests bigint,
  error_requests bigint,
  avg_response_time decimal
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(request_count), 0)::bigint as total_requests,
    COALESCE(SUM(success_count), 0)::bigint as successful_requests,
    COALESCE(SUM(error_count), 0)::bigint as error_requests,
    COALESCE(AVG(avg_response_time_ms), 0)::decimal as avg_response_time
  FROM api_usage
  WHERE user_id = p_user_id 
    AND api_provider = p_api_provider
    AND period_type = p_period_type
    AND period_start >= CASE 
      WHEN p_period_type = 'hour' THEN date_trunc('hour', now())
      WHEN p_period_type = 'day' THEN date_trunc('day', now())
      WHEN p_period_type = 'month' THEN date_trunc('month', now())
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has feature enabled
CREATE OR REPLACE FUNCTION has_feature_enabled(
  p_user_id uuid,
  p_feature_key text
)
RETURNS boolean AS $$
DECLARE
  user_plan text;
  flag_record record;
BEGIN
  -- Get user's plan
  SELECT plan_type INTO user_plan FROM profiles WHERE id = p_user_id;
  
  -- Check feature flags
  SELECT * INTO flag_record 
  FROM feature_flags 
  WHERE feature_key = p_feature_key
    AND (user_id = p_user_id OR user_id IS NULL)
    AND is_enabled = true
    AND (starts_at IS NULL OR starts_at <= now())
    AND (expires_at IS NULL OR expires_at > now())
    AND (plan_types IS NULL OR user_plan = ANY(plan_types))
  ORDER BY user_id NULLS LAST
  LIMIT 1;
  
  RETURN flag_record.id IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE automations IS 'Workflow automation configurations and rules';
COMMENT ON TABLE automation_logs IS 'Execution logs for automation workflows';
COMMENT ON TABLE post_metrics IS 'Detailed metrics and analytics for social media posts';
COMMENT ON TABLE notifications IS 'User notification system';
COMMENT ON TABLE api_usage IS 'API usage tracking and rate limiting';
COMMENT ON TABLE feature_flags IS 'Feature flag system for gradual rollouts';

COMMENT ON FUNCTION get_api_usage_current IS 'Get current API usage statistics for a user and provider';
COMMENT ON FUNCTION has_feature_enabled IS 'Check if a feature is enabled for a specific user'; 