
# Manual do Usuário - Segmento Beleza e Estética

**Versão:** 1.0  
**Data:** 26 de maio de 2025  
**Para:** Salões, Barbearias e Clínicas de Estética

## Bem-vindo ao TechCare Connect!

Este manual vai te ensinar como usar todas as funcionalidades do sistema para **automatizar e otimizar** seu salão de beleza, barbearia ou clínica de estética.

## Acesso ao Sistema

### Como Fazer Login
1. Acesse: **https://seu-dominio.vercel.app**
2. Clique em "Login" 
3. Use as credenciais fornecidas pelo administrador
4. Na primeira vez, você será direcionado para alterar sua senha

### Credenciais de Demonstração (Beleza)
```
Email: beleza@demo.techcare.com
Senha: Beleza2025!
```

## Tour Inicial do Sistema

### Página Principal (/dashboard)
Quando você entra no sistema, verá:
- **Resumo do Dia**: Agendamentos de hoje
- **Próximos Compromissos**: Próximas 4 horas
- **Notificações**: Avisos importantes
- **Métricas Rápidas**: Faturamento do mês, clientes atendidos

### Menu Principal
- 🏠 **Dashboard**: Visão geral
- 📅 **Agendamentos**: Gerenciar sua agenda
- 💬 **Mensagens**: WhatsApp e comunicação
- 👥 **Clientes**: Cadastro e histórico
- 📊 **Relatórios**: Análises do negócio
- ⚙️ **Configurações**: Personalizar o sistema

## Configuração Inicial do Seu Salão

### 1. Configurar Informações Básicas
**Menu: Configurações > Perfil do Negócio**

Complete estas informações:
- Nome do salão
- Endereço completo
- Telefone e WhatsApp
- Horário de funcionamento
- Redes sociais
- Foto/logo do estabelecimento

### 2. Cadastrar Serviços
**Menu: Configurações > Serviços**

Para cada serviço oferecido, cadastre:
- **Nome**: Ex: "Corte Feminino"
- **Duração**: Ex: 60 minutos
- **Preço**: Ex: R$ 50,00
- **Descrição**: Detalhes do serviço
- **Categoria**: Cabelo, Unha, Estética, etc.
- **Foto**: Imagem do resultado

**Exemplos de Serviços:**
- Corte Masculino (30min - R$ 25,00)
- Corte Feminino (60min - R$ 50,00)
- Coloração (120min - R$ 120,00)
- Manicure (45min - R$ 30,00)
- Pedicure (60min - R$ 35,00)
- Escova (45min - R$ 40,00)

### 3. Cadastrar Profissionais
**Menu: Configurações > Equipe**

Para cada profissional:
- **Dados Pessoais**: Nome, telefone, email
- **Especialidades**: Quais serviços faz
- **Horários**: Quando trabalha
- **Comissão**: % ou valor fixo por serviço
- **Foto**: Para os clientes reconhecerem

**Exemplo:**
```
Nome: Maria Silva
Especialidades: Corte Feminino, Coloração, Escova
Horários: Seg-Sex 9h-18h, Sáb 9h-15h
Comissão: 40% do valor do serviço
```

## Gestão de Agendamentos

### Visualizando a Agenda
**Menu: Agendamentos**

Três visualizações disponíveis:
- **Dia**: Agenda detalhada do dia
- **Semana**: Visão geral da semana
- **Mês**: Planejamento mensal

### Criando um Novo Agendamento
1. Clique em "Novo Agendamento"
2. **Selecione a Data e Hora**
3. **Escolha o Cliente**:
   - Se já cadastrado: busque pelo nome
   - Se novo: clique "Novo Cliente" e cadastre
4. **Selecione o Serviço**
5. **Escolha o Profissional** (se tiver equipe)
6. **Adicione Observações** se necessário
7. Clique "Salvar"

### Confirmando Agendamentos
O sistema pode enviar confirmações automáticas:
- WhatsApp 24h antes
- SMS 2h antes
- Email com lembretes

**Para ativar**: Configurações > Automações > Confirmações

### Reagendando ou Cancelando
1. Clique no agendamento na agenda
2. Escolha "Editar", "Reagendar" ou "Cancelar"
3. Se cancelar, pode colocar o motivo
4. O cliente será notificado automaticamente

## Gestão de Clientes

### Cadastrando Novos Clientes
**Menu: Clientes > Novo Cliente**

Informações importantes:
- **Dados Básicos**: Nome, telefone, email, data nascimento
- **Endereço**: Para serviços domiciliares
- **Preferências**: Profissional preferido, horários
- **Histórico**: Alergias, contraindicações
- **Observações**: Informações relevantes

### Histórico do Cliente
Para cada cliente você pode ver:
- Todos os agendamentos anteriores
- Serviços realizados
- Valor total gasto
- Frequência de visitas
- Última visita
- Próximo agendamento

### Ficha de Anamnese
Para serviços de estética, use fichas de anamnese:
1. Acesse o cliente
2. Clique "Ficha Anamnese"
3. Preencha informações médicas
4. Salve para consultas futuras

## Automação de WhatsApp

### Configurando WhatsApp Business
**Menu: Configurações > Integrações > WhatsApp**

1. Conecte sua conta WhatsApp Business
2. Configure mensagens automáticas
3. Teste o envio

### Tipos de Mensagens Automáticas

#### 1. Confirmação de Agendamento
Enviada imediatamente após agendar:
```
Olá [NOME]! ✨

Seu agendamento foi confirmado:
📅 [DATA] às [HORA]
💇 [SERVIÇO] com [PROFISSIONAL]
📍 [ENDEREÇO_SALÃO]

Em caso de imprevisto, nos avise com antecedência.
```

#### 2. Lembrete 24h Antes
```
Oi [NOME]! 😊

Lembrete: amanhã você tem agendamento:
⏰ [DATA] às [HORA]
💇 [SERVIÇO] com [PROFISSIONAL]

Para confirmar, responda "SIM"
Para reagendar, responda "REAGENDAR"
```

#### 3. Promoções e Ofertas
```
[NOME], que tal cuidar da beleza? ✨

Promoção especial para você:
🎉 [OFERTA]
📅 Válida até [DATA]

Quer agendar? Responda este WhatsApp!
```

### Personalizando Mensagens
1. Acesse "Configurações > Automações > Mensagens"
2. Edite os templates
3. Use variáveis como [NOME], [DATA], [SERVIÇO]
4. Teste antes de ativar

## Marketing Digital Automatizado

### Postagens Automáticas para Instagram
**Menu: Marketing > Social Media**

#### Configurando Posts Automáticos:
1. **Conecte sua conta Instagram Business**
2. **Escolha tipos de posts**:
   - Antes e depois (transformações)
   - Dicas de cuidados
   - Apresentação da equipe
   - Promoções
   - Novos serviços

3. **Configure horários de postagem**:
   - Terça: 14h (Dicas de beleza)
   - Quinta: 16h (Transformações)
   - Sábado: 10h (Promoções)

#### Usando o Assistente de IA para Legendas:
1. Faça upload da foto
2. Clique "Gerar Legenda com IA"
3. Descreva o serviço/resultado
4. A IA criará legenda + hashtags
5. Edite se necessário
6. Agende ou publique

**Exemplo de Legenda Gerada:**
```
✨ Transformação incrível! ✨

Nossa cliente Maria arrasou com essa nova cor! 
O loiro dourado ficou perfeito para o verão 🌞

Que tal você também renovar o visual?
Agende já pelo nosso WhatsApp! 📱

#beleza #loiro #transformacao #salao #cabelo #verao2025
```

### Programa de Fidelidade
**Menu: Marketing > Fidelidade**

Configure seu programa:
- **10 cortes = 1 grátis**
- **Aniversário = 20% desconto**
- **Indique amiga = R$ 15 desconto**

O sistema controla automaticamente e avisa quando o cliente tem direito ao benefício.

## Relatórios e Análises

### Relatório Diário
**Menu: Relatórios > Diário**

Acompanhe:
- Faturamento do dia
- Serviços realizados
- Clientes atendidos
- Performance por profissional
- Agendamentos para amanhã

### Relatório Mensal
**Menu: Relatórios > Mensal**

Análise completa:
- Faturamento total
- Serviços mais populares
- Clientes mais frequentes
- Performance da equipe
- Comparação com mês anterior

### Análise de Clientes
**Menu: Relatórios > Clientes**

Descubra:
- Quem não vem há muito tempo
- Clientes VIP (mais gastos)
- Frequência média de visitas
- Serviços preferidos por cliente

### Previsão de Faturamento (IA)
**Menu: Relatórios > Previsões**

A Inteligência Artificial analisa seus dados e prevê:
- Faturamento do próximo mês
- Épocas de maior movimento
- Tendências de crescimento
- Sugestões de promoções

## Consultoria com IA

### Consultoria Financeira
**Menu: IA > Consultoria Financeira**

1. Selecione o período para análise
2. A IA analisará seus dados financeiros
3. Receberá relatório com:
   - Análise de custos
   - Oportunidades de aumento de receita
   - Sugestões de otimização
   - Comparação com mercado

**Exemplo de Consultoria:**
```
📊 ANÁLISE FINANCEIRA - MARÇO 2025

💰 FATURAMENTO: R$ 12.500 (+15% vs fev)
📈 TICKET MÉDIO: R$ 45,50 (+8% vs fev)
👥 NOVOS CLIENTES: 23 (meta: 20) ✅

🎯 OPORTUNIDADES IDENTIFICADAS:
1. Coloração representa 35% da receita - 
   considere promoções para aumentar demanda
2. Quartas-feiras com baixa ocupação - 
   promova desconto para esse dia
3. Cliente Maria (R$ 180/mês) não vem há 45 dias - 
   faça contato para reativar

📝 RECOMENDAÇÕES:
- Implemente programa "Quarta Relaxante" com 15% desconto
- Crie pacote "Madrinhas" para casamentos (alta demanda em junho)
- Invista em produtos para venda (margem 60% vs 40% serviços)
```

### Sugestões de Marketing
**Menu: IA > Marketing**

A IA sugere campanhas baseadas em:
- Seu histórico de clientes
- Época do ano
- Tendências do mercado
- Performance anterior

## Casos Práticos - Passo a Passo

### Caso 1: Cliente Liga Querendo Agendar
**Situação**: Cliente liga querendo corte + escova para sexta-feira à tarde

**Passo a Passo:**
1. Abra "Agendamentos"
2. Clique na sexta-feira
3. Veja horários livres à tarde
4. Clique no horário disponível (ex: 14h)
5. Digite o nome da cliente ou busque se já é cadastrada
6. Selecione "Corte Feminino + Escova"
7. Escolha a profissional disponível
8. Confirme o agendamento
9. Sistema enviará WhatsApp automático para cliente

### Caso 2: Cliente Não Apareceu
**Situação**: Cliente tinha agendamento às 10h e não apareceu

**Passo a Passo:**
1. Abra a agenda
2. Clique no agendamento das 10h
3. Selecione "Cliente não compareceu"
4. Sistema marcará como "No-show"
5. Horário fica livre para encaixe
6. Cliente recebe mensagem automática perguntando se quer reagendar

### Caso 3: Promoção de Aniversário
**Situação**: Mês de maio - criar promoção para aniversariantes

**Passo a Passo:**
1. Acesse "Marketing > Campanhas"
2. Clique "Nova Campanha"
3. Escolha "Promoção Aniversário"
4. Configure:
   - Desconto: 20%
   - Válido: Todo maio
   - Público: Aniversariantes do mês
5. Personalize a mensagem:
   ```
   🎉 Parabéns, [NOME]! 🎂
   
   No seu mês especial, você ganha 20% OFF 
   em qualquer serviço! 
   
   Válido até 31/05. Agende já! ✨
   ```
6. Ative a campanha
7. Sistema enviará automático para todas as aniversariantes

### Caso 4: Reagendamento por Chuva
**Situação**: Dia chuvoso, vários clientes querem reagendar

**Passo a Passo:**
1. Acesse "Agendamentos > Hoje"
2. Para cada cliente que ligar:
   - Clique no agendamento
   - Selecione "Reagendar"
   - Escolha nova data/hora
   - Confirme
3. Sistema envia confirmação automática
4. Use função "Lista de Espera" para preencher gaps

## Dicas de Sucesso

### 1. Mantenha Dados Atualizados
- Telefones dos clientes
- Horários de trabalho da equipe
- Preços dos serviços
- Fotos dos trabalhos

### 2. Use as Automações
- Ative confirmações por WhatsApp
- Configure lembretes automáticos
- Use posts automáticos no Instagram
- Implemente programa de fidelidade

### 3. Analise os Relatórios
- Verifique diariamente o faturamento
- Identifique horários mais vazios
- Monitore clientes que não retornam
- Acompanhe performance da equipe

### 4. Aproveite a IA
- Use consultoria financeira mensalmente
- Peça sugestões de marketing
- Gere legendas para posts
- Solicite análises de tendências

### 5. Mantenha Relacionamento
- Responda rápido no WhatsApp
- Parabenize aniversariantes
- Mande promoções exclusivas
- Peça feedback dos serviços

## Suporte e Ajuda

### Em Caso de Dúvidas
- **WhatsApp Suporte**: +55 11 99999-8888
- **Email**: suporte@techcare.com
- **Chat no Sistema**: Ícone 💬 no canto inferior direito
- **Vídeos Tutoriais**: Menu Ajuda > Tutoriais

### Horário de Atendimento
- Segunda a Sexta: 8h às 18h
- Sábado: 8h às 12h
- Emergências: 24h por WhatsApp

### Base de Conhecimento
Acesse **help.techcare.com** para:
- Artigos detalhados
- Vídeos passo-a-passo  
- Perguntas frequentes
- Novidades do sistema

---

🎉 **Parabéns!** Agora você domina o TechCare Connect para Beleza!

Lembre-se: quanto mais você usar o sistema, mais ele vai aprender sobre seu negócio e fornecer sugestões personalizadas para aumentar seu faturamento e satisfação dos clientes.

**Bons negócios! ✨**

---

© 2025 TechCare Connect - Manual Segmento Beleza v1.0
