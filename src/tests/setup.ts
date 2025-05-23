// Arquivo de setup para testes do Vitest
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest'; // Importa a extensão para Vitest

// Estende o expect do Vitest com os matchers do jest-dom
expect.extend(matchers);

// Exemplo: Mock global para localStorage se JSDOM não for suficiente
// import { vi } from 'vitest';
// const localStorageMock = (() => {
//   let store = {};
//   return {
//     getItem: (key) => store[key] || null,
//     setItem: (key, value) => { store[key] = value.toString(); },
//     removeItem: (key) => { delete store[key]; },
//     clear: () => { store = {}; }
//   };
// })();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

console.log('Vitest setup file loaded and jest-dom matchers extended.');

