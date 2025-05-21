
# TechCare Connect Automator

Um sistema de automação para interação com a plataforma TechCare, permitindo automação de tarefas, extração de dados e integração com outros sistemas.

## Funcionalidades

- **Automação de login e navegação**: Acesso automatizado à plataforma TechCare
- **Extração de dados**: Coleta de informações de tickets, clientes e relatórios
- **Processamento automatizado**: Atualização de status, envio de mensagens e categorização
- **Dashboard de monitoramento**: Acompanhamento em tempo real das automações
- **Agendamento de tarefas**: Execução programada de automações
- **Suporte multi-usuário**: Isolamento de execuções por cliente/usuário

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

## Estrutura do Projeto

```
.
├── src/
│   ├── services/     # Serviços core de automação
│   │   ├── techcare/ # Módulos específicos para TechCare
│   │   └── ...
│   ├── components/   # Componentes React
│   ├── pages/        # Páginas da aplicação
│   ├── utils/        # Utilitários
│   └── tests/        # Testes automatizados
├── Dockerfile        # Configuração Docker
├── docker-entrypoint.sh # Script de inicialização
└── README.md         # Documentação
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

## Licença

Este projeto está licenciado sob a licença MIT.

