
# Dockerfile para o TechCare Connect Automator

# Imagem base com Node.js
FROM node:18-slim AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração de pacotes
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar todo o código-fonte
COPY . .

# Construir o aplicativo
RUN npm run build

# Segunda etapa - imagem mínima para produção
FROM node:18-slim

# Instalar chromium e dependências para Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Configurar variáveis de ambiente para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Criar e definir diretório de trabalho
WORKDIR /app

# Copiar artefatos de construção da imagem anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar arquivos de configuração e scripts
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Expor porta (apenas para dashboard web, se necessário)
EXPOSE 3000

# Definir usuário não-root
RUN addgroup --system appuser && adduser --system --ingroup appuser appuser
USER appuser

# Definir ponto de entrada
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]
