# Meu Projeto Next.js

> Objetivo Geral

Transformar zecki1.com.br em um portfólio pessoal e um CMS SaaS gratuito para mini sites de clientes, usando Next.js, Firebase, Tailwind CSS e shadcn/ui. O cliente deve gerenciar seu site de forma autônoma via /admin, com edição de conteúdo, gestão de contatos (email/WhatsApp), relatórios, rollback e notificações de novidades (inicialmente manuais, futuramente automáticas via WhatsApp/Telegram). O projeto começa no Firebase Spark Plan (gratuito) e planeja escalabilidade para o Blaze ou Vercel quando houver demanda.

## Estrutura de Pastas

```plaintext

Site/
├── public/                       # Arquivos estáticos
│   ├── 404.html                  # Página de erro 404 personalizada
│   └── index.html                # HTML inicial (padrão Next.js)
├── src/                          # Código-fonte
│   ├── app/                      # App Router do Next.js
│   │   ├── favicon.ico           # Ícone do site
│   │   ├── globals.css           # Estilos globais com Tailwind
│   │   ├── layout.tsx            # Layout raiz com ThemeProvider e ScrollSmootherHeader condicional
│   │   ├── page.tsx              # Página inicial (redireciona para /home)
│   │   ├── home/                 # Página estática para /home
│   │   │   └── page.tsx          # Conteúdo da Home (Cover, Sobre, etc.)
│   │   ├── components/           # Página estática com todos os componentes
│   │   │   └── page.tsx          # Lista/exibe todos os componentes
│   │   ├── [slug]/               # Rota dinâmica para o seu site (zecki1.com.br)
│   │   │   ├── page.tsx          # Renderiza o site baseado no slug (exclui "home")
│   │   │   └── DynamicPageClient.tsx  # Componente cliente para renderizar os dados
│   │   ├── sites/                # Rota para sites dos clientes
│   │   │   ├── [siteId]/         # Ex.: cleristonribeiro.com.br/
│   │   │   │   ├── page.tsx      # Renderiza o site do cliente
│   │   │   │   ├── DynamicPageClient.tsx  # Componente cliente para sites dos clientes
│   │   │   │   └── components/   # Componentes específicos do cliente
│   │   │   │       ├── Header.tsx
│   │   │   │       ├── Hero.tsx
│   │   │   │       ├── Sobre.tsx
│   │   │   │       ├── Portfolio.tsx
│   │   │   │       ├── Contato.tsx
│   │   │   │       ├── Footer.tsx
│   │   │   │       └── BackToTop.tsx
│   │   ├── admin/                # Área administrativa
│   │   │   ├── [siteId]/         # Ex.: cleristonribeiro.com.br/admin
│   │   │   │   ├── dashboard/    # Painel de edição
│   │   │   │   │   ├── page.tsx  # Server-side com generateStaticParams
│   │   │   │   │   └── DashboardClient.tsx  # Client-side com interatividade
│   │   ├── login/                # zecki1.com.br/login
│   │   │   └── page.tsx          # Página de login
│   │   └── api/                  # Rotas de API
│   │       └── auth/             # Autenticação com NextAuth
│   │           └── [...nextauth]/
│   │               └── route.ts  # Configuração do NextAuth
│   ├── components/               # Componentes reutilizáveis
│   │   ├── gsap/                 # Componentes GSAP
│   │   │   ├── ImageParallax.tsx
│   │   │   ├── ScrollTriggerClamp.tsx
│   │   │   ├── ScrollSmootherThree.tsx
│   │   │   ├── ScrollTriggerHorizontalGallery.tsx
│   │   │   ├── ScrollSmoother.tsx
│   │   │   ├── GsapImageParallax.tsx
│   │   │   ├── SmoothScrollyImages.tsx
│   │   │   ├── ScrollSmootherHeader.tsx  # Header do seu site
│   │   │   ├── StaggeredText.tsx
│   │   │   └── NavigationScrollTrigger.tsx
│   │   ├── layout/               # Componentes de layout
│   │   │   ├── Container.tsx
│   │   │   ├── Cover.tsx
│   │   │   ├── Flags.tsx
│   │   │   ├── Header.tsx        # Header genérico (não usado no layout)
│   │   │   ├── ImageContainer.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Parallax.tsx
│   │   │   ├── ScrollIndicator.tsx
│   │   │   ├── Sections.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TextTranslator.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── Topic.tsx
│   │   └── ui/                   # Componentes shadcn/ui
│   │       ├── input.tsx
│   │       ├── button.tsx
│   │       └── (outros componentes shadcn/ui)
│   ├── lib/                      # Funções utilitárias
│   │   ├── firebase.ts           # Configuração do Firebase
│   │   ├── i18n.ts               # Configuração do i18next
│   │   ├── utils.ts
│   │   ├── navSections.ts
│   │   ├── parallaxImages.ts
│   │   └── hooks/
│   │       └── use-mobile.ts
│   ├── scripts/                  # Scripts standalone
│   │   ├── addTestDoc.ts         # Adiciona documento de teste no Firestore
│   │   └── encryptConfig.ts      # Encripta credenciais (opcional)
│   └── assets/                   # Recursos estáticos
│       ├── img/
│       │   └── capa.png
│       ├── doc/
│       ├── audio/
│       └── video/
├── .env.local                    # Variáveis de ambiente locais
├── .firebaserc                   # Configuração do Firebase CLI
├── .gitignore                    # Arquivos ignorados pelo Git
├── componentes.json              # Configuração dos componentes (se usado)
├── eslint.config.mjs             # Configuração do ESLint
├── firebase.json                 # Configuração do Firebase Hosting/Firestore
├── next.env.d.ts                 # Tipagem para variáveis de ambiente
├── next.config.js                # Configuração do Next.js
├── package-lock.json             # Lockfile do npm
├── package.json                  # Dependências e scripts
├── postcss.config.mjs            # Configuração do PostCSS
├── tailwind.config.js            # Configuração do Tailwind CSS
├── tsconfig.json                 # Configuração do TypeScript
├── firebaseConfig.enc            # Credenciais encriptadas (opcional)
├── firebaseKey.key               # Chave de encriptação (opcional)
├── firebaseIV.iv                 # IV de encriptação (opcional)
└── README.md                     # Documentação do projeto

```

## Componentes Personalizados

Aqui estão os componentes personalizados extraídos de `src/app/pages/components.tsx`. Cada um vem com uma explicação sobre como funciona e para que serve, seguida do código em TypeScript.

### Cover

**Como funciona:** O Cover exibe uma imagem de fundo em tela cheia com uma camada escura opcional (removida no seu código atual) para contraste. Ele usa o TextTranslator para exibir títulos multilíngues e inclui um ScrollIndicator para incentivar a rolagem. A estilização é feita com Tailwind e a função cn para classes dinâmicas.

**Para que serve:** É usado como uma seção de destaque no topo da página, geralmente para apresentar um título principal com um fundo visual impactante.

```typescript"
"use client"

import ScrollIndicator from "@/components/layout/ScrollIndicator"
import { cn } from "@/lib/utils"
import TextTranslator from '@/components/layout/TextTranslator';

interface CoverProps {
    titlePT?: string
    titleES?: string
    titleEN?: string
    backgroundImage: string
    className?: string
}

export const Cover: React.FC<CoverProps> = ({
    titlePT,
    titleES,
    titleEN,
    backgroundImage,
    className,
}) => {
    return (
        <div
            className={cn(
                "w-full h-screen overflow-hidden relative bg-background",
                className
            )}
        >
            {/* Imagem de fundo */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Camada escura (reduzida para teste) */}

            {/* Conteúdo centralizado */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
                <div className="mt-2  px-3 rounded text-white text-sm bg-black/30 border-0">
                    <h1 className="mt-4 px-16 py-5 text-center text-4xl text-white md:text-6xl">
                        <TextTranslator>
                            {{
                                ptBR: titlePT,
                                en: titleEN,
                                es: titleES,
                            }}
                        </TextTranslator>
                    </h1>
                </div>
            </div>
            <ScrollIndicator />
        </div>
    )
}

export default Cover
```

### DynamicPageClient.tsx

**Como funciona:** O `DynamicPageClient` é um componente cliente que gerencia rotas dinâmicas baseadas em slugs. Ele mapeia slugs para páginas específicas (`Home`, `About`, `Components`) e usa o Container para envolver o conteúdo, ajustando o layout (fluido ou limitado) conforme o slug. Se o slug não for encontrado, retorna uma página 404 com `notFound()`.

**Para que serve:** Facilita a renderização dinâmica de páginas no lado cliente, permitindo navegação fluida entre diferentes seções do site.

```typescript"
"use client"

import { notFound } from "next/navigation"
import Container from "@/components/layout/Container"
import Home from "@/app/pages/home"
import About from "@/app/pages/about"
import Components from "@/app/pages/components"

type PageComponentType = React.ComponentType
const pageComponents: Record<string, PageComponentType> = {
    home: Home,
    about: About,
    components: Components,
} as const

interface DynamicPageClientProps {
    slug: string
}

export default function DynamicPageClient({ slug }: DynamicPageClientProps) {
    const normalizedSlug = slug.toLowerCase()
    const PageComponent = pageComponents[normalizedSlug]

    if (!PageComponent) {
        notFound()
    }

    const isFluid = normalizedSlug === "components"

    return (
        <Container fluid={isFluid}>
            <PageComponent />
        </Container>
    )
}
```

### Flags.tsx

**Como funciona:** O `Flags.tsx` exporta três componentes SVG (`BrazilFlag`, `USFlag`, `SpainFlag`) que representam bandeiras de países. Cada bandeira é desenhada com elementos SVG e aceita uma `className` para estilização personalizada.

**Para que serve:** É usado para exibir ícones de bandeiras em interfaces de seleção de idioma, como no `Header`.

```typescript"

import React from "react";
export const BrazilFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#009B3A" />
        <path d="M12 4L22 12L12 20L2 12L12 4Z" fill="#FEDF00" />
        <circle cx="12" cy="12" r="4" fill="#002776" />
        <path
            d="M12 8.5C13.5 8.5 15 9.5 15 12C15 14.5 13.5 15.5 12 15.5C10.5 15.5 9 14.5 9 12C9 9.5 10.5 8.5 12 8.5Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.5"
        />
    </svg>
);

export const USFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#FFFFFF" />
        <rect width="24" height="2" fill="#B22234" />
        <rect y="4" width="24" height="2" fill="#B22234" />
        <rect y="8" width="24" height="2" fill="#B22234" />
        <rect y="12" width="24" height="2" fill="#B22234" />
        <rect y="16" width="24" height="2" fill="#B22234" />
        <rect y="20" width="24" height="2" fill="#B22234" />
        <rect width="10" height="12" fill="#3C3B6E" />
        <g fill="#FFFFFF">
            <circle cx="2" cy="2" r="0.5" />
            <circle cx="4" cy="2" r="0.5" />
            <circle cx="6" cy="2" r="0.5" />
            <circle cx="8" cy="2" r="0.5" />
            <circle cx="3" cy="4" r="0.5" />
            <circle cx="5" cy="4" r="0.5" />
            <circle cx="7" cy="4" r="0.5" />
            <circle cx="2" cy="6" r="0.5" />
            <circle cx="4" cy="6" r="0.5" />
            <circle cx="6" cy="6" r="0.5" />
            <circle cx="8" cy="6" r="0.5" />
        </g>
    </svg>
);

export const SpainFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="6" fill="#C60B1E" />
        <rect y="6" width="24" height="12" fill="#FFC107" />
        <rect y="18" width="24" height="6" fill="#C60B1E" />
    </svg>
);
```

### Header.tsx

**Como funciona:** O `Header` é um cabeçalho fixo que agora contém apenas o `Sidebar` e controles para alternar tema (claro/escuro) e idioma (usando `DropdownMenu` e `Flags`), após a remoção dos links diretos para melhorar o design mobile. Ele utiliza o `ThemeProvider` para gerenciar o tema e `react-i18next` para tradução.

**Para que serve:** Fornece uma barra de navegação minimalista no topo da página, delegando a navegação principal ao `Sidebar` e mantendo configurações de tema/idioma acessíveis.

```typescript"

"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "./TextTranslator";
import { Sidebar } from "@/components/layout/Sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrazilFlag, USFlag, SpainFlag } from "./Flags";

export function Header() {
    const { theme, setTheme } = useTheme();
    const { i18n } = useTranslation();

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");
        }
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <header className="fixed top-0 w-full bg-background border-b border-border p-4 flex justify-between items-center z-50">
            <nav className="flex items-center gap-6">
                {/* Menu fixo no topo esquerdo */}
                <Sidebar />
            </nav>
            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Globe className="h-5 w-5" />
                            <span className="sr-only">
                                <TextTranslator>
                                    {{
                                        ptBR: "Mudar Idioma",
                                        en: "Change Language",
                                        es: "Cambiar Idioma",
                                    }}
                                </TextTranslator>
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => changeLanguage("ptBR")}>
                            <BrazilFlag className="h-5 w-5 mr-2" />
                            <TextTranslator>
                                {{
                                    ptBR: "Português",
                                    en: "Portuguese",
                                    es: "Portugués",
                                }}
                            </TextTranslator>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage("en")}>
                            <USFlag className="h-5 w-5 mr-2" />
                            <TextTranslator>
                                {{
                                    ptBR: "Inglês",
                                    en: "English",
                                    es: "Inglés",
                                }}
                            </TextTranslator>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage("es")}>
                            <SpainFlag className="h-5 w-5 mr-2" />
                            <TextTranslator>
                                {{
                                    ptBR: "Espanhol",
                                    en: "Spanish",
                                    es: "Español",
                                }}
                            </TextTranslator>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                        <TextTranslator>
                            {{
                                ptBR: "Alternar Tema",
                                en: "Toggle Theme",
                                es: "Cambiar Tema",
                            }}
                        </TextTranslator>
                    </span>
                </Button>
            </div>
        </header>
    );
}

```

### ImageContainer.tsx

**Como funciona:** O `ImageContainer` importa imagens estáticas de `src/img/` e as exporta como um objeto com URLs geradas pelo Next.js, prontas para uso em outros componentes como o `Cover`.

**Para que serve:** Centraliza o gerenciamento de imagens estáticas no projeto, facilitando seu uso em diferentes partes da aplicação.

```typescript"

import capaImage from "@/img/capa.png"
// import componentesImage from "@/img/componentes.png"

export const images = {
    capa: capaImage.src,
    // componentes: componentesImage.src,
} as const

```

### ScrollIndicator.tsx

**Como funciona:** O `ScrollIndicator` exibe um ícone animado (uma seta para baixo) e um texto multilíngue (via `TextTranslator`) na parte inferior de uma seção, como o `Cover`. Ele usa Tailwind para estilização e animação (`animate-bounce`).

**Para que serve:** Incentiva os usuários a rolar para baixo, melhorando a experiência de navegação em seções longas.

```typescript"
"use client"

import React from "react"
import { ChevronDown } from "lucide-react"
import TextTranslator from '@/components/layout/TextTranslator';

const ScrollIndicator: React.FC = () => {
    return (
        <div className="flex flex-col items-center absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30">
            {/* Opção 1: Seta para baixo */}
            <ChevronDown className="w-8 h-8 text-white animate-bounce" />

            {/* Opção 2: Círculo (comente a seta acima e descomente esta se preferir) */}
            {/* <div className="w-8 h-8 border-2 border-white rounded-full animate-bounce" /> */}

            <span className="mt-2 py-2 px-3 rounded text-white text-sm bg-black/30 border-0">
                <TextTranslator>
                    {{
                        ptBR: <>Role para baixo</>,
                        en: <>Scroll down</>,
                        es: <>Desplázate hacia abajo</>,
                    }}
                </TextTranslator>
            </span>
        </div>
    )
}

export default ScrollIndicator
```

### Sections.tsx

**Como funciona:** O `Sections.tsx` exporta dois componentes: `Section` e `SectionFluid`. O `Section` cria uma seção centralizada com um container e animações GSAP para entrada suave. O `SectionFluid` cria uma seção de largura total com animações semelhantes. Ambos usam um `label` para definir IDs.

**Para que serve:** Organiza o conteúdo em blocos estruturados, com `Section` para layouts contidos e `SectionFluid` para seções expansivas, como introduções ou rodapés.

```typescript"
"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface SectionProps {
    children: React.ReactNode
    label: string
    className?: string
}

export const Section: React.FC<SectionProps> = ({ children, label, className }) => {
    useEffect(() => {
        gsap.fromTo(
            `.section-${label}`,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
    }, [label])

    return (
        <section id={label} className={cn(`section-${label}`, className)}>
            <div className="container mx-auto">{children}</div>
        </section>
    )
}

interface SectionFluidProps {
    children: React.ReactNode
    label: string
    className?: string
}

export const SectionFluid: React.FC<SectionFluidProps> = ({ children, label, className }) => {
    useEffect(() => {
        gsap.fromTo(
            `.section-fluid-${label}`,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
        )
    }, [label])

    return (
        <section id={label} className={cn(`section-fluid-${label} w-full`, className)}>
            {children}
        </section>
    )
}
```

### Sidebar.tsx

**Como funciona:** O `Sidebar` é um menu lateral deslizante (usando `Sheet` do shadcn/ui) que lista páginas principais e, na página `components`, exibe seções e subseções com ícones dinâmicos (`BsCircle` ou `BsCheckCircle`) para indicar itens visitados. Ele usa `IntersectionObserver` para rastrear seções visíveis e animações suaves para navegação.

**Para que serve:** Oferece uma navegação secundária interativa, ideal para acessar rapidamente páginas ou seções específicas, especialmente em páginas longas como components.

```typescript"
"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import TextTranslator from "@/components/layout/TextTranslator"
import { BsCircle, BsCheckCircle } from "react-icons/bs"
import { cn } from "@/lib/utils"

// Páginas principais
const pages = [
    {
        slug: "home",
        title: { ptBR: "Início", en: "Home", es: "Inicio" },
    },
    {
        slug: "about",
        title: { ptBR: "Sobre", en: "About", es: "Sobre" },
    },
    {
        slug: "components",
        title: { ptBR: "Componentes", en: "Components", es: "Componentes" },
    },
] as const

// Seções e tópicos de /components
const componentSections = [
    {
        label: "introducao",
        title: { ptBR: "Introdução", en: "Introduction", es: "Introducción" },
        subItems: [],
    },
    {
        label: "interativos",
        title: { ptBR: "Interativos", en: "Interactive", es: "Interactivos" },
        subItems: [
            { label: "button", title: { ptBR: "Botão", en: "Button", es: "Botón" } },
            { label: "dropdown-menu", title: { ptBR: "Menu Suspenso", en: "Dropdown Menu", es: "Menú Desplegable" } },
        ],
    },
    {
        label: "visualizacoes",
        title: { ptBR: "Visualizações", en: "Visualizations", es: "Visualizaciones" },
        subItems: [],
    },
    {
        label: "formularios",
        title: { ptBR: "Formulários", en: "Forms", es: "Formularios" },
        subItems: [],
    },
    {
        label: "navegacao",
        title: { ptBR: "Navegação", en: "Navigation", es: "Navegación" },
        subItems: [],
    },
    {
        label: "outros",
        title: { ptBR: "Outros", en: "Others", es: "Otros" },
        subItems: [
            { label: "toast", title: { ptBR: "Toast", en: "Toast", es: "Toast" } },
            { label: "tooltip", title: { ptBR: "Tooltip", en: "Tooltip", es: "Tooltip" } },
        ],
    },
    {
        label: "rodape",
        title: { ptBR: "Rodapé", en: "Footer", es: "Pie de página" },
        subItems: [],
    },
] as const

export const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [visitedItems, setVisitedItems] = useState<Set<string>>(new Set())

    // Navegar para uma página ou seção
    const handleNavigation = (target: string, isSection = false) => {
        if (isSection) {
            const element = document.getElementById(target)
            if (element) {
                const offset = window.innerWidth <= 768 ? 50 : 100
                window.scrollTo({
                    top: element.offsetTop - offset,
                    behavior: "smooth",
                })
                setVisitedItems((prev) => new Set(prev).add(target))
            }
        } else {
            router.push(`/${target}`)
            setVisitedItems((prev) => new Set(prev).add(target))
        }
    }

    // Marcar páginas visitadas e observar seções em /components
    useEffect(() => {
        const currentSlug = pathname.split("/")[1] || "home"
        setVisitedItems((prev) => new Set(prev).add(currentSlug))

        if (pathname !== "/components") return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const label = entry.target.getAttribute("id")
                        if (label) {
                            setVisitedItems((prev) => new Set(prev).add(label))
                        }
                    }
                })
            },
            { threshold: 0.5 }
        )

        componentSections.forEach((item) => {
            const element = document.getElementById(item.label)
            if (element) observer.observe(element)
            item.subItems.forEach((subItem) => {
                const subElement = document.getElementById(subItem.label)
                if (subElement) observer.observe(subElement)
            })
        })

        return () => observer.disconnect()
    }, [pathname])

    // Renderizar ícone com animação
    const obterIcone = (visitado: boolean) => {
        return visitado ? (
            <BsCheckCircle className="inline-block mr-2 text-green-500 transition-transform duration-300 ease-in-out transform scale-110" />
        ) : (
            <BsCircle className="inline-block mr-2 text-gray-500 transition-colors duration-300 ease-in-out hover:text-blue-500" />
        )
    }

    const isComponentsPage = pathname === "/components"

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon">
                    <AlignJustify className="h-[1.1rem] w-[1.2rem]" />
                    <span className="sr-only">
                        <TextTranslator>
                            {{ ptBR: "Abrir Menu", en: "Open Menu", es: "Abrir Menú" }}
                        </TextTranslator>
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <SheetHeader className="px-4 pt-4">
                    <SheetTitle>
                        <TextTranslator>
                            {{ ptBR: "Menu de Navegação", en: "Navigation Menu", es: "Menú de Navegación" }}
                        </TextTranslator>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 pt-4 max-h-screen px-4 pb-32 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
                    {pages.map((page) => (
                        <div key={page.slug}>
                            <a
                                href={`/${page.slug}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNavigation(page.slug)
                                }}
                                className={cn(
                                    "block py-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
                                    visitedItems.has(page.slug) && "font-bold text-blue-600 dark:text-blue-400"
                                )}
                            >
                                {obterIcone(visitedItems.has(page.slug))}
                                <TextTranslator>{page.title}</TextTranslator>
                            </a>
                            {isComponentsPage && page.slug === "components" && (
                                <div className="pl-6 flex flex-col gap-1">
                                    {componentSections.map((section) => (
                                        <div key={section.label}>
                                            <a
                                                href={`#${section.label}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleNavigation(section.label, true)
                                                }}
                                                className={cn(
                                                    "block py-1 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300",
                                                    visitedItems.has(section.label) && "font-semibold text-blue-500 dark:text-blue-300"
                                                )}
                                            >
                                                {obterIcone(visitedItems.has(section.label))}
                                                <TextTranslator>{section.title}</TextTranslator>
                                            </a>
                                            {section.subItems.length > 0 && (
                                                <div className="pl-4 flex flex-col gap-1">
                                                    {section.subItems.map((subItem) => (
                                                        <a
                                                            key={subItem.label}
                                                            href={`#${subItem.label}`}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                handleNavigation(subItem.label, true)
                                                            }}
                                                            className={cn(
                                                                "block py-1 text-gray-500 hover:text-blue-400 dark:text-gray-500 dark:hover:text-blue-200 text-sm",
                                                                visitedItems.has(subItem.label) && "font-medium text-blue-400 dark:text-blue-200"
                                                            )}
                                                        >
                                                            {obterIcone(visitedItems.has(subItem.label))}
                                                            <TextTranslator>{subItem.title}</TextTranslator>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
```

### TextTranslator.tsx

**Como funciona:** O `TextTranslator` gerencia a tradução de texto com base no idioma atual (via `react-i18next`). Ele valida traduções, detecta erros como textos repetidos ou ausentes, e exibe um aviso `[TRADUZIR]` em vermelho quando necessário. Usa estados para evitar problemas de hidratação no lado cliente.

**Para que serve:** Permite a internacionalização de conteúdo, garantindo que textos sejam exibidos no idioma correto e destacando problemas de tradução.

```typescript"
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

interface LocalizedText {
    ptBR?: React.ReactNode;
    en?: React.ReactNode;
    es?: React.ReactNode;
    [key: string]: React.ReactNode | undefined;
}

interface TextTranslatorProps {
    children: LocalizedText;
    ignoreCheck?: boolean;
}

const TextTranslator: React.FC<TextTranslatorProps> = ({ children, ignoreCheck = false }) => {
    const { i18n } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const selectedLanguage = isMounted ? i18n.language : "ptBR";

    const translatedText = children[selectedLanguage];
    const fallbackText = children.ptBR ?? "[SEM TEXTO PT-BR]";

    const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return node.toString();
        if (React.isValidElement(node)) {
            const element = node as React.ReactElement<{ children?: React.ReactNode }>;
            return React.Children.toArray(element.props.children)
                .map((child) => extractText(child))
                .join(" ");
        }
        if (Array.isArray(node)) return node.map(extractText).join(" ");
        return "";
    };

    const validateTranslation = (text: React.ReactNode): string => {
        const extractedText = extractText(text).trim();
        if (!text || extractedText === "") return "empty";
        if (text === "#" || extractedText === "#") return "hasHash";
        if (/lorem ipsum/i.test(extractedText)) return "loremIpsum";
        if (/^\s|\s$/.test(extractedText)) return "hasExtraSpaces";
        return "valid";
    };

    const hasRepeatedTranslations = (): boolean => {
        if (ignoreCheck) return false;
        const texts = Object.entries(children)
            .map(([key, value]) => [key, extractText(value).toLowerCase().trim()])
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as { [key: string]: string });

        const ptBRText = texts["ptBR"] || "";
        const currentText = texts[selectedLanguage] || "";

        if (selectedLanguage !== "ptBR" && currentText === ptBRText && currentText !== "") {
            return true;
        }

        const textValues = Object.values(texts).filter((v) => v !== "");
        if (textValues.length > 1) {
            const firstValue = textValues[0];
            const allSame = textValues.every((value) => value === firstValue);
            if (allSame) return true;
        }
        return false;
    };

    const isMissing =
        !ignoreCheck &&
        (translatedText === undefined ||
            translatedText === null ||
            validateTranslation(translatedText) !== "valid" ||
            hasRepeatedTranslations());

    return (
        <span className={isMissing ? "text-red-500 font-bold bg-red-200 px-2 rounded" : ""}>
            {isMissing ? (
                <>
                    <span className="text-red-600">[TRADUZIR]</span> {fallbackText}
                </>
            ) : (
                translatedText
            )}
        </span>
    );
};

export default TextTranslator;
```

### ThemeProvider.tsx

**Como funciona:** O `ThemeProvider` gerencia o tema da aplicação (claro, escuro ou sistema) usando contexto React e `localStorage`. Ele também integra o `I18nextProvider` para tradução, ajustando o idioma inicial com base em `localStorage`. Usa media queries para sincronizar o tema com as preferências do sistema.

**Para que serve:** Fornece um sistema de temas e tradução global para a aplicação, permitindo alternância dinâmica e persistência de configurações.

```typescript"
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        const resolvedTheme =
            savedTheme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : savedTheme;
        setTheme(resolvedTheme);
        document.documentElement.classList.toggle("dark", resolvedTheme === "dark");

        const savedLanguage = localStorage.getItem("i18nLng") || "ptBR";
        i18n.changeLanguage(savedLanguage);

        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const root = document.documentElement;
        const resolvedTheme =
            theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : theme;
        root.classList.toggle("dark", resolvedTheme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme, isMounted]);

    useEffect(() => {
        if (!isMounted || theme !== "system") return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const systemTheme = mediaQuery.matches ? "dark" : "light";
            document.documentElement.classList.toggle("dark", systemTheme === "dark");
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, isMounted]);

    if (!isMounted) {
        return null; // Não renderiza nada até o tema e idioma serem ajustados
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
}

```

### Topic.tsx

**Como funciona:** O `Topic.tsx` exporta dois componentes: `Topic` e `Topic2`. O `Topic` é um contêiner simples para tópicos com um ID gerado a partir do `label` e suporta renderização como Slot (via asChild). O `Topic2` adiciona opções de fundo (`bgColor`) e SVG divisores, com um layout mais estruturado.

**Para que serve:** Divide seções em tópicos menores, permitindo organização e estilização personalizada de conteúdo.

```typescript"
"use client"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot" // Adicione este import

const generateId = (label: string): string => {
    return label
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .toLowerCase()
}

interface TopicProps {
    children: React.ReactNode
    label: string
    className?: string
    asChild?: boolean // Nova prop
}

export const Topic: React.FC<TopicProps> = ({ children, label, className, asChild }) => {
    const Comp = asChild ? Slot : "article" // Use Slot se asChild for true
    return (
        <Comp
            id={generateId(label)}
            aria-label={label}
            className={cn("p-4", className)}
        >
            {children}
        </Comp>
    )
}

interface Topic2Props extends TopicProp
s {
    svgComponent?: string
    showSvg?: boolean
    bgColor?: string
}

export const Topic2: React.FC<Topic2Props> = ({
    children,
    label,
    className,
    svgComponent,
    showSvg = false,
    bgColor = "",
}) => {
    return (
        <>
            <article
                id={generateId(label)}
                aria-label={label}
                className={cn("relative", bgColor, className)}
            >
                <div className="py-8 px-2 container mx-auto">{children}</div>
            </article>
            {showSvg && svgComponent && (
                <div className="w-full">
                    <img src={svgComponent} alt="Divisor" className="w-full h-auto" />
                </div>
            )}
        </>
    )
}

```


teste de atualização do recurso do .git