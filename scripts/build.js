
#!/usr/bin/env node

/**
 * Script para construir e verificar a aplicação
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.blue}=== Iniciando build da aplicação ===${colors.reset}\n`);

// Função para executar comandos e exibir saída
function runCommand(command, description) {
  console.log(`${colors.cyan}► ${description}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✓ ${description} concluído com sucesso!${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ ${description} falhou!${colors.reset}`);
    console.error(`${colors.dim}${error.message}${colors.reset}\n`);
    return false;
  }
}

// Verificar se há mudanças não commitadas (opcional, mas útil para ambientes de CI/CD)
console.log(`${colors.yellow}Verificando estado do repositório...${colors.reset}`);
try {
  const status = execSync('git status --porcelain').toString();
  if (status.trim()) {
    console.warn(`${colors.yellow}⚠ Há mudanças não commitadas no repositório.${colors.reset}`);
  } else {
    console.log(`${colors.green}✓ Repositório limpo.${colors.reset}\n`);
  }
} catch (error) {
  console.warn(`${colors.yellow}⚠ Não foi possível verificar o estado do git: ${error.message}${colors.reset}\n`);
}

// Etapa 1: Verificação de tipos TypeScript
const typeCheckSuccess = runCommand('tsc --noEmit', 'Verificação de tipos TypeScript');

// Etapa 2: Lint (se eslint estiver configurado)
let lintSuccess = true;
try {
  fs.accessSync(path.join(process.cwd(), '.eslintrc.js'), fs.constants.F_OK);
  lintSuccess = runCommand('eslint "src/**/*.{ts,tsx,js,jsx}"', 'Verificação de lint');
} catch (error) {
  console.log(`${colors.yellow}⚠ ESLint não configurado, pulando verificação de lint${colors.reset}\n`);
}

// Etapa 3: Testes unitários
const testsSuccess = runCommand('jest --passWithNoTests', 'Testes unitários');

// Etapa 4: Build da aplicação
const buildSuccess = runCommand('vite build', 'Build da aplicação');

// Etapa 5: Verificar o tamanho do bundle (opcional)
let bundleSizeSuccess = true;
try {
  fs.accessSync(path.join(process.cwd(), 'dist'), fs.constants.F_OK);
  console.log(`${colors.cyan}► Analisando tamanho do bundle...${colors.reset}`);
  
  const distFiles = fs.readdirSync(path.join(process.cwd(), 'dist/assets'))
    .filter(file => file.endsWith('.js') || file.endsWith('.css'));
  
  let totalSize = 0;
  
  console.log(`${colors.dim}Arquivos gerados:${colors.reset}`);
  distFiles.forEach(file => {
    const filePath = path.join(process.cwd(), 'dist/assets', file);
    const stats = fs.statSync(filePath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    console.log(`  - ${file}: ${fileSizeKB} KB`);
  });
  
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`${colors.dim}Tamanho total: ${totalSizeMB} MB${colors.reset}\n`);
} catch (error) {
  console.warn(`${colors.yellow}⚠ Não foi possível analisar o tamanho do bundle: ${error.message}${colors.reset}\n`);
}

// Resumo final
console.log(`${colors.bright}${colors.blue}=== Resumo do build ===${colors.reset}`);
console.log(`${typeCheckSuccess ? colors.green : colors.red}Verificação de tipos: ${typeCheckSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${lintSuccess ? colors.green : colors.red}Verificação de lint: ${lintSuccess ? 'PASSOU' : 'PULADO/FALHOU'}${colors.reset}`);
console.log(`${testsSuccess ? colors.green : colors.red}Testes unitários: ${testsSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${buildSuccess ? colors.green : colors.red}Build da aplicação: ${buildSuccess ? 'CONCLUÍDO' : 'FALHOU'}${colors.reset}`);

const allPassed = typeCheckSuccess && lintSuccess && testsSuccess && buildSuccess;

console.log(`\n${allPassed ? colors.green : colors.red}${colors.bright}Resultado final: ${allPassed ? 'BUILD SUCESSO' : 'BUILD FALHOU'}${colors.reset}`);

if (buildSuccess) {
  console.log(`\n${colors.yellow}Os arquivos de build estão disponíveis no diretório 'dist'.${colors.reset}`);
  console.log(`${colors.yellow}Para testar localmente, execute 'npx vite preview'.${colors.reset}`);
}

process.exit(allPassed ? 0 : 1);
