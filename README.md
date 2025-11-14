# Capiau.org

Site de scrollytelling minimalista e moderno construído com Next.js 15, TypeScript, Tailwind CSS, GSAP e Lenis.

## 📋 Sobre o Projeto

Capiau.org é um projeto de site de scrollytelling focado em contar histórias através de animações suaves e interações visuais. O projeto utiliza tecnologias modernas para criar uma experiência imersiva e performática.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **GSAP** - Animações avançadas
- **Lenis** - Smooth scrolling
- **React 19** - Biblioteca UI

## 🎨 Design System

### Paleta de Cores

- **Background**: `#020617` - Fundo escuro principal
- **Foreground**: `#e5e7eb` - Texto claro
- **Accent**: `#22c55e` - Cor de destaque (verde)
- **Muted**: `#6b7280` - Texto secundário

### Tipografia

- **Fonte Principal**: Inter (via Google Fonts)
- **Fallback**: system-ui, sans-serif

## 📁 Estrutura do Projeto

```
capiau-org/
├── src/
│   ├── app/
│   │   ├── (sections)/
│   │   │   ├── hero/
│   │   │   │   └── HeroMatrix.tsx    # Componente Hero principal
│   │   │   └── LayoutMotionClient.tsx # Wrapper para animações globais
│   │   ├── globals.css               # Estilos globais e Tailwind
│   │   ├── layout.tsx                # Layout raiz da aplicação
│   │   └── page.tsx                  # Página inicial
│   └── lib/
│       ├── gsap/
│       │   └── gsapClient.ts         # Configuração GSAP
│       └── motion/
│           └── useLenisScroll.ts     # Hook para smooth scroll
├── tailwind.config.ts                # Configuração Tailwind
├── postcss.config.mjs                # Configuração PostCSS
└── package.json
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/modilhao/capiau.git
cd capiau/capiau-org
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:3000` no navegador

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🎯 Funcionalidades

### Hero Section (HeroMatrix)

- **Animações de entrada**: Título e subtítulo animados com GSAP
- **Efeito Matrix**: Placeholder para efeito Matrix (a ser implementado)
- **Gradiente de fundo**: Overlay escuro para melhor contraste
- **Botão White Label**: Toggle no canto superior direito
- **Área de Social Icons**: Placeholder para ícones sociais na parte inferior

### Smooth Scrolling

- Implementado com **Lenis** para scroll suave
- Configuração personalizada de velocidade e easing
- Integrado globalmente via `LayoutMotionClient`

### Animações GSAP

- **ScrollTrigger**: Plugin registrado para animações baseadas em scroll
- **TextPlugin**: Plugin para animações de texto
- **Context API**: Uso de `gsap.context()` para gerenciamento seguro de animações

## 🎨 Componentes Principais

### HeroMatrix

Componente principal do Hero com animações de entrada:

```tsx
- Animação do fundo Matrix (opacity: 0 → 0.2)
- Animação do título CAPIAU (blur + translateY)
- Animação do subtítulo (translateY)
- Timeline com overlaps para transições suaves
```

### LayoutMotionClient

Wrapper cliente que inicializa o smooth scroll globalmente:

```tsx
- Hook useLenisScroll integrado
- Aplicado em todo o layout da aplicação
```

## 🔧 Configurações

### Tailwind CSS v4

O projeto utiliza Tailwind CSS v4 com a nova sintaxe:

```css
@import "tailwindcss";
```

### TypeScript

Configuração com paths alias:
- `@/*` → `./src/*`

### Next.js

- App Router habilitado
- React Compiler ativado
- TypeScript estrito

## 📝 Próximos Passos

- [ ] Implementar efeito Matrix no placeholder
- [ ] Adicionar funcionalidade ao botão White Label
- [ ] Implementar ícones sociais
- [ ] Criar seções adicionais de scrollytelling
- [ ] Adicionar mais animações com ScrollTrigger

## 🤝 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com o mantenedor.

## 📄 Licença

Este projeto é privado e proprietário.

## 👤 Autor

**Marcel Souza**

- GitHub: [@modilhao](https://github.com/modilhao)
- Repositório: [capiau](https://github.com/modilhao/capiau)

---

Desenvolvido com ❤️ usando Next.js e tecnologias modernas.
