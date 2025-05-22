# Arquitetura do TechCare Connect Automator

Este documento descreve a arquitetura técnica do TechCare Connect Automator, detalhando seus componentes, interações e fluxos de dados.

## Visão Geral da Arquitetura

O TechCare Connect Automator é construído com uma arquitetura modular, baseada em serviços, que permite escalabilidade e manutenção simplificada. O sistema é composto por três serviços principais que compartilham uma base de código comum, mas operam em modos diferentes.

![Diagrama de Arquitetura](./images/architecture-diagram.png)

## Componentes Principais

### 1. Dashboard

**Responsabilidade**: Interface de usuário para configuração, monitoramento e controle do sistema.

**Tecnologias**:
- React + TypeScript
- ShadCN UI
- Vite

**Funcionalidades**:
- Configuração de automações
- Monitoramento de execuções
- Visualização de relatórios
- Gerenciamento de filas

### 2. Automator

**Responsabilidade**: Execução de tarefas automatizadas na plataforma TechCare.

**Tecnologias**:
- Node.js
- Puppeteer
- BullMQ

**Funcionalidades**:
- Navegação automatizada
- Extração de dados
- Operações em lote
- Processamento assíncrono

### 3. Scheduler

**Responsabilidade**: Agendamento e disparo de tarefas recorrentes.

**Tecnologias**:
- Node.js
- Cron
- BullMQ

**Funcionalidades**:
- Agendamento baseado em cron
- Disparo de tarefas programadas
- Monitoramento de execuções agendadas

### 4. Sistema de Filas

**Responsabilidade**: Gerenciamento de tarefas assíncronas com prioridades e retentativas.

**Tecnologias**:
- BullMQ
- Redis

**Funcionalidades**:
- Processamento assíncrono
- Priorização de tarefas
- Retentativas automáticas
- Monitoramento em tempo real

## Fluxo de Dados

1. **Entrada de Tarefas**:
   - Via Dashboard (interface de usuário)
   - Via API REST
   - Via Scheduler (agendamento)

2. **Processamento**:
   - As tarefas são enfileiradas no sistema de filas
   - O Automator consome as tarefas da fila de acordo com prioridades
   - Múltiplas instâncias do Automator podem processar tarefas em paralelo

3. **Interação com TechCare**:
   - O Automator utiliza Puppeteer para interagir com a plataforma TechCare
   - Autenticação e navegação são gerenciadas pelo AuthService e NavigationService
   - Extração de dados é realizada pelo ScrapingService

4. **Resultados**:
   - Os resultados são armazenados no Redis
   - Notificações são enviadas via WebSockets para o Dashboard
   - Relatórios podem ser gerados e exportados

## Componentes de Serviço

### AuthService

Responsável pela autenticação e gerenciamento de sessões com a plataforma TechCare.

```typescript
interface AuthService {
  login(): Promise<boolean>;
  isLoggedIn(): Promise<boolean>;
  refreshSession(): Promise<boolean>;
  logout(): Promise<void>;
}
```

### NavigationService

Gerencia a navegação na plataforma TechCare, fornecendo métodos para acessar diferentes seções.

```typescript
interface NavigationService {
  goToDashboard(): Promise<void>;
  goToClients(): Promise<void>;
  goToReports(): Promise<void>;
  goToFinancial(): Promise<void>;
  waitForNavigation(): Promise<void>;
}
```

### ScrapingService

Extrai dados da plataforma TechCare, processando e formatando as informações.

```typescript
interface ScrapingService {
  extractClientData(clientId: string): Promise<ClientData>;
  extractReportData(reportId: string): Promise<ReportData>;
  extractFinancialData(period: DateRange): Promise<FinancialData>;
}
```

### QueueManager

Gerencia o sistema de filas, com suporte a prioridades, retentativas e concorrência.

```typescript
interface QueueManager<T> {
  enqueue(id: string, data: T, priority?: number): QueueItem<T>;
  dequeue(id: string): boolean;
  clear(): number;
  pause(): void;
  resume(): void;
  getItem(id: string): QueueItem<T> | undefined;
  getStats(): QueueStats;
}
```

## Padrões de Design

### Injeção de Dependências

O sistema utiliza injeção de dependências para facilitar testes e manutenção:

```typescript
// Exemplo de injeção de dependências
const queueManager = new QueueManager<TaskData>(
  processTask,
  {
    concurrency: 5,
    maxRetries: 3,
    retryDelay: 1000
  },
  {
    stateManager: new QueueState(),
    priorityManager: new QueuePriority(),
    eventEmitter: new QueueEventEmitter()
  }
);
```

### Padrão Observer (Event Emitter)

Utilizado para comunicação entre componentes:

```typescript
// Exemplo de uso do padrão Observer
queueManager.on('item:completed', (item, result) => {
  console.log(`Item ${item.id} processado com sucesso:`, result);
});

queueManager.on('item:failed', (item, error) => {
  console.error(`Falha ao processar item ${item.id}:`, error);
});
```

### Circuit Breaker

Implementado para evitar falhas em cascata em caso de problemas com a plataforma TechCare:

```typescript
// Exemplo de uso do Circuit Breaker
const techcareService = new CircuitBreaker(
  new TechCareService(),
  {
    failureThreshold: 3,
    resetTimeout: 30000
  }
);
```

## Escalabilidade

O sistema foi projetado para escalar horizontalmente:

1. **Múltiplas instâncias**: Cada serviço (Dashboard, Automator, Scheduler) pode ser executado em múltiplas instâncias.

2. **Redis compartilhado**: Todas as instâncias compartilham o mesmo Redis para filas e cache.

3. **Concorrência configurável**: O nível de concorrência pode ser ajustado por instância.

4. **Balanceamento de carga**: O Docker Compose pode ser estendido com um balanceador de carga para distribuir requisições.

## Segurança

1. **Credenciais**: Armazenadas como variáveis de ambiente, nunca no código.

2. **Usuário não-root**: Containers Docker executam com usuário não-root.

3. **HTTPS**: Recomendado para produção com proxy reverso.

4. **Rate Limiting**: Implementado na API para prevenir abusos.

## Monitoramento

1. **Logs estruturados**: Formato JSON para facilitar análise.

2. **Métricas**: Expostas via API para integração com sistemas de monitoramento.

3. **Healthchecks**: Implementados para verificação de saúde do sistema.

4. **Alertas**: Configuráveis para notificar sobre falhas críticas.

## Considerações para Produção

1. **Alta Disponibilidade**: Configurar Redis em cluster para evitar ponto único de falha.

2. **Backup**: Configurar backup regular dos dados do Redis.

3. **Rotação de Logs**: Implementar rotação de logs para evitar consumo excessivo de disco.

4. **Escalabilidade**: Ajustar número de instâncias de acordo com a carga.

5. **Monitoramento**: Integrar com sistemas de monitoramento como Prometheus/Grafana.
