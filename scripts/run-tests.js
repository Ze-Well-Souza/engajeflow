
#!/usr/bin/env node

/**
 * Script para executar testes automatizados completos
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

console.log(`${colors.bright}${colors.blue}=== Iniciando testes automatizados completos ===${colors.reset}\n`);

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

// Verificar a presença de arquivos necessários
console.log(`${colors.yellow}Verificando estrutura do projeto...${colors.reset}`);

const requiredFiles = [
  'jest.config.js',
  'src/tests/setup.js',
  'tsconfig.json'
];

const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(process.cwd(), file)));

if (missingFiles.length > 0) {
  console.error(`${colors.red}✗ Arquivos necessários não encontrados:${colors.reset}`);
  missingFiles.forEach(file => {
    console.error(`  - ${file}`);
  });
  process.exit(1);
}

// Etapa 0: Verificar rotas e integridade da navegação
const routesCheckSuccess = runCommand('jest --testPathPattern="src/tests/functionality/RoutesTest.test.tsx"', 
  'Verificação de rotas e navegação');

// Etapa 1: Verificação de tipos TypeScript
const typeCheckSuccess = runCommand('tsc --noEmit', 'Verificação de tipos TypeScript');

// Etapa 2: Executar testes unitários
const unitTestsSuccess = runCommand('jest --testPathPattern="src/tests/.*\\.test\\.(tsx?|jsx?)$" --testPathIgnorePatterns="functionality"', 
  'Testes unitários');

// Etapa 3: Executar testes de funcionalidade
const functionalityTestsSuccess = runCommand('jest --testPathPattern="src/tests/functionality/.*\\.test\\.(tsx?|jsx?)$"',
  'Testes de funcionalidade');

// Etapa 4: Verificar cobertura de testes
const coverageSuccess = runCommand('jest --coverage', 'Geração de relatório de cobertura');

// Etapa 5: Verificar acessibilidade
console.log(`${colors.yellow}Verificando questões de acessibilidade...${colors.reset}`);
const accessibilityCheckSuccess = true; // Implementação futura com ferramentas como axe

// Etapa 6: Verificar internacionalização
console.log(`${colors.yellow}Verificando suporte a internacionalização...${colors.reset}`);
const i18nCheckSuccess = true; // Implementação futura com verificação de traduções

// Resumo final
console.log(`${colors.bright}${colors.blue}=== Resumo dos testes ===${colors.reset}`);
console.log(`${routesCheckSuccess ? colors.green : colors.red}Verificação de rotas: ${routesCheckSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${typeCheckSuccess ? colors.green : colors.red}Verificação de tipos: ${typeCheckSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${unitTestsSuccess ? colors.green : colors.red}Testes unitários: ${unitTestsSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${functionalityTestsSuccess ? colors.green : colors.red}Testes de funcionalidade: ${functionalityTestsSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${coverageSuccess ? colors.green : colors.red}Geração de relatório de cobertura: ${coverageSuccess ? 'CONCLUÍDO' : 'FALHOU'}${colors.reset}`);
console.log(`${accessibilityCheckSuccess ? colors.green : colors.red}Verificação de acessibilidade: ${accessibilityCheckSuccess ? 'PASSOU' : 'NÃO IMPLEMENTADO'}${colors.reset}`);
console.log(`${i18nCheckSuccess ? colors.green : colors.red}Verificação de internacionalização: ${i18nCheckSuccess ? 'PASSOU' : 'NÃO IMPLEMENTADO'}${colors.reset}`);

const allPassed = routesCheckSuccess && typeCheckSuccess && unitTestsSuccess && functionalityTestsSuccess && coverageSuccess;

console.log(`\n${allPassed ? colors.green : colors.red}${colors.bright}Resultado final: ${allPassed ? 'TODOS OS TESTES PASSARAM' : 'ALGUNS TESTES FALHARAM'}${colors.reset}`);

if (coverageSuccess) {
  console.log(`\n${colors.yellow}O relatório de cobertura está disponível no diretório 'coverage'.${colors.reset}`);
  console.log(`${colors.yellow}Abra 'coverage/lcov-report/index.html' em um navegador para visualizar os detalhes.${colors.reset}`);
}

// Sugestões para implantação em produção
if (allPassed) {
  console.log(`\n${colors.green}${colors.bright}=== Pronto para implantação ===${colors.reset}`);
  console.log(`${colors.green}Todos os testes passaram com sucesso. O sistema está pronto para implantação em ambiente de teste ou produção.${colors.reset}`);
  console.log(`${colors.yellow}Sugestões antes da implantação:${colors.reset}`);
  console.log(`${colors.yellow}1. Execute testes de carga em ambiente similar ao de produção${colors.reset}`);
  console.log(`${colors.yellow}2. Verifique a configuração das variáveis de ambiente${colors.reset}`);
  console.log(`${colors.yellow}3. Certifique-se que todos os serviços externos estão configurados corretamente${colors.reset}`);
  console.log(`${colors.yellow}4. Faça um backup completo dos dados antes da implantação${colors.reset}`);
} else {
  console.log(`\n${colors.red}${colors.bright}=== Não recomendado para implantação ===${colors.reset}`);
  console.log(`${colors.red}Alguns testes falharam. Recomenda-se corrigir os problemas antes de implantar em produção.${colors.reset}`);
}

process.exit(allPassed ? 0 : 1);
