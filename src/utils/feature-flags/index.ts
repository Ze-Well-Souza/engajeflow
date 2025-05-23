
/**
 * Sistema de Feature Flags
 * Permite ativar/desativar funcionalidades de forma dinâmica
 */

import { createClient } from 'redis';
import logger from '../logger';

const featureFlagsLogger = logger.withContext('FeatureFlags');

// Interface para configuração do sistema de feature flags
export interface FeatureFlagsConfig {
  redisUrl?: string;
  useRedis?: boolean;
  defaultFlags?: Record<string, boolean>;
}

// Interface que define como os clientes devem interagir com o sistema
export interface FeatureFlagsClient {
  isEnabled(feature: string): Promise<boolean>;
  isDisabled(feature: string): Promise<boolean>;
  setFeature(feature: string, enabled: boolean): Promise<void>;
  reset(): Promise<void>;
  getAll(): Promise<Record<string, boolean>>;
}

// Implementação em memória (padrão)
class InMemoryFeatureFlags implements FeatureFlagsClient {
  private flags: Record<string, boolean>;
  
  constructor(defaultFlags: Record<string, boolean> = {}) {
    this.flags = { ...defaultFlags };
    featureFlagsLogger.info('Inicializando feature flags em memória');
  }
  
  async isEnabled(feature: string): Promise<boolean> {
    return this.flags[feature] === true;
  }
  
  async isDisabled(feature: string): Promise<boolean> {
    return !(await this.isEnabled(feature));
  }
  
  async setFeature(feature: string, enabled: boolean): Promise<void> {
    this.flags[feature] = enabled;
    featureFlagsLogger.info(`Feature ${feature} ${enabled ? 'ativada' : 'desativada'}`);
  }
  
  async reset(): Promise<void> {
    this.flags = {};
    featureFlagsLogger.info('Feature flags resetadas');
  }
  
  async getAll(): Promise<Record<string, boolean>> {
    return { ...this.flags };
  }
}

// Implementação usando Redis (para ambientes distribuídos)
class RedisFeatureFlags implements FeatureFlagsClient {
  private redisClient: ReturnType<typeof createClient>;
  private readonly PREFIX = 'feature:';
  
  constructor(redisUrl: string, defaultFlags: Record<string, boolean> = {}) {
    this.redisClient = createClient({ url: redisUrl });
    this.redisClient.on('error', (err) => {
      featureFlagsLogger.error('Erro na conexão Redis', err);
    });
    
    this.redisClient.connect().then(async () => {
      featureFlagsLogger.info('Conectado ao Redis para feature flags');
      
      // Configurar flags padrão se não existirem
      for (const [feature, enabled] of Object.entries(defaultFlags)) {
        const exists = await this.redisClient.exists(`${this.PREFIX}${feature}`);
        if (!exists) {
          await this.setFeature(feature, enabled);
        }
      }
    }).catch(err => {
      featureFlagsLogger.error('Falha ao conectar ao Redis', err);
    });
  }
  
  async isEnabled(feature: string): Promise<boolean> {
    try {
      const value = await this.redisClient.get(`${this.PREFIX}${feature}`);
      return value === '1';
    } catch (error) {
      featureFlagsLogger.error(`Erro ao verificar feature ${feature}`, error);
      return false;
    }
  }
  
  async isDisabled(feature: string): Promise<boolean> {
    return !(await this.isEnabled(feature));
  }
  
  async setFeature(feature: string, enabled: boolean): Promise<void> {
    try {
      await this.redisClient.set(`${this.PREFIX}${feature}`, enabled ? '1' : '0');
      featureFlagsLogger.info(`Feature ${feature} ${enabled ? 'ativada' : 'desativada'}`);
    } catch (error) {
      featureFlagsLogger.error(`Erro ao configurar feature ${feature}`, error);
      throw error;
    }
  }
  
  async reset(): Promise<void> {
    try {
      const keys = await this.redisClient.keys(`${this.PREFIX}*`);
      if (keys.length > 0) {
        await this.redisClient.del(keys);
      }
      featureFlagsLogger.info('Feature flags resetadas');
    } catch (error) {
      featureFlagsLogger.error('Erro ao resetar feature flags', error);
      throw error;
    }
  }
  
  async getAll(): Promise<Record<string, boolean>> {
    try {
      const keys = await this.redisClient.keys(`${this.PREFIX}*`);
      const flags: Record<string, boolean> = {};
      
      for (const key of keys) {
        const feature = key.substring(this.PREFIX.length);
        flags[feature] = await this.isEnabled(feature);
      }
      
      return flags;
    } catch (error) {
      featureFlagsLogger.error('Erro ao obter todas as feature flags', error);
      return {};
    }
  }
}

// Singleton para acessar o cliente de feature flags
class FeatureFlagsService {
  private static instance: FeatureFlagsService;
  private client: FeatureFlagsClient;
  
  private constructor() {
    // Inicialização padrão com cliente em memória
    this.client = new InMemoryFeatureFlags();
  }
  
  public static getInstance(): FeatureFlagsService {
    if (!FeatureFlagsService.instance) {
      FeatureFlagsService.instance = new FeatureFlagsService();
    }
    return FeatureFlagsService.instance;
  }
  
  public configure(config: FeatureFlagsConfig = {}): void {
    const { useRedis, redisUrl, defaultFlags = {} } = config;
    
    if (useRedis && redisUrl) {
      try {
        this.client = new RedisFeatureFlags(redisUrl, defaultFlags);
        featureFlagsLogger.info('Feature flags configuradas para usar Redis');
      } catch (error) {
        featureFlagsLogger.error('Falha ao configurar Redis para feature flags, usando memória', error);
        this.client = new InMemoryFeatureFlags(defaultFlags);
      }
    } else {
      this.client = new InMemoryFeatureFlags(defaultFlags);
      featureFlagsLogger.info('Feature flags configuradas para usar memória');
    }
  }
  
  public getClient(): FeatureFlagsClient {
    return this.client;
  }
}

// Cliente padrão para uso direto
const featureFlags = FeatureFlagsService.getInstance();
export default featureFlags;
