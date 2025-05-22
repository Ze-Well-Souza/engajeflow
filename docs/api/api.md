# API do TechCare Connect Automator

Este documento descreve a API REST disponibilizada pelo TechCare Connect Automator, permitindo integração com outros sistemas.

## Base URL

```
http://localhost:3000/api
```

Para produção, substitua pelo domínio apropriado.

## Autenticação

A API utiliza autenticação via token JWT. Para obter um token:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "seu_usuario",
    "password": "sua_senha"
  }'
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

Use o token em todas as requisições subsequentes:

```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Endpoints

### Tarefas

#### Listar Tarefas

```
GET /tasks
```

Parâmetros de consulta:
- `status` (opcional): Filtrar por status (pending, processing, completed, failed)
- `page` (opcional): Número da página, padrão: 1
- `limit` (opcional): Itens por página, padrão: 20

Resposta:

```json
{
  "data": [
    {
      "id": "task_123",
      "type": "extract_data",
      "status": "completed",
      "priority": 5,
      "createdAt": "2023-01-01T12:00:00Z",
      "completedAt": "2023-01-01T12:05:30Z",
      "params": {
        "startDate": "2023-01-01",
        "endDate": "2023-01-31"
      },
      "result": {
        "recordsProcessed": 150,
        "downloadUrl": "/api/downloads/report_123.xlsx"
      }
    },
    // ...mais tarefas
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

#### Obter Tarefa

```
GET /tasks/:id
```

Resposta:

```json
{
  "id": "task_123",
  "type": "extract_data",
  "status": "completed",
  "priority": 5,
  "createdAt": "2023-01-01T12:00:00Z",
  "completedAt": "2023-01-01T12:05:30Z",
  "params": {
    "startDate": "2023-01-01",
    "endDate": "2023-01-31"
  },
  "result": {
    "recordsProcessed": 150,
    "downloadUrl": "/api/downloads/report_123.xlsx"
  },
  "logs": [
    {
      "timestamp": "2023-01-01T12:00:05Z",
      "level": "info",
      "message": "Iniciando extração de dados"
    },
    // ...mais logs
  ]
}
```

#### Criar Tarefa

```
POST /tasks
```

Corpo da requisição:

```json
{
  "type": "extract_data",
  "params": {
    "startDate": "2023-01-01",
    "endDate": "2023-01-31"
  },
  "priority": 5
}
```

Resposta:

```json
{
  "id": "task_124",
  "type": "extract_data",
  "status": "pending",
  "priority": 5,
  "createdAt": "2023-01-02T10:15:00Z",
  "params": {
    "startDate": "2023-01-01",
    "endDate": "2023-01-31"
  }
}
```

#### Cancelar Tarefa

```
DELETE /tasks/:id
```

Resposta:

```json
{
  "success": true,
  "message": "Tarefa cancelada com sucesso"
}
```

### Filas

#### Status das Filas

```
GET /queues/status
```

Resposta:

```json
{
  "queues": {
    "default": {
      "pending": 5,
      "processing": 2,
      "completed": 150,
      "failed": 3,
      "retry": 1,
      "total": 161,
      "averageWaitTime": 120,
      "averageProcessTime": 3500
    },
    "reports": {
      "pending": 2,
      "processing": 1,
      "completed": 45,
      "failed": 1,
      "retry": 0,
      "total": 49,
      "averageWaitTime": 180,
      "averageProcessTime": 5200
    }
  }
}
```

#### Limpar Fila

```
POST /queues/:name/clear
```

Resposta:

```json
{
  "success": true,
  "message": "Fila limpa com sucesso",
  "count": 5
}
```

#### Pausar Fila

```
POST /queues/:name/pause
```

Resposta:

```json
{
  "success": true,
  "message": "Fila pausada com sucesso"
}
```

#### Retomar Fila

```
POST /queues/:name/resume
```

Resposta:

```json
{
  "success": true,
  "message": "Fila retomada com sucesso"
}
```

### Relatórios

#### Listar Relatórios

```
GET /reports
```

Parâmetros de consulta:
- `type` (opcional): Filtrar por tipo (financial, client, activity)
- `page` (opcional): Número da página, padrão: 1
- `limit` (opcional): Itens por página, padrão: 20

Resposta:

```json
{
  "data": [
    {
      "id": "report_123",
      "type": "financial",
      "name": "Relatório Financeiro - Janeiro 2023",
      "createdAt": "2023-02-01T10:00:00Z",
      "params": {
        "startDate": "2023-01-01",
        "endDate": "2023-01-31"
      },
      "downloadUrl": "/api/downloads/report_123.xlsx"
    },
    // ...mais relatórios
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 35,
    "pages": 2
  }
}
```

#### Obter Relatório

```
GET /reports/:id
```

Resposta:

```json
{
  "id": "report_123",
  "type": "financial",
  "name": "Relatório Financeiro - Janeiro 2023",
  "createdAt": "2023-02-01T10:00:00Z",
  "params": {
    "startDate": "2023-01-01",
    "endDate": "2023-01-31"
  },
  "summary": {
    "totalRevenue": 125000.50,
    "totalExpenses": 78500.25,
    "netProfit": 46500.25,
    "clientCount": 45
  },
  "downloadUrl": "/api/downloads/report_123.xlsx"
}
```

#### Gerar Relatório

```
POST /reports
```

Corpo da requisição:

```json
{
  "type": "financial",
  "name": "Relatório Financeiro - Fevereiro 2023",
  "params": {
    "startDate": "2023-02-01",
    "endDate": "2023-02-28"
  },
  "format": "xlsx"
}
```

Resposta:

```json
{
  "id": "report_124",
  "type": "financial",
  "name": "Relatório Financeiro - Fevereiro 2023",
  "status": "pending",
  "createdAt": "2023-03-01T09:30:00Z",
  "params": {
    "startDate": "2023-02-01",
    "endDate": "2023-02-28"
  },
  "taskId": "task_125"
}
```

### Agendamentos

#### Listar Agendamentos

```
GET /schedules
```

Resposta:

```json
{
  "data": [
    {
      "id": "schedule_123",
      "name": "Relatório Financeiro Mensal",
      "cronExpression": "0 0 1 * *",
      "taskTemplate": {
        "type": "generate_report",
        "params": {
          "reportType": "financial",
          "period": "previous_month"
        }
      },
      "enabled": true,
      "nextRun": "2023-03-01T00:00:00Z",
      "lastRun": "2023-02-01T00:00:00Z"
    },
    // ...mais agendamentos
  ]
}
```

#### Criar Agendamento

```
POST /schedules
```

Corpo da requisição:

```json
{
  "name": "Backup Diário de Clientes",
  "cronExpression": "0 0 * * *",
  "taskTemplate": {
    "type": "backup_clients",
    "params": {
      "format": "json"
    }
  },
  "enabled": true
}
```

Resposta:

```json
{
  "id": "schedule_124",
  "name": "Backup Diário de Clientes",
  "cronExpression": "0 0 * * *",
  "taskTemplate": {
    "type": "backup_clients",
    "params": {
      "format": "json"
    }
  },
  "enabled": true,
  "nextRun": "2023-03-02T00:00:00Z"
}
```

#### Atualizar Agendamento

```
PUT /schedules/:id
```

Corpo da requisição:

```json
{
  "name": "Backup Diário de Clientes",
  "cronExpression": "0 0 * * *",
  "taskTemplate": {
    "type": "backup_clients",
    "params": {
      "format": "json"
    }
  },
  "enabled": false
}
```

Resposta:

```json
{
  "id": "schedule_124",
  "name": "Backup Diário de Clientes",
  "cronExpression": "0 0 * * *",
  "taskTemplate": {
    "type": "backup_clients",
    "params": {
      "format": "json"
    }
  },
  "enabled": false,
  "nextRun": null,
  "lastRun": "2023-03-01T00:00:00Z"
}
```

#### Excluir Agendamento

```
DELETE /schedules/:id
```

Resposta:

```json
{
  "success": true,
  "message": "Agendamento excluído com sucesso"
}
```

### Sistema

#### Status do Sistema

```
GET /system/status
```

Resposta:

```json
{
  "status": "healthy",
  "version": "1.2.3",
  "uptime": 345600,
  "services": {
    "dashboard": "running",
    "automator": "running",
    "scheduler": "running",
    "redis": "connected"
  },
  "techcare": {
    "status": "connected",
    "lastCheck": "2023-03-01T12:30:45Z"
  },
  "resources": {
    "cpu": 25.5,
    "memory": 42.3,
    "disk": 68.7
  }
}
```

#### Logs do Sistema

```
GET /system/logs
```

Parâmetros de consulta:
- `level` (opcional): Filtrar por nível (debug, info, warn, error)
- `service` (opcional): Filtrar por serviço (dashboard, automator, scheduler)
- `limit` (opcional): Número máximo de logs, padrão: 100

Resposta:

```json
{
  "logs": [
    {
      "timestamp": "2023-03-01T12:35:22Z",
      "level": "info",
      "service": "automator",
      "message": "Tarefa task_126 concluída com sucesso"
    },
    {
      "timestamp": "2023-03-01T12:34:15Z",
      "level": "error",
      "service": "scheduler",
      "message": "Falha ao executar agendamento schedule_125: Erro de conexão"
    },
    // ...mais logs
  ]
}
```

## Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Parâmetros inválidos
- `401 Unauthorized`: Autenticação necessária
- `403 Forbidden`: Sem permissão para acessar o recurso
- `404 Not Found`: Recurso não encontrado
- `409 Conflict`: Conflito ao processar a requisição
- `500 Internal Server Error`: Erro interno do servidor

## Limites de Taxa

A API implementa limites de taxa para prevenir abusos:

- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

Ao atingir o limite, a API retornará o status `429 Too Many Requests`.

## Versionamento

A versão atual da API é v1. A versão pode ser especificada na URL:

```
http://localhost:3000/api/v1/tasks
```

Se não especificada, a versão mais recente será utilizada.

## Webhooks

O sistema suporta webhooks para notificações em tempo real:

### Registrar Webhook

```
POST /webhooks
```

Corpo da requisição:

```json
{
  "url": "https://seu-sistema.com/webhooks/techcare",
  "events": ["task.completed", "task.failed", "report.generated"],
  "secret": "seu_token_secreto"
}
```

Resposta:

```json
{
  "id": "webhook_123",
  "url": "https://seu-sistema.com/webhooks/techcare",
  "events": ["task.completed", "task.failed", "report.generated"],
  "createdAt": "2023-03-01T14:00:00Z"
}
```

### Formato de Payload de Webhook

```json
{
  "event": "task.completed",
  "timestamp": "2023-03-01T15:30:45Z",
  "data": {
    "id": "task_127",
    "type": "extract_data",
    "status": "completed",
    "result": {
      "recordsProcessed": 120,
      "downloadUrl": "/api/downloads/report_127.xlsx"
    }
  },
  "signature": "sha256=..."
}
```

A assinatura é calculada usando HMAC-SHA256 com o segredo fornecido durante o registro do webhook.
