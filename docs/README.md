# TechCare Connect Automator

Sistema de automação e integração com a plataforma TechCare, permitindo operações em lote, extração de dados e geração de relatórios.

## Visão Geral

O TechCare Connect Automator é uma solução completa para automatizar interações com a plataforma TechCare, oferecendo:

- **Dashboard**: Interface web para configuração e monitoramento de automações
- **Automator**: Serviço para execução de tarefas automatizadas
- **Scheduler**: Agendador de tarefas recorrentes
- **Sistema de Filas**: Processamento assíncrono com prioridades e retentativas

## Arquitetura

O sistema é composto por vários componentes que trabalham em conjunto:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Dashboard    │     │    Automator    │     │    Scheduler    │
│   (Interface)   │     │ (Processamento) │     │  (Agendamento)  │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────┬───────┴───────────────┬───────┘
                         │                       │
                ┌────────▼────────┐     ┌────────▼────────┐
                │  Sistema de     │     │                 │
                │     Filas       │◄────┤  Redis Cache    │
                │   (BullMQ)      │     │                 │
                └────────┬────────┘     └─────────────────┘
                         │
                ┌────────▼────────┐
                │                 │
                │    TechCare     │
                │    Platform     │
                │                 │
                └─────────────────┘
```

## Requisitos

- Node.js 18 ou superior
- Redis 6 ou superior
- Docker e Docker Compose (para implantação em contêineres)

## Instalação

### Usando Docker (Recomendado)

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ze-Well-Souza/techcare-connect-automator.git
   cd techcare-connect-automator
   ```

2. Crie um arquivo `.env` com as configurações necessárias:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais e configurações
   ```

3. Inicie os serviços com Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Acesse o dashboard em `http://localhost:3000`

### Instalação Manual

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ze-Well-Souza/techcare-connect-automator.git
   cd techcare-connect-automator
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com as configurações necessárias:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais e configurações
   ```

4. Compile o projeto:
   ```bash
   npm run build
   ```

5. Inicie o serviço desejado:
   ```bash
   # Para iniciar o dashboard
   npm run dashboard
   
   # Para iniciar o automator
   npm run automator
   
   # Para iniciar o scheduler
   npm run scheduler
   ```

## Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatória | Padrão |
|----------|-----------|-------------|--------|
| `TECHCARE_USER` | Usuário do TechCare | Sim | - |
| `TECHCARE_PASS` | Senha do TechCare | Sim | - |
| `TECHCARE_BASE_URL` | URL base do TechCare | Não | `https://app.techcare.com` |
| `NODE_ENV` | Ambiente de execução | Não | `production` |
| `OPERATION_MODE` | Modo de operação (dashboard, automator, scheduler) | Não | `dashboard` |
| `MAX_CONCURRENCY` | Número máximo de operações simultâneas | Não | `3` |
| `LOG_LEVEL` | Nível de log (debug, info, warn, error) | Não | `info` |
| `TZ` | Timezone | Não | `America/Sao_Paulo` |
| `REDIS_HOST` | Host do Redis | Não | `localhost` |
| `REDIS_PORT` | Porta do Redis | Não | `6379` |
| `REDIS_PASSWORD` | Senha do Redis | Não | - |
| `OPENAI_API_KEY` | Chave da API OpenAI (opcional) | Não | - |

### Modos de Operação

O sistema pode operar em três modos diferentes:

- **dashboard**: Interface web para configuração e monitoramento
- **automator**: Serviço para execução de tarefas automatizadas
- **scheduler**: Agendador de tarefas recorrentes

## Uso

### Dashboard

O dashboard oferece uma interface web para:

- Configurar automações
- Monitorar execuções
- Visualizar relatórios
- Gerenciar filas de processamento

Acesse o dashboard em `http://localhost:3000` após a inicialização.

### API

O sistema também oferece uma API REST para integração com outros sistemas:

```bash
# Exemplo de criação de uma tarefa via API
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "extract_data",
    "params": {
      "startDate": "2023-01-01",
      "endDate": "2023-01-31"
    },
    "priority": 5
  }'
```

Consulte a documentação completa da API em `http://localhost:3000/api/docs`.

## Sistema de Filas

O sistema utiliza BullMQ para gerenciamento de filas, oferecendo:

- Processamento assíncrono
- Priorização de tarefas
- Retentativas automáticas
- Monitoramento em tempo real

### Configuração de Filas

As filas podem ser configuradas através do arquivo `config/queue.json`:

```json
{
  "concurrency": 5,
  "maxRetries": 3,
  "retryDelay": 5000,
  "retryStrategy": "exponential",
  "retryMultiplier": 2
}
```

## Solução de Problemas

### Logs

Os logs são armazenados em:

- Docker: `/app/logs`
- Instalação manual: `./logs`

### Problemas Comuns

#### Erro de Conexão com TechCare

Verifique:
- Credenciais corretas em `.env`
- Conectividade com a internet
- Status da plataforma TechCare

#### Erro de Conexão com Redis

Verifique:
- Serviço Redis em execução
- Configurações de host, porta e senha
- Firewall permitindo conexões

#### Tarefas Travadas

Execute:
```bash
# Limpar filas travadas
docker-compose exec app npm run queue:clean
```

## Desenvolvimento

### Estrutura do Projeto

```
.
├── src/
│   ├── services/       # Serviços principais
│   │   ├── techcare/   # Módulos específicos para TechCare
│   │   └── queue/      # Sistema de filas
│   ├── utils/          # Utilitários
│   ├── tests/          # Testes automatizados
│   ├── components/     # Componentes React (UI)
│   └── pages/          # Páginas da aplicação
├── docker-compose.yml  # Configuração dos serviços Docker
├── Dockerfile          # Configuração da imagem Docker
└── README.md           # Documentação
```

### Testes

Execute os testes automatizados:

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

### Contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -am 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um Pull Request

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
