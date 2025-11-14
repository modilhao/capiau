# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2025-01-XX

### Adicionado

#### Configuração Inicial
- Configuração do projeto Next.js 15 com App Router
- TypeScript configurado com paths alias (`@/*`)
- Tailwind CSS v4 configurado com sintaxe moderna
- PostCSS configurado para processamento do Tailwind

#### Design System
- Paleta de cores escura definida:
  - Background: `#020617`
  - Foreground: `#e5e7eb`
  - Accent: `#22c55e`
  - Muted: `#6b7280`
- Fonte Inter configurada via Google Fonts
- Estilos globais em `globals.css` com Tailwind v4

#### Componentes
- **HeroMatrix** (`src/app/(sections)/hero/HeroMatrix.tsx`)
  - Seção full-screen com layout centralizado
  - Título "CAPIAU" com animação de entrada
  - Subtítulo "Conversas que viram crescimento."
  - Container Matrix placeholder (opacity animada)
  - Botão White Label no canto superior direito
  - Área para social icons na parte inferior
  - Animações GSAP implementadas:
    - Animação do fundo Matrix (opacity: 0 → 0.2)
    - Animação do título com blur e translateY
    - Animação do subtítulo com translateY
    - Timeline com overlaps para transições suaves

#### Infraestrutura de Animações
- **GSAP Client** (`src/lib/gsap/gsapClient.ts`)
  - Configuração centralizada do GSAP
  - Registro de plugins: ScrollTrigger e TextPlugin
  - Verificação de ambiente cliente (SSR-safe)
  
- **Lenis Scroll Hook** (`src/lib/motion/useLenisScroll.ts`)
  - Hook React para smooth scrolling
  - Configuração personalizada:
    - Duration: 1.2s
    - Easing customizado (cubic ease-out)
    - Smooth wheel habilitado
    - Multiplicadores de velocidade configurados
  - Cleanup adequado com cancelAnimationFrame

- **LayoutMotionClient** (`src/app/(sections)/LayoutMotionClient.tsx`)
  - Componente wrapper cliente
  - Integração global do smooth scroll
  - Aplicado no layout raiz da aplicação

#### Layout e Páginas
- Layout raiz (`src/app/layout.tsx`) configurado:
  - Fonte Inter aplicada
  - Tema escuro aplicado
  - LayoutMotionClient integrado
  - Metadata configurada

- Página inicial (`src/app/page.tsx`):
  - Renderiza o componente HeroMatrix

#### Dependências
- `next`: ^16.0.3
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `gsap`: ^3.13.0
- `@studio-freight/lenis`: ^1.0.42
- `tailwindcss`: ^4
- `@tailwindcss/postcss`: ^4.1.17
- `typescript`: ^5

### Modificado

- Atualização do `globals.css` para usar sintaxe Tailwind v4 (`@import "tailwindcss"`)
- Adição de cores de fundo e texto diretamente no CSS global

### Histórico de Commits

#### [e512b8f] - feat: configuração inicial do projeto capiau-org com tema escuro, HeroMatrix e animações GSAP
- Configuração completa do projeto
- Implementação do HeroMatrix com animações
- Infraestrutura de animações (GSAP + Lenis)
- Design system escuro minimalista

#### [fc2a0ce] - Initial commit from Create Next App
- Commit inicial do Next.js

---

## Tipos de Mudanças

- `Adicionado` - Para novas funcionalidades
- `Modificado` - Para mudanças em funcionalidades existentes
- `Depreciado` - Para funcionalidades que serão removidas em versões futuras
- `Removido` - Para funcionalidades removidas
- `Corrigido` - Para correções de bugs
- `Segurança` - Para vulnerabilidades de segurança

