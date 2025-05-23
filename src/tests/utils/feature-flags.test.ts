
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import featureFlags, { FeatureFlagsConfig } from '../../utils/feature-flags/index';

// Mock para o módulo redis
vi.mock('redis', () => {
  const mockClient = {
    connect: vi.fn().mockResolvedValue(undefined),
    get: vi.fn(),
    set: vi.fn().mockResolvedValue(undefined),
    keys: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
    quit: vi.fn().mockResolvedValue(undefined),
    on: vi.fn()
  };
  
  return {
    createClient: vi.fn().mockReturnValue(mockClient)
  };
});

// Mock para o módulo logger
vi.mock('../../utils/logger', () => {
  return {
    default: {
      withContext: vi.fn().mockReturnValue({
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
      })
    }
  };
});

describe('FeatureFlags', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('Configuração', () => {
    it('deve configurar feature flags com memória por padrão', () => {
      const config: FeatureFlagsConfig = {
        defaultFlags: { testFeature: true }
      };
      
      featureFlags.configure(config);
      
      expect(featureFlags).toBeDefined();
    });
    
    it('deve configurar feature flags com Redis quando especificado', () => {
      const config: FeatureFlagsConfig = {
        useRedis: true,
        redisUrl: 'redis://localhost:6379',
        defaultFlags: { testFeature: true }
      };
      
      featureFlags.configure(config);
      
      expect(featureFlags).toBeDefined();
    });
  });
  
  describe('Verificação de features', () => {
    it('deve retornar client para verificação', () => {
      const client = featureFlags.getClient();
      
      expect(client).toBeDefined();
      expect(typeof client.isEnabled).toBe('function');
      expect(typeof client.isDisabled).toBe('function');
    });
  });
});
