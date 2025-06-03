-- Migration: Core Tables for TechCare Connect Automator
-- Created: 2025-01-22
-- Description: Tabelas principais para perfis, contas sociais e posts

-- ============================================================================
-- PROFILES TABLE
-- Extensão da tabela de usuários do Supabase Auth
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  display_name text,
  avatar_url text,
  bio text,
  website text,
  phone text,
  plan_type text DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'business')),
  subscription_status text DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'past_due')),
  subscription_expires_at timestamptz,
  is_admin boolean DEFAULT false,
  settings jsonb DEFAULT '{}',
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SOCIAL ACCOUNTS TABLE
-- Gerencia conexões com redes sociais
-- ============================================================================
CREATE TABLE IF NOT EXISTS social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('facebook', 'instagram', 'whatsapp', 'youtube', 'tiktok', 'telegram', 'linkedin', 'twitter')),
  account_id text NOT NULL,
  account_name text,
  account_username text,
  account_url text,
  account_avatar_url text,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  scopes text[],
  permissions jsonb DEFAULT '{}',
  account_info jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  is_verified boolean DEFAULT false,
  last_sync_at timestamptz,
  sync_status text DEFAULT 'pending' CHECK (sync_status IN ('pending', 'syncing', 'completed', 'error')),
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint para evitar duplicatas de conta por usuário
  UNIQUE(user_id, platform, account_id)
);

CREATE TRIGGER update_social_accounts_updated_at
  BEFORE UPDATE ON social_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_social_accounts_active ON social_accounts(is_active);

-- ============================================================================
-- POSTS TABLE
-- Gerencia posts e agendamentos
-- ============================================================================
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text,
  content text NOT NULL,
  content_type text DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'video', 'carousel', 'story', 'reel')),
  
  -- Media handling
  media_urls text[],
  media_metadata jsonb DEFAULT '{}',
  thumbnail_url text,
  
  -- Targeting and scheduling
  platforms text[] NOT NULL,
  target_accounts uuid[], -- References to social_accounts
  scheduled_for timestamptz,
  timezone text DEFAULT 'America/Sao_Paulo',
  
  -- Status tracking
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'publishing', 'published', 'failed', 'cancelled')),
  published_at timestamptz,
  failed_at timestamptz,
  failure_reason text,
  
  -- AI and automation
  ai_generated boolean DEFAULT false,
  ai_metadata jsonb DEFAULT '{}',
  hashtags text[],
  mentions text[],
  
  -- Engagement tracking
  engagement_metrics jsonb DEFAULT '{}',
  
  -- Metadata
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_for ON posts(scheduled_for);
CREATE INDEX idx_posts_platforms ON posts USING GIN(platforms);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- ============================================================================
-- POST PLATFORMS TABLE
-- Relacionamento entre posts e plataformas específicas
-- ============================================================================
CREATE TABLE IF NOT EXISTS post_platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  social_account_id uuid REFERENCES social_accounts(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  
  -- Platform-specific data
  platform_post_id text, -- ID do post na plataforma
  platform_url text,
  platform_specific_content text,
  platform_metadata jsonb DEFAULT '{}',
  
  -- Status per platform
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'publishing', 'published', 'failed')),
  published_at timestamptz,
  failed_at timestamptz,
  failure_reason text,
  retry_count integer DEFAULT 0,
  
  -- Metrics per platform
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  reach integer DEFAULT 0,
  impressions integer DEFAULT 0,
  engagement_rate decimal(5,4),
  
  last_metrics_update timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(post_id, social_account_id)
);

CREATE TRIGGER update_post_platforms_updated_at
  BEFORE UPDATE ON post_platforms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_post_platforms_post_id ON post_platforms(post_id);
CREATE INDEX idx_post_platforms_social_account ON post_platforms(social_account_id);
CREATE INDEX idx_post_platforms_status ON post_platforms(status);
CREATE INDEX idx_post_platforms_published_at ON post_platforms(published_at DESC);

-- ============================================================================
-- RLS (Row Level Security) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_platforms ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Social accounts policies  
CREATE POLICY "Users can manage own social accounts" ON social_accounts FOR ALL USING (user_id = auth.uid());

-- Posts policies
CREATE POLICY "Users can manage own posts" ON posts FOR ALL USING (user_id = auth.uid());

-- Post platforms policies
CREATE POLICY "Users can view own post platforms" ON post_platforms FOR SELECT USING (
  EXISTS (SELECT 1 FROM posts WHERE posts.id = post_platforms.post_id AND posts.user_id = auth.uid())
);
CREATE POLICY "Users can manage own post platforms" ON post_platforms FOR ALL USING (
  EXISTS (SELECT 1 FROM posts WHERE posts.id = post_platforms.post_id AND posts.user_id = auth.uid())
);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, display_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'display_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to create profile on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE profiles IS 'Extended user profiles with subscription and preferences';
COMMENT ON TABLE social_accounts IS 'Connected social media accounts with tokens and metadata';  
COMMENT ON TABLE posts IS 'Posts and scheduled content for social media';
COMMENT ON TABLE post_platforms IS 'Platform-specific post data and metrics';

COMMENT ON COLUMN profiles.plan_type IS 'Subscription plan: free, pro, business';
COMMENT ON COLUMN social_accounts.platform IS 'Social media platform identifier';
COMMENT ON COLUMN posts.status IS 'Post status in the publishing workflow';
COMMENT ON COLUMN post_platforms.platform_post_id IS 'ID of the post in the specific platform'; 