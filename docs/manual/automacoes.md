# Configuração de Automações

Esta seção explica como configurar e gerenciar automações no TechCare Connect Automator.

## Tipos de Automações Disponíveis

![Tipos de Automações](./images/tipos_automacoes.png)

O sistema oferece diversos tipos de automações pré-configuradas:

1. **Extração de Dados Financeiros**: Coleta informações financeiras da plataforma TechCare
2. **Relatórios de Clientes**: Gera relatórios sobre atividades e métricas de clientes
3. **Análise de Vendas**: Extrai e processa dados de vendas para análise
4. **Verificação de Estoque**: Monitora níveis de estoque e gera alertas
5. **Automações Personalizadas**: Crie fluxos customizados para necessidades específicas

## Criando uma Nova Automação

Para criar uma nova automação, siga estes passos:

1. No Dashboard, clique em "Automações" na barra lateral
2. Clique no botão "+ Nova Automação" no canto superior direito
3. Selecione o tipo de automação desejado
4. Preencha os campos obrigatórios no formulário de configuração

![Criação de Automação](./images/criar_automacao.png)

### Campos Comuns a Todas as Automações

- **Nome**: Identificador único para a automação
- **Descrição**: Detalhes sobre o propósito da automação
- **Agendamento**: Quando a automação deve ser executada
- **Prioridade**: Importância relativa (Alta, Média, Baixa)
- **Notificações**: Configurações de alertas para resultados

### Configuração de Agendamento

![Configuração de Agendamento](./images/agendamento.png)

O sistema oferece várias opções de agendamento:

- **Única vez**: Executa a automação apenas uma vez em data/hora específica
- **Recorrente**: Executa em intervalos regulares (diário, semanal, mensal)
- **Expressão Cron**: Para agendamentos complexos usando sintaxe cron
- **Baseado em Evento**: Executa quando determinado evento ocorre no sistema

Para configurar um agendamento recorrente:

1. Selecione "Recorrente" no tipo de agendamento
2. Escolha a frequência (diária, semanal, mensal)
3. Defina os parâmetros específicos (dias da semana, hora do dia, etc.)
4. Opcionalmente, configure uma data de término

## Configurações Específicas por Tipo de Automação

### Extração de Dados Financeiros

![Configuração Financeira](./images/config_financeira.png)

- **Período**: Intervalo de datas para extração (último mês, trimestre, personalizado)
- **Categorias**: Tipos de dados financeiros a serem extraídos
- **Formato de Saída**: CSV, Excel, JSON ou PDF
- **Filtros Avançados**: Critérios específicos para refinar os dados

### Relatórios de Clientes

- **Segmentos de Clientes**: Grupos específicos para análise
- **Métricas**: Indicadores a serem incluídos no relatório
- **Comparação**: Períodos anteriores para comparação
- **Visualizações**: Tipos de gráficos e tabelas a serem gerados

### Análise de Vendas

- **Produtos/Serviços**: Itens específicos para análise
- **Dimensões**: Perspectivas de análise (tempo, região, vendedor)
- **KPIs**: Indicadores-chave de desempenho a serem calculados
- **Previsões**: Configurações para projeções futuras

## Gerenciando Automações Existentes

![Lista de Automações](./images/lista_automacoes.png)

Na página de Automações, você pode:

- **Visualizar**: Ver detalhes e histórico de execuções
- **Editar**: Modificar configurações existentes
- **Duplicar**: Criar uma cópia da automação
- **Desativar/Ativar**: Pausar ou retomar a execução
- **Excluir**: Remover permanentemente a automação

Para editar uma automação:

1. Clique no nome da automação ou no botão "Editar"
2. Modifique os campos desejados
3. Clique em "Salvar Alterações"

## Monitorando Execuções

![Histórico de Execuções](./images/historico_execucoes.png)

Para cada automação, você pode acessar o histórico de execuções:

1. Clique na automação desejada
2. Selecione a aba "Histórico"
3. Visualize todas as execuções anteriores com status e resultados

O histórico inclui:

- **Data e Hora**: Quando a execução ocorreu
- **Duração**: Tempo total de processamento
- **Status**: Sucesso, falha ou cancelado
- **Resultados**: Links para os dados gerados
- **Logs**: Registros detalhados da execução

## Configurações Avançadas

### Dependências entre Automações

Você pode configurar automações para executar em sequência:

1. Na configuração da automação, vá para "Configurações Avançadas"
2. Em "Dependências", selecione as automações que devem ser concluídas antes
3. Configure o comportamento em caso de falha nas dependências

### Tratamento de Falhas

![Configuração de Retry](./images/config_retry.png)

Configure como o sistema deve reagir a falhas:

- **Tentativas**: Número de vezes para tentar novamente
- **Intervalo**: Tempo de espera entre tentativas
- **Escalonamento**: Aumentar intervalo progressivamente
- **Notificações**: Alertas específicos para falhas

### Parâmetros Dinâmicos

Para automações mais flexíveis, use parâmetros dinâmicos:

1. Na configuração, adicione parâmetros usando a sintaxe `${nome_parametro}`
2. Defina valores padrão e regras de validação
3. Os parâmetros podem ser preenchidos manualmente ou por outras automações

## Dicas e Melhores Práticas

- **Nomes Descritivos**: Use nomes claros que indiquem o propósito da automação
- **Documentação**: Preencha descrições detalhadas para facilitar manutenção futura
- **Testes**: Use a opção "Executar Agora" para testar antes de agendar
- **Monitoramento**: Configure notificações para ser alertado sobre falhas
- **Otimização**: Revise periodicamente as automações para melhorar desempenho
- **Backup**: Exporte configurações importantes regularmente
