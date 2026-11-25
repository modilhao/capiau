# AGENTS.md — site capiau.org

Instruções para qualquer agente de IA (Claude, Codex, Cursor etc.) que for mexer, publicar ou migrar este site. Leia tudo antes de agir.

## O que é

Site institucional da Capiau, página única com animações de rolagem (seções em `src/app/(sections)/`). Feito em **Next.js 16 + React 19 + Tailwind CSS 4 + GSAP**. Não tem banco, API nem login: **é 100% estático**. O `next.config.ts` usa `output: "export"`, então o build gera uma pasta `out/` com HTML, CSS, JS e imagens, pronta para qualquer hospedagem estática.

## Onde mudar o quê

| Quero mudar | Arquivo |
|---|---|
| E-mail de contato (texto grande no fim da página e link) | `src/app/(sections)/contact/SectionContact.tsx`, variável `email` |
| E-mail e dados que o Google lê (JSON-LD) | `src/app/components/StructuredData.tsx` |
| Título, descrição e imagem de compartilhamento | `src/app/layout.tsx` (`metadata`) |
| Ordem das seções | `src/app/page.tsx` |
| Textos de cada seção | `src/app/(sections)/<seção>/` |
| Ícones, imagem de compartilhamento, robots | `public/` |

**Regra para o e-mail:** ao trocar, mude nos **dois** arquivos acima. O e-mail aparece em fonte enorme e não quebra linha; um endereço maior pode cortar no celular. Depois de trocar, confira em 375 px de largura que o último caractere aparece inteiro. Se cortar, diminua a classe de tamanho base do link (hoje `text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl`).

## Rodar e gerar o site

Requer Node.js 20.

```bash
npm ci            # instala as dependências
npm run dev       # site em http://localhost:3000 para testar
npm run build     # gera o site final em out/
```

Antes de publicar, rode `npm run build` e confira que terminou sem erro e que `out/index.html` existe.

## Publicar no Netlify

Há dois jeitos. O **A** é o recomendado.

### A. Netlify ligado ao GitHub (recomendado)

Cada alteração enviada ao GitHub publica o site sozinha, e dá para voltar a uma versão anterior com um clique.

1. O repositório precisa estar numa conta GitHub a que o dono do Netlify tenha acesso (transferido para ele ou com ele como colaborador).
2. No Netlify: **Add new project → Import an existing project → GitHub** e escolha o repositório.
3. As configurações já vêm do `netlify.toml`: comando `npm run build`, pasta `out`, Node 20. Não mude.
4. **Deploy**. Abra o endereço `*.netlify.app` gerado e confira o site antes de mexer no domínio.

### B. Arrastar e soltar (Netlify Drop)

Serve para publicar rápido, sem GitHub. Toda alteração exige gerar a pasta de novo.

1. Rode `npm run build`.
2. Arraste a **pasta `out/`** (não a pasta do projeto inteiro) para a área de deploy do projeto no Netlify.
3. Para atualizar: edite, rode `npm run build` de novo e arraste a nova `out/` no **mesmo projeto** do Netlify (aba Deploys). Não crie um projeto novo a cada vez.

## Ligar o domínio capiau.org ao Netlify

Hoje o domínio aponta para a Vercel. Faça a virada só depois de o site estar no ar e conferido no endereço `*.netlify.app`.

1. No projeto do Netlify: **Domain management → Add a domain** → `capiau.org` (e aceite incluir `www.capiau.org`).
2. O Netlify mostra os registros DNS a criar. No painel onde o DNS do capiau.org é administrado:
   - troque os registros do domínio raiz e do `www` que hoje apontam para a Vercel pelos que o Netlify indicar;
   - **não mexa** nos registros de e-mail (MX, SPF/TXT, DKIM). Eles fazem o `contato@capiau.org` e os envios automáticos (`reports@capiau.org`) funcionarem.
3. Espere o Netlify verificar o domínio e emitir o certificado HTTPS (de minutos a algumas horas).
4. Teste `https://capiau.org` e `https://www.capiau.org`.
5. Só depois disso avise o Marcel para remover o domínio do projeto na Vercel e desligar o projeto antigo.

Durante a troca de DNS o site pode ficar alguns minutos fora do ar ou alternar entre a versão antiga e a nova. É normal.

## Cuidados

- Não adicione rotas de API, `middleware` ou recursos que exijam servidor: quebram o `output: "export"` e o deploy estático.
- Não remova `export const dynamic = "force-static"` de `src/app/sitemap.ts`: sem ele o build falha.
- Não suba `node_modules/`, `.next/` nem `out/` para o GitHub (já estão no `.gitignore`).
- Mudança de cor ou layout: confira em celular (375 px) e em desktop (1280 px) antes de publicar.
