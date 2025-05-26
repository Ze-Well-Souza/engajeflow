
#!/usr/bin/env node

/**
 * Script para auxiliar no deploy para Vercel
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.blue}=== Preparando deploy para Vercel ===${colors.reset}\n`);

// Verificar se vercel CLI está instalado
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    console.log(`${colors.green}✓ Vercel CLI encontrado${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.yellow}⚠ Vercel CLI não encontrado. Instalando...${colors.reset}`);
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
      console.log(`${colors.green}✓ Vercel CLI instalado com sucesso${colors.reset}`);
      return true;
    } catch (installError) {
      console.error(`${colors.red}✗ Falha ao instalar Vercel CLI${colors.reset}`);
      return false;
    }
  }
}

// Verificar configurações necessárias
function checkConfiguration() {
  console.log(`${colors.cyan}► Verificando configurações...${colors.reset}`);
  
  // Verificar se vercel.json existe
  if (!fs.existsSync('vercel.json')) {
    console.error(`${colors.red}✗ Arquivo vercel.json não encontrado${colors.reset}`);
    return false;
  }
  
  // Verificar se build funciona
  try {
    console.log(`${colors.cyan}► Testando build...${colors.reset}`);
    execSync('npm run build', { stdio: 'inherit' });
    console.log(`${colors.green}✓ Build concluído com sucesso${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}✗ Falha no build${colors.reset}`);
    return false;
  }
  
  return true;
}

// Deploy para Vercel
function deployToVercel() {
  console.log(`${colors.cyan}► Fazendo deploy para Vercel...${colors.reset}`);
  
  try {
    // Deploy para preview primeiro
    console.log(`${colors.yellow}Criando deploy de preview...${colors.reset}`);
    execSync('vercel --confirm', { stdio: 'inherit' });
    
    console.log(`\n${colors.green}${colors.bright}Deploy de preview concluído com sucesso!${colors.reset}`);
    console.log(`${colors.yellow}Para fazer deploy para produção, execute: vercel --prod${colors.reset}`);
    
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Falha no deploy${colors.reset}`);
    return false;
  }
}

// Mostrar próximos passos
function showNextSteps() {
  console.log(`\n${colors.bright}${colors.blue}=== Próximos passos ===${colors.reset}`);
  console.log(`${colors.green}1. Configure as variáveis de ambiente no painel do Vercel:${colors.reset}`);
  console.log(`   ${colors.cyan}- VITE_SUPABASE_URL${colors.reset}`);
  console.log(`   ${colors.cyan}- VITE_SUPABASE_ANON_KEY${colors.reset}`);
  console.log(`   ${colors.cyan}- VITE_TECHCARE_BASE_URL${colors.reset}`);
  console.log(`   ${colors.cyan}- VITE_OPENAI_API_KEY (opcional)${colors.reset}`);
  
  console.log(`\n${colors.green}2. Para deploy em produção:${colors.reset}`);
  console.log(`   ${colors.cyan}vercel --prod${colors.reset}`);
  
  console.log(`\n${colors.green}3. Para configurar domínio personalizado:${colors.reset}`);
  console.log(`   ${colors.cyan}Acesse o painel do Vercel > Settings > Domains${colors.reset}`);
  
  console.log(`\n${colors.green}4. Monitoramento:${colors.reset}`);
  console.log(`   ${colors.cyan}Acesse: https://vercel.com/dashboard${colors.reset}`);
}

// Executar script
async function main() {
  try {
    if (!checkVercelCLI()) {
      process.exit(1);
    }
    
    if (!checkConfiguration()) {
      process.exit(1);
    }
    
    if (!deployToVercel()) {
      process.exit(1);
    }
    
    showNextSteps();
    
  } catch (error) {
    console.error(`${colors.red}Erro durante o deploy: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

main();
