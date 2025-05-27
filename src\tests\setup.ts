```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi, describe, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Adicionar matchers do jest-dom ao expect
expect.extend(matchers);

// Cleanup após cada teste
afterEach(() => {
  cleanup();
});

// Mock do ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(cb: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock do IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  get root() { return null; }
  get rootMargin() { return ''; }
  get thresholds() { return []; }
  takeRecords() { return []; }
};

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});


describe('Test environment setup', () => { // Added describe block for better organization

  it('should mock ResizeObserver correctly', () => {
    expect(global.ResizeObserver).toBeDefined();
    const resizeObserver = new ResizeObserver(() => {});
    expect(resizeObserver.observe).toBeDefined();
    expect(resizeObserver.unobserve).toBeDefined();
    expect(resizeObserver.disconnect).toBeDefined();
  });

  it('should mock IntersectionObserver correctly', () => {
    expect(global.IntersectionObserver).toBeDefined();
    const intersectionObserver = new IntersectionObserver(() => {});
    expect(intersectionObserver.observe).toBeDefined();
    expect(intersectionObserver.unobserve).toBeDefined();
    expect(intersectionObserver.disconnect).toBeDefined();
  });

  it('should mock matchMedia correctly', () => {
    expect(window.matchMedia).toBeDefined();
    expect(window.matchMedia('(min-width: 768px)')).toBeDefined(); //Example usage
  });
});

//Observações:
//1. Adicionar testes para verificar o funcionamento dos mocks em cenários reais de componentes.  
//2. Considerar a utilização de `@testing-library/user-event` para simular interações do usuário de forma mais precisa.
//3. Adicionar testes para verificar a limpeza correta do `afterEach`
//4. Implementar testes para verificar o comportamento do  `TextEncoder` e `TextDecoder` mockados.

```
