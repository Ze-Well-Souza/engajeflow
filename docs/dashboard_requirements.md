# Requisitos do Dashboard - TechCare Connect Automator

## Visão Geral

Este documento define os requisitos e layout para o dashboard do TechCare Connect Automator, que será integrado ao banco de dados PostgreSQL/Supabase recentemente implementado. O dashboard fornecerá visualizações em tempo real de métricas importantes, status de automações e relatórios para os usuários do sistema.

## Objetivos do Dashboard

1. Fornecer uma visão consolidada do desempenho e status do sistema
2. Exibir métricas e KPIs relevantes para tomada de decisão
3. Permitir monitoramento de automações e tarefas agendadas
4. Visualizar dados históricos e tendências
5. Suportar experiência multi-tenant com isolamento de dados por cliente

## Componentes do Dashboard

### 1. Seção de Métricas Principais (KPIs)

**Cartões de Estatísticas:**
- Total de Automações Ativas (da tabela `automation_tasks`)
- Taxa de Sucesso de Automações (calculada a partir de `automation_tasks.status`)
- Total de Publicações Agendadas (da tabela `scheduled_posts`)
- Atividades Recentes (da tabela `activity_logs`)

### 2. Gráficos e Visualizações

**Gráfico de Desempenho de Automações:**
- Tipo: Gráfico de linha
- Dados: Taxa de sucesso de automações ao longo do tempo (da tabela `metrics`)
- Filtros: Período (7 dias, 30 dias, 90 dias)

**Distribuição de Status de Tarefas:**
- Tipo: Gráfico de pizza/donut
- Dados: Distribuição de tarefas por status (pending, processing, completed, failed)
- Fonte: Tabela `automation_tasks`

**Atividade por Módulo:**
- Tipo: Gráfico de barras
- Dados: Contagem de atividades por módulo do sistema
- Fonte: Tabela `activity_logs`

### 3. Listas e Tabelas

**Automações Recentes:**
- Tipo: Tabela com paginação
- Dados: Lista das automações mais recentes com status, tipo e data
- Fonte: Tabela `automation_tasks`
- Ações: Ver detalhes, Reexecutar (se falhou)

**Publicações Agendadas:**
- Tipo: Tabela com paginação
- Dados: Próximas publicações agendadas com plataforma, data e status
- Fonte: Tabela `scheduled_posts`
- Ações: Ver detalhes, Editar, Cancelar

**Relatórios Gerados:**
- Tipo: Lista com cards
- Dados: Relatórios recentemente gerados com tipo e data
- Fonte: Tabela `reports`
- Ações: Download, Regenerar

### 4. Widgets de Status

**Status de Integrações:**
- Tipo: Cards de status
- Dados: Status atual das integrações com plataformas sociais
- Fonte: Tabela `social_integrations`

**Alertas e Notificações:**
- Tipo: Lista de alertas
- Dados: Erros recentes, avisos e notificações importantes
- Fonte: Tabela `activity_logs` filtrada por status de erro

## Layout do Dashboard

O layout será responsivo e organizado em seções:

1. **Cabeçalho:**
   - Título do dashboard
   - Seletor de período (Hoje, Esta semana, Este mês, Personalizado)
   - Filtro de cliente (para administradores que gerenciam múltiplos clientes)

2. **Primeira Linha:**
   - Cards de KPIs principais (4 cards em desktop, empilhados em mobile)

3. **Segunda Linha:**
   - Gráfico de desempenho de automações (largura total em desktop, empilhado em mobile)

4. **Terceira Linha:**
   - Distribuição de status de tarefas (50% largura)
   - Atividade por módulo (50% largura)
   - (Empilhados em mobile)

5. **Quarta Linha:**
   - Tabs para alternar entre "Automações Recentes", "Publicações Agendadas" e "Relatórios Gerados"

6. **Quinta Linha:**
   - Status de integrações e alertas

## Requisitos Técnicos

1. **Integração com Supabase:**
   - Utilizar os hooks existentes e criar novos conforme necessário
   - Implementar consultas otimizadas para evitar sobrecarga do banco

2. **Atualização de Dados:**
   - Implementar atualização automática a cada 60 segundos
   - Adicionar botão de atualização manual

3. **Filtragem e Personalização:**
   - Permitir filtragem por período
   - Salvar preferências do usuário localmente

4. **Responsividade:**
   - Layout adaptável para desktop, tablet e mobile
   - Reorganização de componentes em telas menores

5. **Performance:**
   - Implementar lazy loading para componentes pesados
   - Utilizar memoização para evitar re-renderizações desnecessárias

## Integração com Banco de Dados

O dashboard utilizará as seguintes tabelas do banco de dados:

1. `automation_tasks` - Para exibir status e métricas de automações
2. `scheduled_posts` - Para exibir publicações agendadas
3. `activity_logs` - Para exibir atividades recentes e alertas
4. `reports` - Para exibir relatórios gerados
5. `metrics` - Para exibir tendências e métricas históricas
6. `social_integrations` - Para exibir status de integrações
7. `clients` e `client_members` - Para filtrar dados por cliente (multi-tenant)

## Próximos Passos

1. Implementar componentes React para cada seção do dashboard
2. Criar hooks personalizados para buscar dados do Supabase
3. Implementar lógica de filtragem e atualização
4. Testar com diferentes perfis de usuário e volumes de dados
5. Otimizar performance e experiência do usuário
