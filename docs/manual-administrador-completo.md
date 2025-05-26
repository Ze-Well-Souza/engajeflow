
# Manual Completo do Administrador - TechCare Connect Automator

**Versão:** 1.0  
**Data:** 26 de maio de 2025  
**Para:** Administrador Geral do Sistema

## Sumário

1. [Acesso Inicial](#acesso-inicial)
2. [Dashboard Administrativo](#dashboard-administrativo)
3. [Gestão de Usuários e Permissões](#gestão-de-usuários-e-permissões)
4. [Configuração de Segmentos](#configuração-de-segmentos)
5. [Monitoramento do Sistema](#monitoramento-do-sistema)
6. [Automações Administrativas](#automações-administrativas)
7. [Relatórios Gerenciais](#relatórios-gerenciais)
8. [Integração com IA](#integração-com-ia)
9. [Configurações Avançadas](#configurações-avançadas)
10. [Backup e Manutenção](#backup-e-manutenção)
11. [Troubleshooting](#troubleshooting)

## Acesso Inicial

### URLs de Acesso
- **Produção:** https://seu-dominio.vercel.app
- **Staging:** https://seu-projeto-git-main.vercel.app
- **Dashboard Admin:** https://seu-dominio.vercel.app/admin/dashboard

### Credenciais de Administrador
```
Email: admin@techcare.com
Senha: AdminTechCare2025!
```

### Primeiro Acesso
1. Acesse a URL principal do sistema
2. Clique em "Login" no canto superior direito
3. Insira as credenciais de administrador
4. Será redirecionado para `/admin/dashboard`
5. Configure sua senha pessoal em "Configurações > Perfil"

## Dashboard Administrativo

### Visão Geral do Dashboard Admin
**URL:** `/admin/dashboard`

O dashboard administrativo oferece:
- **Métricas Globais**: Usuários ativos, segmentos configurados, automações rodando
- **Status do Sistema**: Saúde dos serviços, uso de recursos, alertas
- **Atividades Recentes**: Log de ações dos usuários
- **Quick Actions**: Ações rápidas para gestão

### Navegação Principal
- **Dashboard**: `/admin/dashboard` - Visão geral
- **Usuários**: `/admin/users` - Gestão de usuários
- **Organizações**: `/admin/organizacoes` - Gestão de clientes/organizações
- **Permissões**: `/admin/permissions` - Controle de acesso
- **Logs**: `/admin/logs` - Auditoria do sistema
- **Configurações**: `/admin/config` - Configurações globais
- **Módulos**: `/admin/modules` - Gestão de funcionalidades

## Gestão de Usuários e Permissões

### Criando Novos Usuários
**URL:** `/admin/users`

1. Clique em "Novo Usuário"
2. Preencha os dados obrigatórios:
   - Nome completo
   - Email
   - Telefone (opcional)
   - Segmento de atuação
   - Nível de acesso
3. Defina permissões específicas
4. Envie convite por email
5. Monitore o status de ativação

### Níveis de Acesso Disponíveis
- **Super Admin**: Acesso total ao sistema
- **Admin Segmento**: Administrador de um segmento específico
- **Usuário Avançado**: Acesso a automações e relatórios
- **Usuário Básico**: Acesso limitado às funcionalidades básicas
- **Visualizador**: Apenas leitura

### Gerenciando Permissões por Funcionalidade
**URL:** `/admin/permissions`

#### Módulos de Permissão:
1. **Agendamentos**
   - Criar, editar, cancelar agendamentos
   - Visualizar agenda de outros usuários
   - Configurar regras de negócio

2. **Automações**
   - Criar e editar automações
   - Executar automações manuais
   - Acessar logs detalhados

3. **Relatórios**
   - Gerar relatórios
   - Exportar dados
   - Acessar métricas financeiras

4. **IA e Consultoria**
   - Usar funcionalidades de IA
   - Gerar consultorias
   - Configurar integrações

5. **Configurações**
   - Alterar configurações do sistema
   - Gerenciar integrações
   - Configurar segmentos

## Configuração de Segmentos

### Segmentos Disponíveis
**URL:** `/admin/modules`

1. **Beleza e Estética**
   - Salões, barbearias, clínicas de estética
   - **Configuração**: Profissionais, serviços, horários

2. **Alimentação**
   - Restaurantes, confeitarias, food trucks
   - **Configuração**: Cardápios, mesas, delivery

3. **Serviços Domésticos**
   - Diaristas, eletricistas, reformas
   - **Configuração**: Tipos de serviço, área de atendimento

4. **Eventos e Conteúdo**
   - Fotógrafos, decoradores, organizadores
   - **Configuração**: Tipos de evento, pacotes

5. **Educação**
   - Professores, treinadores, cursos
   - **Configuração**: Disciplinas, horários, turmas

6. **E-commerce**
   - Lojas online, marketplaces
   - **Configuração**: Produtos, categorias, estoque

7. **RH**
   - Empresas de RH, recrutamento
   - **Configuração**: Vagas, candidatos, processos

8. **Contabilidade/Advocacia**
   - Contadores, advogados
   - **Configuração**: Clientes, processos, documentos

### Ativando Segmentos para Organizações
1. Acesse `/admin/organizacoes`
2. Selecione a organização
3. Em "Configurações", escolha o segmento
4. Configure módulos específicos
5. Defina usuários responsáveis
6. Teste as funcionalidades

## Monitoramento do Sistema

### Health Check
**URL:** `/api/health`

Verifique regularmente:
```json
{
  "status": "ok",
  "timestamp": "2025-05-26T10:30:00Z",
  "uptime": 86400,
  "environment": "production",
  "services": {
    "frontend": "operational",
    "api": "operational",
    "database": "operational"
  }
}
```

### Logs do Sistema
**URL:** `/admin/logs`

#### Tipos de Log para Monitorar:
- **Error**: Erros críticos que precisam de atenção
- **Warning**: Alertas que podem se tornar problemas
- **Info**: Informações sobre operações normais
- **Debug**: Detalhes técnicos para troubleshooting

#### Filtros Úteis:
- Por usuário específico
- Por funcionalidade (agendamento, automação, etc.)
- Por período (última hora, dia, semana)
- Por nível de severidade

### Métricas Importantes
1. **Performance**
   - Tempo de resposta das páginas
   - Taxa de erro nas automações
   - Uso de recursos do servidor

2. **Usuários**
   - Usuários ativos por dia/semana
   - Funcionalidades mais utilizadas
   - Taxa de adoção por segmento

3. **Negócio**
   - Agendamentos criados por dia
   - Automações executadas
   - Relatórios gerados

## Automações Administrativas

### Configurando Automações Globais
**URL:** `/admin/automation`

#### Automações Recomendadas:
1. **Backup Diário**
   - Horário: 02:00 (madrugada)
   - Frequência: Diária
   - Retenção: 30 dias

2. **Limpeza de Logs**
   - Horário: 03:00 (madrugada)
   - Frequência: Semanal
   - Manter últimos 90 dias

3. **Relatório de Status**
   - Horário: 08:00 (manhã)
   - Frequência: Diária
   - Destinatários: Equipe admin

4. **Monitoramento de Performance**
   - Frequência: A cada 15 minutos
   - Alertas: CPU > 80%, Memória > 90%

### Testando Automações
1. Crie uma automação de teste
2. Configure para execução imediata
3. Monitore logs em tempo real
4. Verifique resultado esperado
5. Ajuste parâmetros se necessário

## Relatórios Gerenciais

### Relatórios Administrativos Essenciais
**URL:** `/admin/reports`

#### 1. Relatório de Usuários
- Usuários ativos vs inativos
- Login frequency por usuário
- Funcionalidades mais utilizadas
- **Exportar**: Excel, PDF

#### 2. Relatório de Performance
- Tempo de resposta por funcionalidade
- Taxa de erro por módulo
- Uso de recursos do sistema
- **Frequência**: Semanal

#### 3. Relatório de Negócio
- Agendamentos por segmento
- Automações executadas
- ROI por cliente/organização
- **Frequência**: Mensal

#### 4. Relatório de Segurança
- Tentativas de login falhadas
- Ações administrativas executadas
- Mudanças em permissões
- **Frequência**: Diária

### Configurando Relatórios Automáticos
1. Acesse "Relatórios > Agendamentos"
2. Selecione o tipo de relatório
3. Configure periodicidade
4. Defina destinatários
5. Formate o template
6. Teste o envio

## Integração com IA

### Configurando OpenAI
**URL:** `/admin/config/ai`

1. Obtenha API Key da OpenAI
2. Configure em "Integrações > IA"
3. Teste conectividade
4. Configure limites de uso
5. Monitore consumo

### Funcionalidades de IA Disponíveis
- **Consultoria Financeira**: Análise de dados financeiros
- **Assistente de Conteúdo**: Geração de posts para redes sociais
- **Análise de Sentimentos**: Análise de feedback dos clientes
- **Previsão de Vendas**: Projeções baseadas em histórico
- **Recomendações**: Sugestões personalizadas por segmento

### Monitorando Uso da IA
- Requests por dia/usuário
- Custo por funcionalidade
- Taxa de satisfação com respostas
- Tempo de resposta

## Configurações Avançadas

### Variáveis de Ambiente Críticas
```env
# Autenticação
SUPABASE_URL=sua_url_supabase
SUPABASE_ANON_KEY=sua_chave_publica

# IA
OPENAI_API_KEY=sua_chave_openai

# Sistema
NODE_ENV=production
LOG_LEVEL=info
MAX_CONCURRENCY=10
```

### Configurações de Segurança
1. **Autenticação 2FA**
   - Obrigatório para admins
   - Opcional para usuários
   - Apps suportados: Google Authenticator, Authy

2. **Políticas de Senha**
   - Mínimo 8 caracteres
   - Letras, números e símbolos
   - Renovação a cada 90 dias

3. **Sessões**
   - Timeout: 8 horas de inatividade
   - Logout automático à meia-noite
   - Máximo 3 dispositivos por usuário

### Backup e Recuperação
1. **Backup Automático**
   - Diário às 02:00
   - Armazenamento: 30 dias
   - Inclui: dados, configurações, logs

2. **Teste de Recuperação**
   - Mensal em ambiente de teste
   - Verificar integridade dos dados
   - Documentar tempo de recuperação

## Troubleshooting

### Problemas Comuns e Soluções

#### 1. Sistema Lento
- Verificar uso de CPU/memória
- Analisar logs de performance
- Considerar scaling horizontal

#### 2. Falhas de Automação
- Verificar conectividade
- Validar credenciais
- Analisar logs específicos

#### 3. Problemas de Login
- Verificar configuração Supabase
- Testar em modo incógnito
- Verificar políticas de segurança

#### 4. Integrações Falhando
- Testar APIs externas
- Verificar rate limits
- Validar configurações

### Contatos de Suporte
- **Suporte Técnico**: suporte@techcare.com
- **Emergência**: +55 11 99999-9999
- **Discord**: link_do_discord
- **Base de Conhecimento**: docs.techcare.com

### Checklist de Manutenção Semanal
- [ ] Verificar health check
- [ ] Revisar logs de erro
- [ ] Monitorar performance
- [ ] Validar backups
- [ ] Testar automações críticas
- [ ] Revisar métricas de usuário
- [ ] Atualizar documentação

### Checklist de Manutenção Mensal
- [ ] Análise completa de performance
- [ ] Revisão de permissões
- [ ] Auditoria de segurança
- [ ] Teste de recuperação
- [ ] Relatório executivo
- [ ] Planejamento de capacidade
- [ ] Treinamento da equipe

---

© 2025 TechCare Connect Automator - Manual do Administrador v1.0
