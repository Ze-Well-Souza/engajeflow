
# Manual do Administrador - TechCare Automation Platform

## Índice
1. [Introdução](#introdução)
2. [Acesso ao Sistema](#acesso-ao-sistema)
3. [Dashboard Administrativo](#dashboard-administrativo)
4. [Gerenciamento de Clientes](#gerenciamento-de-clientes)
5. [Permissões de Acesso](#permissões-de-acesso)
6. [Logs de Atividade](#logs-de-atividade)
7. [Configurações do Sistema](#configurações-do-sistema)
8. [Suporte e Resolução de Problemas](#suporte-e-resolução-de-problemas)

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

## Gerenciamento de Clientes

### Visualizando Clientes

1. Acesse a seção "Administração" no menu lateral.
2. Selecione "Clientes" para ver a lista de todos os clientes cadastrados.
3. Utilize os filtros de busca para encontrar clientes específicos.

### Adicionando um Novo Cliente

1. Na página de Clientes, clique no botão "Adicionar Cliente".
2. Preencha o formulário com os dados do cliente, incluindo:
   - Nome/Razão Social
   - CPF/CNPJ
   - Endereço completo
   - Informações de contato
   - Tipo de cliente (físico ou jurídico)
3. Defina um plano de serviço para o cliente.
4. Clique em "Salvar" para concluir o cadastro.

### Editando um Cliente

1. Na lista de clientes, clique no botão "Editar" do cliente desejado.
2. Atualize as informações necessárias.
3. Clique em "Salvar Alterações" para aplicar as mudanças.

### Desativando um Cliente

1. Na lista de clientes, clique no botão "Desativar" do cliente desejado.
2. Confirme a operação na caixa de diálogo.
3. O acesso do cliente será suspenso, mas seus dados serão mantidos no sistema.

### Excluindo um Cliente

**Atenção**: Esta ação é irreversível e deve ser usada com cautela.

1. Na lista de clientes, clique no botão "Excluir" do cliente desejado.
2. Digite a palavra "CONFIRMAR" na caixa de diálogo para confirmar a exclusão.
3. Todos os dados do cliente serão removidos do sistema.

## Permissões de Acesso

### Sistema de Permissões

O TechCare Automation Platform utiliza um sistema de permissões baseado em módulos. Cada módulo possui permissões específicas que podem ser atribuídas a diferentes clientes.

### Configurando Permissões

1. Acesse a seção "Administração" no menu lateral.
2. Selecione "Permissões" para acessar a página de gerenciamento de permissões.
3. Selecione o cliente para o qual deseja configurar as permissões.
4. Para cada módulo, marque as caixas correspondentes às permissões que deseja conceder:
   - **Visualizar**: Permite que o cliente visualize os recursos do módulo
   - **Criar**: Permite que o cliente crie novos recursos no módulo
   - **Editar**: Permite que o cliente modifique recursos existentes
   - **Excluir**: Permite que o cliente remova recursos
   - **Exportar**: Permite que o cliente exporte dados do módulo
5. Clique em "Salvar Permissões" para aplicar as configurações.

### Modelos de Permissão

Para facilitar a configuração, você pode criar modelos de permissão:

1. Na página de Permissões, clique em "Gerenciar Modelos".
2. Clique em "Criar Novo Modelo".
3. Configure as permissões desejadas para cada módulo.
4. Dê um nome descritivo ao modelo, como "Acesso Completo" ou "Somente Leitura".
5. Salve o modelo.
6. Para aplicar um modelo a um cliente, selecione-o na lista de clientes e clique em "Aplicar Modelo".

## Logs de Atividade

### Visualizando Logs

1. Acesse a seção "Administração" no menu lateral.
2. Selecione "Logs de Atividade" para acessar a página de logs.
3. Os logs são exibidos em ordem cronológica, com os mais recentes no topo.

### Filtrando Logs

1. Utilize os filtros disponíveis para refinar a visualização:
   - **Usuário**: Filtra por usuário específico
   - **Ação**: Filtra por tipo de ação (login, logout, criação, edição, etc.)
   - **Módulo**: Filtra por módulo do sistema
   - **Status**: Filtra por status (sucesso ou erro)
   - **Período**: Filtra por data e hora
2. Clique em "Aplicar Filtros" para atualizar a visualização.

### Exportando Logs

1. Na página de Logs, clique no botão "Exportar".
2. Selecione o formato de exportação desejado (CSV, Excel, PDF ou JSON).
3. Escolha o período dos logs a serem exportados.
4. Clique em "Exportar" para iniciar o download.

### Configurando Alertas de Segurança

1. Na página de Logs, clique em "Configurar Alertas".
2. Defina critérios para alertas automáticos, como:
   - Múltiplas tentativas de login malsucedidas
   - Acessos fora do horário comercial
   - Ações críticas (exclusões em massa, alterações de permissões)
3. Configure os destinatários dos alertas (e-mail ou notificação no sistema).
4. Defina a frequência dos alertas.
5. Clique em "Salvar Configurações" para aplicar.

## Configurações do Sistema

### Configurações Gerais

1. Acesse a seção "Configurações" no menu lateral.
2. Na aba "Geral", você pode configurar:
   - Nome da instalação
   - Logo personalizado
   - Cores do tema
   - Fuso horário padrão
   - Idioma padrão

### Configurações de Segurança

1. Na aba "Segurança", configure:
   - Política de senhas (tamanho mínimo, complexidade)
   - Tempo de expiração da sessão
   - Política de bloqueio de conta após tentativas falhas
   - Autenticação de dois fatores (obrigatória ou opcional)

### Configurações de Notificação

1. Na aba "Notificações", defina:
   - Servidor SMTP para envio de e-mails
   - E-mail do remetente
   - Templates de e-mails para diferentes eventos
   - Configurações de notificações push

### Configurações de Backup

1. Na aba "Backup", configure:
   - Frequência dos backups automáticos
   - Local de armazenamento (local ou nuvem)
   - Retenção de backups (quantos dias manter)
   - Opções de restauração

## Suporte e Resolução de Problemas

### Logs do Sistema

1. Acesse a seção "Suporte" no menu lateral.
2. Selecione "Logs do Sistema" para visualizar logs técnicos detalhados.
3. Utilize os filtros para encontrar logs relacionados a problemas específicos.

### Diagnóstico de Sistema

1. Na seção "Suporte", selecione "Diagnóstico".
2. Clique em "Executar Diagnóstico" para verificar a saúde do sistema.
3. O relatório identificará possíveis problemas e sugerirá soluções.

### Contato com Suporte TechCare

Para problemas que não conseguir resolver, entre em contato com a equipe de suporte TechCare:

1. Na seção "Suporte", selecione "Abrir Ticket".
2. Preencha o formulário com detalhes do problema.
3. Anexe capturas de tela ou logs relevantes.
4. Clique em "Enviar" para criar um novo ticket de suporte.

Alternativamente, você pode contatar o suporte por:
- E-mail: suporte@techcare.com
- Telefone: (XX) XXXX-XXXX
- Chat: Disponível no canto inferior direito da plataforma em horário comercial

---

**Última atualização**: 16 de maio de 2025  
**Versão do Manual**: 1.0
