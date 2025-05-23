
#!/usr/bin/env node

/**
 * Script para executar verificações pós-deploy
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { deployConfig } = require('../config/deploy');
const fetch = require('node-fetch');

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

console.log(`${colors.bright}${colors.blue}=== Executando verificações pós-deploy ===${colors.reset}\n`);

// Obter URL base do sistema implantado
const BASE_URL = process.argv[2];

if (!BASE_URL) {
  console.error(`${colors.red}Erro: URL base não fornecida.${colors.reset}`);
  console.error(`${colors.yellow}Uso: node post-deploy-checks.js <BASE_URL>${colors.reset}`);
  console.error(`${colors.yellow}Exemplo: node post-deploy-checks.js https://meuapp.com${colors.reset}`);
  process.exit(1);
}

// Verificar disponibilidade da API
async function checkApiHealth() {
  console.log(`${colors.yellow}Verificando disponibilidade da API...${colors.reset}`);
  
  try {
    // Verificar endpoint de saúde
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    
    if (!healthResponse.ok) {
      console.error(`${colors.red}✗ API health check falhou. Status: ${healthResponse.status}${colors.reset}`);
      return false;
    }
    
    console.log(`${colors.green}✓ API health check passou.${colors.reset}`);
    
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Erro ao verificar disponibilidade da API: ${error.message}${colors.reset}`);
    return false;
  }
}

// Verificar tempos de resposta
async function checkResponseTimes() {
  console.log(`${colors.yellow}Verificando tempos de resposta...${colors.reset}`);
  
  try {
    const endpoints = [
      { url: `/api/health`, name: 'Health' },
      { url: `/api/status`, name: 'Status' },
    ];
    
    let allEndpointsValid = true;
    
    for (const endpoint of endpoints) {
      const startTime = Date.now();
      try {
        const response = await fetch(`${BASE_URL}${endpoint.url}`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (!response.ok) {
          console.error(`${colors.red}✗ Endpoint ${endpoint.name} retornou status ${response.status}${colors.reset}`);
          allEndpointsValid = false;
          continue;
        }
        
        const isResponseTimeAcceptable = responseTime < 1000; // Limite de 1 segundo
        
        if (!isResponseTimeAcceptable) {
          console.warn(`${colors.yellow}⚠ Endpoint ${endpoint.name} está lento: ${responseTime}ms${colors.reset}`);
        } else {
          console.log(`${colors.green}✓ Endpoint ${endpoint.name}: ${responseTime}ms${colors.reset}`);
        }
      } catch (error) {
        console.error(`${colors.red}✗ Erro ao acessar endpoint ${endpoint.name}: ${error.message}${colors.reset}`);
        allEndpointsValid = false;
      }
    }
    
    return allEndpointsValid;
  } catch (error) {
    console.error(`${colors.red}✗ Erro ao verificar tempos de resposta: ${error.message}${colors.reset}`);
    return false;
  }
}

// Verificar headers de segurança
async function checkSecurityHeaders() {
  console.log(`${colors.yellow}Verificando headers de segurança...${colors.reset}`);
  
  try {
    const response = await fetch(BASE_URL);
    const headers = response.headers;
    
    const requiredHeaders = Object.keys(deployConfig.securityHeaders);
    let allHeadersPresent = true;
    
    for (const header of requiredHeaders) {
      const headerValue = headers.get(header);
      
      if (!headerValue) {
        console.error(`${colors.red}✗ Header de segurança ${header} não encontrado${colors.reset}`);
        allHeadersPresent = false;
        continue;
      }
      
      const expectedValue = deployConfig.securityHeaders[header];
      const headerMatches = headerValue === expectedValue;
      
      if (!headerMatches) {
        console.warn(`${colors.yellow}⚠ Header ${header} tem valor diferente do esperado.${colors.reset}`);
        console.warn(`${colors.yellow}  Esperado: ${expectedValue}${colors.reset}`);
        console.warn(`${colors.yellow}  Recebido: ${headerValue}${colors.reset}`);
      } else {
        console.log(`${colors.green}✓ Header ${header} configurado corretamente.${colors.reset}`);
      }
    }
    
    return allHeadersPresent;
  } catch (error) {
    console.error(`${colors.red}✗ Erro ao verificar headers de segurança: ${error.message}${colors.reset}`);
    return false;
  }
}

// Verificar disponibilidade de recursos estáticos
async function checkStaticResources() {
  console.log(`${colors.yellow}Verificando disponibilidade de recursos estáticos...${colors.reset}`);
  
  try {
    const resources = [
      '/index.html',
      '/robots.txt',
    ];
    
    let allResourcesAvailable = true;
    
    for (const resource of resources) {
      try {
        const response = await fetch(`${BASE_URL}${resource}`);
        
        if (!response.ok) {
          console.error(`${colors.red}✗ Recurso estático ${resource} não disponível. Status: ${response.status}${colors.reset}`);
          allResourcesAvailable = false;
          continue;
        }
        
        console.log(`${colors.green}✓ Recurso estático ${resource} disponível.${colors.reset}`);
      } catch (error) {
        console.error(`${colors.red}✗ Erro ao acessar recurso ${resource}: ${error.message}${colors.reset}`);
        allResourcesAvailable = false;
      }
    }
    
    return allResourcesAvailable;
  } catch (error) {
    console.error(`${colors.red}✗ Erro ao verificar recursos estáticos: ${error.message}${colors.reset}`);
    return false;
  }
}

// Executar todas as verificações
async function runAllChecks() {
  const results = {
    apiHealth: await checkApiHealth(),
    responseTimes: await checkResponseTimes(),
    securityHeaders: await checkSecurityHeaders(),
    staticResources: await checkStaticResources()
  };
  
  // Verificar se há algum erro crítico
  const hasCriticalError = !results.apiHealth || !results.staticResources;
  
  // Resumo final
  console.log(`${colors.bright}${colors.blue}=== Resumo das verificações pós-deploy ===${colors.reset}`);
  console.log(`${results.apiHealth ? colors.green : colors.red}Disponibilidade da API: ${results.apiHealth ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
  console.log(`${results.responseTimes ? colors.green : colors.yellow}Tempos de resposta: ${results.responseTimes ? 'PASSOU' : 'ATENÇÃO'}${colors.reset}`);
  console.log(`${results.securityHeaders ? colors.green : colors.red}Headers de segurança: ${results.securityHeaders ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
  console.log(`${results.staticResources ? colors.green : colors.red}Recursos estáticos: ${results.staticResources ? 'PASSOU' : 'FALHOU'}${colors.reset}`);
  
  if (hasCriticalError) {
    console.log(`\n${colors.red}${colors.bright}=== Verificações pós-deploy falharam ===${colors.reset}`);
    console.log(`${colors.red}Há problemas críticos que precisam ser resolvidos. Considere reverter o deploy.${colors.reset}`);
    return false;
  } else {
    console.log(`\n${colors.green}${colors.bright}=== Verificações pós-deploy concluídas com sucesso ===${colors.reset}`);
    console.log(`${colors.yellow}O sistema está funcionando conforme esperado.${colors.reset}`);
    if (!results.responseTimes || !results.securityHeaders) {
      console.log(`${colors.yellow}Há pontos de atenção que podem ser melhorados nas próximas versões.${colors.reset}`);
    }
    return true;
  }
}

// Executar todas as verificações e sair com código apropriado
runAllChecks()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error(`${colors.red}Erro ao executar verificações pós-deploy: ${error.message}${colors.reset}`);
    process.exit(1);
  });
