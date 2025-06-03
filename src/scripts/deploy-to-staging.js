
#!/usr/bin/env node

/**
 * Script para fazer deploy em ambiente de staging
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

const STAGING_SERVER = process.env.STAGING_SERVER || 'staging.exemplo.com';
const STAGING_USER = process.env.STAGING_USER || 'deploy';
const DEPLOY_PATH = process.env.DEPLOY_PATH || '/var/www/html';

console.log(`${colors.bright}${colors.blue}=== Iniciando deploy para ambiente de staging ===${colors.reset}\n`);

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

// Verificar se o docker está instalado
function checkDocker() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Verificar se o ambiente está configurado corretamente antes do deploy
function preDeployChecks() {
  console.log(`${colors.yellow}Executando verificações pré-deploy...${colors.reset}`);
  
  // Verificar se estamos em um diretório de projeto válido
  const packageJsonExists = fs.existsSync(path.join(process.cwd(), 'package.json'));
  
  if (!packageJsonExists) {
    console.error(`${colors.red}✗ Erro: package.json não encontrado. Este script deve ser executado na raiz do projeto.${colors.reset}`);
    process.exit(1);
  }
  
  // Verificar se as credenciais de staging estão disponíveis
  if (!STAGING_SERVER || !STAGING_USER) {
    console.error(`${colors.red}✗ Erro: Credenciais de staging incompletas. Configure STAGING_SERVER e STAGING_USER.${colors.reset}`);
    console.log(`${colors.yellow}Você pode configurar essas variáveis no arquivo .env ou como variáveis de ambiente.${colors.reset}`);
    process.exit(1);
  }
  
  // Verificar se o Docker está instalado para build do container
  const dockerInstalled = checkDocker();
  
  if (!dockerInstalled) {
    console.error(`${colors.red}✗ Docker não encontrado. O Docker é necessário para fazer build da imagem.${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`${colors.green}✓ Todas as verificações pré-deploy passaram.${colors.reset}\n`);
  return true;
}

// Executar build do projeto
function buildProject() {
  console.log(`${colors.yellow}Preparando build do projeto...${colors.reset}`);
  
  // Limpar diretório de build anterior
  runCommand('rm -rf dist', 'Limpando diretório de build anterior', true);
  
  // Executar build de produção
  runCommand('npm run build', 'Build do projeto para produção');
  
  console.log(`${colors.green}✓ Build completo.${colors.reset}\n`);
}

// Construir imagem Docker
function buildDockerImage() {
  console.log(`${colors.yellow}Construindo imagem Docker...${colors.reset}`);
  
  // Verificar se Dockerfile existe
  const dockerfileExists = fs.existsSync(path.join(process.cwd(), 'Dockerfile'));
  
  if (!dockerfileExists) {
    console.error(`${colors.red}✗ Dockerfile não encontrado na raiz do projeto.${colors.reset}`);
    process.exit(1);
  }
  
  // Nome da imagem com timestamp para versionamento
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const imageName = `techcare-connect:staging-${timestamp}`;
  
  // Construir a imagem
  runCommand(`docker build -t ${imageName} .`, 'Construindo imagem Docker');
  
  // Salvar o nome da imagem para uso posterior
  fs.writeFileSync('.latest-image', imageName);
  
  console.log(`${colors.green}✓ Imagem Docker construída: ${imageName}${colors.reset}\n`);
  return imageName;
}

// Enviar imagem para o servidor de staging
function pushImageToStaging(imageName) {
  console.log(`${colors.yellow}Enviando imagem para servidor de staging...${colors.reset}`);
  
  // Salvar imagem em arquivo
  runCommand(`docker save ${imageName} | gzip > ${imageName}.tar.gz`, 'Salvando imagem em arquivo');
  
  // Enviar para o servidor
  runCommand(`scp ${imageName}.tar.gz ${STAGING_USER}@${STAGING_SERVER}:~`, 'Enviando imagem para servidor');
  
  // Limpar arquivo temporário
  runCommand(`rm ${imageName}.tar.gz`, 'Limpando arquivo temporário');
  
  console.log(`${colors.green}✓ Imagem enviada para o servidor de staging.${colors.reset}\n`);
}

// Implantar no servidor de staging
function deployToStaging(imageName) {
  console.log(`${colors.yellow}Implantando no servidor de staging...${colors.reset}`);
  
  const deployCommands = [
    `gunzip -c ~/${imageName}.tar.gz | docker load`,
    `docker stop techcare-connect-staging || true`,
    `docker rm techcare-connect-staging || true`,
    `docker run -d --name techcare-connect-staging -p 8080:3000 --restart=unless-stopped -v /var/log/techcare:/app/logs ${imageName}`,
    `rm ~/${imageName}.tar.gz`
  ].join(' && ');
  
  // Executar comandos remotamente no servidor de staging
  runCommand(`ssh ${STAGING_USER}@${STAGING_SERVER} "${deployCommands}"`, 'Implantando no servidor');
  
  console.log(`${colors.green}✓ Deploy em staging concluído com sucesso.${colors.reset}\n`);
}

// Função principal de deploy
function deploy() {
  try {
    // Verificar configurações antes de prosseguir
    preDeployChecks();
    
    // Construir o projeto
    buildProject();
    
    // Construir imagem Docker
    const imageName = buildDockerImage();
    
    // Enviar imagem para o servidor
    pushImageToStaging(imageName);
    
    // Implantar no servidor
    deployToStaging(imageName);
    
    console.log(`${colors.bright}${colors.green}=== Deploy para staging concluído com sucesso ===${colors.reset}\n`);
    console.log(`${colors.yellow}O sistema está disponível em: http://${STAGING_SERVER}:8080${colors.reset}`);
    console.log(`${colors.yellow}Execute verificações pós-deploy para garantir que tudo está funcionando.${colors.reset}`);
    console.log(`${colors.yellow}Comando: node src/scripts/post-deploy-checks.js http://${STAGING_SERVER}:8080${colors.reset}`);
    
    process.exit(0);
  } catch (error) {
    console.error(`${colors.red}${colors.bright}=== Erro durante o processo de deploy ===${colors.reset}`);
    console.error(`${colors.red}${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Iniciar processo de deploy
deploy();
