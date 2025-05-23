
/**
 * Configurações e scripts para deploy em produção
 */

export const deployConfig = {
  // Verificações pré-deploy
  preDeployChecks: [
    'environment-variables',
    'database-migrations',
    'security-headers',
    'ssl-certificates',
    'backup-strategy',
    'monitoring-setup',
    'error-tracking',
    'performance-optimization'
  ],

  // Verificações pós-deploy
  postDeployChecks: [
    'health-check-endpoints',
    'database-connectivity',
    'external-api-connectivity',
    'authentication-flow',
    'critical-user-journeys',
    'performance-metrics',
    'error-rates',
    'log-aggregation'
  ],

  // Variáveis de ambiente obrigatórias para produção
  requiredEnvVars: [
    'NODE_ENV',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'TECHCARE_BASE_URL',
    'OPENAI_API_KEY'
  ],

  // Variáveis opcionais mas recomendadas
  recommendedEnvVars: [
    'SENTRY_DSN',
    'GOOGLE_ANALYTICS_ID',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS',
    'MONITORING_WEBHOOK_URL'
  ],

  // Headers de segurança obrigatórios
  securityHeaders: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  },

  // Métricas de performance esperadas
  performanceTargets: {
    firstContentfulPaint: 1500, // ms
    largestContentfulPaint: 2500, // ms
    firstInputDelay: 100, // ms
    cumulativeLayoutShift: 0.1,
    timeToInteractive: 3000 // ms
  },

  // Configurações de CDN
  cdn: {
    enableCompression: true,
    enableCaching: true,
    cacheControl: {
      static: 'public, max-age=31536000, immutable',
      api: 'no-cache, no-store, must-revalidate',
      html: 'public, max-age=300'
    }
  }
};

export const runPreDeployChecks = async (): Promise<{ passed: boolean; errors: string[] }> => {
  const errors: string[] = [];

  // Verificar variáveis de ambiente
  for (const envVar of deployConfig.requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  // Verificar configurações de segurança
  if (process.env.NODE_ENV !== 'production') {
    errors.push('NODE_ENV must be set to "production" for production deploy');
  }

  // Verificar se HTTPS está configurado
  if (!process.env.FORCE_HTTPS) {
    errors.push('FORCE_HTTPS should be enabled for production');
  }

  return {
    passed: errors.length === 0,
    errors
  };
};

export const runPostDeployChecks = async (): Promise<{ passed: boolean; errors: string[] }> => {
  const errors: string[] = [];

  try {
    // Verificar conectividade da API
    const healthCheck = await fetch('/api/health');
    if (!healthCheck.ok) {
      errors.push('Health check endpoint failed');
    }

    // Verificar autenticação
    const authCheck = await fetch('/api/auth/check');
    if (!authCheck.ok) {
      errors.push('Authentication endpoint failed');
    }

    // Verificar banco de dados
    const dbCheck = await fetch('/api/db/health');
    if (!dbCheck.ok) {
      errors.push('Database connectivity failed');
    }

  } catch (error) {
    errors.push(`Post-deploy check failed: ${error}`);
  }

  return {
    passed: errors.length === 0,
    errors
  };
};

export default deployConfig;
