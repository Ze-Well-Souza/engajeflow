
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import NavigationService from '../../services/techcare/NavigationService';

// Mock do Puppeteer
vi.mock('puppeteer', async () => {
  return {
    default: {
      launch: vi.fn().mockImplementation(() => {
        return {
          newPage: vi.fn().mockImplementation(() => {
            return {
              goto: vi.fn().mockResolvedValue({}),
              waitForSelector: vi.fn().mockResolvedValue({}),
              click: vi.fn().mockResolvedValue({}),
              url: vi.fn().mockReturnValue('https://techcare.com/dashboard'),
              close: vi.fn().mockResolvedValue({})
            };
          }),
          close: vi.fn().mockResolvedValue({})
        };
      })
    }
  };
});

describe('NavigationService', () => {
  beforeAll(() => {
    // Configurar o serviço de navegação para os testes
    NavigationService.configureNavigation({
      baseUrl: 'https://techcare.com',
      timeout: 5000
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve abrir um navegador com sucesso', () => {
    NavigationService.openBrowser();
    expect(NavigationService.isNavigatorOpen()).toBe(true);
  });

  it('deve navegar para uma URL com sucesso', async () => {
    NavigationService.openBrowser();
    
    const result = await NavigationService.navigateToUrl('/dashboard');
    
    expect(result.success).toBe(true);
  });

  it('deve fechar o navegador', () => {
    NavigationService.openBrowser();
    expect(NavigationService.isNavigatorOpen()).toBe(true);
    
    NavigationService.closeBrowser();
    expect(NavigationService.isNavigatorOpen()).toBe(false);
  });

  it('deve retornar a URL atual', () => {
    NavigationService.openBrowser();
    
    const url = NavigationService.getCurrentUrl();
    expect(url).toContain('techcare.com');
  });
});
