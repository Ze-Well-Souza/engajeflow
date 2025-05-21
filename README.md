
# TechCare Connect Automator

![Versão](https://img.shields.io/badge/versão-1.2.0-blue.svg)
![Cobertura de Testes](https://img.shields.io/badge/cobertura%20de%20testes-85%25-green.svg)
![Node](https://img.shields.io/badge/node-v18+-brightgreen.svg)
![Docker](https://img.shields.io/badge/docker-suportado-brightgreen.svg)

Um sistema robusto de automação para interação com a plataforma TechCare, permitindo automação de tarefas, extração de dados e integração com outros sistemas.

**Última atualização:** 21 de maio de 2025 - 16:35

## 🚀 Funcionalidades

- **Automação de login e navegação**: Acesso automatizado à plataforma TechCare com suporte a múltiplos usuários
- **Extração de dados**: Coleta de informações de tickets, clientes e relatórios com validação e tratamento de erros
- **Processamento automatizado**: Atualização de status, envio de mensagens e categorização
- **Dashboard de monitoramento**: Acompanhamento em tempo real das automações com histórico de execuções
- **Agendamento de tarefas**: Execução programada de automações com retry automático
- **Suporte multi-usuário**: Isolamento de execuções por cliente/usuário com controle de concorrência
- **Sistema de filas**: Gerenciamento de múltiplos jobs com priorização e paralelismo controlado
- **Logs avançados**: Sistema de log estruturado com níveis de verbosidade configuráveis
- **Consultoria IA**: Recomendações baseadas em dados extraídos e análise inteligente
- **Módulos financeiros**: Automação de processos contábeis e financeiros

## 📋 Requisitos

- Node.js v18 ou superior
- Docker e Docker Compose (para execução em ambiente isolado)
- Redis (para sistema de filas, instalado automaticamente via Docker Compose)
- Acesso à plataforma TechCare com credenciais válidas
- Opcionalmente: Chave de API OpenAI para funcionalidades de IA

## 🛠️ Instalação

### Método 1: Instalação local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/techcare-connect-automator.git
cd techcare-connect-automator

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Iniciar o servidor de desenvolvimento
npm run dev

# Ou para iniciar em produção
npm run build
npm start
```

### Método 2: Execução com Docker (Recomendado para produção)

```bash
# Criar arquivo .env com suas credenciais
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Construir e iniciar os contêineres com Docker Compose
docker-compose up -d

# Visualizar logs
docker-compose logs -f

# Parar os contêineres
docker-compose down
```

## ⚙️ Configuração

### Arquivo .env

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
# Credenciais TechCare
TECHCARE_USER=seu_usuario
TECHCARE_PASS=sua_senha
TECHCARE_BASE_URL=https://app.techcare.com

# Configurações da aplicação
NODE_ENV=production
OPERATION_MODE=dashboard  # dashboard, automator ou scheduler
MAX_CONCURRENCY=5
LOG_LEVEL=info  # debug, info, warn, error
TZ=America/Sao_Paulo

# Redis para filas (opcional se não usar Docker Compose)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=sua_senha_redis

# API OpenAI (opcional, para recursos de IA)
OPENAI_API_KEY=sua_chave_api
```

### Modos de Operação

O sistema pode operar em três modos diferentes:

1. **Dashboard**: Interface web para monitoramento e configuração
2. **Automator**: Execução de automações agendadas
3. **Scheduler**: Gerenciamento de fila de tarefas

Para produção, recomendamos configurar:
- 1 instância em modo Dashboard para gerenciamento
- Múltiplas instâncias em modo Automator para processamento
- 1 instância em modo Scheduler para agendamento

### Escalabilidade

Para ambientes de produção com alta demanda, você pode escalar horizontalmente os serviços:

```bash
# Escalar o serviço automator para 5 instâncias
docker-compose up -d --scale automator=5
```

## 🏗️ Arquitetura

```
.
├── src/
│   ├── services/                  # Serviços principais
│   │   ├── techcare/              # Módulos específicos para TechCare
│   │   │   ├── AuthService.ts     # Serviço de autenticação
│   │   │   ├── NavigationService.ts  # Serviço de navegação
│   │   │   ├── ScrapingService.ts # Serviço de extração de dados
│   │   │   ├── FinancialService.ts # Serviço de operações financeiras
│   │   │   ├── ConsultantAIService.ts # Serviço de IA consultiva
│   │   │   └── index.ts           # Exportação centralizada
│   │   └── queue/                 # Sistema de filas
│   ├── utils/                     # Utilitários
│   │   ├── environment.ts         # Gerenciamento de variáveis de ambiente
│   │   ├── logger.ts              # Sistema de logs avançado
│   │   └── circuit-breaker.ts     # Implementação de Circuit Breaker
│   ├── tests/                     # Testes automatizados
│   │   ├── services/              # Testes de serviços
│   │   └── utils/                 # Testes de utilitários
│   ├── components/                # Componentes React (UI)
│   └── pages/                     # Páginas da aplicação
├── docker-compose.yml             # Configuração dos serviços Docker
├── Dockerfile                     # Configuração da imagem Docker
├── docker-entrypoint.sh           # Script de inicialização
└── README.md                      # Documentação
```

## 🔌 Uso e Integração

### Inicialização Básica

```javascript
import { 
  configureTechCareServices, 
  initializeSession,
  AuthService, 
  NavigationService, 
  ScrapingService 
} from './services/techcare';

// Configurar e inicializar
configureTechCareServices({
  username: 'seu_usuario',
  password: 'sua_senha',
  baseUrl: 'https://app.techcare.com'
});

// Iniciar uma sessão
const sessionStarted = await initializeSession();
if (sessionStarted) {
  // Extrair dados de tickets
  const tickets = await ScrapingService.getTickets({ status: 'open' });
  console.log('Tickets abertos:', tickets);
}
```

### Utilizando o Sistema de Filas

```javascript
import { QueueManager } from './services/queue/QueueManager';

// Função a ser executada para cada item da fila
const processTask = async (data) => {
  console.log('Processando:', data);
  // Lógica de processamento
  return { resultado: 'processado' };
};

// Criar gerenciador de fila
const queue = new QueueManager(processTask, {
  concurrency: 3,
  maxRetries: 2
});

// Adicionar itens à fila
queue.enqueue('tarefa1', { id: 1, ação: 'verificar' });
queue.enqueue('tarefa2', { id: 2, ação: 'atualizar' }, 5); // Prioridade 5

// Verificar estatísticas
const stats = queue.getStats();
console.log('Estatísticas da fila:', stats);
```

### Usando Serviços Financeiros

```javascript
import FinancialService from './services/techcare/FinancialService';
import AuthService from './services/techcare/AuthService';

// Autenticar primeiro
await AuthService.login();

// Obter fluxo de caixa para um período
const startDate = new Date('2025-01-01');
const endDate = new Date('2025-01-31');
const cashFlow = await FinancialService.getCashFlow(startDate, endDate);

// Obter contas a receber com status específico
const receivables = await FinancialService.getAccountsReceivable('open');

// Registrar um pagamento
const payment = await FinancialService.registerPayment('INV-1001', 1500.75, 'Transferência Bancária');
```

### Usando o ConsultantAIService

```javascript
import ConsultantAIService from './services/techcare/ConsultantAIService';

// Configurar chave de API
ConsultantAIService.setApiKey('sua-chave-api-openai');

// Dados da empresa para análise
const businessData = {
  revenue: 500000,
  expenses: 420000,
  profit: 80000,
  lastQuarterGrowth: 0.05,
  industry: 'technology'
};

// Gerar consultoria financeira
const result = await ConsultantAIService.generateFinancialConsulting(
  businessData,
  'aumentar lucratividade em 15% nos próximos 6 meses',
  { detailed: true }
);

if (result.success) {
  console.log('Recomendações:', result.data.recommendations);
}
```

## 🔒 Segurança

O TechCare Connect Automator implementa várias medidas de segurança:

1. **Configuração segura**: Credenciais armazenadas em variáveis de ambiente, não no código
2. **Rate limiting**: Controle de taxa de requisições para evitar detecção
3. **Rotação de IPs**: Suporte a proxy para distribuir requisições (opcional)
4. **Sessões encriptadas**: Dados sensíveis encriptados em trânsito e repouso
5. **Isolamento**: Docker para isolar processos de automação
6. **Auditoria**: Logs detalhados de todas as operações para compliance
7. **Circuit Breaker**: Proteção contra falhas em cascata e sobrecarga

## 📊 Testes

O projeto inclui testes automatizados extensivos:

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm test -- --testPathPattern=AuthService

# Verificar cobertura
npm test -- --coverage

# Testes de integração
npm run test:integration

# Testes de performance
npm run test:performance
```

## 🛡️ Monitoramento e Observabilidade

O sistema possui recursos avançados para monitoramento:

1. **Logs estruturados**: Registros detalhados por nível de importância
2. **Métricas de saúde**: Coleta de dados sobre performance e uso de recursos
3. **Alertas**: Notificações para condições anômalas
4. **Dashboard**: Visualização em tempo real das operações

Para acessar o dashboard de monitoramento:

```
http://localhost:3000/monitoring
```

## 📚 Melhores Práticas

1. **Sempre use variáveis de ambiente** para credenciais e configurações sensíveis
2. **Limite a concorrência** para evitar sobrecarga dos sistemas alvo
3. **Implemente circuit breakers** para evitar falhas em cascata
4. **Monitore o uso de memória** para automações de longa duração
5. **Implemente filas com prioridade** para operações críticas
6. **Rotacione credenciais** periodicamente para maior segurança
7. **Mantenha logs detalhados** para diagnóstico e auditoria

## 🔧 Resolução de Problemas

### Problemas de Autenticação
- Verifique se as credenciais no arquivo .env estão corretas
- Tente fazer login manualmente para confirmar que sua conta está ativa
- Verifique se sua conta tem as permissões necessárias

### Erros de Extração de Dados
- Verifique se os seletores DOM não mudaram na plataforma TechCare
- Aumente o timeout para páginas mais lentas
- Verifique sua conexão de rede

### Erros de Concorrência
- Reduza o valor de MAX_CONCURRENCY
- Verifique o estado do Circuit Breaker
- Monitore a utilização de recursos do servidor

### Problemas com Docker
- Verifique se o Docker e o Docker Compose estão instalados corretamente
- Certifique-se de que as portas necessárias estão disponíveis
- Use `docker-compose logs -f` para investigar erros nos contêineres

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um novo Pull Request

### Padrões de Código
- Siga o padrão de codificação TypeScript
- Mantenha 90% de cobertura de testes
- Documente funções e classes com JSDoc
- Use o padrão de commits convencionais

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE.md para detalhes.

## 📬 Contato e Suporte

Para questões e suporte:
- Email: techcare-support@example.com
- Site: https://techcare-connect.example.com
- Horário de suporte: Segunda a sexta, das 9h às 18h (GMT-3)

---

Desenvolvido com ❤️ pela equipe TechCare
