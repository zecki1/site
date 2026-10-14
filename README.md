# zecki1.com.br — Site pessoal, portfólio e hub de produtos

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![E2E Tests](https://img.shields.io/badge/E2E-27%2F27%20passing-brightgreen)
![Unit Tests](https://img.shields.io/badge/Unit-29%2F29%20passing-brightgreen)
![A11y](https://img.shields.io/badge/axe-0%20critical%20violations-brightgreen)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel)

> Site pessoal e portfólio do desenvolvedor full-stack **Ezequiel Regino Monção** (`zecki1`).
> Além de portfólio, é um **hub de produtos**: expõe os SaaS do autor via reverse-proxy
> (`/dashboard`, `/teleprompt`).
>
> **Produção:** https://zecki1.com.br · **Repo:** `https://github.com/zecki1/site.git` (branch `main`)

---

## Screenshots do Produto

### Home
| Desktop | Mobile |
|---------|--------|
| ![Home Desktop](./docs/screenshots/home-desktop.jpg) | ![Home Mobile](./docs/screenshots/home-mobile.jpg) |

> **Baselines:** telas de `home`, `servicos`, `contato` e `login` (desktop/mobile) versionadas em
> `docs/screenshots/`, geradas por `e2e/screenshots.spec.ts` (Playwright). Regerar com
> `npm run e2e:screenshots`.

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [`docs/a11y/relatorio-axe.json`](./docs/a11y/relatorio-axe.json) | Relatório do axe (WCAG 2.0/2.1 A+AA) por rota, gerado por `npm run e2e:a11y` |
| [`docs/screenshots/`](./docs/screenshots) | Baselines visuais (desktop/mobile) |

---

## Setup rápido

```bash
# 1. Dependências
npm install

# 2. Variáveis de ambiente (Firebase, EmailJS, Cloudinary)
#    Crie um .env.local na raiz com as chaves do projeto (veja .env.local de produção)

# 3. Ambiente de desenvolvimento
npm run dev                  # http://localhost:3000
```

> **E2E:** na primeira vez, instale o navegador do Playwright com `npx playwright install chromium`.

---

## Comandos principais

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Sobe o Next em modo desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:watch` | Unitários em watch |
| `npm run test:ci` | Unitários + cobertura (`coverage/`) |
| `npm run e2e` | E2E completos (Playwright) |
| `npm run e2e:smoke` | E2E de fumaça (páginas e botões do header) |
| `npm run e2e:a11y` | E2E de acessibilidade (axe) |
| `npm run e2e:screenshots` | Regera os baselines de `docs/screenshots/` |

Os E2E usam `E2E_BASE_URL` para reaproveitar um servidor já em execução:

```bash
E2E_BASE_URL=http://localhost:3200 npm run e2e
```

---

## Telas (rotas)

| Rota | Descrição |
|------|-----------|
| `/` | Home: hero, produtos, serviços, habilidades, código, jornada, sobre e contato |
| `/sobre` | História e resumo profissional |
| `/servicos` | Serviços oferecidos |
| `/curriculo` | Currículo completo |
| `/desafio` | Quiz interativo de habilidades (design/código/marketing) |
| `/contato` | Formulário de contato e dados |
| `/login` | Área do cliente (Firebase Auth) |
| `/admin/dashboard` | Painel multi-cliente (Firestore + Cloudinary) |
| `/dashboard`, `/teleprompt` | Reverse-proxy (rewrites) para os SaaS do hub |

---

## Qualidade & Performance

| Métrica | Resultado |
|---------|-----------|
| Testes unitários | **29/29** passando (Vitest + Testing Library) |
| Cobertura (arquivos testados) | **97,4%** statements · 71,6% branches |
| Testes E2E | **27/27** passando (Playwright, Chromium) |
| Acessibilidade (axe) | **0** violações graves/críticas nas 7 rotas |
| Build | OK · First Load JS da home: **145 kB** |

---

## Acessibilidade

- **WCAG 2.1 A/AA** verificada via `@axe-core/playwright` em todas as rotas públicas (`npm run e2e:a11y`).
- O atributo `lang` do `<html>` é sincronizado com o idioma escolhido (`setLanguage`).
- Filtros de visão (monocromia/protanopia/deuteranopia/tritanopia) e controle de tamanho de fonte no menu de acessibilidade.
- **VLibras** para tradução em Libras.
- Foco visível (`focus-visible:ring`) em todos os controles interativos.

---

## Design

- **Conceito:** dark-first, "tech" — vidro (glass), brilhos e neon.
- **Cores:** base escura com acentos **ciano** (`#00e1ff`) e **violeta/roxo**.
- **Tipografia:** `Luckiest Guy` (display) + fonte de sistema/Inter para texto.
- **Movimento:** GSAP (ScrollTrigger/ScrollSmoother) e Lenis para rolagem suave, respeitando `prefers-reduced-motion`.
- **Tema:** claro/escuro/sistema (`ThemeProvider`), persistido em `localStorage`.

---

## Estrutura do projeto

```
site/
├─ e2e/                     # Testes Playwright (smoke, acessibilidade, screenshots)
├─ src/
│  ├─ app/                  # App Router: rotas, layout e API
│  ├─ components/
│  │  ├─ gsap/              # Header com ScrollSmoother, navegação de níveis
│  │  ├─ layout/            # Providers, Theme, Sidebar, Settings, i18n
│  │  ├─ effects/           # HomeFX, partículas, cursores
│  │  └─ ui/                # shadcn/ui (Radix)
│  └─ lib/                  # utils, i18n, locale, dados (serviços/jornada/quiz), hooks
├─ docs/                    # Relatórios (a11y) e baselines (screenshots)
├─ .githooks/commit-msg     # Valida o padrão de commit
├─ playwright.config.ts
└─ vitest.config.ts
```

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router, SSR) |
| UI | React 18 + TypeScript strict |
| Estilo | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Animação | GSAP (ScrollTrigger/ScrollSmoother), Lenis, Framer Motion |
| 3D/Mídia | Three.js, Lottie, Cloudinary (`next-cloudinary`) |
| i18n | react-i18next + `TextTranslator` (textos `{ ptBR, en, es }`) |
| Backend | Firebase Auth + Firestore + Cloudinary |
| Email | EmailJS e Nodemailer |
| Testes | Vitest + Testing Library (unit) · Playwright + axe (E2E) |
| Deploy | Vercel |

---

## Decisão de teste

- **Vitest + Testing Library** para lógica (`src/lib`) e componentes de layout. Roda em `jsdom`,
  sem carregar CSS, com `coverage.all = false` — mede só os arquivos exercitados pelos testes.
- **Playwright** para fluxos reais: carregamento das páginas, **clique nos botões do header**
  (tema, idioma, menu lateral, área do cliente), acessibilidade (axe) e baselines visuais.

---

## Branches & Workflow Git

- Branches: `main` (produção) e `develop` (integração). Features saem de `develop`.
- **Padrão de commit (Conventional Commits):**

  ```
  <tipo>(<escopo>)?: <descrição no imperativo>
  ```

  **Tipos:** `feat`, `fix`, `test`, `docs`, `design`, `ops`, `backend`, `chore`, `refactor`,
  `perf`, `style`, `ci`, `build`.

  ```text
  feat(header): adiciona troca de idioma
  fix: corrige o overlay que bloqueava os botões do header
  test: cobre o TextTranslator
  docs: padroniza o README
  ```

- **Hook local** que valida a mensagem (sem dependências). Ative uma vez por clone:

  ```bash
  git config core.hooksPath .githooks
  ```

  O hook está em `.githooks/commit-msg` e rejeita mensagens fora do padrão
  (commits `Merge`/`Revert`/`fixup!`/`squash!` passam direto).

---

## Deploy

Hospedado na **Vercel** (branch `main`). O `next.config.ts` define os `rewrites` que expõem os
SaaS do hub (`/dashboard`, `/teleprompt`) e os hosts de preview. Variáveis de ambiente
(Firebase, EmailJS, Cloudinary) ficam configuradas no painel da Vercel.

---

## Links

- **Produção:** https://zecki1.com.br
- **Repositório:** https://github.com/zecki1/site
- **Autor:** Ezequiel Regino Monção — [GitHub](https://github.com/zecki1) · [LinkedIn](https://www.linkedin.com/in/ezequiel-moncao)

---

## Licença

Projeto pessoal de portfólio. Todos os direitos reservados © Ezequiel Regino Monção.
