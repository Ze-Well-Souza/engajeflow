
/**
 * Configurações específicas para ambiente de produção
 */

export const productionConfig = {
  // Performance
  cache: {
    defaultTTL: 600000, // 10 minutos
    maxSize: 5000,
    cleanupInterval: 300000 // 5 minutos
  },

  // Logging
  logging: {
    level: 'warn',
    enableConsole: false,
    enableFile: true,
    maxFileSize: '50MB',
    maxFiles: 30,
    enableRemote: true
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 900000, // 15 minutos
    max: 1000, // máximo 1000 requests por window
    standardHeaders: true,
    legacyHeaders: false,
  },

  // CORS
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://yourdomain.com'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  },

  // Security Headers
  security: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.openai.com", "https://*.supabase.co"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
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
    xssProtection: true
  },

  // Database
  database: {
    poolSize: 20,
    connectionTimeout: 60000,
    idleTimeout: 300000,
    enableSSL: true,
    enableRLS: true,
    enableAuditLogs: true
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
      diskUsage: 90 // 90%
    }
  },

  // AI Services
  ai: {
    cacheResponses: true,
    cacheTTL: 3600000, // 1 hora
    maxRetries: 3,
    timeout: 30000,
    rateLimitPerMinute: 60
  },

  // File Upload
  upload: {
    maxFileSize: 10485760, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'],
    enableVirusScanning: true,
    quarantineDirectory: '/tmp/quarantine'
  }
};

export const getProductionConfig = () => {
  return productionConfig;
};

export default productionConfig;
