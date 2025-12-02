# Como resolver o problema do favicon no Vercel

## Problema
O favicon não atualiza no Vercel mesmo após o deploy.

## Soluções

### 1. Limpar cache do Vercel
- No painel do Vercel, vá em **Settings** → **Build & Development Settings**
- Clique em **Clear Build Cache** e faça um novo deploy

### 2. Forçar atualização do favicon
O favicon está configurado em dois lugares:
- `/src/app/favicon.ico` (Next.js App Router usa automaticamente)
- `/public/favicon.ico` (fallback)

### 3. Verificar se o favicon está correto
O favicon deve ser um arquivo `.ico` válido com múltiplos tamanhos:
- 16x16px
- 32x32px
- (opcional) 48x48px

### 4. Hard refresh no navegador
Após o deploy, faça hard refresh:
- **Chrome/Edge**: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
- **Firefox**: `Ctrl+F5` (Windows) ou `Cmd+Shift+R` (Mac)
- **Safari**: `Cmd+Option+R`

### 5. Verificar no Vercel
Acesse diretamente: `https://capiau.org/favicon.ico`
Se aparecer o favicon antigo, o cache do Vercel precisa ser limpo.

### 6. Adicionar query string (temporário)
Se ainda não funcionar, você pode adicionar uma query string no HTML:
```html
<link rel="icon" href="/favicon.ico?v=2" />
```

## Arquivos necessários
- ✅ `/src/app/favicon.ico` (principal)
- ✅ `/public/favicon.ico` (fallback)
- ✅ `/public/icon-192x192.png`
- ✅ `/public/icon-512x512.png`
- ✅ `/public/apple-touch-icon.png`

Todos os arquivos estão configurados no `layout.tsx`.



