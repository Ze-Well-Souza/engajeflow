
# Manual do Cliente - TechCare Automation Platform

## Índice
1. [Introdução](#introdução)
2. [Primeiros Passos](#primeiros-passos)
3. [Dashboard Principal](#dashboard-principal)
4. [Sistema de Mensagens](#sistema-de-mensagens)
5. [Gestão de Canais](#gestão-de-canais)
6. [Automação](#automação)
7. [Bot de Vendas](#bot-de-vendas)
8. [Templates](#templates)
9. [Gateway](#gateway)
10. [Relatórios](#relatórios)
11. [Módulo da Loja](#módulo-da-loja)
12. [Configurações da Conta](#configurações-da-conta)
13. [Suporte](#suporte)

## Introdução

Bem-vindo ao TechCare Automation Platform! Esta plataforma foi projetada para ajudar sua empresa a automatizar as comunicações com clientes, aumentar vendas e melhorar a experiência do cliente através de um sistema integrado de mensagens e automações.

Este manual fornecerá todas as informações necessárias para você começar a utilizar a plataforma e aproveitar ao máximo suas funcionalidades.

## Primeiros Passos

### Acessando a Plataforma

1. Acesse a URL fornecida pela TechCare (geralmente https://sua-empresa.techcare.com).
2. Insira seu e-mail e senha fornecidos pelo administrador.
3. Na primeira vez que acessar o sistema, você será solicitado a alterar sua senha.

### Navegação Básica

A plataforma TechCare é organizada com uma barra lateral que contém todos os módulos disponíveis:

- **Dashboard**: Visão geral do sistema e métricas principais
- **Mensagens**: Sistema de comunicação com clientes
- **Canais**: Configuração de canais de comunicação
- **Automação**: Criação de fluxos automatizados
- **Bot de Vendas**: Configuração do assistente de vendas
- **Templates**: Modelos de mensagens reutilizáveis
- **Gateway**: Integrações com APIs externas
- **Relatórios**: Análises e métricas detalhadas
- **Loja**: Gerenciamento de produtos e vendas
- **Sistema**: Configurações e notificações

## Dashboard Principal

O Dashboard é sua página inicial e oferece uma visão geral de todas as atividades e métricas importantes:

### Principais Recursos do Dashboard

- **Indicadores de Desempenho**: Visualize métricas-chave como taxa de resposta, tempo médio de resposta e conversões.
- **Atividade Recente**: Veja as interações mais recentes com clientes.
- **Gráficos de Análise**: Acompanhe tendências de uso e eficácia das mensagens.
- **Tarefas Pendentes**: Lista de ações que requerem sua atenção.
- **Notificações**: Alertas sobre eventos importantes no sistema.

### Personalizando seu Dashboard

1. Clique no botão "Personalizar" no canto superior direito.
2. Arraste e solte os widgets para organizar de acordo com sua preferência.
3. Clique no ícone de configurações de cada widget para ajustar suas opções.
4. Selecione "Salvar Layout" quando terminar.

## Sistema de Mensagens

O módulo de Mensagens permite que você gerencie todas as comunicações com seus clientes em um único lugar, independentemente do canal utilizado.

### Visualizando Mensagens

1. Acesse o menu "Mensagens" na barra lateral.
2. As conversas são organizadas por data, com as mais recentes no topo.
3. Utilize os filtros para encontrar conversas específicas por canal, status ou cliente.

### Enviando Novas Mensagens

1. Clique no botão "Nova Mensagem" no canto superior direito.
2. Selecione o cliente ou grupo de clientes para quem deseja enviar.
3. Escolha o canal de comunicação (WhatsApp, SMS, E-mail, etc.).
4. Escreva sua mensagem ou selecione um template existente.
5. Adicione anexos se necessário.
6. Clique em "Enviar" ou agende o envio para um momento específico.

### Gerenciando Conversas

1. Clique em uma conversa para abri-la.
2. No painel lateral direito, você verá o histórico da conversa.
3. Você pode:
   - Responder diretamente
   - Transferir para outro atendente
   - Aplicar tags para organização
   - Encerrar a conversa quando resolvida

## Gestão de Canais

O módulo de Canais permite configurar e gerenciar diferentes meios de comunicação com seus clientes.

### Canais Disponíveis

- **WhatsApp Business**: Conexão com a API oficial do WhatsApp.
- **Instagram Direct**: Mensagens diretas do Instagram.
- **Facebook Messenger**: Chat do Facebook.
- **SMS**: Mensagens de texto.
- **E-mail**: Comunicações por e-mail.
- **Chat Web**: Chat incorporado ao seu site.

### Configurando um Novo Canal

1. Acesse o menu "Canais" na barra lateral.
2. Clique em "Adicionar Canal".
3. Selecione o tipo de canal que deseja configurar.
4. Siga as instruções específicas para autenticação do canal escolhido.
5. Configure as opções de notificação e horário de atendimento.
6. Clique em "Salvar" para ativar o canal.

## Automação

O módulo de Automação permite criar fluxos automatizados para responder a mensagens, qualificar leads e executar ações baseadas em gatilhos específicos.

### Criando uma Nova Automação

1. Acesse o menu "Automação" na barra lateral.
2. Clique em "Nova Automação".
3. Dê um nome à sua automação.
4. Defina o gatilho que iniciará a automação (ex.: nova mensagem recebida, horário específico, ação do cliente).
5. Construa seu fluxo arrastando e soltando os blocos de ação:
   - **Enviar Mensagem**: Envia uma resposta automática.
   - **Condição**: Cria ramificações baseadas em condições.
   - **Atraso**: Adiciona um tempo de espera entre ações.
   - **Webhook**: Integra com sistemas externos.
   - **Atribuir Tag**: Categoriza conversas automaticamente.
   - **Transferir**: Encaminha para um atendente humano.
6. Conecte os blocos para formar seu fluxo.
7. Clique em "Salvar" e depois "Ativar" para iniciar sua automação.

### Gerenciando Automações Existentes

1. Na lista de automações, você pode:
   - **Editar**: Modificar uma automação existente.
   - **Duplicar**: Criar uma cópia para personalizar.
   - **Desativar/Ativar**: Pausar ou retomar uma automação.
   - **Excluir**: Remover permanentemente uma automação.
2. Utilize o painel de métricas para avaliar o desempenho de cada automação.

## Bot de Vendas

O Bot de Vendas é um assistente automatizado projetado para guiar clientes pelo processo de venda, respondendo perguntas e coletando informações importantes.

### Configurando o Bot de Vendas

1. Acesse o menu "Bot de Vendas" na barra lateral.
2. Na primeira configuração, selecione um modelo inicial baseado em seu setor ou comece do zero.
3. Configure as informações básicas:
   - Nome do bot (como aparecerá para os clientes)
   - Mensagem de boas-vindas
   - Horário de funcionamento

### Criando o Fluxo de Vendas

1. Utilize o editor visual para construir o fluxo de conversa:
   - Adicione perguntas para entender as necessidades do cliente.
   - Crie respostas condicionais baseadas nas entradas do cliente.
   - Insira blocos de apresentação de produtos.
   - Configure etapas de coleta de dados para finalizar vendas.
2. Personalize as mensagens para manter o tom de voz de sua marca.
3. Adicione botões e menus para facilitar a navegação do cliente.
4. Configure gatilhos para transferência para atendentes humanos quando necessário.

### Testando e Otimizando o Bot

1. Clique em "Testar Bot" para simular uma conversa.
2. Verifique todos os caminhos possíveis da conversa.
3. Após ativar, utilize os relatórios de desempenho para identificar:
   - Pontos de abandono
   - Perguntas frequentes não respondidas
   - Taxa de conversão por etapa
4. Faça ajustes contínuos para melhorar a experiência.

## Templates

O módulo de Templates permite criar e gerenciar modelos de mensagens reutilizáveis para agilizar a comunicação.

### Criando Novos Templates

1. Acesse o menu "Templates" na barra lateral.
2. Clique em "Novo Template".
3. Selecione o tipo de canal para o qual o template será usado.
4. Digite um nome descritivo para o template.
5. Crie o conteúdo, que pode incluir:
   - Texto formatado
   - Variáveis dinâmicas (nome do cliente, data, etc.)
   - Imagens e anexos
   - Botões de ação
6. Salve o template e ele estará disponível para uso.

### Utilizando Templates nas Mensagens

1. Ao compor uma nova mensagem, clique no ícone de templates.
2. Selecione o template desejado da lista.
3. Personalize se necessário antes de enviar.
4. As variáveis serão automaticamente preenchidas com os dados do destinatário.

## Gateway

O módulo Gateway gerencia todas as integrações com sistemas externos e APIs, permitindo que a plataforma se comunique com outras ferramentas.

### Configurando Integrações

1. Acesse o menu "Gateway" na barra lateral.
2. Clique em "Nova Integração".
3. Selecione o tipo de integração:
   - **CRM**: Salesforce, HubSpot, etc.
   - **E-commerce**: Shopify, WooCommerce, etc.
   - **Pagamentos**: PagSeguro, Mercado Pago, etc.
   - **Personalizado**: APIs específicas de sua empresa
4. Siga o assistente de configuração para cada tipo de integração.
5. Teste a conexão antes de finalizar.

### Webhooks e Callbacks

1. Na seção "Webhooks", você pode:
   - Criar endpoints para receber dados de sistemas externos.
   - Configurar callbacks para notificar sistemas externos sobre eventos na plataforma.
   - Definir mapeamentos de dados entre sistemas.

### Monitorando Integrações

1. No painel principal do Gateway, monitore:
   - Status de cada integração
   - Taxa de sucesso das chamadas de API
   - Erros recentes
   - Volume de transações

## Relatórios

O módulo de Relatórios oferece insights detalhados sobre o desempenho de suas comunicações, automações e vendas.

### Relatórios Disponíveis

- **Desempenho de Mensagens**: Taxa de entrega, abertura e resposta.
- **Automações**: Eficácia dos fluxos automatizados.
- **Bot de Vendas**: Conversões e pontos de abandono.
- **Atendimento**: Tempo de resposta e satisfação do cliente.
- **Vendas**: Conversões, ticket médio e receita.

### Gerando Relatórios

1. Acesse o menu "Relatórios" na barra lateral.
2. Selecione o tipo de relatório desejado.
3. Defina o período de análise.
4. Aplique filtros adicionais se necessário.
5. Clique em "Gerar Relatório".
6. Os dados serão apresentados em gráficos e tabelas interativos.

### Exportando Dados

1. Com um relatório aberto, clique no botão "Exportar".
2. Escolha o formato de exportação (PDF, Excel, CSV).
3. Selecione quais seções do relatório incluir.
4. Clique em "Exportar" para baixar o arquivo.

## Módulo da Loja

O Módulo da Loja permite gerenciar produtos, pedidos, clientes e vendas diretamente da plataforma.

### Gerenciando Produtos

1. Acesse o menu "Loja" e selecione "Produtos".
2. Você pode:
   - Adicionar novos produtos com fotos, descrições e preços
   - Organizar produtos em categorias
   - Definir variações (tamanho, cor, etc.)
   - Configurar promoções e descontos

### Processando Vendas

1. Acesse "Vendas" no menu da Loja.
2. Visualize todas as vendas em andamento e concluídas.
3. Clique em uma venda para ver detalhes e:
   - Atualizar status (em processamento, enviado, entregue)
   - Gerar nota fiscal
   - Criar código de rastreamento
   - Processar reembolsos se necessário

### Utilizando QR Code para Vendas

1. Acesse a seção "QR Code Generator".
2. Selecione o produto ou catálogo para o qual deseja gerar o código.
3. Escolha o tipo de ação (link de pagamento, informações do produto).
4. Gere e baixe o QR Code para usar em materiais promocionais.

## Configurações da Conta

### Perfil de Usuário

1. Clique no seu nome no canto superior direito.
2. Selecione "Meu Perfil" para:
   - Atualizar suas informações pessoais
   - Alterar sua senha
   - Configurar preferências de notificação
   - Personalizar sua interface

### Configurações da Empresa

1. No menu "Sistema", selecione "Configurações".
2. Na aba "Empresa", você pode:
   - Atualizar informações corporativas
   - Carregar logo da empresa
   - Configurar fuso horário e idioma padrão
   - Personalizar cores e tema do sistema

## Suporte

### Acessando o Suporte

Se você precisar de ajuda, tem várias opções:

1. **Base de Conhecimento**: Acesse artigos e tutoriais no menu "Ajuda".
2. **Chat de Suporte**: Clique no ícone de chat no canto inferior direito para conversar com um especialista da TechCare.
3. **Ticket de Suporte**: No menu "Sistema", selecione "Suporte" para abrir um novo ticket.
4. **Webinars e Treinamentos**: Acesse o calendário de treinamentos disponíveis em "Ajuda > Treinamentos".

### Relatando Problemas

1. Se encontrar um problema, forneça:
   - Descrição detalhada do problema
   - Etapas para reproduzir o erro
   - Capturas de tela quando possível
   - Dados relevantes (ID de mensagem, cliente, etc.)
2. A equipe de suporte responderá em até 24 horas úteis.

---

**Última atualização**: 16 de maio de 2025  
**Versão do Manual**: 1.0
