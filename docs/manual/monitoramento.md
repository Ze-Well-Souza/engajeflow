# Monitoramento

O TechCare Connect Automator inclui um sistema robusto de monitoramento que permite acompanhar o desempenho, identificar problemas e garantir a saúde do sistema.

## Painel de Monitoramento

![Painel de Monitoramento](./images/painel_monitoramento.png)

O painel de monitoramento oferece uma visão completa do estado do sistema, incluindo:

1. **Métricas em Tempo Real**: Indicadores de desempenho atualizados constantemente
2. **Gráficos de Tendência**: Visualização da evolução das métricas ao longo do tempo
3. **Alertas Ativos**: Notificações sobre problemas detectados
4. **Status dos Serviços**: Estado atual de cada componente do sistema

## Métricas Principais

![Métricas Principais](./images/metricas_principais.png)

As métricas mais importantes monitoradas pelo sistema incluem:

### Métricas de Desempenho

- **Tamanho da Fila**: Número de tarefas aguardando processamento
- **Taxa de Processamento**: Tarefas processadas por minuto
- **Tempo Médio de Processamento**: Duração média das tarefas
- **Taxa de Erros**: Percentual de tarefas que falham

### Métricas de Recursos

- **Uso de CPU**: Percentual de utilização do processador
- **Uso de Memória**: Consumo de memória RAM
- **Uso de Disco**: Espaço em disco utilizado
- **Tráfego de Rede**: Volume de dados transmitidos

### Métricas de Aplicação

- **Tempo de Resposta da API**: Latência das chamadas à API
- **Sessões Ativas**: Número de usuários conectados
- **Estado do Circuit Breaker**: Status dos mecanismos de proteção
- **Saúde do Redis**: Estado do sistema de filas e cache

## Configurando Alertas

![Configuração de Alertas](./images/config_alertas.png)

O sistema permite configurar alertas personalizados para ser notificado quando métricas ultrapassarem limites definidos:

1. Acesse "Monitoramento" > "Configurar Alertas"
2. Clique em "Novo Alerta"
3. Selecione a métrica a ser monitorada
4. Defina as condições de disparo (limite, duração, etc.)
5. Configure os canais de notificação (email, SMS, webhook)
6. Salve a configuração

### Tipos de Alertas

- **Threshold**: Dispara quando uma métrica ultrapassa um valor específico
- **Anomalia**: Detecta desvios significativos do padrão normal
- **Ausência**: Alerta quando dados esperados não são recebidos
- **Tendência**: Identifica padrões de crescimento ou queda rápidos

### Canais de Notificação

O sistema suporta diversos canais para envio de alertas:

- **Email**: Envio de notificações por email
- **SMS**: Mensagens de texto para celulares (requer configuração adicional)
- **Webhook**: Integração com sistemas externos como Slack, Teams ou Discord
- **Dashboard**: Exibição visual no painel de monitoramento

## Visualizando Logs

![Visualização de Logs](./images/visualizacao_logs.png)

Os logs do sistema são essenciais para diagnóstico de problemas:

1. Acesse "Monitoramento" > "Logs"
2. Selecione o serviço desejado (Dashboard, Automator, Scheduler)
3. Escolha o nível de log (debug, info, warn, error)
4. Defina o período de tempo para visualização
5. Use os filtros para encontrar informações específicas

### Níveis de Log

- **DEBUG**: Informações detalhadas para desenvolvimento e troubleshooting
- **INFO**: Mensagens informativas sobre operações normais
- **WARN**: Avisos sobre situações potencialmente problemáticas
- **ERROR**: Erros que afetam funcionalidades específicas
- **FATAL**: Erros críticos que comprometem o funcionamento do sistema

### Pesquisa e Filtros

Para encontrar informações específicas nos logs:

1. Use a barra de pesquisa para buscar termos específicos
2. Aplique filtros por:
   - Nível de log
   - Serviço ou componente
   - Período de tempo
   - ID de tarefa ou automação
   - Tipo de evento

## Monitoramento Avançado com Grafana

![Dashboard Grafana](./images/dashboard_grafana.png)

O TechCare Connect Automator integra-se com Grafana para monitoramento avançado:

1. Acesse o Grafana em `http://seu-servidor:3001`
2. Faça login com as credenciais configuradas
3. Navegue pelos dashboards pré-configurados ou crie seus próprios

### Dashboards Disponíveis

- **Visão Geral**: Resumo de todas as métricas importantes
- **Desempenho de Tarefas**: Métricas detalhadas sobre processamento de tarefas
- **Recursos do Sistema**: Uso de CPU, memória, disco e rede
- **Saúde do Redis**: Métricas específicas do Redis
- **Logs e Erros**: Visualização e análise de logs

### Personalizando Dashboards

Para criar ou personalizar dashboards:

1. Clique em "Create" > "Dashboard"
2. Adicione painéis usando o botão "Add panel"
3. Selecione a fonte de dados (Prometheus)
4. Configure as consultas e visualizações
5. Organize os painéis conforme necessário
6. Salve o dashboard com um nome descritivo

## Relatórios de Saúde do Sistema

![Relatório de Saúde](./images/relatorio_saude.png)

O sistema gera relatórios periódicos sobre a saúde geral:

1. Acesse "Monitoramento" > "Relatórios de Saúde"
2. Selecione o período desejado
3. Clique em "Gerar Relatório"

Os relatórios incluem:

- **Resumo Executivo**: Visão geral do estado do sistema
- **Métricas de Desempenho**: Estatísticas sobre processamento de tarefas
- **Incidentes**: Problemas detectados durante o período
- **Uso de Recursos**: Tendências de consumo de recursos
- **Recomendações**: Sugestões para melhorar o desempenho

## Melhores Práticas de Monitoramento

- **Verificação Regular**: Acesse o painel de monitoramento diariamente
- **Ajuste de Alertas**: Refine os limites para evitar falsos positivos
- **Análise de Tendências**: Observe padrões ao longo do tempo
- **Manutenção Preventiva**: Use os dados para identificar problemas antes que afetem os usuários
- **Documentação**: Registre incidentes e resoluções para referência futura
