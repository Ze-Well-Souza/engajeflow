
#!/usr/bin/env node

/**
 * Script para executar testes de validação pré-produção
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

console.log(`${colors.bright}${colors.blue}=== Executando testes de validação pré-produção ===${colors.reset}\n`);

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

// Verificar se as variáveis de ambiente necessárias estão presentes
function checkRequiredEnvVars() {
  console.log(`${colors.yellow}Verificando variáveis de ambiente obrigatórias...${colors.reset}`);
  
  // Verificar o arquivo .env no diretório atual
  const envExists = fs.existsSync(path.join(process.cwd(), '.env'));
  const envExampleExists = fs.existsSync(path.join(process.cwd(), '.env.example'));
  
  if (!envExists && envExampleExists) {
    console.warn(`${colors.yellow}⚠ Arquivo .env não encontrado mas .env.example existe.${colors.reset}`);
    console.warn(`${colors.yellow}  Considere copiar .env.example para .env e configurar as variáveis.${colors.reset}`);
    return false;
  } else if (!envExists) {
    console.error(`${colors.red}✗ Arquivo .env não encontrado!${colors.reset}`);
    return false;
  }
  
  // Verificar variáveis obrigatórias para produção
  const requiredVars = [
    'NODE_ENV',
    'TECHCARE_BASE_URL',
    'OPERATION_MODE'
  ];
  
  let allVarsPresent = true;
  
  try {
    // Ler o arquivo .env mas não carregá-lo para não afetar o ambiente atual
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
    const envLines = envContent.split('\n');
    
    const missingVars = [];
    
    for (const reqVar of requiredVars) {
      const varFound = envLines.some(line => {
        const match = line.match(new RegExp(`^${reqVar}=(.+)`));
        return match && match[1] && match[1].trim() !== '';
      });
      
      if (!varFound) {
        missingVars.push(reqVar);
        allVarsPresent = false;
      }
    }
    
    if (missingVars.length > 0) {
      console.error(`${colors.red}✗ Variáveis de ambiente obrigatórias não encontradas: ${missingVars.join(', ')}${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ Todas as variáveis de ambiente obrigatórias estão configuradas.${colors.reset}\n`);
    }
  } catch (error) {
    console.error(`${colors.red}✗ Erro ao ler arquivo .env: ${error.message}${colors.reset}`);
    allVarsPresent = false;
  }
  
  return allVarsPresent;
}

// Etapa 1: Verificar tipos TypeScript
const typeCheckSuccess = runCommand('tsc --noEmit', 'Verificação de tipos TypeScript');

// Etapa 2: Executar testes unitários
const unitTestsSuccess = runCommand('vitest run', 'Testes unitários');

// Etapa 3: Executar testes de funcionalidade
const e2eTestsSuccess = runCommand('vitest run "src/tests/e2e/.*\\.test\\.ts$"', 'Testes end-to-end');

// Etapa 4: Verificar variáveis de ambiente
const envVarsSuccess = checkRequiredEnvVars();

// Etapa 5: Verificar o build de produção
const buildSuccess = runCommand('vite build', 'Build de produção');

// Resumo final
console.log(`${colors.bright}${colors.blue}=== Resumo dos testes de validação ===${colors.reset}`);
console.log(`${typeCheckSuccess ? colors.green : colors.red}Verificação de tipos: ${typeCheckSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${unitTestsSuccess ? colors.green : colors.red}Testes unitários: ${unitTestsSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${e2eTestsSuccess ? colors.green : colors.red}Testes end-to-end: ${e2eTestsSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${envVarsSuccess ? colors.green : colors.red}Verificação de variáveis de ambiente: ${envVarsSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
console.log(`${buildSuccess ? colors.green : colors.red}Build de produção: ${buildSuccess ? 'PASSOU' : 'FALHOU'}${colors.reset}`);

const allPassed = typeCheckSuccess && unitTestsSuccess && e2eTestsSuccess && envVarsSuccess && buildSuccess;

console.log(`\n${allPassed ? colors.green : colors.red}${colors.bright}Resultado final: ${allPassed ? 'TODOS OS TESTES PASSARAM' : 'ALGUNS TESTES FALHARAM'}${colors.reset}`);

if (allPassed) {
  console.log(`\n${colors.green}${colors.bright}=== Sistema validado para produção ===${colors.reset}`);
  console.log(`${colors.yellow}Próximos passos:${colors.reset}`);
  console.log(`${colors.yellow}1. Execute as verificações pré-deploy com "node src/scripts/pre-deploy-checks.js"${colors.reset}`);
  console.log(`${colors.yellow}2. Faça deploy em ambiente de staging${colors.reset}`);
  console.log(`${colors.yellow}3. Execute verificações pós-deploy com "node src/scripts/post-deploy-checks.js"${colors.reset}`);
} else {
  console.log(`\n${colors.red}${colors.bright}=== Correção necessária antes do deploy ===${colors.reset}`);
  console.log(`${colors.red}Corrija os problemas acima antes de prosseguir para o deploy.${colors.reset}`);
}

process.exit(allPassed ? 0 : 1);
