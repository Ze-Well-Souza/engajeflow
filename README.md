# TechCare Connect Automator: Impulsione seu Negócio nas Redes Sociais

**Desenvolvido para o pequeno e médio empreendedor, formal ou informal, que busca crescer e engajar mais clientes através das mídias sociais.**

O TechCare Connect Automator é sua ferramenta completa para automatizar e otimizar sua presença online, liberando seu tempo para focar no que realmente importa: seu negócio.

## 🎯 Para Quem é Este Projeto?

Você é um(a) empreendedor(a) buscando:

*   **Aumentar o engajamento** com seus clientes no Instagram, Facebook, WhatsApp, YouTube, TikTok e Telegram?
*   **Automatizar postagens** e interações para manter sua marca ativa e consistente?
*   **Gerenciar múltiplos perfis** de redes sociais de forma centralizada e eficiente?
*   **Obter insights valiosos** sobre o desempenho das suas campanhas e o sentimento dos seus clientes?
*   **Simplificar tarefas repetitivas** de marketing digital e atendimento ao cliente?
*   **Integrar suas operações** de mídia social com outras ferramentas de gestão (como a plataforma TechCare, se aplicável)?

Se sim, o TechCare Connect Automator foi feito para você!

## ✨ Funcionalidades Detalhadas

Esta plataforma robusta oferece um conjunto poderoso de ferramentas para transformar sua estratégia digital:

*   **Conexão Multicanal**: Integre e gerencie suas contas de **Instagram, Facebook, WhatsApp, YouTube, TikTok e Telegram** em um único lugar.
*   **Automação de Conteúdo**: Agende e publique posts, vídeos e stories automaticamente em múltiplos canais, garantindo presença constante.
*   **Engajamento Inteligente**: Configure respostas automáticas para comentários e mensagens, gerencie interações e mantenha o diálogo com seus seguidores (requer configuração e pode depender das APIs de cada plataforma).
*   **Inteligência Artificial (IA) para Negócios**: Utilize o poder da IA (integrado com Google Gemini) para:
    *   **Gerar Insights**: Analise tendências de mercado e o sentimento dos seus clientes em relação à sua marca.
    *   **Criar Conteúdo**: Receba sugestões de posts, legendas e respostas otimizadas para seu público.
    *   **Análise de Texto**: Classifique e sumarize automaticamente grandes volumes de comentários ou mensagens.
    *   **Consultoria Virtual**: Obtenha análises e sugestões personalizadas para suas estratégias de marketing e até mesmo financeiras (com base nos dados disponíveis).
*   **Dashboard de Controle Centralizado**: Uma interface web intuitiva para:
    *   Configurar todas as conexões e automações.
    *   Agendar posts e campanhas.
    *   Monitorar o status das tarefas em tempo real.
    *   Visualizar métricas e relatórios de desempenho.
*   **Análise e Relatórios**: Acompanhe métricas chave de engajamento (curtidas, comentários, compartilhamentos), alcance, crescimento de seguidores e outros KPIs. Gere relatórios consolidados para avaliar o ROI das suas ações.
*   **Gerenciamento Financeiro (Opcional)**: Se integrado ou utilizado para dados financeiros, oferece funcionalidades como sincronização bancária, geração de relatórios financeiros e análise de transações.
*   **Motor de Automação Robusto (Automator)**: Executa confiavelmente as tarefas agendadas, interagindo com as plataformas sociais.
*   **Agendador Flexível (Scheduler)**: Programe tarefas recorrentes ou pontuais com precisão.
*   **Sistema de Filas Escalável**: Processa um grande volume de tarefas de forma assíncrona, com prioridades, retentativas automáticas em caso de falha e balanceamento de carga, garantindo performance e confiabilidade.
*   **Monitoramento e Logs Avançados**: Acompanhe a saúde do sistema, performance e diagnostique problemas rapidamente através de logs estruturados e métricas detalhadas (compatível com Prometheus).
*   **Arquitetura Moderna e Escalável**: Construído com tecnologias modernas (Node.js, React, TypeScript, Docker), utilizando cache distribuído e design modular para suportar o crescimento do seu negócio.
*   **Segurança**: Gerenciamento seguro de credenciais e conexões com as plataformas sociais.

---

## 🚀 Início Rápido

### Usando Docker (Recomendado)

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/Ze-Well-Souza/techcare-connect-automator.git
    cd techcare-connect-automator
    ```

2.  **Configure o ambiente**: Crie um arquivo `.env` a partir do exemplo e ajuste as configurações conforme sua necessidade.
    ```bash
    cp .env.example .env
    # Edite o arquivo .env com suas credenciais e configurações
    # Nota: Credenciais específicas (TECHCARE_USER/PASS) podem não ser necessárias.
    # Configure as senhas de Redis e outras chaves de API que for usar.
    ```

3.  **Inicie os serviços** com Docker Compose:
    ```bash
    docker-compose up -d
    ```

4.  **Acesse o dashboard** no seu navegador: `http://localhost:3000`

### Exemplo de arquivo `.env` Essencial

```dotenv
# Configurações de Operação
NODE_ENV=production
OPERATION_MODE=dashboard # Mude para 'automator' ou 'scheduler' se rodar separadamente
MAX_CONCURRENCY=3      # Número de tarefas simultâneas

# Configurações de Logs
LOG_LEVEL=info         # Nível de detalhe: debug, info, warn, error
LOG_DIR=logs
LOG_FORMAT=json        # Formato: json ou text

# Configurações do Redis (Obrigatório para Filas)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=sua_senha_forte_para_o_redis # Use uma senha segura!

# Chaves de API (Exemplo para IA)
# GEMINI_API_KEY=SUA_CHAVE_API_GEMINI

# Credenciais de Plataformas Sociais (Configuradas via Dashboard ou .env)
# Ex: INSTAGRAM_USER=seu_usuario
# Ex: INSTAGRAM_PASS=sua_senha
```

Consulte o arquivo `.env.example` para ver todas as variáveis de ambiente possíveis.

## 🏗️ Build com Docker

*(Seção mantida como no original, relevante para deploy)*

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
techcare-automator    | 2025-05-22 01:45:14.334 [INFO]: Verificação de saúde concluída.
techcare-automator    | 2025-05-22 01:45:14.445 [INFO]: Iniciando aplicação no modo: automator
techcare-automator    | 2025-05-22 01:45:14.556 [INFO]: Iniciando no modo automator...
```

## 🧪 Testes

*(Seção mantida como no original, relevante para desenvolvimento e validação)*

### Executando Testes

```bash
# Instalar dependências de desenvolvimento
npm install

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes específicos (ex: FinancialService)
npm test -- --testPathPattern=FinancialService
```

### Testes de Fluxo com Puppeteer Mockado

O projeto inclui testes de fluxo que simulam a navegação sem necessidade de um navegador real:

```bash
# Executar apenas testes de fluxo
npm test -- --testPathPattern=Flow
```

## 📊 Monitoramento e Logs

*(Seção mantida como no original, relevante para operação)*

### Sistema de Logs Estruturados

O TechCare Connect Automator utiliza um sistema de logs estruturados (baseado em Winston) que oferece:

*   **Níveis de log**: debug, info, warn, error
*   **Formato estruturado**: JSON para fácil processamento por outras ferramentas.
*   **Timestamps precisos**: Para rastrear eventos.
*   **Contexto**: Identificação clara do módulo e operação.
*   **Medição de tempo**: Para operações críticas.

### Configuração de Logs

Configure via variáveis de ambiente:

```dotenv
LOG_LEVEL=info       # Nível mínimo (debug, info, warn, error)
LOG_DIR=logs         # Diretório para arquivos de log
LOG_FORMAT=json      # Formato (json ou text)
LOG_MAX_SIZE=10m     # Tamanho máximo por arquivo (ex: 10m = 10MB)
LOG_MAX_FILES=7      # Número de arquivos a reter (rotação)
LOG_CONSOLE=true     # Exibir no console (bom para desenvolvimento)
```

### Visualização de Logs

Os logs são armazenados no diretório configurado (`logs/` por padrão).

*   **Docker**: `/app/logs` dentro do container.
*   **Instalação manual**: `./logs` no diretório do projeto.

Exemplo de visualização:

```bash
# Ver logs em tempo real (se rodando com Docker Compose)
docker-compose logs -f automator

# Filtrar logs por nível (ex: apenas erros)
grep '"level":"error"' logs/automator.log # Se formato JSON
grep "ERROR" logs/automator.log # Se formato texto

# Analisar logs em formato JSON com 'jq'
cat logs/automator.log | jq "."
```

### Exemplo de Log Estruturado (JSON)

```json
{
  "level": "info",
  "message": "Processando item da fila 12345",
  "timestamp": "2025-05-22T01:45:12.345Z",
  "service": "automator",
  "context": "QueueManager",
  "jobId": "12345",
  "jobName": "publishInstagramPost",
  "attempt": 1,
  "maxRetries": 3
}
```

### Métricas (Prometheus)

Se habilitado (`ENABLE_METRICS=true`), o sistema expõe métricas para monitoramento:

```bash
curl http://localhost:9090/metrics
```

## 🔧 Configuração

*(Seção mantida como no original, relevante para operação)*

### Modos de Operação

O sistema pode operar em três modos (definido por `OPERATION_MODE` no `.env`):

*   **`dashboard`**: Executa a interface web para gerenciamento.
*   **`automator`**: Executa o serviço que processa as tarefas da fila.
*   **`scheduler`**: Executa o serviço que agenda tarefas recorrentes.

Para rodar todos os modos juntos, use o `docker-compose.yml` que já define os serviços separadamente.

### Sistema de Filas (BullMQ)

Configurações avançadas da fila podem ser ajustadas em `config/queue.json` (embora as padrões sejam geralmente suficientes):

```json
{
  "concurrency": 5,        // Tarefas processadas em paralelo por worker
  "maxRetries": 3,         // Tentativas máximas por tarefa falha
  "retryDelay": 5000,      // Tempo (ms) antes da primeira retentativa
  "retryStrategy": "exponential", // Estratégia de delay (exponential ou fixed)
  "retryMultiplier": 2     // Multiplicador para delay exponencial
}
```

## 🔍 Solução de Problemas

*(Seção mantida como no original, relevante para operação)*

### Problemas Comuns

*   **Erro de Conexão com Plataforma Social**: Verifique credenciais, conexão com internet e status da plataforma.
*   **Erro de Conexão com Redis**: Garanta que o Redis está rodando, acessível e com a senha correta.
*   **Tarefas Travadas na Fila**: Pode indicar um problema no processamento. Verifique os logs do `automator` e use o comando para limpar tarefas antigas se necessário:
    ```bash
    docker-compose exec automator npm run queue:clean
    ```

### Análise de Logs para Troubleshooting

Use os logs estruturados para diagnosticar problemas:

1.  **Identificar Erros**: `grep '"level":"error"' logs/*.log | jq "."`
2.  **Rastrear Operação Específica**: `cat logs/*.log | jq 'select(.context=="InstagramConnector")'`
3.  **Analisar Duração**: `cat logs/*.log | jq 'select(.duration != null) | {message, duration, status}'`
4.  **Verificar Retentativas**: `cat logs/*.log | jq 'select(.attempt > 1)'`

## 📚 Documentação Adicional

*(Seção mantida como no original)*

*   [Arquitetura Detalhada](./docs/architecture/architecture.md)
*   [Documentação da API](./docs/api/api.md)
*   [Guia de Desenvolvimento](./docs/development.md)

## 📄 Licença

*(Seção mantida como no original)*

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

