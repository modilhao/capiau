# Capiau.org

Site de scrollytelling minimalista e moderno construído com Next.js 16, TypeScript, Tailwind CSS v4, GSAP e Lenis. Uma experiência imersiva que combina animações suaves, efeitos visuais premium e narrativa digital.

## 📋 Sobre o Projeto

Capiau.org é um projeto de site de scrollytelling focado em contar histórias através de animações suaves e interações visuais. O projeto utiliza tecnologias modernas para criar uma experiência imersiva e performática, apresentando a identidade visual da Capiau como um estúdio social-first, results-driven e conversation-led.

### Conceito

O site apresenta uma experiência visual premium com:
- **Efeito Matrix**: Background animado com caracteres personalizados (CAPIAU, números, símbolos e katakana)
- **Animações Scroll-Driven**: Animações sincronizadas com o scroll usando GSAP ScrollTrigger
- **Smooth Scrolling**: Scroll suave implementado com Lenis
- **Tipografia Dinâmica**: Textos com animações de entrada e efeitos de glitch
- **Design Escuro Premium**: Paleta de cores escura com acentos neon verde

## 🚀 Tecnologias

### Core
- **Next.js 16.0.3** - Framework React com App Router
- **React 19.2.0** - Biblioteca UI com React Compiler habilitado
- **TypeScript 5** - Tipagem estática

### Estilização
- **Tailwind CSS v4** - Framework CSS utilitário com sintaxe moderna
- **PostCSS** - Processamento de CSS
- **Inter Font** - Tipografia via Google Fonts

### Animações e Interações
- **GSAP 3.13.0** - Biblioteca de animações avançadas
  - ScrollTrigger Plugin - Animações baseadas em scroll
  - TextPlugin - Animações de texto
- **Lenis 1.0.42** - Smooth scrolling premium

### Ferramentas de Desenvolvimento
- **ESLint** - Linter configurado com eslint-config-next
- **React Compiler** - Compilador React para otimizações automáticas
- **Babel Plugin React Compiler** - Suporte ao React Compiler

## 🎨 Design System

### Paleta de Cores

```css
--background: #020617  /* Fundo escuro principal */
--foreground: #e5e7eb  /* Texto claro */
--accent: #22c55e      /* Cor de destaque (verde neon) */
--muted: #6b7280       /* Texto secundário */
```

### Tipografia

- **Fonte Principal**: Inter (via Google Fonts)
- **Fallback**: system-ui, sans-serif
- **Variável CSS**: `--font-inter`

### Efeitos Visuais

- **Matrix Background**: Efeito Matrix com caracteres personalizados
  - Cor neon: `rgba(120, 255, 180, 0.95)`
  - Glow effect: `rgba(120, 255, 180, 0.3)`
  - Trail effect: `rgba(0, 15, 0, 0.10)`
- **Gradientes**: Overlays escuros para contraste
- **Blur Effects**: Efeitos de desfoque em animações de entrada

## 📁 Estrutura do Projeto

```
capiau-org/
├── src/
│   ├── app/
│   │   ├── (sections)/
│   │   │   ├── hero/
│   │   │   │   ├── HeroMatrix.tsx         # Componente Hero principal
│   │   │   │   └── MatrixBackground.tsx   # Efeito Matrix animado
│   │   │   ├── intro/
│   │   │   │   └── SectionIntro.tsx        # Seção de introdução
│   │   │   └── LayoutMotionClient.tsx      # Wrapper para animações globais
│   │   ├── globals.css                     # Estilos globais e Tailwind
│   │   ├── layout.tsx                      # Layout raiz da aplicação
│   │   └── page.tsx                        # Página inicial
│   └── lib/
│       ├── gsap/
│       │   └── gsapClient.ts               # Configuração GSAP (SSR-safe)
│       └── motion/
│           └── useLenisScroll.ts           # Hook para smooth scroll
├── public/                                 # Assets estáticos
├── tailwind.config.ts                      # Configuração Tailwind
├── postcss.config.mjs                      # Configuração PostCSS
├── next.config.ts                          # Configuração Next.js
├── tsconfig.json                           # Configuração TypeScript
├── eslint.config.mjs                       # Configuração ESLint
├── package.json                            # Dependências e scripts
└── README.md                               # Este arquivo
```

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ (recomendado: Node.js 20+)
- npm ou yarn

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/modilhao/capiau.git
cd capiau/capiau-org
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:3000
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento Next.js |
| `npm run build` | Cria build de produção otimizado |
| `npm run start` | Inicia o servidor de produção (após build) |
| `npm run lint` | Executa o linter ESLint |

## 🎯 Funcionalidades Implementadas

### Hero Section (HeroMatrix)

**Localização**: `src/app/(sections)/hero/HeroMatrix.tsx`

#### Características:

- **Título Animado "CAPIAU"**
  - Animação de entrada com blur e translateY
  - Estilo misto: partes com stroke outline e partes sólidas
  - Tamanho responsivo: `text-6xl md:text-8xl`

- **Subtítulo com Efeito Typewriter + Glitch**
  - Animação scroll-driven com ScrollTrigger
  - Revelação palavra por palavra com efeito glitch
  - Efeitos visuais:
    - Blur progressivo (10px → 0px)
    - Scale animation (0.95 → 1.0)
    - Hue rotation durante revelação
    - TranslateX com glitch effect
  - Texto: "Conversas que viram crescimento."

- **Matrix Background**
  - Canvas animado com caracteres personalizados
  - Caracteres: CAPIAU, números, símbolos e katakana
  - Efeito neon verde premium
  - Animação contínua com requestAnimationFrame
  - Responsivo com resize handler

- **Botão White Label**
  - Posicionado no canto superior direito
  - Estilo minimalista com borda
  - Hover effect com transição de cor

- **Área para Social Icons**
  - Placeholder na parte inferior centralizada
  - Preparado para implementação futura

#### Animações GSAP:

```typescript
// Timeline de entrada
- Matrix opacity: 0 → 0.2 (1s)
- Título: blur(8px) + translateY(40px) → blur(0px) + translateY(0) (0.9s)
- Overlap: -0.4s para transição suave

// ScrollTrigger para subtítulo
- Trigger: "top bottom" → "top 30%"
- Scrub: 0.6
- Revelação palavra por palavra com stagger de 0.12s
```

### Matrix Background

**Localização**: `src/app/(sections)/hero/MatrixBackground.tsx`

#### Implementação:

- **Canvas 2D** com alta performance
- **Caracteres personalizados**: `"CAPIAU0123456789#+-/*$&アカサタナハマヤラワ"`
- **Configurações**:
  - Font size: 14px
  - Grid dinâmico baseado em viewport
  - Device Pixel Ratio support para displays retina
- **Efeitos visuais**:
  - Cor neon verde: `rgba(120, 255, 180, 0.95)`
  - Shadow glow: `rgba(120, 255, 180, 0.3)` com blur 8px
  - Trail effect com retângulo semi-transparente
  - Troca aleatória de caracteres (4% por frame)
- **Performance**:
  - Resize handler otimizado
  - Cleanup adequado de animation frames
  - Grid recalculado apenas no resize

### Section Intro

**Localização**: `src/app/(sections)/intro/SectionIntro.tsx`

#### Características:

- **Layout Full-Screen**
  - Altura mínima: 90vh
  - Overlay de gradiente escuro
  - Container centralizado com max-width

- **Texto Principal**
  - Label: "capiau — social-first studio"
  - Título grande com animação palavra por palavra
  - Texto: "THE RESULTS-DRIVEN, CONVERSATION-LED STUDIO BUILT FOR THE NEW INTERNET."
  - Subtítulo: "We turn attention into momentum."

- **Animações Scroll-Driven**
  - Container: translateY(60px) + opacity(0.5) → translateY(0) + opacity(1)
  - Palavras: opacity(0.25) → opacity(1) com stagger de 0.18s
  - ScrollTrigger: "top 90%" → "top 10%" com scrub 0.8
  - Timing: palavras começam 0.25s após estabilização do container

- **Tipografia**
  - Tamanhos responsivos: `text-3xl md:text-5xl lg:text-6xl`
  - Font weights variados (light e semibold)
  - Tracking e leading otimizados

### Smooth Scrolling (Lenis)

**Localização**: `src/lib/motion/useLenisScroll.ts`

#### Configuração:

```typescript
{
  duration: 1.2,                    // Duração da animação
  easing: cubic ease-out,           // Easing customizado
  smoothWheel: true,                // Scroll suave habilitado
  wheelMultiplier: 0.9,             // Velocidade do scroll
  touchMultiplier: 1.4              // Multiplicador para touch
}
```

- Integrado globalmente via `LayoutMotionClient`
- RequestAnimationFrame para performance
- Cleanup adequado no unmount

### GSAP Configuration

**Localização**: `src/lib/gsap/gsapClient.ts`

#### Plugins Registrados:

- **ScrollTrigger**: Animações baseadas em scroll
- **TextPlugin**: Animações de texto avançadas

#### SSR Safety:

- Verificação de ambiente cliente (`typeof window !== "undefined"`)
- Registro de plugins apenas no cliente
- Exportação segura para uso em componentes

## 🎨 Componentes Principais

### HeroMatrix

Componente principal do Hero com múltiplas animações:

```tsx
// Animações de entrada
- Matrix background fade-in
- Título com blur e translateY
- Subtítulo com typewriter + glitch (scroll-driven)

// Estrutura
- Container full-screen
- MatrixBackground como background
- Título "CAPIAU" centralizado
- Subtítulo animado
- Botão White Label
- Área para social icons
```

### MatrixBackground

Canvas animado com efeito Matrix:

```tsx
// Características
- Canvas 2D com alta performance
- Grid dinâmico responsivo
- Caracteres personalizados
- Efeito neon verde premium
- Animação contínua com RAF
```

### SectionIntro

Seção de introdução com animações scroll-driven:

```tsx
// Animações
- Container slide-up + fade-in
- Palavras reveladas sequencialmente
- ScrollTrigger com scrub

// Conteúdo
- Label da empresa
- Título grande com palavras destacadas
- Subtítulo descritivo
```

### LayoutMotionClient

Wrapper cliente para inicializar smooth scroll:

```tsx
// Função
- Aplica useLenisScroll globalmente
- Wrapper para children
- Client component
```

## 🔧 Configurações Técnicas

### Next.js 16

```typescript
// next.config.ts
{
  reactCompiler: true  // React Compiler habilitado
}
```

- **App Router**: Sistema de roteamento baseado em arquivos
- **React Compiler**: Otimizações automáticas de componentes
- **TypeScript**: Configuração estrita habilitada

### Tailwind CSS v4

```css
/* globals.css */
@import "tailwindcss";
```

- Sintaxe moderna do Tailwind v4
- Configuração via `tailwind.config.ts`
- Cores customizadas no theme
- Font family customizada

### TypeScript

```json
// tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

- Paths alias configurados (`@/*` → `./src/*`)
- Strict mode habilitado
- Tipos para React 19

### ESLint

- Configuração com `eslint-config-next`
- Regras do Next.js aplicadas
- Suporte a TypeScript

## 📊 Performance

### Otimizações Implementadas

- **React Compiler**: Otimizações automáticas de re-renders
- **GSAP Context**: Gerenciamento seguro de animações
- **RequestAnimationFrame**: Animações suaves e performáticas
- **Canvas Optimization**: Matrix background otimizado
- **Lazy Loading**: Componentes carregados sob demanda
- **SSR Safety**: Verificações de ambiente cliente

### Métricas

- Build otimizado com Next.js
- Code splitting automático
- Imagens e assets otimizados
- CSS purged no build de produção

## 🎬 Animações e Efeitos

### Tipos de Animações

1. **Entrada (On Load)**
   - Fade-in do Matrix background
   - Título com blur e translateY
   - Timeline com overlaps

2. **Scroll-Driven**
   - Subtítulo com typewriter + glitch
   - Section Intro com slide-up e fade-in
   - Palavras reveladas sequencialmente

3. **Contínuas**
   - Matrix background (canvas animation)
   - Smooth scrolling (Lenis)

### Easing Functions

- `power3.out` - Entrada suave
- `power2.out` - Transições rápidas
- Cubic ease-out - Smooth scroll

## 📝 Próximos Passos

### Funcionalidades Planejadas

- [ ] Implementar funcionalidade ao botão White Label
- [ ] Adicionar ícones sociais na área do Hero
- [ ] Criar seções adicionais de scrollytelling
- [ ] Adicionar mais animações com ScrollTrigger
- [ ] Implementar modo dark/light toggle (se necessário)
- [ ] Adicionar seção de portfólio/projetos
- [ ] Implementar formulário de contato
- [ ] Adicionar analytics e tracking
- [ ] Otimizar para SEO
- [ ] Adicionar testes (Jest, React Testing Library)

### Melhorias Técnicas

- [ ] Adicionar Storybook para documentação de componentes
- [ ] Implementar CI/CD pipeline
- [ ] Adicionar testes E2E (Playwright/Cypress)
- [ ] Otimizar bundle size
- [ ] Adicionar PWA support
- [ ] Implementar error boundaries
- [ ] Adicionar loading states

## 🐛 Troubleshooting

### Problemas Comuns

**Matrix não aparece:**
- Verifique se o canvas está renderizando
- Confirme que o opacity está sendo animado corretamente
- Verifique o console para erros de canvas

**Animações não funcionam:**
- Confirme que GSAP está registrado corretamente
- Verifique se ScrollTrigger está habilitado
- Confirme que os refs estão sendo passados corretamente

**Smooth scroll não funciona:**
- Verifique se Lenis está inicializado
- Confirme que LayoutMotionClient está no layout
- Verifique o console para erros

## 🤝 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com o mantenedor.

## 📄 Licença

Este projeto é privado e proprietário.

## 👤 Autor

**Marcel Souza**

- GitHub: [@modilhao](https://github.com/modilhao)
- Repositório: [capiau](https://github.com/modilhao/capiau)

## 📚 Recursos

### Documentação

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis Documentation](https://lenis.studiofreight.com/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

### Referências

- Design inspirado em sites premium de scrollytelling
- Efeito Matrix inspirado no filme Matrix
- Animações baseadas em best practices do GSAP

---

Desenvolvido com ❤️ usando Next.js e tecnologias modernas.

**Versão**: 0.1.0  
**Última atualização**: Janeiro 2025
