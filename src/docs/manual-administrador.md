
# Manual do Administrador - TechCare Automation Platform

## Índice
1. [Introdução](#introdução)
2. [Acesso ao Sistema](#acesso-ao-sistema)
3. [Dashboard Administrativo](#dashboard-administrativo)
4. [Gerenciamento de Clientes](#gerenciamento-de-clientes)
5. [Permissões de Acesso](#permissões-de-acesso)
6. [Logs de Atividade](#logs-de-atividade)
7. [Configurações do Sistema](#configurações-do-sistema)
8. [Monitoramento e Performance](#monitoramento-e-performance)
9. [Gerenciamento de Integrações](#gerenciamento-de-integrações)
10. [Segurança e Conformidade](#segurança-e-conformidade)
11. [Suporte e Resolução de Problemas](#suporte-e-resolução-de-problemas)
12. [Gerenciamento de Variáveis de Ambiente](#gerenciamento-de-variáveis-de-ambiente)
13. [Circuit Breakers e Resiliência](#circuit-breakers-e-resiliência)
14. [Gerenciamento de Filas e Trabalhos](#gerenciamento-de-filas-e-trabalhos)

## Introdução

Bem-vindo ao Manual do Administrador do TechCare Automation Platform. Este documento fornece instruções detalhadas sobre como gerenciar o sistema, usuários, permissões e monitorar atividades.

O TechCare Automation Platform é uma solução completa para automação de mensagens multi-canal com bot de vendas integrado, projetada para facilitar a comunicação com clientes e aumentar as vendas através de automações inteligentes.

Como administrador, você tem acesso a recursos avançados para configurar o sistema de acordo com as necessidades de sua empresa e seus clientes.

## Acesso ao Sistema

### Primeiro Acesso

1. Acesse a URL fornecida pelo suporte TechCare.
2. Na tela de login, utilize as credenciais de administrador fornecidas.
3. Na primeira vez que acessar o sistema, você será solicitado a alterar sua senha.
4. Escolha uma senha forte que contenha letras maiúsculas, minúsculas, números e símbolos.

### Recuperação de Senha

1. Na tela de login, clique em "Esqueceu sua senha?"
2. Informe o e-mail associado à sua conta de administrador.
3. Siga as instruções enviadas ao seu e-mail para redefinir sua senha.

### Autenticação Multi-fator

1. Para maior segurança, configure a autenticação de dois fatores (2FA):
   - Acesse "Configurações de Conta" no menu do usuário
   - Selecione "Segurança"
   - Clique em "Configurar 2FA"
   - Escolha entre aplicativo autenticador, SMS ou e-mail
   - Siga as instruções para concluir a configuração

## Dashboard Administrativo

O Dashboard Administrativo é a primeira tela após o login e apresenta uma visão geral do sistema:

### Componentes Principais

- **Visão Geral**: Métricas de uso do sistema pelos clientes
- **Alertas**: Notificações de atividades suspeitas ou problemas no sistema
- **Atividades Recentes**: Lista das últimas ações realizadas pelos usuários
- **Status dos Serviços**: Monitoramento em tempo real dos serviços do sistema
- **Acesso Rápido**: Atalhos para as funções administrativas mais usadas

### Personalizando o Dashboard

1. Clique no botão "Personalizar" no canto superior direito.
2. Arraste e solte os widgets para reorganizá-los.
3. Clique no ícone de engrenagem de cada widget para configurar suas opções.
4. Clique em "Salvar Layout" para manter suas alterações.

### Painéis de Inteligência Analítica

1. O sistema oferece painéis analíticos avançados:
   - Tendências de uso por segmento
   - Análise de engajamento de clientes
   - Previsão de crescimento e necessidades de recursos
   - Métricas de ROI por módulo ativo

## Gerenciamento de Clientes

### Visualizando Clientes

1. Acesse a seção "Administração" no menu lateral.
2. Selecione "Clientes" para ver a lista de todos os clientes cadastrados.
3. Utilize os filtros de busca para encontrar clientes específicos por:
   - Nome/Razão social
   - CPF/CNPJ
   - Segmento de mercado
   - Status da conta
   - Plano contratado
   - Data de cadastro

### Adicionando um Novo Cliente

1. Na página de Clientes, clique no botão "Adicionar Cliente".
2. Preencha o formulário com os dados do cliente, incluindo:
   - Nome/Razão Social
   - CPF/CNPJ
   - Endereço completo
   - Informações de contato (e-mail, telefone, celular)
   - Tipo de cliente (físico ou jurídico)
   - Segmento de atuação
   - Preferências de comunicação
3. Defina um plano de serviço para o cliente.
4. Configure as permissões iniciais do cliente.
5. Defina os usuários administradores iniciais.
6. Clique em "Salvar" para concluir o cadastro.

### Editando um Cliente

1. Na lista de clientes, clique no botão "Editar" do cliente desejado.
2. Atualize as informações necessárias.
3. O sistema mantém um histórico de alterações para auditoria.
4. Clique em "Salvar Alterações" para aplicar as mudanças.

### Desativando um Cliente

1. Na lista de clientes, clique no botão "Desativar" do cliente desejado.
2. Confirme a operação na caixa de diálogo.
3. O acesso do cliente será suspenso, mas seus dados serão mantidos no sistema.
4. É possível configurar uma mensagem personalizada que o cliente verá ao tentar acessar.
5. O sistema oferece a opção de agendamento para desativação futura.

### Excluindo um Cliente

**Atenção**: Esta ação é irreversível e deve ser usada com cautela.

1. Na lista de clientes, clique no botão "Excluir" do cliente desejado.
2. O sistema exibirá um alerta de confirmação com detalhes das consequências.
3. Digite a palavra "CONFIRMAR" na caixa de diálogo para confirmar a exclusão.
4. Todos os dados do cliente serão removidos do sistema, respeitando a legislação de proteção de dados.
5. O sistema gera um relatório de auditoria da exclusão para fins de compliance.

## Permissões de Acesso

### Sistema de Permissões

O TechCare Automation Platform utiliza um sistema de permissões baseado em módulos e funções. Cada módulo possui permissões específicas que podem ser atribuídas a diferentes usuários e organizações.

### Níveis de Permissão

1. **Administrador Global**: Acesso total a todas as funcionalidades
2. **Administrador de Organização**: Gerencia uma organização específica
3. **Supervisor**: Gerencia equipes e tem acesso a relatórios avançados
4. **Operador**: Acesso básico para operações diárias
5. **Visualizador**: Apenas visualização de dados, sem poder de edição
6. **Personalizado**: Conjunto específico de permissões definidas pelo administrador

### Configurando Permissões

1. Acesse a seção "Administração" no menu lateral.
2. Selecione "Permissões" para acessar a página de gerenciamento de permissões.
3. Selecione o cliente para o qual deseja configurar as permissões.
4. Para cada módulo, marque as caixas correspondentes às permissões que deseja conceder:
   - **Visualizar**: Permite que o usuário visualize os recursos do módulo
   - **Criar**: Permite que o usuário crie novos recursos no módulo
   - **Editar**: Permite que o usuário modifique recursos existentes
   - **Excluir**: Permite que o usuário remova recursos
   - **Exportar**: Permite que o usuário exporte dados do módulo
   - **Administrar**: Concede permissões administrativas no módulo
5. Clique em "Salvar Permissões" para aplicar as configurações.

### Modelos de Permissão

Para facilitar a configuração, você pode criar modelos de permissão:

1. Na página de Permissões, clique em "Gerenciar Modelos".
2. Clique em "Criar Novo Modelo".
3. Configure as permissões desejadas para cada módulo.
4. Dê um nome descritivo ao modelo, como "Acesso Completo" ou "Somente Leitura".
5. Adicione uma descrição detalhada para documentação.
6. Salve o modelo.
7. Para aplicar um modelo a um cliente, selecione-o na lista de clientes e clique em "Aplicar Modelo".

### Herdando Permissões

O sistema suporta herança hierárquica de permissões:

1. Configurações no nível da organização afetam todos os usuários dessa organização
2. Permissões de grupo afetam todos os usuários do grupo
3. Permissões individuais têm precedência sobre as herdadas

## Logs de Atividade

### Visualizando Logs

1. Acesse a seção "Administração" no menu lateral.
2. Selecione "Logs de Atividade" para acessar a página de logs.
3. Os logs são exibidos em ordem cronológica, com os mais recentes no topo.
4. Cada entrada de log contém:
   - Timestamp
   - Usuário
   - Endereço IP
   - Ação realizada
   - Status (sucesso/erro)
   - Detalhes adicionais

### Filtrando Logs

1. Utilize os filtros disponíveis para refinar a visualização:
   - **Usuário**: Filtra por usuário específico
   - **Ação**: Filtra por tipo de ação (login, logout, criação, edição, etc.)
   - **Módulo**: Filtra por módulo do sistema
   - **Status**: Filtra por status (sucesso ou erro)
   - **Período**: Filtra por data e hora
   - **Endereço IP**: Filtra por origem da ação
   - **Severidade**: Filtra por nível de importância
2. Clique em "Aplicar Filtros" para atualizar a visualização.
3. Salve filtros frequentemente utilizados como "Favoritos" para acesso rápido.

### Exportando Logs

1. Na página de Logs, clique no botão "Exportar".
2. Selecione o formato de exportação desejado (CSV, Excel, PDF ou JSON).
3. Escolha o período dos logs a serem exportados.
4. Selecione os campos a serem incluídos no relatório.
5. Opcionalmente, configure uma exportação agendada recorrente.
6. Clique em "Exportar" para iniciar o download.

### Configurando Alertas de Segurança

1. Na página de Logs, clique em "Configurar Alertas".
2. Defina critérios para alertas automáticos, como:
   - Múltiplas tentativas de login malsucedidas
   - Acessos fora do horário comercial
   - Ações críticas (exclusões em massa, alterações de permissões)
   - Padrões suspeitos de comportamento
   - Acesso de localizações geográficas incomuns
3. Configure os destinatários dos alertas (e-mail, SMS ou notificação no sistema).
4. Defina a frequência dos alertas e limites de disparo.
5. Configure integrações com sistemas de SIEM ou ferramentas de monitoramento externas.
6. Clique em "Salvar Configurações" para aplicar.

## Configurações do Sistema

### Configurações Gerais

1. Acesse a seção "Configurações" no menu lateral.
2. Na aba "Geral", você pode configurar:
   - Nome da instalação
   - Logo personalizado
   - Cores do tema e marca personalizada
   - Fuso horário padrão
   - Idioma padrão
   - Formato de data e hora
   - Página inicial padrão para novos usuários
   - Termos de serviço personalizados

### Configurações de Segurança

1. Na aba "Segurança", configure:
   - Política de senhas (tamanho mínimo, complexidade, expiração)
   - Tempo de expiração da sessão
   - Política de bloqueio de conta após tentativas falhas
   - Autenticação de dois fatores (obrigatória ou opcional)
   - Lista de IPs permitidos ou bloqueados
   - Certificados SSL personalizados
   - Configurações de CORS para integrações
   - Políticas de segurança de conteúdo (CSP)

### Configurações de Notificação

1. Na aba "Notificações", defina:
   - Servidor SMTP para envio de e-mails
   - E-mail do remetente
   - Templates de e-mails para diferentes eventos
   - Configurações de notificações push
   - Integrações com SMS e WhatsApp para notificações
   - Limites de envio para evitar spam
   - Agenda de silêncio (horários em que não são enviadas notificações)

### Configurações de Backup

1. Na aba "Backup", configure:
   - Frequência dos backups automáticos
   - Local de armazenamento (local ou nuvem)
   - Retenção de backups (quantos dias manter)
   - Criptografia de backups
   - Teste automático de restauração
   - Notificações de status de backup
   - Opções de restauração granular

## Monitoramento e Performance

### Dashboard de Status

1. Acesse "Sistema" > "Monitoramento" para ver o painel de status.
2. Visualize em tempo real:
   - Status de todos os serviços
   - Utilização de CPU e memória
   - Tempos de resposta da API
   - Taxas de erro
   - Usuários ativos
   - Uso de armazenamento
   - Tempo de atividade do sistema

### Análise de Performance

1. Na seção de Monitoramento, acesse "Análise de Performance":
   - Visualize métricas de performance por período
   - Identifique horários de pico
   - Analise tendências de uso de recursos
   - Compare performance antes e depois de atualizações
   - Identifique possíveis gargalos

### Configuração de Limites e Alertas

1. Configure alertas baseados em limites de performance:
   - Notificações quando CPU exceder determinado percentual
   - Alertas de baixo espaço em disco
   - Monitoramento de tempos de resposta elevados
   - Detecção de aumento anormal na taxa de erros
   - Monitoramento de disponibilidade de serviços externos

### Registro de Incidentes

1. O sistema mantém um registro histórico de incidentes:
   - Quedas de serviço
   - Degradações de performance
   - Erros sistêmicos
   - Medidas tomadas
   - Tempo de resolução
   - Impacto em usuários

## Gerenciamento de Integrações

### Integrações Disponíveis

O TechCare suporta integração com diversos sistemas externos:

1. **CRMs**: Salesforce, HubSpot, Pipedrive
2. **Plataformas de E-commerce**: Shopify, WooCommerce, Magento
3. **Gateways de Pagamento**: PagSeguro, Stripe, Mercado Pago
4. **Ferramentas de Marketing**: MailChimp, SendGrid, RD Station
5. **Plataformas de Mensageria**: WhatsApp Business API, Facebook Messenger, Telegram
6. **ERPs**: SAP, Totvs, Oracle
7. **Plataformas de BI**: PowerBI, Tableau, Google Data Studio
8. **Outras APIs**: Integrações customizadas via REST ou GraphQL

### Configurando Integrações

1. Acesse "Configurações" > "Integrações".
2. Selecione o tipo de integração desejada.
3. Siga o processo de autenticação específico para cada plataforma:
   - OAuth 2.0
   - Chaves de API
   - Credenciais de conta
4. Configure os parâmetros específicos da integração.
5. Realize testes de conexão e validação de dados.
6. Configure mapeamentos de campos personalizados.
7. Defina políticas de sincronização e agendamentos.

### Monitoramento de Integrações

1. Acesse o painel "Status das Integrações" para monitorar:
   - Última sincronização bem-sucedida
   - Taxa de sucesso das operações
   - Erros recentes
   - Volume de dados transferidos
   - Limites de uso da API
   - Histórico de sincronizações
   - Logs detalhados

### Gerenciando Webhooks

1. Na seção de Integrações, acesse "Webhooks":
   - Crie webhooks para enviar dados para sistemas externos
   - Configure endpoints para receber dados de sistemas externos
   - Monitore o histórico de eventos e entregas
   - Configure tentativas de reenvio automáticas
   - Defina transformações de dados
   - Implemente validações de segurança

## Segurança e Conformidade

### Auditoria de Segurança

1. Acesse "Sistema" > "Segurança" > "Auditoria".
2. Execute verificações periódicas:
   - Análise de vulnerabilidades
   - Conformidade com as melhores práticas
   - Revisão de permissões
   - Avaliação de riscos
   - Detecção de configurações inseguras
   - Validação de políticas de senha

### Compliance e LGPD

1. O sistema oferece ferramentas para garantir conformidade:
   - Cadastro de termos de uso e políticas de privacidade
   - Registro de consentimentos dos usuários
   - Ferramentas para exercício dos direitos dos titulares (acesso, retificação, exclusão)
   - Pseudonimização e anonimização de dados
   - Registro de operações de tratamento de dados
   - Relatórios de impacto à proteção de dados

### Gerenciamento de Certificados SSL

1. Em "Configurações" > "Segurança" > "SSL":
   - Visualize status dos certificados
   - Configure renovação automática
   - Instale novos certificados
   - Configure redirecionamentos HTTPS
   - Monitore validade e alertas de expiração

### Proteção contra Ameaças

1. O sistema inclui proteções contra:
   - Ataques de força bruta
   - Injeção SQL
   - Cross-Site Scripting (XSS)
   - Cross-Site Request Forgery (CSRF)
   - DDoS
   - Rastreamento de sessões suspeitas
   - Prevenção de vazamento de dados

## Suporte e Resolução de Problemas

### Logs do Sistema

1. Acesse a seção "Suporte" no menu lateral.
2. Selecione "Logs do Sistema" para visualizar logs técnicos detalhados.
3. Utilize os filtros para encontrar logs relacionados a problemas específicos.
4. Os logs incluem informações detalhadas:
   - Timestamps precisos
   - Nível de severidade
   - Componente do sistema
   - Exceções completas com stack traces
   - Contexto da operação
   - ID de correlação para rastreamento

### Diagnóstico de Sistema

1. Na seção "Suporte", selecione "Diagnóstico".
2. Clique em "Executar Diagnóstico" para verificar a saúde do sistema.
3. O relatório identificará possíveis problemas e sugerirá soluções.
4. Áreas verificadas incluem:
   - Conectividade de banco de dados
   - Verificação de serviços
   - Latência de rede
   - Verificação de permissões
   - Integridade de dados
   - Disponibilidade de recursos externos
   - Consistência de cache

### Ferramenta de Solução de Problemas

1. A ferramenta interativa de troubleshooting ajuda a:
   - Identificar causas-raiz de problemas comuns
   - Sugerir soluções passo a passo
   - Verificar correções automaticamente quando possível
   - Fornecer documentação relevante para problemas específicos
   - Coletar informações para suporte técnico

### Contato com Suporte TechCare

Para problemas que não conseguir resolver, entre em contato com a equipe de suporte TechCare:

1. Na seção "Suporte", selecione "Abrir Ticket".
2. Preencha o formulário com detalhes do problema:
   - Título descritivo
   - Descrição detalhada
   - Passos para reprodução
   - Impacto no negócio
   - Urgência
3. Anexe capturas de tela ou logs relevantes.
4. Acompanhe o status do ticket e histórico de comunicações.
5. Clique em "Enviar" para criar um novo ticket de suporte.

Alternativamente, você pode contatar o suporte por:
- E-mail: suporte@techcare.com
- Telefone: (XX) XXXX-XXXX (24/7 para clientes premium)
- Chat ao vivo: Disponível no canto inferior direito da plataforma em horário comercial
- Portal do cliente: https://suporte.techcare.com

## Gerenciamento de Variáveis de Ambiente

O sistema utiliza variáveis de ambiente para configuração segura, sem hardcoding de credenciais sensíveis no código. Como administrador, você é responsável por gerenciar essas variáveis.

### Variáveis de Ambiente Obrigatórias

1. Para o funcionamento básico do sistema, as seguintes variáveis são obrigatórias:
   - `TECHCARE_USER`: Nome de usuário para API TechCare
   - `TECHCARE_PASS`: Senha para API TechCare
   - `TECHCARE_BASE_URL`: URL base da API TechCare

### Configurando Variáveis de Ambiente

1. No painel administrativo, acesse "Sistema" > "Configurações" > "Variáveis".
2. Para adicionar ou modificar uma variável:
   - Clique em "Nova Variável" ou selecione uma existente
   - Preencha o nome da variável
   - Preencha o valor da variável
   - Marque "Sensível" para variáveis que contêm senhas ou tokens
   - Clique em "Salvar"

3. Para variáveis sensíveis, o sistema:
   - Armazena-as criptografadas
   - Não as exibe completamente na interface
   - Registra acessos em log de auditoria

### Variáveis em Ambiente Docker

1. Se utilizar Docker, configure as variáveis de ambiente no arquivo docker-compose.yml ou via linha de comando:

```yml
services:
  techcare-automator:
    image: techcare-automator:latest
    environment:
      - TECHCARE_USER=seu_usuario
      - TECHCARE_PASS=sua_senha
      - TECHCARE_BASE_URL=https://api.techcare.com
      - LOG_LEVEL=info
```

### Segurança das Variáveis

1. Nunca compartilhe arquivos .env ou secrets em repositórios de código
2. Utilize secrets managers em ambientes de produção (como Docker Secrets, AWS Secrets Manager, HashiCorp Vault)
3. Rotacione regularmente credenciais sensíveis
4. Mantenha logs de auditoria de alterações de variáveis de ambiente

## Circuit Breakers e Resiliência

O sistema implementa padrões de resiliência para garantir estabilidade mesmo em condições adversas.

### Como Funcionam os Circuit Breakers

1. **Proteção contra Falhas em Cascata**:
   - Detectam falhas repetidas em serviços externos
   - "Abrem o circuito" para evitar sobrecarga
   - Falham rapidamente em vez de esperar timeouts
   - Permitem recuperação gradual dos serviços

2. **Estados do Circuit Breaker**:
   - **Fechado**: Operação normal, requisições passam normalmente
   - **Aberto**: Falhas detectadas, requisições falham rapidamente
   - **Semi-aberto**: Permite algumas requisições para testar recuperação

### Configurando Circuit Breakers

1. Acesse "Sistema" > "Resiliência" > "Circuit Breakers".
2. Para cada serviço integrado, configure:
   - **Threshold de Falhas**: Número de falhas consecutivas para abrir o circuito
   - **Período de Reset**: Tempo de espera antes de testar recuperação
   - **Threshold de Sucesso**: Número de sucessos para fechar o circuito novamente
   - **Timeout**: Tempo máximo de espera por respostas

### Monitoramento de Circuit Breakers

1. No painel "Status de Resiliência", monitore:
   - Estado atual de cada circuit breaker
   - Histórico de transições de estado
   - Métricas de falhas e sucessos
   - Tempos de resposta e disponibilidade

### Políticas de Retry

1. Complementando os circuit breakers, o sistema implementa políticas de retry:
   - Retry com backoff exponencial
   - Limitação de tentativas por operação
   - Jitter aleatório para evitar ressincronização

## Gerenciamento de Filas e Trabalhos

O sistema implementa gerenciamento avançado de filas para processar tarefas assíncronas de forma confiável.

### Tipos de Filas

1. **Filas de Prioridade**:
   - Trabalhos críticos são processados primeiro
   - Níveis configuráveis de prioridade (alta, média, baixa)
   - Prevenção de starvation para trabalhos de baixa prioridade

2. **Filas por Cliente**:
   - Isolamento de trabalhos por cliente
   - Limites de trabalhos concorrentes por cliente
   - Prevenção de impacto cruzado entre clientes

### Configurando Filas

1. Acesse "Sistema" > "Filas" > "Configurações".
2. Configure parâmetros globais:
   - **Concorrência Máxima**: Número máximo de trabalhos simultâneos
   - **TTL**: Tempo de vida de trabalhos em fila
   - **Retry**: Política de retentativas para trabalhos falhos
   - **Purge**: Configurações de limpeza automática

### Monitoramento de Filas

1. No painel "Status de Filas", monitore em tempo real:
   - Comprimento das filas
   - Taxa de processamento
   - Trabalhos por status (pendente, em execução, concluído, falho)
   - Tempos médios de processamento
   - Distribuição por tipo de trabalho

### Gerenciamento de Trabalhos

1. Na seção "Trabalhos", você pode:
   - Visualizar todos os trabalhos no sistema
   - Filtrar por status, tipo, cliente ou prioridade
   - Pausar trabalhos específicos
   - Cancelar trabalhos pendentes
   - Forçar reexecução de trabalhos falhos
   - Exportar histórico de execuções

---

**Última atualização**: 21 de maio de 2025 - 15:30  
**Versão do Manual**: 3.0
