
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AuthService from '../../services/techcare/AuthService';
import * as envUtils from '../../utils/environment';

// Mock de toast e environment
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

vi.mock('../../utils/environment', () => ({
  getEnvVariable: vi.fn()
}));

describe('AuthService', () => {
  const getEnvVariableMock = vi.mocked(envUtils.getEnvVariable);

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
    
    // Mock default environment values
    getEnvVariableMock.mockImplementation((name, defaultValue = '') => {
      if (name === 'TECHCARE_USER') return 'test_user';
      if (name === 'TECHCARE_PASS') return 'test_password';
      if (name === 'TECHCARE_BASE_URL') return 'https://test.techcare.com';
      return defaultValue;
    });
    
    // Logout para reset do estado
    AuthService.logout();
  });

  it('should be a singleton', () => {
    expect(AuthService).toBeDefined();
  });

  it('should initialize with null token', () => {
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.getToken()).toBeNull();
  });

  it('should login successfully with environment credentials', async () => {
    const result = await AuthService.login();
    
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
    expect(AuthService.isAuthenticated()).toBe(true);
    expect(AuthService.getToken()).not.toBeNull();
    
    // Verify environment was checked
    expect(getEnvVariableMock).toHaveBeenCalledWith('TECHCARE_USER');
    expect(getEnvVariableMock).toHaveBeenCalledWith('TECHCARE_PASS');
  });

  it('should fail login when environment credentials are missing', async () => {
    // Mock missing credentials
    getEnvVariableMock.mockImplementation(() => '');
    
    const result = await AuthService.login();
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('Credenciais não configuradas');
    expect(AuthService.isAuthenticated()).toBe(false);
  });

  it('should logout correctly', async () => {
    // First login
    await AuthService.login();
    expect(AuthService.isAuthenticated()).toBe(true);
    
    // Then logout
    AuthService.logout();
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.getToken()).toBeNull();
  });
});
