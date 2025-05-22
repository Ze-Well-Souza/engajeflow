# Solução de Problemas

Esta seção apresenta soluções para os problemas mais comuns que podem ocorrer durante o uso do TechCare Connect Automator.

## Diagnóstico Rápido

![Ferramenta de Diagnóstico](./images/ferramenta_diagnostico.png)

O sistema inclui uma ferramenta de diagnóstico rápido que pode ajudar a identificar problemas:

1. Acesse "Configurações" > "Diagnóstico do Sistema"
2. Clique em "Executar Diagnóstico"
3. Aguarde a conclusão da verificação
4. Analise os resultados e siga as recomendações

## Problemas Comuns e Soluções

### Falha na Conexão com TechCare

![Erro de Conexão](./images/erro_conexao.png)

**Sintomas:**
- Mensagens de erro "Falha na autenticação" ou "Não foi possível conectar ao TechCare"
- Automações falham na etapa de login

**Possíveis Causas e Soluções:**

1. **Credenciais Incorretas**
   - Verifique se as credenciais no arquivo `.env` estão corretas
   - Teste o login manualmente no site do TechCare
   - Atualize as credenciais se necessário

2. **Problemas de Rede**
   - Verifique sua conexão com a internet
   - Teste se consegue acessar o site do TechCare pelo navegador
   - Verifique se há bloqueios de firewall ou proxy

3. **TechCare Indisponível**
   - Verifique o status do serviço TechCare
   - Aguarde alguns minutos e tente novamente
   - Entre em contato com o suporte do TechCare se o problema persistir

### Falha na Conexão com Redis

**Sintomas:**
- Mensagens de erro "Redis connection refused" ou "Cannot connect to Redis"
- Sistema não processa tarefas na fila

**Possíveis Causas e Soluções:**

1. **Redis não está em execução**
   - Verifique se o serviço Redis está ativo:
     ```bash
     docker-compose ps redis
     ```
   - Reinicie o Redis se necessário:
     ```bash
     docker-compose restart redis
     ```

2. **Configuração Incorreta**
   - Verifique as configurações de Redis no arquivo `.env`
   - Confirme se host, porta e senha estão corretos
   - Teste a conexão manualmente:
     ```bash
     docker-compose exec redis redis-cli -a sua_senha ping
     ```

3. **Problemas de Permissão**
   - Verifique as permissões do volume de dados do Redis
   - Corrija as permissões se necessário:
     ```bash
     docker-compose down
     sudo chown -R 1001:1001 ./redis-data
     docker-compose up -d
     ```

### Tarefas Travadas na Fila

![Tarefas Travadas](./images/tarefas_travadas.png)

**Sintomas:**
- Tarefas permanecem com status "Em Processamento" por muito tempo
- Fila de tarefas cresce continuamente

**Possíveis Causas e Soluções:**

1. **Workers Sobrecarregados**
   - Verifique a carga do sistema no painel de monitoramento
   - Aumente o número de workers se necessário:
     ```bash
     # Edite o arquivo .env
     MAX_CONCURRENCY=10
     # Reinicie o serviço
     docker-compose restart automator
     ```

2. **Tarefas Bloqueadas**
   - Identifique tarefas específicas que estão travadas
   - Cancele manualmente essas tarefas pelo Dashboard
   - Ou use o comando de limpeza:
     ```bash
     docker-compose exec automator npm run queue:clean
     ```

3. **Problemas com Circuit Breaker**
   - Verifique se o Circuit Breaker está no estado aberto
   - Reinicie o Circuit Breaker manualmente:
     ```bash
     docker-compose exec automator npm run circuit-breaker:reset
     ```

### Erros nos Relatórios Gerados

**Sintomas:**
- Relatórios vazios ou incompletos
- Dados incorretos nos relatórios

**Possíveis Causas e Soluções:**

1. **Problemas na Extração de Dados**
   - Verifique os logs de execução da tarefa
   - Confirme se os seletores CSS/XPath estão atualizados
   - Teste a extração manualmente para identificar mudanças na interface

2. **Filtros Incorretos**
   - Revise os filtros configurados na automação
   - Verifique se os parâmetros de data estão no formato correto
   - Teste com filtros mais simples para isolar o problema

3. **Mudanças na Plataforma TechCare**
   - Verifique se houve atualizações recentes na plataforma
   - Atualize os scripts de automação conforme necessário
   - Entre em contato com o suporte se precisar de ajuda

### Problemas de Desempenho

**Sintomas:**
- Sistema lento ou não responsivo
- Tarefas demorando mais que o normal para concluir

**Possíveis Causas e Soluções:**

1. **Recursos Insuficientes**
   - Verifique o uso de CPU, memória e disco no painel de monitoramento
   - Aumente os recursos disponíveis para os containers:
     ```bash
     # Edite o arquivo docker-compose.yml
     # Aumente os limites de recursos e reinicie
     docker-compose down
     docker-compose up -d
     ```

2. **Muitas Tarefas Simultâneas**
   - Reduza o número de tarefas concorrentes
   - Distribua as automações ao longo do dia
   - Ajuste a prioridade das tarefas mais importantes

3. **Problemas com Cache**
   - Limpe o cache do Redis:
     ```bash
     docker-compose exec redis redis-cli -a sua_senha FLUSHDB
     ```
   - Reinicie os serviços após limpar o cache

## Logs e Diagnóstico Avançado

### Analisando Logs do Sistema

Para análise detalhada de problemas, examine os logs do sistema:

1. **Logs do Docker**
   ```bash
   # Ver logs de todos os serviços
   docker-compose logs
   
   # Ver logs de um serviço específico
   docker-compose logs automator
   
   # Ver logs em tempo real
   docker-compose logs -f dashboard
   ```

2. **Logs Estruturados**
   - Acesse os arquivos de log em `./logs/`
   - Use ferramentas como `jq` para analisar logs JSON:
     ```bash
     cat logs/automator.log | jq 'select(.level=="error")'
     ```

3. **Logs de Navegação**
   - Para problemas específicos de automação, verifique os logs de navegação
   - Estes logs incluem screenshots e informações detalhadas sobre cada passo

### Ferramentas de Diagnóstico Avançado

![Ferramentas Avançadas](./images/ferramentas_avancadas.png)

O sistema inclui ferramentas avançadas para diagnóstico:

1. **Inspetor de Filas**
   - Acesse "Configurações" > "Ferramentas Avançadas" > "Inspetor de Filas"
   - Visualize o estado atual de todas as filas
   - Identifique gargalos e tarefas problemáticas

2. **Teste de Conectividade**
   - Verifique a conectividade com serviços externos
   - Identifique problemas de rede ou firewall

3. **Validador de Configuração**
   - Analise a configuração atual do sistema
   - Identifique problemas ou inconsistências

## Recuperação de Desastres

### Backup e Restauração

Para recuperar o sistema após falhas graves:

1. **Restaurar a partir de Backup**
   ```bash
   # Restaurar dados do Redis
   docker-compose stop redis
   rm -rf ./redis-data/*
   tar -xzf backup/redis-backup-YYYY-MM-DD.tar.gz -C ./redis-data/
   docker-compose start redis
   ```

2. **Restaurar Configurações**
   ```bash
   # Restaurar arquivos de configuração
   cp backup/config/* ./config/
   docker-compose restart
   ```

### Reinicialização Completa

Em casos extremos, pode ser necessário reiniciar todo o sistema:

1. Pare todos os serviços:
   ```bash
   docker-compose down
   ```

2. Limpe os volumes (cuidado, isso apagará todos os dados):
   ```bash
   docker volume rm techcare-connect-automator_redis-data
   ```

3. Recrie os volumes e reinicie:
   ```bash
   docker-compose up -d
   ```

4. Restaure a partir de backup se disponível

## Contato com Suporte

Se você não conseguir resolver o problema, entre em contato com o suporte:

- **Email**: suporte@techcare-connect.com
- **Portal de Suporte**: https://suporte.techcare-connect.com
- **Telefone**: (11) 1234-5678

Ao entrar em contato, tenha em mãos:
- Logs relevantes
- Descrição detalhada do problema
- Passos para reproduzir o erro
- Informações sobre seu ambiente (versão do sistema, configurações)
