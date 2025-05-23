
#!/usr/bin/env node

/**
 * Script para fazer deploy em ambiente de produção
 * 
 * Este script executa verificações pré-deploy rigorosas
 * e implementa deploy seguro em produção com capacidade
 * de rollback automático
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Configurações de produção
const PROD_SERVER = process.env.PROD_SERVER;
const PROD_USER = process.env.PROD_USER;
const DEPLOY_PATH = process.env.PROD_DEPLOY_PATH || '/var/www/html';
const BACKUP_PATH = process.env.PROD_BACKUP_PATH || '/var/backups/techcare';

console.log(`${colors.bright}${colors.magenta}=== INICIALIZANDO DEPLOY PARA PRODUÇÃO ===${colors.reset}\n`);

// Criar interface para perguntas ao usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para executar comandos e exibir saída
function runCommand(command, description, ignoreError = false) {
  console.log(`${colors.cyan}► ${description}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✓ ${description} concluído com sucesso!${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ ${description} falhou!${colors.reset}`);
    console.error(`${colors.dim}${error.message}${colors.reset}\n`);
    
    if (!ignoreError) {
      process.exit(1);
    }
    
    return false;
  }
}

// Verificações pré-deploy
function preDeployChecks() {
  console.log(`${colors.yellow}Executando verificações críticas pré-deploy...${colors.reset}`);
  
  // Verificar se estamos em um diretório de projeto válido
  const packageJsonExists = fs.existsSync(path.join(process.cwd(), 'package.json'));
  
  if (!packageJsonExists) {
    console.error(`${colors.red}✗ Erro: package.json não encontrado. Este script deve ser executado na raiz do projeto.${colors.reset}`);
    process.exit(1);
  }
  
  // Verificar se as credenciais de produção estão disponíveis
  if (!PROD_SERVER || !PROD_USER) {
    console.error(`${colors.red}✗ Erro: Credenciais de produção incompletas. Configure PROD_SERVER e PROD_USER.${colors.reset}`);
    console.log(`${colors.yellow}Você pode configurar essas variáveis no arquivo .env ou como variáveis de ambiente.${colors.reset}`);
    process.exit(1);
  }
  
  // Verificar se temos acesso ao servidor de produção
  try {
    execSync(`ssh -q ${PROD_USER}@${PROD_SERVER} exit`, { stdio: 'ignore' });
  } catch (error) {
    console.error(`${colors.red}✗ Erro: Não foi possível conectar ao servidor de produção.${colors.reset}`);
    console.error(`${colors.red}  Verifique suas credenciais e configuração SSH.${colors.reset}`);
    process.exit(1);
  }
  
  // Verificar se os testes unitários passam
  if (!runCommand('npm test -- --passWithNoTests', 'Executando testes unitários', true)) {
    askForConfirmation('Testes unitários falharam. Deseja continuar mesmo assim?', () => {
      console.log(`${colors.yellow}Continuando deploy mesmo com testes falhando...${colors.reset}\n`);
    }, () => {
      console.log(`${colors.red}Deploy cancelado pelo usuário.${colors.reset}`);
      process.exit(1);
    });
  }
  
  // Verificar se há problemas de lint
  runCommand('npm run lint', 'Verificando lint', true);
  
  console.log(`${colors.green}✓ Verificações pré-deploy concluídas.${colors.reset}\n`);
}

// Construir o projeto para produção
function buildForProduction() {
  console.log(`${colors.yellow}Preparando build para produção...${colors.reset}`);
  
  // Limpar build anterior
  runCommand('rm -rf dist', 'Limpando build anterior');
  
  // Definir NODE_ENV para produção
  process.env.NODE_ENV = 'production';
  
  // Executar build
  runCommand('npm run build', 'Build para produção');
  
  console.log(`${colors.green}✓ Build de produção concluído.${colors.reset}\n`);
}

// Criar backup do ambiente atual de produção
function createBackup() {
  console.log(`${colors.yellow}Criando backup da versão atual em produção...${colors.reset}`);
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupCommand = [
    `mkdir -p ${BACKUP_PATH}`,
    `cd ${DEPLOY_PATH}`,
    `tar -czf ${BACKUP_PATH}/techcare-${timestamp}.tar.gz .`
  ].join(' && ');
  
  runCommand(`ssh ${PROD_USER}@${PROD_SERVER} "${backupCommand}"`, 'Backup da versão atual');
  
  console.log(`${colors.green}✓ Backup criado em ${BACKUP_PATH}/techcare-${timestamp}.tar.gz${colors.reset}\n`);
  return `${BACKUP_PATH}/techcare-${timestamp}.tar.gz`;
}

// Upload e implantação da nova versão
function deployToProduction() {
  console.log(`${colors.yellow}Iniciando deploy para produção...${colors.reset}`);
  
  // Comprimir arquivos de build
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const distArchive = `dist-${timestamp}.tar.gz`;
  
  runCommand(`tar -czf ${distArchive} -C dist .`, 'Comprimindo arquivos de build');
  
  // Upload para o servidor
  runCommand(`scp ${distArchive} ${PROD_USER}@${PROD_SERVER}:~`, 'Upload para servidor de produção');
  
  // Implantação com estratégia blue-green
  const deployCommands = [
    // Preparar diretório temporário para a nova versão
    `mkdir -p ${DEPLOY_PATH}-new`,
    
    // Extrair arquivos para o novo diretório
    `tar -xzf ~/${distArchive} -C ${DEPLOY_PATH}-new`,
    
    // Configurar logs e diretórios de dados
    `mkdir -p ${DEPLOY_PATH}-new/logs ${DEPLOY_PATH}-new/data`,
    
    // Copiar arquivos de configuração do deploy atual (se existirem)
    `if [ -d ${DEPLOY_PATH}/config ]; then cp -rf ${DEPLOY_PATH}/config/* ${DEPLOY_PATH}-new/config/ 2>/dev/null || :; fi`,
    
    // Configurar permissões
    `chown -R www-data:www-data ${DEPLOY_PATH}-new`,
    
    // Switch para a nova versão (blue-green deploy)
    `mv ${DEPLOY_PATH} ${DEPLOY_PATH}-old || true`,
    `mv ${DEPLOY_PATH}-new ${DEPLOY_PATH}`,
    
    // Limpar arquivos temporários
    `rm ~/${distArchive}`,
    
    // Reiniciar serviços
    `systemctl restart nginx`,
    `systemctl restart techcare-services || true`,
    
    // Manter versão anterior por segurança (para rollback rápido)
    `touch ${DEPLOY_PATH}-old/.keep-for-rollback`
  ].join(' && ');
  
  runCommand(`ssh ${PROD_USER}@${PROD_SERVER} "${deployCommands}"`, 'Implantando nova versão');
  
  // Limpar arquivo local
  runCommand(`rm ${distArchive}`, 'Limpando arquivos temporários');
  
  console.log(`${colors.green}✓ Deploy para produção concluído com sucesso!${colors.reset}\n`);
}

// Monitorar saúde da aplicação após deploy
function monitorHealth() {
  console.log(`${colors.yellow}Monitorando saúde da aplicação...${colors.reset}`);
  
  // URL do endpoint de health check
  const healthEndpoint = `https://${PROD_SERVER}/api/health`;
  
  console.log(`${colors.cyan}Verificando saúde em ${healthEndpoint}...${colors.reset}`);
  
  // Tentar acessar o endpoint várias vezes
  let attempts = 0;
  const maxAttempts = 10;
  
  const interval = setInterval(() => {
    attempts++;
    
    try {
      execSync(`curl -s --fail ${healthEndpoint}`, { stdio: 'ignore' });
      clearInterval(interval);
      
      console.log(`${colors.green}✓ Aplicação respondendo corretamente após ${attempts} tentativa(s).${colors.reset}\n`);
      finishDeploy();
    } catch (error) {
      console.log(`${colors.yellow}Tentativa ${attempts}/${maxAttempts}: Aplicação ainda não está respondendo...${colors.reset}`);
      
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.error(`${colors.red}✗ Aplicação não está respondendo após ${maxAttempts} tentativas.${colors.reset}`);
        
        askForConfirmation('Deseja fazer rollback para a versão anterior?', () => {
          rollback();
        }, () => {
          console.log(`${colors.yellow}Continuando sem rollback. Verifique manualmente o status da aplicação.${colors.reset}`);
          finishDeploy();
        });
      }
    }
  }, 3000);
}

// Função para rollback em caso de problemas
function rollback() {
  console.log(`${colors.yellow}Iniciando processo de rollback...${colors.reset}`);
  
  const rollbackCommands = [
    // Verificar se temos uma versão anterior
    `if [ -d ${DEPLOY_PATH}-old ]; then`,
    
    // Fazer swap das versões
    `  mv ${DEPLOY_PATH} ${DEPLOY_PATH}-failed`,
    `  mv ${DEPLOY_PATH}-old ${DEPLOY_PATH}`,
    
    // Reiniciar serviços
    `  systemctl restart nginx`,
    `  systemctl restart techcare-services || true`,
    
    `  echo "Rollback concluído com sucesso."`,
    `else`,
    `  echo "Não foi possível fazer rollback: versão anterior não encontrada."`,
    `  exit 1`,
    `fi`
  ].join('\n');
  
  runCommand(`ssh ${PROD_USER}@${PROD_SERVER} "${rollbackCommands}"`, 'Rollback para versão anterior');
  
  console.log(`${colors.green}✓ Rollback concluído. Sistema restaurado para a versão anterior.${colors.reset}\n`);
  
  console.log(`${colors.red}${colors.bright}=== DEPLOY FALHOU - ROLLBACK EFETUADO ===${colors.reset}`);
  console.log(`${colors.yellow}Verifique os logs do servidor para identificar o problema.${colors.reset}`);
  
  cleanupAndExit(1);
}

// Finalizar o deploy
function finishDeploy() {
  console.log(`${colors.green}${colors.bright}=== DEPLOY PARA PRODUÇÃO CONCLUÍDO COM SUCESSO ===${colors.reset}\n`);
  
  // Limpar versão antiga após deploy bem-sucedido
  setTimeout(() => {
    const cleanupCommands = [
      `if [ -d ${DEPLOY_PATH}-old ]; then rm -rf ${DEPLOY_PATH}-old; fi`,
      `if [ -d ${DEPLOY_PATH}-failed ]; then rm -rf ${DEPLOY_PATH}-failed; fi`
    ].join(' && ');
    
    runCommand(`ssh ${PROD_USER}@${PROD_SERVER} "${cleanupCommands}"`, 'Limpeza de versões antigas', true);
  }, 300000); // Limpar após 5 minutos para garantir que tudo está funcionando
  
  console.log(`${colors.yellow}Próximos passos:${colors.reset}`);
  console.log(`${colors.yellow}1. Execute verificações de pós-deploy com: node src/scripts/post-deploy-checks.js https://${PROD_SERVER}${colors.reset}`);
  console.log(`${colors.yellow}2. Verifique os logs do servidor para garantir que tudo está funcionando corretamente${colors.reset}`);
  console.log(`${colors.yellow}3. Monitore o desempenho da aplicação nos próximos minutos${colors.reset}`);
  
  cleanupAndExit(0);
}

// Perguntar ao usuário para confirmação
function askForConfirmation(question, yesCallback, noCallback) {
  rl.question(`${colors.yellow}${question} (s/n) ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      yesCallback();
    } else {
      noCallback();
    }
  });
}

// Limpar recursos e sair
function cleanupAndExit(code) {
  rl.close();
  process.exit(code);
}

// Função principal
async function main() {
  // Exibir aviso de produção
  console.log(`${colors.red}${colors.bright}!!! ATENÇÃO !!! Você está prestes a fazer deploy em PRODUÇÃO${colors.reset}\n`);
  
  // Pedir confirmação do usuário
  askForConfirmation('Tem certeza de que deseja prosseguir com o deploy em produção?', () => {
    try {
      // Executar etapas de deploy
      preDeployChecks();
      buildForProduction();
      const backupPath = createBackup();
      deployToProduction();
      monitorHealth();
    } catch (error) {
      console.error(`${colors.red}${colors.bright}=== ERRO DURANTE O DEPLOY ===${colors.reset}`);
      console.error(`${colors.red}${error.message}${colors.reset}`);
      cleanupAndExit(1);
    }
  }, () => {
    console.log(`${colors.yellow}Deploy cancelado pelo usuário.${colors.reset}`);
    cleanupAndExit(0);
  });
}

// Iniciar o processo
main();
