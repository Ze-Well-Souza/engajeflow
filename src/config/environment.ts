// Configurações de ambiente para o TechCare Connect Automator
export const environment = {
  // Configurações principais
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  APP_NAME: 'TechCare Connect Automator',
  APP_VERSION: '1.0.0',

  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://pkefwvvkydzzfstzwppv.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWZ3dnZreWR6emZzdHp3cHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNDI2NzUsImV4cCI6MjA2MjkxODY3NX0.ACpmG9nW2riQTsNZznHviEMNCcRr1KlaXfMfFpq4ps4',
    serviceRoleKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZWZ3dnZreWR6emZzdHp3cHB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM0MjY3NSwiZXhwIjoyMDYyOTE4Njc1fQ.x9lc7-x9Aj0bB0WOZQ4b_buEwftPgCuGirvxjn_S6m8',
    projectId: 'pkefwvvkydzzfstzwppv'
  },

  // Google AI Configuration
  googleAI: {
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY || import.meta.env.GOOGLE_API_KEY,
    model: 'gemini-1.5-flash',
    maxTokens: 8192,
    temperature: 0.7
  },

  // GitHub Configuration (para integrações futuras)
  github: {
    apiKey: import.meta.env.GITHUB_API_KEY, // Removido o valor hardcoded
    baseUrl: 'https://api.github.com'
  },

  // Redis Configuration
  redis: {
    host: import.meta.env.REDIS_HOST || 'localhost',
    port: parseInt(import.meta.env.REDIS_PORT || '6379'),
    password: import.meta.env.REDIS_PASSWORD,
    db: parseInt(import.meta.env.REDIS_DB || '0')
  },

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
    retries: 3
  },

  // Feature Flags
  features: {
    enableAI: import.meta.env.VITE_ENABLE_AI !== 'false',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
    enableCache: import.meta.env.VITE_ENABLE_CACHE !== 'false',
    enableQueue: import.meta.env.VITE_ENABLE_QUEUE !== 'false'
  },

  // Social Media Platforms
  socialPlatforms: {
    instagram: {
      enabled: import.meta.env.VITE_INSTAGRAM_ENABLED === 'true',
      clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
      clientSecret: import.meta.env.INSTAGRAM_CLIENT_SECRET
    },
    facebook: {
      enabled: import.meta.env.VITE_FACEBOOK_ENABLED === 'true',
      appId: import.meta.env.VITE_FACEBOOK_APP_ID,
      appSecret: import.meta.env.FACEBOOK_APP_SECRET
    },
    twitter: {
      enabled: import.meta.env.VITE_TWITTER_ENABLED === 'true',
      apiKey: import.meta.env.VITE_TWITTER_API_KEY,
      apiSecret: import.meta.env.TWITTER_API_SECRET
    },
    linkedin: {
      enabled: import.meta.env.VITE_LINKEDIN_ENABLED === 'true',
      clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      clientSecret: import.meta.env.LINKEDIN_CLIENT_SECRET
    },
    tiktok: {
      enabled: import.meta.env.VITE_TIKTOK_ENABLED === 'true',
      clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY,
      clientSecret: import.meta.env.TIKTOK_CLIENT_SECRET
    },
    youtube: {
      enabled: import.meta.env.VITE_YOUTUBE_ENABLED === 'true',
      apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
      clientId: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
      clientSecret: import.meta.env.YOUTUBE_CLIENT_SECRET
    }
  },

  // Monitoring & Logging
  monitoring: {
    enableMetrics: import.meta.env.VITE_ENABLE_METRICS === 'true',
    enableLogs: import.meta.env.VITE_ENABLE_LOGS !== 'false',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN
  },

  // Security
  security: {
    jwtSecret: import.meta.env.JWT_SECRET,
    encryptionKey: import.meta.env.ENCRYPTION_KEY,
    corsOrigins: import.meta.env.CORS_ORIGINS?.split(',') || ['http://localhost:8080'],
    rateLimitWindow: parseInt(import.meta.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
    rateLimitMax: parseInt(import.meta.env.RATE_LIMIT_MAX || '100')
  }
};

// Validação de configurações críticas
export const validateEnvironment = () => {
  const required = [
    'supabase.url',
    'supabase.anonKey'
  ];

  const missing = required.filter(key => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], environment);
    return !value;
  });

  if (missing.length > 0) {
    console.warn('⚠️ Missing required environment variables:', missing);
  }

  return missing.length === 0;
};

// Configurações específicas por ambiente
export const getEnvironmentConfig = () => {
  const env = environment.NODE_ENV;
  
  switch (env) {
    case 'production':
      return {
        ...environment,
        api: {
          ...environment.api,
          baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.techcare.com'
        },
        monitoring: {
          ...environment.monitoring,
          enableMetrics: true,
          enableLogs: true,
          logLevel: 'warn'
        }
      };
    
    case 'staging':
      return {
        ...environment,
        api: {
          ...environment.api,
          baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.techcare.com'
        },
        monitoring: {
          ...environment.monitoring,
          enableMetrics: true,
          enableLogs: true,
          logLevel: 'info'
        }
      };
    
    default: // development
      return {
        ...environment,
        monitoring: {
          ...environment.monitoring,
          enableMetrics: false,
          enableLogs: true,
          logLevel: 'debug'
        }
      };
  }
};

export default environment; 