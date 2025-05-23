
/**
 * Utilitário para gerenciar variáveis de ambiente de forma segura
 */

interface EnvironmentConfig {
  nodeEnv: 'development' | 'production' | 'test';
  techcareUser?: string;
  techcarePass?: string;
  techcareBaseUrl: string;
  operationMode: string;
  maxConcurrency: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  apiPort: number;
  enableMetrics: boolean;
  timezone: string;
}

class EnvironmentManager {
  private static instance: EnvironmentManager;
  private config: EnvironmentConfig;

  private constructor() {
    this.config = this.loadConfig();
    this.validateConfig();
  }

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  private loadConfig(): EnvironmentConfig {
    return {
      nodeEnv: (process.env.NODE_ENV as any) || 'development',
      techcareUser: process.env.TECHCARE_USER,
      techcarePass: process.env.TECHCARE_PASS,
      techcareBaseUrl: process.env.TECHCARE_BASE_URL || 'https://app.techcare.com',
      operationMode: process.env.OPERATION_MODE || 'dashboard',
      maxConcurrency: parseInt(process.env.MAX_CONCURRENCY || '2'),
      logLevel: (process.env.LOG_LEVEL as any) || 'info',
      apiPort: parseInt(process.env.API_PORT || '3000'),
      enableMetrics: process.env.ENABLE_METRICS === 'true',
      timezone: process.env.TZ || 'America/Sao_Paulo'
    };
  }

  private validateConfig(): void {
    const required = ['nodeEnv', 'techcareBaseUrl'];
    const missing = required.filter(key => !this.config[key as keyof EnvironmentConfig]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    if (this.config.nodeEnv === 'production') {
      const productionRequired = ['techcareUser', 'techcarePass'];
      const missingProd = productionRequired.filter(key => !this.config[key as keyof EnvironmentConfig]);
      
      if (missingProd.length > 0) {
        console.warn(`Missing production environment variables: ${missingProd.join(', ')}`);
      }
    }
  }

  public getConfig(): EnvironmentConfig {
    return { ...this.config };
  }

  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }

  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }

  public isTest(): boolean {
    return this.config.nodeEnv === 'test';
  }

  public get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.config[key];
  }
}

// Função utilitária para compatibilidade com código existente
export function getEnvVariable(key: string, defaultValue?: string): string {
  const envManager = EnvironmentManager.getInstance();
  const config = envManager.getConfig();
  
  // Mapear chaves antigas para novas
  const keyMap: Record<string, keyof EnvironmentConfig> = {
    'TECHCARE_USER': 'techcareUser',
    'TECHCARE_PASS': 'techcarePass',
    'TECHCARE_BASE_URL': 'techcareBaseUrl',
    'NODE_ENV': 'nodeEnv',
    'OPERATION_MODE': 'operationMode',
    'MAX_CONCURRENCY': 'maxConcurrency',
    'LOG_LEVEL': 'logLevel',
    'API_PORT': 'apiPort'
  };

  const mappedKey = keyMap[key];
  if (mappedKey && config[mappedKey]) {
    return String(config[mappedKey]);
  }

  return process.env[key] || defaultValue || '';
}

export default EnvironmentManager.getInstance();
