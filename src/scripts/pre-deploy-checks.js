
#!/usr/bin/env node

/**
 * Script para executar verificações pré-deploy
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { deployConfig } = require('../config/deploy');

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

console.log(`${colors.bright}${colors.blue}=== Executando verificações pré-deploy ===${colors.reset}\n`);

// Verificação de variáveis de ambiente obrigatórias
function checkRequiredEnvVars() {
  console.log(`${colors.yellow}Verificando variáveis de ambiente obrigatórias...${colors.reset}`);
  
  const missingVars = [];
  
  for (const envVar of deployConfig.requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }
  
  if (missingVars.length > 0) {
    console.error(`${colors.red}✗ Variáveis de ambiente obrigatórias não definidas: ${missingVars.join(', ')}${colors.reset}`);
    return false;
  }
  
  console.log(`${colors.green}✓ Todas as variáveis de ambiente obrigatórias estão configuradas.${colors.reset}\n`);
  
  // Verificar variáveis recomendadas
  const missingRecommendedVars = [];
  
  for (const envVar of deployConfig.recommendedEnvVars) {
    if (!process.env[envVar]) {
      missingRecommendedVars.push(envVar);
    }
  }
  
  if (missingRecommendedVars.length > 0) {
    console.warn(`${colors.yellow}⚠ Variáveis de ambiente recomendadas mas não configuradas: ${missingRecommendedVars.join(', ')}${colors.reset}\n`);
  } else {
    console.log(`${colors.green}✓ Todas as variáveis de ambiente recomendadas estão configuradas.${colors.reset}\n`);
  }
  
  return true;
}

// Verificação de segurança
function checkSecurity() {
  console.log(`${colors.yellow}Verificando configurações de segurança...${colors.reset}`);
  
  // Verificar headers de segurança definidos no deployConfig
  const securityHeadersOk = Object.keys(deployConfig.securityHeaders).length > 0;
  
  if (!securityHeadersOk) {
    console.error(`${colors.red}✗ Headers de segurança não configurados adequadamente.${colors.reset}`);
    return false;
  }
  
  console.log(`${colors.green}✓ Headers de segurança configurados corretamente.${colors.reset}\n`);
  
  // Verificar SSL/HTTPS
  const forceHttps = process.env.FORCE_HTTPS === 'true';
  
  if (!forceHttps && process.env.NODE_ENV === 'production') {
    console.warn(`${colors.yellow}⚠ FORCE_HTTPS não está ativado para produção. Recomendamos ativar para segurança.${colors.reset}`);
  } else if (forceHttps) {
    console.log(`${colors.green}✓ FORCE_HTTPS está ativado.${colors.reset}`);
  }
  
  return true;
}

// Verificação de backup
function checkBackupStrategy() {
  console.log(`${colors.yellow}Verificando estratégia de backup...${colors.reset}`);
  
  const backupEnabled = process.env.ENABLE_AUTOMATED_BACKUPS === 'true';
  
  if (!backupEnabled) {
    console.warn(`${colors.yellow}⚠ Backups automáticos não estão ativados. Recomendamos ativar para produção.${colors.reset}`);
    return true;
  }
  
  console.log(`${colors.green}✓ Estratégia de backup configurada.${colors.reset}\n`);
  return true;
}

// Verificação de monitoramento
function checkMonitoring() {
  console.log(`${colors.yellow}Verificando configuração de monitoramento...${colors.reset}`);
  
  const monitoringEnabled = process.env.ENABLE_METRICS === 'true';
  
  if (!monitoringEnabled) {
    console.warn(`${colors.yellow}⚠ Monitoramento não está ativado. Recomendamos ativar para produção.${colors.reset}`);
    return true;
  }
  
  console.log(`${colors.green}✓ Monitoramento configurado.${colors.reset}\n`);
  return true;
}

// Verificação de configuração de cache
function checkCacheConfig() {
  console.log(`${colors.yellow}Verificando configuração de cache...${colors.reset}`);
  
  // Verificar se há políticas de cache definidas
  if (!deployConfig.cdn || !deployConfig.cdn.cacheControl) {
    console.warn(`${colors.yellow}⚠ Políticas de cache não configuradas adequadamente.${colors.reset}`);
    return true;
  }
  
  console.log(`${colors.green}✓ Configuração de cache validada.${colors.reset}\n`);
  return true;
}

// Executar todas as verificações
async function runAllChecks() {
  const results = {
    envVars: checkRequiredEnvVars(),
    security: checkSecurity(),
    backup: checkBackupStrategy(),
    monitoring: checkMonitoring(),
    cache: checkCacheConfig()
  };
  
  // Verificar se há algum erro crítico
  const hasCriticalError = !results.envVars || !results.security;
  
  // Resumo final
  console.log(`${colors.bright}${colors.blue}=== Resumo das verificações pré-deploy ===${colors.reset}`);
  console.log(`${results.envVars ? colors.green : colors.red}Variáveis de ambiente: ${results.envVars ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
  console.log(`${results.security ? colors.green : colors.red}Configurações de segurança: ${results.security ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
  console.log(`${results.backup ? colors.green : colors.yellow}Estratégia de backup: ${results.backup ? 'PASSOU' : 'ATENÇÃO'}${colors.reset}`);
  console.log(`${results.monitoring ? colors.green : colors.yellow}Configuração de monitoramento: ${results.monitoring ? 'PASSOU' : 'ATENÇÃO'}${colors.reset}`);
  console.log(`${results.cache ? colors.green : colors.yellow}Configuração de cache: ${results.cache ? 'PASSOU' : 'ATENÇÃO'}${colors.reset}`);
  
  if (hasCriticalError) {
    console.log(`\n${colors.red}${colors.bright}=== Verificações pré-deploy falharam ===${colors.reset}`);
    console.log(`${colors.red}Corrija os problemas críticos antes de prosseguir com o deploy.${colors.reset}`);
    return false;
  } else {
    console.log(`\n${colors.green}${colors.bright}=== Verificações pré-deploy concluídas com sucesso ===${colors.reset}`);
    console.log(`${colors.yellow}O sistema está pronto para deploy${colors.reset}`);
    console.log(`${colors.yellow}Recomendamos realizar primeiro um deploy em ambiente de staging.${colors.reset}`);
    return true;
  }
}

// Executar todas as verificações e sair com código apropriado
runAllChecks()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error(`${colors.red}Erro ao executar verificações pré-deploy: ${error.message}${colors.reset}`);
    process.exit(1);
  });
