# Estrutura de Banco de Dados - TechCare Connect Automator

## Visão Geral

Este documento detalha a estrutura de banco de dados proposta para o TechCare Connect Automator, utilizando PostgreSQL através do Supabase como serviço gerenciado. A estrutura foi projetada para atender aos requisitos do MVP, incluindo histórico, gerenciamento de usuários, relatórios e suporte multi-tenant.

## Arquitetura de Banco de Dados

### Tecnologia Escolhida: PostgreSQL via Supabase

**Justificativa:**
- O projeto já utiliza Supabase como serviço de banco de dados e autenticação
- PostgreSQL oferece robustez para operações transacionais e relacionais
- Supabase simplifica a implementação de autenticação e autorização
- Facilidade de escalar verticalmente e horizontalmente conforme necessário
- Suporte nativo a JSON para dados flexíveis e semi-estruturados

## Estrutura de Tabelas

### Tabelas Principais

#### 1. Autenticação e Usuários

| Tabela | Descrição | Campos Principais |
|--------|-----------|-------------------|
| `profiles` | Perfis de usuários do sistema | id, email, full_name, avatar_url, is_admin, created_at, updated_at |
| `clients` | Organizações/clientes (multi-tenant) | id, name, type, document, email, phone, address, plan_id, status, created_at, updated_at |
| `client_members` | Associação entre usuários e clientes | id, user_id, client_id, role, created_at, updated_at |

#### 2. Controle de Acesso

| Tabela | Descrição | Campos Principais |
|--------|-----------|-------------------|
| `modules` | Módulos do sistema | id, name, description, is_active |
| `permissions` | Permissões disponíveis | id, action, description, module_id |
| `client_permissions` | Permissões atribuídas a clientes | id, client_id, permission_id, granted_by, created_at |
| `plans` | Planos de assinatura | id, name, description, features (JSON), is_active, created_at |

#### 3. Histórico e Logs

| Tabela | Descrição | Campos Principais |
|--------|-----------|-------------------|
| `activity_logs` | Registro de atividades dos usuários | id, user_email, action, module, status, details, ip, metadata (JSON), timestamp |

#### 4. Conteúdo e Automação

| Tabela | Descrição | Campos Principais |
|--------|-----------|-------------------|
| `social_media` | Mídias para publicação | id, client_id, user_id, title, description, media_type, storage_path, thumbnail_path, dimensions, size, duration, metadata, created_at, updated_at |
| `media_edits` | Edições aplicadas às mídias | id, media_id, edit_type, edit_data (JSON), edit_order, created_at |
| `social_integrations` | Integrações com redes sociais | id, client_id, user_id, platform, platform_user_id, access_token, refresh_token, token_expires_at, status, metadata, created_at, updated_at |
| `scheduled_posts` | Agendamento de publicações | id, client_id, user_id, media_id, integration_id, platform, caption, hashtags, scheduled_for, status, platform_post_id, post_url, error_message, metadata, created_at, updated_at |

### Tabelas Adicionais Recomendadas para o MVP

#### 5. Relatórios e Métricas

| Tabela | Descrição | Campos Principais |
|--------|-----------|-------------------|
| `reports` | Relatórios gerados | id, client_id, user_id, report_type, parameters (JSON), status, file_path, created_at, expires_at |
| `metrics` | Métricas de desempenho | id, client_id, metric_type, period_start, period_end, value, metadata (JSON), created_at |

#### 6. Automações e Tarefas

| Tabela | Descrição | Campos Principais |
|--------|-----------|-------------------|
| `automation_tasks` | Tarefas de automação | id, client_id, user_id, task_type, status, parameters (JSON), result (JSON), scheduled_for, executed_at, error_message, created_at, updated_at |
| `automation_templates` | Templates de automação | id, client_id, name, description, task_type, parameters (JSON), is_active, created_at, updated_at |

## Relacionamentos Principais

1. **Usuários e Clientes (Multi-tenant)**:
   - Um usuário (`profiles`) pode pertencer a múltiplos clientes (`clients`) através de `client_members`
   - Cada cliente pode ter múltiplos usuários com diferentes funções

2. **Permissões e Acesso**:
   - Clientes têm permissões específicas através de `client_permissions`
   - Permissões são agrupadas por módulos do sistema

3. **Conteúdo e Publicações**:
   - Mídias (`social_media`) pertencem a um cliente específico
   - Publicações agendadas (`scheduled_posts`) referenciam mídias e integrações

4. **Histórico e Auditoria**:
   - Todas as ações importantes são registradas em `activity_logs`
   - Logs contêm metadados flexíveis para análise detalhada

## Índices Recomendados

Para otimizar o desempenho, recomendamos os seguintes índices:

```sql
-- Índices para pesquisa rápida por cliente
CREATE INDEX idx_social_media_client_id ON social_media(client_id);
CREATE INDEX idx_scheduled_posts_client_id ON scheduled_posts(client_id);
CREATE INDEX idx_activity_logs_user_email ON activity_logs(user_email);

-- Índices para consultas de data/hora
CREATE INDEX idx_scheduled_posts_scheduled_for ON scheduled_posts(scheduled_for);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp);

-- Índices compostos para consultas frequentes
CREATE INDEX idx_client_members_client_user ON client_members(client_id, user_id);
```

## Implementação no Supabase

### Configuração Inicial

1. **Criação do Projeto no Supabase**:
   - Já configurado com URL: `https://pkefwvvkydzzfstzwppv.supabase.co`
   - Chave de API já definida no arquivo `client.ts`

2. **Políticas de Segurança (RLS)**:
   - Implementar Row Level Security para garantir isolamento multi-tenant
   - Exemplo para tabela `social_media`:
     ```sql
     CREATE POLICY "Usuários podem ver apenas mídias de seus clientes"
     ON social_media FOR SELECT
     USING (
       auth.uid() IN (
         SELECT user_id FROM client_members WHERE client_id = social_media.client_id
       )
     );
     ```

3. **Triggers e Funções**:
   - Criar trigger para atualizar `updated_at` automaticamente
   - Implementar funções para limpeza de dados antigos ou arquivamento

## Migração e Versionamento

Para garantir a evolução controlada do banco de dados:

1. **Scripts de Migração**:
   - Criar diretório `supabase/migrations` para armazenar scripts SQL versionados
   - Nomear scripts com timestamp para ordenação (ex: `20250522_initial_schema.sql`)

2. **Seed Data**:
   - Criar script `seed.sql` para dados iniciais (planos, permissões, etc.)
   - Incluir usuário admin conforme implementado em `initAdminUser.ts`

## Considerações de Escalabilidade

1. **Particionamento**:
   - Preparar tabelas de logs e métricas para particionamento por data
   - Exemplo:
     ```sql
     CREATE TABLE activity_logs_partition OF activity_logs
     PARTITION BY RANGE (timestamp);
     ```

2. **Arquivamento**:
   - Implementar política de arquivamento para dados históricos
   - Considerar migração para tabelas de arquivamento após período definido

3. **Índices Parciais**:
   - Para tabelas grandes, considerar índices parciais focados em dados ativos
   - Exemplo:
     ```sql
     CREATE INDEX idx_scheduled_posts_pending ON scheduled_posts(scheduled_for)
     WHERE status = 'pending';
     ```

## Próximos Passos

1. Implementar scripts de migração para criar as tabelas adicionais recomendadas
2. Configurar políticas de segurança (RLS) para todas as tabelas
3. Implementar funções e triggers para manutenção automática
4. Configurar backup e estratégias de recuperação
5. Documentar procedimentos de manutenção e monitoramento

## Conclusão

Esta estrutura de banco de dados atende aos requisitos do MVP, incluindo histórico, usuários, relatórios e suporte multi-tenant. A escolha do PostgreSQL via Supabase oferece um equilíbrio entre facilidade de uso e robustez, permitindo escalabilidade futura conforme o crescimento da aplicação.
