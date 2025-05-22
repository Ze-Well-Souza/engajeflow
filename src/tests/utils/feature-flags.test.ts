import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FeatureFlags, FeatureFlagOptions } from '../../utils/feature-flags/index';

// Mock para o módulo redis
vi.mock('redis', () => {
  const mockClient = {
    connect: vi.fn().mockResolvedValue(undefined),
    get: vi.fn(),
    set: vi.fn().mockResolvedValue(undefined),
    keys: vi.fn(),
    quit: vi.fn().mockResolvedValue(undefined)
  };
  
  return {
    createClient: vi.fn().mockReturnValue(mockClient)
  };
});

// Mock para o módulo logger
vi.mock('../../utils/logger', () => {
  return {
    Logger: vi.fn().mockImplementation(() => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    }))
  };
});

describe('FeatureFlags', () => {
  let featureFlags: any;
  let mockRedisClient: any;
  const options: FeatureFlagOptions = {
    redisHost: 'localhost',
    redisPort: 6379,
    redisPassword: 'test',
    redisPrefix: 'test:'
  };
  
  beforeEach(async () => {
    // Limpar mocks
    vi.clearAllMocks();
    
    // Resetar singleton
    (FeatureFlags as any).instance = undefined;
    
    // Criar instância
    featureFlags = FeatureFlags.getInstance(options);
    
    // Acessar o cliente Redis mockado
    mockRedisClient = (await import('redis')).createClient();
    
    // Inicializar
    await featureFlags.initialize();
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('Inicialização', () => {
    it('deve criar uma instância singleton', () => {
      const instance1 = FeatureFlags.getInstance();
      const instance2 = FeatureFlags.getInstance();
      
      expect(instance1).toBe(instance2);
    });
    
    it('deve lançar erro se getInstance for chamado sem opções na primeira vez', () => {
      // Resetar singleton
      (FeatureFlags as any).instance = undefined;
      
      expect(() => FeatureFlags.getInstance()).toThrow('FeatureFlags não inicializado');
    });
    
    it('deve inicializar o cliente Redis corretamente', async () => {
      const { createClient } = await import('redis');
      
      expect(createClient).toHaveBeenCalledWith({
        url: `redis://:${options.redisPassword}@${options.redisHost}:${options.redisPort}`,
        prefix: expect.any(String)
      });
      
      expect(mockRedisClient.connect).toHaveBeenCalled();
    });
  });
  
  describe('Verificação de features', () => {
    it('deve retornar false se o cliente Redis não estiver inicializado', async () => {
      // Simular cliente não inicializado
      featureFlags.redisClient = null;
      
      const result = await featureFlags.isEnabled('testFeature');
      
      expect(result).toBe(false);
    });
    
    it('deve verificar feature global', async () => {
      // Configurar mock para retornar true
      mockRedisClient.get.mockResolvedValueOnce('true');
      
      const result = await featureFlags.isEnabled('testFeature');
      
      expect(mockRedisClient.get).toHaveBeenCalledWith('testFeature');
      expect(result).toBe(true);
    });
    
    it('deve verificar feature específica de usuário', async () => {
      // Configurar mock para retornar true para usuário específico
      mockRedisClient.get.mockResolvedValueOnce('true');
      
      const result = await featureFlags.isEnabled('testFeature', 'user123');
      
      expect(mockRedisClient.get).toHaveBeenCalledWith('testFeature:user:user123');
      expect(result).toBe(true);
    });
    
    it('deve usar cache para consultas repetidas', async () => {
      // Primeira chamada
      mockRedisClient.get.mockResolvedValueOnce('true');
      await featureFlags.isEnabled('testFeature');
      
      // Segunda chamada (deve usar cache)
      await featureFlags.isEnabled('testFeature');
      
      // O Redis.get deve ter sido chamado apenas uma vez
      expect(mockRedisClient.get).toHaveBeenCalledTimes(1);
    });
    
    it('deve lidar com erros ao verificar feature', async () => {
      // Simular erro
      mockRedisClient.get.mockRejectedValueOnce(new Error('Redis error'));
      
      const result = await featureFlags.isEnabled('testFeature');
      
      expect(result).toBe(false);
    });
  });
  
  describe('Configuração de features', () => {
    it('deve definir feature flag global', async () => {
      await featureFlags.setFeatureFlag('testFeature', true);
      
      expect(mockRedisClient.set).toHaveBeenCalledWith('testFeature', 'true');
    });
    
    it('deve definir feature flag para usuário específico', async () => {
      await featureFlags.setUserFeatureFlag('testFeature', 'user123', true);
      
      expect(mockRedisClient.set).toHaveBeenCalledWith('testFeature:user:user123', 'true');
    });
    
    it('deve configurar rollout percentual', async () => {
      await featureFlags.setPercentageRollout('testFeature', 50);
      
      expect(mockRedisClient.set).toHaveBeenCalledWith('testFeature:percentage', '50');
    });
    
    it('deve validar porcentagem no rollout', async () => {
      await expect(featureFlags.setPercentageRollout('testFeature', 101)).rejects.toThrow('Porcentagem deve estar entre 0 e 100');
    });
    
    it('deve limpar cache ao atualizar feature', async () => {
      // Primeiro, preencher o cache
      mockRedisClient.get.mockResolvedValueOnce('true');
      await featureFlags.isEnabled('testFeature');
      
      // Depois, atualizar a feature
      await featureFlags.setFeatureFlag('testFeature', false);
      
      // Verificar novamente (não deve usar cache)
      mockRedisClient.get.mockResolvedValueOnce('false');
      const result = await featureFlags.isEnabled('testFeature');
      
      expect(result).toBe(false);
      expect(mockRedisClient.get).toHaveBeenCalledTimes(2);
    });
  });
  
  describe('Listagem de features', () => {
    it('deve listar todas as features', async () => {
      // Configurar mock para retornar lista de chaves
      mockRedisClient.keys.mockResolvedValueOnce(['feature1', 'feature2', 'feature3:user:123', 'feature3:percentage']);
      mockRedisClient.get.mockResolvedValueOnce('true');
      mockRedisClient.get.mockResolvedValueOnce('false');
      
      const result = await featureFlags.getAllFeatures();
      
      expect(result).toEqual({
        feature1: true,
        feature2: false
      });
    });
  });
  
  describe('Fechamento', () => {
    it('deve fechar a conexão com Redis', async () => {
      await featureFlags.close();
      
      expect(mockRedisClient.quit).toHaveBeenCalled();
      expect(featureFlags.redisClient).toBeNull();
    });
  });
});
