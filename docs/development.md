# Guia de Desenvolvimento - TechCare Connect Automator

Este documento fornece orientações detalhadas para desenvolvedores que desejam contribuir ou estender o TechCare Connect Automator.

## Estrutura do Projeto

```
.
├── src/
│   ├── services/           # Serviços principais
│   │   ├── techcare/       # Módulos específicos para TechCare
│   │   │   ├── ai/         # Serviços de IA
│   │   │   ├── financial/  # Serviços financeiros
│   │   │   └── ...
│   │   ├── queue/          # Sistema de filas
│   │   └── cache/          # Serviços de cache
│   ├── utils/              # Utilitários
│   ├── tests/              # Testes automatizados
│   ├── components/         # Componentes React (UI)
│   └── pages/              # Páginas da aplicação
├── config/                 # Arquivos de configuração
├── docker/                 # Arquivos relacionados ao Docker
├── docs/                   # Documentação
├── scripts/                # Scripts utilitários
├── docker-compose.yml      # Configuração dos serviços Docker
├── Dockerfile              # Configuração da imagem Docker
└── README.md               # Documentação principal
```

## Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js 18 ou superior
- npm 8 ou superior
- Docker e Docker Compose (opcional, para desenvolvimento com contêineres)
- Redis (local ou via Docker)

### Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ze-Well-Souza/techcare-connect-automator.git
   cd techcare-connect-automator
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` para desenvolvimento:
   ```bash
   cp .env.example .env.development
   # Edite o arquivo com suas configurações
   ```

4. Inicie o Redis (se não estiver usando Docker):
   ```bash
   # Instalar Redis no Ubuntu
   sudo apt update
   sudo apt install redis-server
   
   # Iniciar o serviço
   sudo systemctl start redis-server
   ```

5. Execute em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Padrões de Código

### Estilo de Código

O projeto utiliza ESLint e Prettier para garantir consistência no estilo de código:

```bash
# Verificar estilo
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Formatar código
npm run format
```

### Convenções de Nomenclatura

- **Arquivos**: PascalCase para componentes e classes, camelCase para utilitários
- **Classes**: PascalCase
- **Interfaces**: PascalCase com prefixo "I" (ex: IQueueManager)
- **Métodos e variáveis**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

### Padrões de Design

O projeto segue os seguintes padrões de design:

1. **Injeção de Dependências**: Para facilitar testes e desacoplamento
2. **Repository Pattern**: Para acesso a dados
3. **Observer Pattern**: Para comunicação entre componentes
4. **Strategy Pattern**: Para comportamentos intercambiáveis

## Testes

### Estrutura de Testes

Os testes estão organizados em:

- **Testes Unitários**: Testam componentes individuais
- **Testes de Integração**: Testam interações entre componentes
- **Testes de Fluxo**: Testam fluxos completos com Puppeteer mockado

### Melhores Práticas para Testes

1. **Isolamento**: Use mocks para isolar o componente sendo testado
2. **Cobertura**: Mantenha a cobertura de código acima de 80%
3. **Organização**: Siga a estrutura de diretórios do código-fonte
4. **Nomeação**: Use nomes descritivos que indicam o que está sendo testado

### Exemplo de Teste Unitário

```typescript
import { FinancialService } from '../../../services/techcare/FinancialService';
import { NavigationService } from '../../../services/techcare/NavigationService';
import { ScrapingService } from '../../../services/techcare/ScrapingService';

// Mock das dependências
jest.mock('../../../services/techcare/NavigationService');
jest.mock('../../../services/techcare/ScrapingService');

describe('FinancialService', () => {
  let financialService: FinancialService;
  let mockNavigationService: jest.Mocked<NavigationService>;
  let mockScrapingService: jest.Mocked<ScrapingService>;

  beforeEach(() => {
    // Configurar mocks e instância para teste
    // ...
  });

  it('deve obter resumo financeiro com sucesso', async () => {
    // Configurar comportamento esperado
    // Executar método
    // Verificar resultados
  });
});
```

## Sistema de Filas

### Arquitetura

O sistema de filas é baseado em BullMQ e Redis, com os seguintes componentes:

1. **QueueManager**: Gerencia o ciclo de vida dos itens na fila
2. **QueueState**: Mantém o estado dos itens (pendente, processando, etc.)
3. **QueueProcessor**: Processa os itens da fila
4. **QueuePriority**: Determina a ordem de processamento
5. **QueueEventEmitter**: Facilita a comunicação entre componentes

### Extensão do Sistema de Filas

Para adicionar um novo tipo de tarefa:

1. Defina a interface da tarefa:
   ```typescript
   interface NewTaskData {
     param1: string;
     param2: number;
   }
   ```

2. Implemente o processador:
   ```typescript
   class NewTaskProcessor {
     async process(data: NewTaskData): Promise<any> {
       // Implementação
     }
   }
   ```

3. Registre o processador:
   ```typescript
   taskRegistry.register('new_task', new NewTaskProcessor());
   ```

## Integração com TechCare

### Autenticação

A autenticação com o TechCare é gerenciada pelo `AuthService`, que:

1. Realiza login com credenciais
2. Mantém a sessão ativa
3. Detecta expiração de sessão e realiza novo login quando necessário

### Navegação

A navegação é gerenciada pelo `NavigationService`, que:

1. Navega entre diferentes seções do TechCare
2. Aguarda carregamento de páginas
3. Lida com diálogos e popups

### Extração de Dados

A extração de dados é realizada pelo `ScrapingService`, que:

1. Extrai dados de tabelas e formulários
2. Formata os dados em estruturas utilizáveis
3. Lida com paginação e carregamento dinâmico

## Contribuição

### Fluxo de Trabalho

1. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. Implemente suas alterações seguindo os padrões do projeto

3. Adicione testes para suas alterações

4. Execute os testes:
   ```bash
   npm test
   ```

5. Verifique o estilo de código:
   ```bash
   npm run lint
   ```

6. Faça commit das alterações:
   ```bash
   git commit -m "feat: Adiciona nova funcionalidade"
   ```

7. Envie para o repositório:
   ```bash
   git push origin feature/nova-funcionalidade
   ```

8. Crie um Pull Request

### Convenções de Commit

O projeto segue o padrão Conventional Commits:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Alterações que não afetam o código (formatação, etc.)
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Alterações no processo de build, ferramentas, etc.

Exemplo:
```
feat: Adiciona suporte a exportação de relatórios em PDF
```

## Deployment

### Ambiente de Produção

Para deploy em produção:

1. Construa a imagem Docker:
   ```bash
   docker build -t techcare-connect-automator:prod .
   ```

2. Configure as variáveis de ambiente em um arquivo `.env.production`

3. Inicie os serviços:
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
   ```

### Monitoramento

O sistema expõe métricas em formato Prometheus:

1. Configure o Prometheus para coletar métricas:
   ```yaml
   # prometheus.yml
   scrape_configs:
     - job_name: 'techcare-automator'
       static_configs:
         - targets: ['dashboard:9090']
   ```

2. Visualize as métricas com Grafana ou console Prometheus

## Resolução de Problemas

### Logs

Os logs são armazenados em:

- Docker: `/app/logs`
- Instalação manual: `./logs`

Níveis de log:
- `debug`: Informações detalhadas para desenvolvimento
- `info`: Informações gerais sobre operações
- `warn`: Avisos que não impedem a operação
- `error`: Erros que afetam a operação

### Depuração

Para depuração em desenvolvimento:

1. Inicie com inspeção:
   ```bash
   npm run dev:debug
   ```

2. Conecte o depurador (VSCode ou Chrome DevTools)

3. Defina pontos de interrupção no código

### Problemas Comuns

#### Erro de Conexão com Redis

Verifique:
- Serviço Redis em execução
- Configurações de host, porta e senha
- Firewall permitindo conexões

#### Erro de Memória em Puppeteer

Solução:
```bash
# Aumentar limite de memória
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

## Recursos Adicionais

- [Documentação do BullMQ](https://docs.bullmq.io/)
- [Documentação do Puppeteer](https://pptr.dev/)
- [Guia de TypeScript](https://www.typescriptlang.org/docs/)
- [Melhores Práticas de Docker](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
