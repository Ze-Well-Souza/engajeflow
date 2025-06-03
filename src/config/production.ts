
/**
 * Configurações específicas para ambiente de produção
 */

// Helper para obter variáveis de ambiente de forma segura no browser
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Verificar se estamos no browser
  if (typeof window !== 'undefined') {
    // No browser, usar localStorage ou valores padrão
    const stored = localStorage.getItem(`env.${key}`);
    if (stored) return stored;
  }
  
  // Se estiver no Node.js (durante build)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  
  // Verificar Vite env vars
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key] || defaultValue;
  }
  
  return defaultValue;
};

export const productionConfig = {
  // Performance
  cache: {
    defaultTTL: 600000, // 10 minutos
    maxSize: 5000,
    cleanupInterval: 300000, // 5 minutos
    enableCompression: true,
    enableRedisCache: true,
    redisOptions: {
      tls: true,
      connectTimeout: 5000,
      maxRetriesPerRequest: 3,
      enableOfflineQueue: true
    }
  },

  // Logging
  logging: {
    level: 'warn',
    enableConsole: false,
    enableFile: true,
    maxFileSize: '50MB',
    maxFiles: 30,
    enableRemote: true,
    remoteOptions: {
      batchSize: 50,
      flushInterval: 5000,
      retryCount: 3,
      retryDelay: 1000
    }
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 900000, // 15 minutos
    max: 1000, // máximo 1000 requests por window
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    trustProxy: true
  },

  // CORS
  cors: {
    origin: getEnvVar('ALLOWED_ORIGINS', 'https://yourdomain.com').split(','),
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
    maxAge: 86400 // 24 horas
  },

  // Security Headers
  security: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'", "'sha256-I7LI4JDnbtmJVLu+dxFY0nwhAVYaSYCZDrZlV6GpVgQ='"],
        connectSrc: ["'self'", "https://api.openai.com", "https://*.supabase.co"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    frameOptions: 'DENY',
    xssProtection: true,
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  },

  // Database
  database: {
    poolSize: 20,
    connectionTimeout: 60000,
    idleTimeout: 300000,
    enableSSL: true,
    enableRLS: true,
    enableAuditLogs: true,
    statementTimeout: 30000,
    queryLogging: false,
    retryAttempts: 3,
    retryDelay: 1000
  },

  // Monitoring
  monitoring: {
    enableMetrics: true,
    metricsPort: 9090,
    healthCheckInterval: 30000,
    alertThresholds: {
      errorRate: 5, // 5%
      responseTime: 2000, // 2 segundos
      memoryUsage: 85, // 85%
      diskUsage: 90, // 90%
      cpuUsage: 80, // 80%
      activeConcurrentConnections: 1000
    },
    enableAlerts: true,
    alertChannels: ['email', 'webhook'],
    alertCooldown: 300000 // 5 minutos
  },

  // AI Services
  ai: {
    cacheResponses: true,
    cacheTTL: 3600000, // 1 hora
    maxRetries: 3,
    timeout: 30000,
    rateLimitPerMinute: 60,
    enableBatchProcessing: true,
    fallbackProviders: ['openai', 'anthropic', 'vertexai'],
    costOptimization: true,
    contentFiltering: true
  },

  // File Upload
  upload: {
    maxFileSize: 10485760, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'],
    enableVirusScanning: true,
    quarantineDirectory: '/tmp/quarantine',
    storageProvider: 'supabase',
    cdnIntegration: true,
    imageProcessing: {
      enableResizing: true,
      defaultQuality: 80,
      maxWidth: 2000,
      maxHeight: 2000
    }
  },

  // Backup Strategy
  backup: {
    enabled: true,
    frequency: 'daily',
    retentionDays: 30,
    compressionEnabled: true,
    encryptionEnabled: true,
    storageProvider: 's3',
    autoRestore: {
      enabled: false,
      onFailureOnly: true
    }
  },

  // Deployment
  deployment: {
    strategy: 'blue-green',
    maxRolloutPercent: 20,
    healthCheckPath: '/api/health',
    healthCheckTimeout: 5000,
    healthCheckInterval: 30000,
    automaticRollback: true,
    rollbackThreshold: 10, // % de erros para rollback
    warmupPeriod: 30000
  },

  // Autoscaling
  autoscaling: {
    enabled: true,
    minInstances: 2,
    maxInstances: 10,
    cpuThreshold: 70,
    memoryThreshold: 80,
    scaleUpCooldown: 180, // segundos
    scaleDownCooldown: 300, // segundos
    targetResponseTime: 500 // ms
  }
};

export const getProductionConfig = () => {
  return productionConfig;
};

export default productionConfig;
