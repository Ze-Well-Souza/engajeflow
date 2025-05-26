
/**
 * Configurações específicas para deploy no Vercel
 */

export const vercelConfig = {
  // Headers de segurança obrigatórios
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY', 
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  },

  // Configurações de ambiente
  environment: {
    production: {
      NODE_ENV: 'production',
      VITE_API_BASE_URL: 'https://your-app.vercel.app/api'
    }
  },

  // Build settings
  buildSettings: {
    outputDirectory: 'dist',
    buildCommand: 'npm run build',
    installCommand: 'npm ci',
    nodeVersion: '18.x'
  },

  // Variáveis de ambiente necessárias
  requiredEnvVars: [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_TECHCARE_BASE_URL'
  ],

  // Configurações de domínio
  domains: {
    staging: 'your-app.vercel.app',
    production: 'your-custom-domain.com' // Substitua pelo seu domínio
  }
};

export default vercelConfig;
