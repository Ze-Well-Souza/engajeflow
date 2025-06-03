# Guia de Implantação do Banco de Dados - TechCare Connect Automator

Este guia fornece instruções detalhadas para implantar e configurar o banco de dados PostgreSQL via Supabase para o TechCare Connect Automator, garantindo que o MVP esteja pronto para produção.

## Pré-requisitos

- Acesso ao projeto Supabase: `https://pkefwvvkydzzfstzwppv.supabase.co`
- Chave de API do Supabase (disponível no arquivo `src/integrations/supabase/client.ts`)
- Permissões de administrador no projeto Supabase

## Estrutura de Arquivos

Os seguintes arquivos foram criados para implementar o banco de dados:

1. **Documentação**:
   - `docs/database_structure.md` - Documentação detalhada da estrutura do banco de dados

2. **Scripts de Migração**:
   - `supabase/migrations/20250522_01_reports_tables.sql` - Tabelas para relatórios e métricas
   - `supabase/migrations/20250522_02_automation_tables.sql` - Tabelas para automações e tarefas
   - `supabase/migrations/20250522_03_rls_policies.sql` - Políticas de segurança (RLS) e índices
   - `supabase/migrations/20250522_04_seed_data.sql` - Dados iniciais para o sistema

3. **Scripts de Utilitários**:
   - `scripts/apply_migrations.sh` - Script para aplicar migrações no Supabase

## Passos para Implantação

### 1. Aplicar Migrações no Supabase

Você pode aplicar as migrações de duas formas:

#### Opção 1: Usando o Script de Migração

```bash
cd /caminho/para/techcare-connect-automator
./scripts/apply_migrations.sh <supabase_url> <supabase_key>
```

Substitua `<supabase_url>` e `<supabase_key>` pelos valores correspondentes do seu projeto Supabase.

#### Opção 2: Usando o Console SQL do Supabase

1. Acesse o painel de administração do Supabase: `https://app.supabase.com`
2. Selecione seu projeto
3. Navegue até "SQL Editor"
4. Crie uma nova consulta
5. Copie e cole o conteúdo de cada arquivo de migração na ordem numérica
6. Execute cada script separadamente

### 2. Verificar a Implantação

Após aplicar as migrações, verifique se todas as tabelas foram criadas corretamente:

1. No painel do Supabase, navegue até "Table Editor"
2. Confirme se as seguintes tabelas existem:
   - `reports`
   - `metrics`
   - `automation_tasks`
   - `automation_templates`
   - (além das tabelas existentes)

3. Verifique se os dados iniciais foram inseridos:
   - Planos (Básico, Profissional, Empresarial)
   - Módulos do sistema
   - Permissões básicas

### 3. Testar as Políticas de Segurança (RLS)

Para garantir que as políticas de segurança estão funcionando corretamente:

1. No painel do Supabase, navegue até "Authentication" > "Policies"
2. Verifique se as políticas RLS estão ativas para todas as tabelas
3. Teste o acesso com diferentes usuários para confirmar o isolamento multi-tenant

## Integração com a Aplicação

A aplicação já está configurada para se conectar ao Supabase através do cliente em `src/integrations/supabase/client.ts`. Não são necessárias alterações adicionais no código para utilizar as novas tabelas.

## Considerações para Produção

1. **Backup e Recuperação**:
   - Configure backups automáticos no Supabase
   - Documente procedimentos de recuperação

2. **Monitoramento**:
   - Implemente alertas para uso de recursos
   - Monitore o desempenho das consultas

3. **Escalabilidade**:
   - As tabelas com crescimento rápido (logs, métricas) estão preparadas para particionamento
   - Considere implementar políticas de arquivamento para dados históricos

4. **Segurança**:
   - Revise regularmente as políticas RLS
   - Implemente auditoria de acesso aos dados sensíveis

## Próximos Passos

1. **Painel/Dashboard**:
   - Desenvolver visualizações para os dados armazenados
   - Implementar relatórios e métricas em tempo real

2. **Autenticação Multi-tenant Avançada**:
   - Implementar convites por e-mail para novos membros
   - Adicionar gerenciamento de papéis mais granular

3. **Otimização de Desempenho**:
   - Monitorar consultas lentas e otimizar índices
   - Implementar cache para consultas frequentes

## Suporte e Manutenção

Para questões relacionadas ao banco de dados:

1. Consulte a documentação do Supabase: https://supabase.com/docs
2. Verifique os logs de erro no painel do Supabase
3. Utilize as ferramentas de monitoramento para identificar problemas de desempenho
