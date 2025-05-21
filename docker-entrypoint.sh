
#!/bin/sh
set -e

# Script de inicialização do contêiner

# Verificar variáveis de ambiente necessárias
if [ -z "$TECHCARE_USER" ] || [ -z "$TECHCARE_PASS" ]; then
  echo "ERRO: As variáveis de ambiente TECHCARE_USER e TECHCARE_PASS são obrigatórias."
  exit 1
fi

# Verificar se foi especificado um modo de operação
if [ -z "$OPERATION_MODE" ]; then
  echo "Nenhum modo de operação especificado. Usando 'dashboard' como padrão."
  export OPERATION_MODE="dashboard"
fi

# Configurar timezone se fornecido
if [ -n "$TZ" ]; then
  echo "Configurando timezone: $TZ"
fi

# Iniciar a aplicação de acordo com o modo de operação
case "$OPERATION_MODE" in
  "automator")
    echo "Iniciando no modo automator..."
    exec "$@" run:automator
    ;;
  "scheduler")
    echo "Iniciando no modo scheduler..."
    exec "$@" run:scheduler
    ;;
  "dashboard")
    echo "Iniciando no modo dashboard..."
    exec "$@" run:dashboard
    ;;
  *)
    echo "Modo de operação '$OPERATION_MODE' desconhecido. Usando 'dashboard'."
    exec "$@" run:dashboard
    ;;
esac
