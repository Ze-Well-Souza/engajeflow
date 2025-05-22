/**
 * Implementação de Feature Flags para Implantação Gradual
 * 
 * Este módulo implementa um sistema de feature flags para permitir a implantação gradual de funcionalidades no TechCare Connect Automator.
 */

import { createClient } from 'redis';
import { Logger } from '../logger';

const logger = new Logger('FeatureFlags');

export interface FeatureFlagOptions {
  redisHost: string;
  redisPort: number;
  redisPassword: string;
  redisPrefix: string;
}

export class FeatureFlags {
  private static instance: FeatureFlags;
  private redisClient: ReturnType<typeof createClient> | null = null;
  private options: FeatureFlagOptions;
  private cache: Map<string, boolean> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_TTL = 60 * 1000; // 1 minuto
  private readonly KEY_PREFIX = 'feature:';

  private constructor(options: FeatureFlagOptions) {
    this.options = options;
  }

  public static getInstance(options?: FeatureFlagOptions): FeatureFlags {
    if (!FeatureFlags.instance) {
      if (!options) {
        throw new Error('FeatureFlags não inicializado. Forneça as opções na primeira chamada.');
      }
      FeatureFlags.instance = new FeatureFlags(options);
    }
    return FeatureFlags.instance;
  }

  public async initialize(): Promise<void> {
    try {
      this.redisClient = createClient({
        url: `redis://:${this.options.redisPassword}@${this.options.redisHost}:${this.options.redisPort}`,
        prefix: this.options.redisPrefix + this.KEY_PREFIX
      });

      await this.redisClient.connect();
      logger.info('Sistema de Feature Flags inicializado com sucesso');
    } catch (error) {
      logger.error('Erro ao inicializar sistema de Feature Flags', { error });
      throw error;
    }
  }

  public async isEnabled(featureName: string, userId?: string): Promise<boolean> {
    if (!this.redisClient) {
      logger.warn('Cliente Redis não inicializado. Retornando false para feature', { featureName });
      return false;
    }

    // Verificar cache primeiro
    const cacheKey = userId ? `${featureName}:${userId}` : featureName;
    const now = Date.now();
    
    if (this.cache.has(cacheKey) && this.cacheExpiry.get(cacheKey)! > now) {
      return this.cache.get(cacheKey)!;
    }

    try {
      let isEnabled = false;
      
      // Verificar flag específica do usuário
      if (userId) {
        const userSpecificKey = `${featureName}:user:${userId}`;
        const userSpecificValue = await this.redisClient.get(userSpecificKey);
        
        if (userSpecificValue !== null) {
          isEnabled = userSpecificValue === 'true';
          this.updateCache(cacheKey, isEnabled);
          return isEnabled;
        }
      }
      
      // Verificar flag global
      const globalValue = await this.redisClient.get(featureName);
      isEnabled = globalValue === 'true';
      
      // Verificar regras de porcentagem
      if (!isEnabled && userId) {
        const percentageKey = `${featureName}:percentage`;
        const percentageStr = await this.redisClient.get(percentageKey);
        
        if (percentageStr !== null) {
          const percentage = parseInt(percentageStr, 10);
          if (!isNaN(percentage) && percentage > 0) {
            // Usar hash consistente baseado no userId para determinar se o usuário está no grupo
            const hash = this.hashString(userId);
            isEnabled = (hash % 100) < percentage;
          }
        }
      }
      
      this.updateCache(cacheKey, isEnabled);
      return isEnabled;
    } catch (error) {
      logger.error('Erro ao verificar status da feature', { featureName, userId, error });
      return false;
    }
  }

  public async setFeatureFlag(featureName: string, enabled: boolean): Promise<void> {
    if (!this.redisClient) {
      throw new Error('Cliente Redis não inicializado');
    }

    try {
      await this.redisClient.set(featureName, enabled.toString());
      logger.info('Feature flag atualizada', { featureName, enabled });
      
      // Limpar cache relacionado
      this.clearFeatureCache(featureName);
    } catch (error) {
      logger.error('Erro ao atualizar feature flag', { featureName, enabled, error });
      throw error;
    }
  }

  public async setUserFeatureFlag(featureName: string, userId: string, enabled: boolean): Promise<void> {
    if (!this.redisClient) {
      throw new Error('Cliente Redis não inicializado');
    }

    try {
      const key = `${featureName}:user:${userId}`;
      await this.redisClient.set(key, enabled.toString());
      logger.info('Feature flag de usuário atualizada', { featureName, userId, enabled });
      
      // Limpar cache relacionado
      this.clearFeatureCache(featureName);
    } catch (error) {
      logger.error('Erro ao atualizar feature flag de usuário', { featureName, userId, enabled, error });
      throw error;
    }
  }

  public async setPercentageRollout(featureName: string, percentage: number): Promise<void> {
    if (!this.redisClient) {
      throw new Error('Cliente Redis não inicializado');
    }

    if (percentage < 0 || percentage > 100) {
      throw new Error('Porcentagem deve estar entre 0 e 100');
    }

    try {
      const key = `${featureName}:percentage`;
      await this.redisClient.set(key, percentage.toString());
      logger.info('Rollout percentual configurado', { featureName, percentage });
      
      // Limpar cache relacionado
      this.clearFeatureCache(featureName);
    } catch (error) {
      logger.error('Erro ao configurar rollout percentual', { featureName, percentage, error });
      throw error;
    }
  }

  public async getAllFeatures(): Promise<Record<string, boolean>> {
    if (!this.redisClient) {
      throw new Error('Cliente Redis não inicializado');
    }

    try {
      const keys = await this.redisClient.keys('*');
      const result: Record<string, boolean> = {};
      
      for (const key of keys) {
        // Ignorar chaves de usuário específico e porcentagem
        if (!key.includes(':user:') && !key.includes(':percentage')) {
          const value = await this.redisClient.get(key);
          result[key] = value === 'true';
        }
      }
      
      return result;
    } catch (error) {
      logger.error('Erro ao obter todas as features', { error });
      throw error;
    }
  }

  private updateCache(key: string, value: boolean): void {
    this.cache.set(key, value);
    this.cacheExpiry.set(key, Date.now() + this.CACHE_TTL);
  }

  private clearFeatureCache(featureName: string): void {
    // Limpar todas as entradas de cache relacionadas a esta feature
    for (const key of this.cache.keys()) {
      if (key === featureName || key.startsWith(`${featureName}:`)) {
        this.cache.delete(key);
        this.cacheExpiry.delete(key);
      }
    }
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Converter para inteiro de 32 bits
    }
    return Math.abs(hash);
  }

  public async close(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
      this.redisClient = null;
    }
  }
}

// Exportar função de inicialização para uso em aplicação
export const initializeFeatureFlags = async (): Promise<FeatureFlags> => {
  const options: FeatureFlagOptions = {
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
    redisPassword: process.env.REDIS_PASSWORD || '',
    redisPrefix: process.env.REDIS_PREFIX || 'techcare:'
  };

  const featureFlags = FeatureFlags.getInstance(options);
  await featureFlags.initialize();
  return featureFlags;
};
