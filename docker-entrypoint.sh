#!/bin/sh
set -e

# Script de inicialização do contêiner
echo "Iniciando TechCare Connect Automator..."

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

# Verificar conexão com Redis
echo "Verificando conexão com Redis..."
MAX_RETRIES=30
RETRY_INTERVAL=2
RETRIES=0

while [ $RETRIES -lt $MAX_RETRIES ]; do
  if redis-cli -h ${REDIS_HOST:-redis} -p ${REDIS_PORT:-6379} ${REDIS_PASSWORD:+-a $REDIS_PASSWORD} ping > /dev/null 2>&1; then
    echo "Conexão com Redis estabelecida com sucesso."
    break
  fi
  
  RETRIES=$((RETRIES+1))
  echo "Tentativa $RETRIES/$MAX_RETRIES: Não foi possível conectar ao Redis. Tentando novamente em ${RETRY_INTERVAL}s..."
  sleep $RETRY_INTERVAL
done

if [ $RETRIES -eq $MAX_RETRIES ]; then
  echo "ERRO: Não foi possível conectar ao Redis após $MAX_RETRIES tentativas."
  echo "Verifique se o serviço Redis está em execução e acessível."
  exit 1
fi

# Verificar diretórios necessários
for DIR in logs config data; do
  if [ ! -d "/app/$DIR" ]; then
    echo "Criando diretório /app/$DIR..."
    mkdir -p "/app/$DIR"
  fi
done

# Configurar timezone se fornecido
if [ -n "$TZ" ]; then
  echo "Configurando timezone: $TZ"
fi

# Verificar healthcheck
healthcheck() {
  echo "Executando verificação de saúde do sistema..."
  
  # Verificar conexão com TechCare (sem autenticar)
  if ! curl -s --head --fail ${TECHCARE_BASE_URL:-https://app.techcare.com} > /dev/null; then
    echo "AVISO: Não foi possível conectar ao TechCare. Verifique a conectividade de rede."
  else
    echo "Conexão com TechCare estabelecida com sucesso."
  fi
  
  # Verificar espaço em disco
  DISK_USAGE=$(df -h /app | awk 'NR==2 {print $5}' | sed 's/%//')
  if [ "$DISK_USAGE" -gt 90 ]; then
    echo "AVISO: Espaço em disco crítico (${DISK_USAGE}%). Considere limpar logs antigos."
  fi
  
  echo "Verificação de saúde concluída."
}

# Executar healthcheck inicial
healthcheck

# Iniciar a aplicação de acordo com o modo de operação
echo "Iniciando aplicação no modo: $OPERATION_MODE"

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
