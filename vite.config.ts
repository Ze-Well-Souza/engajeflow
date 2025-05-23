import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '8080-iy5yipxphnsh5c45a2s6m-6d6cba02.manusvm.computer',
      '.manusvm.computer'
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Adicionar configuração de teste para Vitest
  test: {
    globals: true, // Para usar APIs globais como describe, it, expect
    environment: 'jsdom', // Definir ambiente de teste para simular DOM
    setupFiles: './src/tests/setup.ts', // Arquivo de setup para mocks globais (se necessário)
    coverage: {
        provider: 'v8' // ou 'istanbul'
    }
  },
}));
