
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationService from '../../../services/techcare/NavigationService';

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
              type: vi.fn().mockResolvedValue({}),
              evaluate: vi.fn().mockResolvedValue({}),
              $: vi.fn().mockResolvedValue({}),
              $$: vi.fn().mockResolvedValue([]),
              $eval: vi.fn().mockResolvedValue({}),
              $$eval: vi.fn().mockResolvedValue([]),
              waitForNavigation: vi.fn().mockResolvedValue({}),
              url: vi.fn().mockReturnValue('https://app.techcare.com/dashboard'),
              close: vi.fn().mockResolvedValue({})
            };
          }),
          close: vi.fn().mockResolvedValue({})
        };
      })
    }
  };
});

describe('NavigationService - Fluxo com Puppeteer mockado', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('basic functionality', () => {
    it('deve configurar navegação com sucesso', () => {
      const options = {
        baseUrl: 'https://app.techcare.com',
        timeout: 30000
      };
      
      NavigationService.configureNavigation(options);
      
      expect(NavigationService).toBeDefined();
    });

    it('deve abrir navegador com sucesso', () => {
      NavigationService.openBrowser();
      
      expect(NavigationService.isNavigatorOpen()).toBe(true);
    });

    it('deve navegar para URL com sucesso', async () => {
      NavigationService.openBrowser();
      
      await NavigationService.navigateToUrl('/dashboard');
      
      expect(NavigationService.getCurrentUrl()).toContain('/dashboard');
    });
  });

  describe('element interaction', () => {
    it('deve aguardar elemento com sucesso', async () => {
      NavigationService.openBrowser();
      
      const result = await NavigationService.waitForElement('.dashboard-element');
      
      expect(result).toBe(true);
    });

    it('deve executar script com sucesso', async () => {
      NavigationService.openBrowser();
      
      const result = await NavigationService.executeScript('return document.title');
      
      expect(result).toBeDefined();
      expect((result as any).success).toBe(true);
    });
  });

  describe('utility methods', () => {
    it('deve capturar screenshot', async () => {
      NavigationService.openBrowser();
      
      const screenshotPath = await NavigationService.takeScreenshot('/tmp/test');
      
      expect(screenshotPath).toContain('/tmp/test');
      expect(screenshotPath).toContain('.png');
    });

    it('deve fechar navegador', () => {
      NavigationService.openBrowser();
      expect(NavigationService.isNavigatorOpen()).toBe(true);
      
      NavigationService.closeBrowser();
      expect(NavigationService.isNavigatorOpen()).toBe(false);
    });
  });
});
