
# Deploy no Vercel - TechCare Connect Automator

## Pré-requisitos

1. Conta no Vercel (https://vercel.com)
2. Projeto conectado ao GitHub (recomendado)
3. Variáveis de ambiente configuradas

## Passos para Deploy

### 1. Preparação Local

```bash
# Instalar Vercel CLI (se não tiver)
npm install -g vercel

# Fazer login no Vercel
vercel login

# Testar build local
npm run build
```

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, adicione as seguintes variáveis:

**Obrigatórias:**
- `VITE_SUPABASE_URL` - URL do seu projeto Supabase
- `VITE_SUPABASE_ANON_KEY` - Chave pública do Supabase
- `VITE_TECHCARE_BASE_URL` - URL base do TechCare

**Opcionais:**
- `VITE_OPENAI_API_KEY` - Para funcionalidades de IA
- `VITE_STRIPE_PUBLISHABLE_KEY` - Para pagamentos

### 3. Deploy

```bash
# Deploy de preview
vercel

# Deploy para produção
vercel --prod
```

### 4. Configuração de Domínio Personalizado

1. Acesse o painel do Vercel
2. Vá em Settings > Domains
3. Adicione seu domínio
4. Configure DNS conforme instruções

### 5. Monitoramento

- **Analytics:** Painel do Vercel > Analytics
- **Logs:** Painel do Vercel > Functions > Logs
- **Performance:** Painel do Vercel > Speed Insights

## Estrutura de Deploy

```
dist/                 # Build de produção
├── assets/          # CSS, JS minificados
├── index.html       # Arquivo principal
└── ...

vercel.json          # Configuração do Vercel
api/                 # Serverless functions
└── health.ts        # Health check
```

## Troubleshooting

### Build Falha
- Verificar se todas as dependências estão instaladas
- Rodar `npm run build` localmente primeiro
- Verificar logs no painel do Vercel

### Variáveis de Ambiente
- Verificar se estão configuradas corretamente
- Usar prefixo `VITE_` para variáveis do frontend
- Redeploy após alterar variáveis

### Domínio Personalizado
- Verificar configuração DNS
- Aguardar propagação (até 48h)
- Verificar certificado SSL

## URLs Importantes

- **Projeto:** https://vercel.com/dashboard
- **Documentação:** https://vercel.com/docs
- **Suporte:** https://vercel.com/support

## Scripts Úteis

```bash
# Executar script de deploy automatizado
node src/scripts/deploy-vercel.js

# Verificar status do deploy
vercel ls

# Ver logs
vercel logs [deployment-url]
```
