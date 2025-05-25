
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FeatureFlagsManager, featureFlags } from '../../utils/feature-flags/index';

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
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
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
  
  describe('FeatureFlagsManager', () => {
    it('should create a new instance', () => {
      const manager = new FeatureFlagsManager();
      expect(manager).toBeDefined();
    });
    
    it('should set and check flags', () => {
      const manager = new FeatureFlagsManager();
      manager.setFlag('testFeature', true, 'Test feature description');
      
      expect(manager.isEnabled('testFeature')).toBe(true);
      expect(manager.isEnabled('nonExistentFeature')).toBe(false);
    });
    
    it('should get all flags', () => {
      const manager = new FeatureFlagsManager();
      manager.setFlag('feature1', true, 'Feature 1');
      manager.setFlag('feature2', false, 'Feature 2');
      
      const allFlags = manager.getAllFlags();
      expect(allFlags).toHaveLength(2);
      expect(allFlags[0].name).toBe('feature1');
      expect(allFlags[1].name).toBe('feature2');
    });
  });
  
  describe('Global featureFlags instance', () => {
    it('should be available globally', () => {
      expect(featureFlags).toBeDefined();
      expect(featureFlags).toBeInstanceOf(FeatureFlagsManager);
    });
  });
});
