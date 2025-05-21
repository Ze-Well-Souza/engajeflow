
# TechCare Connect Automator

Um sistema robusto de automação para interação com a plataforma TechCare, permitindo automação de tarefas, extração de dados e integração com outros sistemas.

## Funcionalidades

- **Automação de login e navegação**: Acesso automatizado à plataforma TechCare com suporte a múltiplos usuários
- **Extração de dados**: Coleta de informações de tickets, clientes e relatórios com validação e tratamento de erros
- **Processamento automatizado**: Atualização de status, envio de mensagens e categorização
- **Dashboard de monitoramento**: Acompanhamento em tempo real das automações com histórico de execuções
- **Agendamento de tarefas**: Execução programada de automações com retry automático
- **Suporte multi-usuário**: Isolamento de execuções por cliente/usuário com controle de concorrência
- **Sistema de filas**: Gerenciamento de múltiplos jobs com priorização e paralelismo controlado
- **Logs avançados**: Sistema de log estruturado com níveis de verbosidade configuráveis

## Requisitos

- Node.js v18 ou superior
- Docker (para execução em ambiente isolado)
- Acesso à plataforma TechCare

## Instalação

### Método 1: Instalação local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/techcare-connect-automator.git
cd techcare-connect-automator

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Iniciar o servidor de desenvolvimento
npm run dev
```

### Método 2: Execução com Docker

```bash
# Construir a imagem Docker
docker build -t techcare-automator .

# Executar o contêiner
docker run -d -p 3000:3000 \
  -e TECHCARE_USER=seu_usuario \
  -e TECHCARE_PASS=sua_senha \
  -e OPERATION_MODE=dashboard \
  --name techcare-automator \
  techcare-automator
```

## Modos de Operação

O sistema pode operar em três modos diferentes:

1. **Dashboard**: Interface web para monitoramento e configuração
2. **Automator**: Execução de automações agendadas
3. **Scheduler**: Gerenciamento de fila de tarefas

## Variáveis de Ambiente

- `TECHCARE_USER`: Nome de usuário para autenticação no TechCare
- `TECHCARE_PASS`: Senha para autenticação no TechCare
- `TECHCARE_BASE_URL`: URL base do TechCare (padrão: https://app.techcare.com)
- `OPERATION_MODE`: Modo de operação (dashboard, automator, scheduler)
- `LOG_LEVEL`: Nível de detalhamento dos logs (debug, info, warn, error)
- `MAX_CONCURRENCY`: Número máximo de automações concorrentes (padrão: 5)
- `RETRY_ATTEMPTS`: Número de tentativas em caso de falha (padrão: 3)
- `DATABASE_URL`: URL de conexão com o banco de dados (para persistência)

## Estrutura do Projeto

```
.
├── src/
│   ├── services/
│   │   ├── techcare/       # Módulos específicos para TechCare
│   │   │   ├── auth.ts     # Serviço de autenticação
│   │   │   ├── navigate.ts # Serviço de navegação
│   │   │   ├── extract.ts  # Serviço de extração de dados
│   │   │   └── index.ts    # Exportação centralizada
│   │   ├── queue/          # Sistema de filas
│   │   └── logger/         # Sistema de logs
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas da aplicação
│   ├── utils/              # Utilitários
│   ├── tests/              # Testes automatizados
│   │   ├── unit/           # Testes unitários
│   │   ├── integration/    # Testes de integração
│   │   └── mocks/          # Mocks para testes
│   └── config/             # Configurações centralizadas
├── Dockerfile              # Configuração Docker
├── docker-entrypoint.sh    # Script de inicialização
└── README.md               # Documentação
```

## Desenvolvimento

```bash
# Executar testes
npm test

# Verificar linting
npm run lint

# Construir para produção
npm run build
```

## Segurança

O TechCare Connect Automator implementa várias medidas de segurança:

1. **Configuração segura**: Credenciais armazenadas em variáveis de ambiente, não no código
2. **Rate limiting**: Controle de taxa de requisições para evitar detecção
3. **Rotação de IPs**: Suporte a proxy para distribuir requisições (opcional)
4. **Sessões encriptadas**: Dados sensíveis encriptados em trânsito e repouso
5. **Isolamento**: Docker para isolar processos de automação
6. **Auditoria**: Logs detalhados de todas as operações para compliance

## Melhores Práticas

1. **Sempre use variáveis de ambiente** para credenciais e configurações sensíveis
2. **Limite a concorrência** para evitar sobrecarga dos sistemas alvo
3. **Implemente circuit breakers** para evitar falhas em cascata
4. **Monitore o uso de memória** para automações de longa duração
5. **Implemente filas com prioridade** para operações críticas

## Resolução de Problemas

Para problemas comuns, consulte nossa [documentação detalhada](./docs/troubleshooting.md).

### Problemas de Autenticação
- Verifique se as credenciais no arquivo .env estão corretas
- Tente fazer login manualmente para confirmar que sua conta está ativa
- Verifique se sua conta tem as permissões necessárias

### Erros de Extração de Dados
- Verifique se os seletores DOM não mudaram na plataforma TechCare
- Aumente o timeout para páginas mais lentas
- Verifique sua conexão de rede

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a licença MIT.
