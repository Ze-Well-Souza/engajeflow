# TechCare Connect Automator

Sistema de automação e integração com a plataforma TechCare, permitindo operações em lote, extração de dados e geração de relatórios.

## 📋 Visão Geral

O TechCare Connect Automator é uma solução completa para automatizar interações com a plataforma TechCare, oferecendo:

- **Dashboard**: Interface web para configuração e monitoramento de automações
- **Automator**: Serviço para execução de tarefas automatizadas
- **Scheduler**: Agendador de tarefas recorrentes
- **Sistema de Filas**: Processamento assíncrono com prioridades e retentativas

## 🚀 Início Rápido

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

### Exemplo de arquivo .env

```
# Credenciais do TechCare (obrigatórias)
TECHCARE_USER=seu_usuario@exemplo.com
TECHCARE_PASS=sua_senha_segura
TECHCARE_BASE_URL=https://app.techcare.com

# Configurações de operação
NODE_ENV=production
OPERATION_MODE=dashboard
MAX_CONCURRENCY=3

# Configurações de logs
LOG_LEVEL=info
LOG_DIR=logs
LOG_FORMAT=json

# Configurações de Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=techcare_redis_pass
```

Veja o arquivo `.env.example` para todas as opções disponíveis.

## 🏗️ Build com Docker

### Build da Imagem

```bash
# Construir a imagem Docker
docker build -t techcare-connect-automator .

# Verificar a imagem construída
docker images | grep techcare-connect-automator
```

### Logs Esperados durante o Build

```
=> [builder 1/5] FROM node:18-slim@sha256:...
=> [builder 2/5] WORKDIR /app
=> [builder 3/5] COPY package*.json ./
=> [builder 4/5] RUN npm ci
=> [builder 5/5] COPY . .
=> [builder 6/5] RUN npm run build
=> [stage-2 1/8] FROM node:18-slim@sha256:...
=> [stage-2 2/8] RUN apt-get update && apt-get install -y chromium...
=> [stage-2 3/8] ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true...
=> [stage-2 4/8] WORKDIR /app
=> [stage-2 5/8] COPY --from=builder /app/dist ./dist
=> [stage-2 6/8] COPY --from=builder /app/package*.json ./
=> [stage-2 7/8] RUN npm ci --only=production
=> [stage-2 8/8] COPY docker-entrypoint.sh ./
=> [stage-2 9/8] RUN chmod +x docker-entrypoint.sh
=> [stage-2 10/8] EXPOSE 3000
=> [stage-2 11/8] RUN addgroup --system appuser && adduser...
=> [stage-2 12/8] USER appuser
=> exporting to image
```

### Logs Esperados na Inicialização

```
techcare-automator    | 2025-05-22 01:45:12.345 [INFO]: Iniciando TechCare Connect Automator...
techcare-automator    | 2025-05-22 01:45:12.456 [INFO]: Verificando conexão com Redis...
techcare-automator    | 2025-05-22 01:45:12.567 [INFO]: Conexão com Redis estabelecida com sucesso.
techcare-automator    | 2025-05-22 01:45:12.678 [INFO]: Criando diretório /app/logs...
techcare-automator    | 2025-05-22 01:45:12.789 [INFO]: Criando diretório /app/config...
techcare-automator    | 2025-05-22 01:45:12.890 [INFO]: Criando diretório /app/data...
techcare-automator    | 2025-05-22 01:45:13.001 [INFO]: Configurando timezone: America/Sao_Paulo
techcare-automator    | 2025-05-22 01:45:13.112 [INFO]: Executando verificação de saúde do sistema...
techcare-automator    | 2025-05-22 01:45:14.223 [INFO]: Conexão com TechCare estabelecida com sucesso.
techcare-automator    | 2025-05-22 01:45:14.334 [INFO]: Verificação de saúde concluída.
techcare-automator    | 2025-05-22 01:45:14.445 [INFO]: Iniciando aplicação no modo: automator
techcare-automator    | 2025-05-22 01:45:14.556 [INFO]: Iniciando no modo automator...
```

## 🧪 Testes

### Executando Testes

```bash
# Instalar dependências de desenvolvimento
npm install

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes específicos
npm test -- --testPathPattern=FinancialService
```

### Testes de Fluxo com Puppeteer Mockado

O projeto inclui testes de fluxo que simulam a navegação sem necessidade de um navegador real:

```bash
# Executar apenas testes de fluxo
npm test -- --testPathPattern=Flow
```

## 📊 Monitoramento e Logs

### Sistema de Logs Estruturados

O TechCare Connect Automator utiliza um sistema de logs estruturados baseado em Winston, que oferece:

- **Níveis de log**: debug, info, warn, error
- **Formato estruturado**: JSON para fácil processamento
- **Timestamps precisos**: em todas as entradas de log
- **Contexto**: identificação clara do módulo e operação
- **Medição de tempo**: para operações críticas

### Configuração de Logs

Os logs podem ser configurados através das seguintes variáveis de ambiente:

```
LOG_LEVEL=info       # Nível mínimo de log (debug, info, warn, error)
LOG_DIR=logs         # Diretório onde os logs serão armazenados
LOG_FORMAT=json      # Formato dos logs (json ou text)
LOG_MAX_SIZE=10m     # Tamanho máximo de cada arquivo de log
LOG_MAX_FILES=7      # Número máximo de arquivos de log para retenção
LOG_CONSOLE=true     # Se deve exibir logs no console em desenvolvimento
```

### Visualização de Logs

Os logs são armazenados em:

- Docker: `/app/logs`
- Instalação manual: `./logs`

Exemplo de visualização de logs:

```bash
# Ver logs em tempo real
docker-compose logs -f automator

# Ver logs específicos
docker-compose logs -f scheduler

# Filtrar logs por nível
grep "ERROR" logs/automator.log

# Analisar logs em formato JSON
cat logs/automator.log | jq '.'
```

### Exemplo de Log Estruturado

```json
{
  "level": "info",
  "message": "Processando item 12345",
  "timestamp": "2025-05-22T01:45:12.345Z",
  "service": "automator",
  "context": "QueueManager",
  "itemId": "12345",
  "attempt": 1,
  "maxRetries": 3,
  "waitTime": 1500
}
```

### Métricas

O sistema expõe métricas em formato Prometheus:

```bash
# Acessar métricas (quando ENABLE_METRICS=true)
curl http://localhost:9090/metrics
```

## 🔧 Configuração

### Modos de Operação

O sistema pode operar em três modos diferentes:

- **dashboard**: Interface web para configuração e monitoramento
- **automator**: Serviço para execução de tarefas automatizadas
- **scheduler**: Agendador de tarefas recorrentes

Para executar múltiplos modos simultaneamente, use o Docker Compose:

```yaml
services:
  dashboard:
    environment:
      - OPERATION_MODE=dashboard
  
  automator:
    environment:
      - OPERATION_MODE=automator
  
  scheduler:
    environment:
      - OPERATION_MODE=scheduler
```

### Sistema de Filas

O sistema utiliza BullMQ para gerenciamento de filas, configurável através do arquivo `config/queue.json`:

```json
{
  "concurrency": 5,
  "maxRetries": 3,
  "retryDelay": 5000,
  "retryStrategy": "exponential",
  "retryMultiplier": 2
}
```

## 🔍 Solução de Problemas

### Problemas Comuns

#### Erro de Conexão com TechCare

Verifique:
- Credenciais corretas em `.env`
- Conectividade com a internet
- Status da plataforma TechCare

Logs típicos:
```
2025-05-22T01:45:12.345Z [ERROR]: Erro ao acessar TechCare: Authentication failed
```

#### Erro de Conexão com Redis

Verifique:
- Serviço Redis em execução
- Configurações de host, porta e senha
- Firewall permitindo conexões

Logs típicos:
```
2025-05-22T01:45:12.345Z [ERROR]: Erro ao conectar ao Redis: Connection refused
```

#### Tarefas Travadas

Execute:
```bash
# Limpar filas travadas
docker-compose exec app npm run queue:clean
```

### Análise de Logs para Troubleshooting

Para analisar problemas usando os logs estruturados:

1. **Identificar erros**:
   ```bash
   grep "ERROR" logs/automator.log | jq '.'
   ```

2. **Rastrear operações por contexto**:
   ```bash
   cat logs/automator.log | jq 'select(.context=="QueueManager")'
   ```

3. **Analisar tempos de operação**:
   ```bash
   cat logs/automator.log | jq 'select(.duration != null) | {message, duration, status}'
   ```

4. **Verificar tentativas de retry**:
   ```bash
   cat logs/automator.log | jq 'select(.attempt > 1)'
   ```

## 📚 Documentação Adicional

- [Arquitetura Detalhada](./docs/architecture/architecture.md)
- [Documentação da API](./docs/api/api.md)
- [Guia de Desenvolvimento](./docs/development.md)

## 📄 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
