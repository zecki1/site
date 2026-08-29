# zecki1.com.br — Site Pessoal / Portfólio

Site pessoal e portfólio do desenvolvedor full-stack **Ezequiel Regino Monção** (`zecki1`). Além de portfólio, funciona como **hub de produtos** — expõe os SaaS do autor via reverse-proxy (rewrites): `/dashboard` (Dashboard Work OS) e `/teleprompt` (Teleprompt).

**Produção:** https://zecki1.com.br
**Repo:** `https://github.com/zecki1/site.git` (branch `main`)

---

## Stack

- **Next.js 15** (App Router, SSR/SSG, `"use client"` para seções interativas)
- **React 18** + **TypeScript strict**
- **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens em `src/app/globals.css` / oklch) + **shadcn/ui** (Radix UI)
- **Animações:** GSAP (ScrollTrigger/ScrollSmoother), Framer Motion, AOS
- **3D/imagens:** Three.js, Lottie, Cloudinary (`next-cloudinary`)
- **i18n:** react-i18next com sistema próprio `TextTranslator` (textos `{ ptBR, en, es }`)
- **CMS:** Firebase Auth (login) + Firestore (`clientes/siteData`) + Cloudinary (upload) — painel `/admin/dashboard` multi-cliente
- **Email:** EmailJS (formulário de contato) e nodemailer
- **Acessibilidade:** WCAG 2.1, filtros de visão (monocromia/protanopia/etc.), fonte OpenDyslexic, widget VLibras

---

## Scripts

```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start
npm run lint    # next lint
```

---

## Rotas

| Rota | Página |
|------|--------|
| `/` | Redireciona para `/home` |
| `/home` | Homepage (hero, sobre, serviços, **produtos SaaS**, projetos, tecnologias, processo, contato) |
| `/sobre` | Bio, história e resumo profissional |
| `/servicos` | Serviços oferecidos (accordion) |
| `/curriculo` | Currículo completo (formação, experiências, competências, projetos) |
| `/desafio` | Quiz interativo de habilidades |
| `/contato` | Formulário de contato (EmailJS) |
| `/login` | Login do CMS |
| `/admin/dashboard` | Painel CMS multi-clientes |
| `/dashboard*` | **Rewrite** → `https://dashboard-zecki.vercel.app/dashboard` (SaaS #1) |
| `/teleprompt*` | **Rewrite** → projeto do chooser na Vercel (SaaS #2) |

### API routes
- `POST /api/upload` — upload de imagem para Cloudinary (auth Firebase)
- `DELETE /api/delete-image` — apaga imagem do Cloudinary
- `POST /api/publish` — aciona revalidate no site do cliente após salvar no CMS

---

## Estrutura resumida

```
src/
├── app/
│   ├── page.tsx          # redirect -> /home
│   ├── home/page.tsx     # homepage completa (seção SaaS incluída)
│   ├── sobre/ servicos/ curriculo/ desafio/ contato/
│   ├── login/  admin/dashboard/
│   └── api/  (upload, delete-image, publish)
├── components/
│   ├── layout/           # AppLayout, Header, Sidebar, TextTranslator
│   ├── gsap/             # ScrollSmootherHeader
│   └── ui/               # shadcn/ui (button, card, carousel, ...)
├── lib/                  # firebase.ts, firebaseAdmin.ts, servicesData.ts
└── app/globals.css       # design system (cores oklch, dark/light, fontes)
```

---

## Produtos expostos (rewrites em `next.config.ts`)

1. **Dashboard Work OS** — `/dashboard` → `dashboard-zecki.vercel.app/dashboard`
   SaaS de gestão de projetos/tarefas/equipes (Kanban, Gantt, analytics, multi-workspace).
2. **Teleprompt TEC** — `/teleprompt` → chooser na Vercel
   Teleprompter com escolha de versão (Next.js / Angular 22 / Angular 17), todas consumindo a mesma API .NET.

> Para publicar um produto novo no site: adicione o `rewrite` em `next.config.ts` e atualize a seção "Produtos SaaS" em `src/app/home/page.tsx`.

---

## Ambiente

Variáveis em `.env.local` (não versionar): Firebase (API key, auth domain, project id, storage bucket, messaging, app id), `NEXT_PUBLIC_REVALIDATE_TOKEN`, `NEXT_PUBLIC_CLIENT_SITE_URL`, `NEXT_PUBLIC_CLIENT_ID`, Cloudinary (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `API_KEY`, `CLOUDINARY_API_SECRET`), EmailJS (`SERVICE_ID`/`TEMPLATE_ID`/`PUBLIC_KEY`), `FIREBASE_SERVICE_ACCOUNT`, `CLIENT_SITES`.

`firebase.json` = placeholder do Firebase Hosting (o site real roda na **Vercel**); projeto Firebase real: `zecki-site` (Firestore `clientes`).

---

## Contato / redes (presentes no código)

- Email: `zecki1@hotmail.com` · WhatsApp: +55 11 98210-1630
- GitHub: `github.com/zecki1` · LinkedIn: `linkedin.com/in/zecki1`
- Localização: São Paulo — SP, Brasil

> —— Documento gerado/atualizado em 2026-08-29. Design system no padrão ciano `#00e1ff` ↔ roxo `#7f00ff` (gradiente animado), dark-mode dominante com cards "vidro" (`.text-glass-light`).