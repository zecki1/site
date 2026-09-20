import Link from "next/link";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import {
    ArrowRight,
    Smartphone,
    Search,
    Accessibility,
    UserCheck,
    GanttChartSquare,
    Rocket,
    Clock,
    MonitorPlay,
    LayoutDashboard,
    Sparkles,
    Check,
    Mail,
    Github,
    Linkedin,
    ChevronDown,
    Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { YouTubeBackground } from "@/components/layout/YouTubeBackground";
import { LazyTechParticles } from "@/components/layout/LazyTechParticles";
import { SkillsMarquee } from "@/components/layout/SkillsMarquee";
import { ProductImage } from "@/components/layout/ProductImage";
import { LazyJourney } from "@/components/layout/LazyJourney";
import { HomeFX } from "@/components/effects/HomeFX";
import { GameNav } from "@/components/gsap/GameNav";
import { CodeShowcase } from "@/components/layout/CodeShowcase";
import { getLang, pick, type Locale } from "@/lib/locale";

// Componentes servidor: todo o texto é SSR (lido via cookie `lang`).
// Apenas pequenas ilhas client (HomeFX, TechParticles, ProductImage etc.)
// hidratam — mantendo o thread principal livre no carregamento (PageSpeed).

// DADOS PARA OS COMPONENTES

const stats = [
    {
        value: "+13",
        label: {
            ptBR: "Anos de Experiência",
            en: "Years of Experience",
            es: "Años de Experiencia",
        },
    },
    {
        value: "+25",
        label: {
            ptBR: "Projetos Entregues",
            en: "Projects Delivered",
            es: "Proyectos Entregados",
        },
    },
    {
        value: "100%",
        label: {
            ptBR: "Foco Mobile-First",
            en: "Mobile-First Focus",
            es: "Enfoque Mobile-First",
        },
    },
    {
        value: "WCAG",
        label: {
            ptBR: "Acessibilidade Digital",
            en: "Digital Accessibility",
            es: "Accesibilidad Digital",
        },
    },
];

const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    ".NET",
    "Angular",
    "PHP",
    "Laravel",
    "SQL Server",
    "Firebase",
    "Docker",
    "Git",
    "Figma",
    "SEO",
    "UX/UI",
    "WCAG",
];

const navSections = [
    {
        href: "#inicio",
        label: {
            ptBR: "Início",
            en: "Home",
            es: "Inicio",
        },
    },
    {
        href: "#produtos",
        label: {
            ptBR: "Trabalhos",
            en: "Works",
            es: "Trabajos",
        },
    },
    {
        href: "#servicos",
        label: {
            ptBR: "O que eu faço",
            en: "What I Do",
            es: "Servicios",
        },
    },
    {
        href: "#habilidades",
        label: {
            ptBR: "Tecnologias",
            en: "Technologies",
            es: "Tecnologías",
        },
    },
    {
        href: "#codigo",
        label: {
            ptBR: "Código",
            en: "Code",
            es: "Código",
        },
    },
    {
        href: "#jornada",
        label: {
            ptBR: "Jornada",
            en: "Journey",
            es: "Trayectoria",
        },
    },
    {
        href: "#sobre",
        label: {
            ptBR: "Sobre",
            en: "About",
            es: "Sobre mí",
        },
    },
    {
        href: "#contato",
        label: {
            ptBR: "Contato",
            en: "Contact",
            es: "Contacto",
        },
    },
];

type Localized = { ptBR: string; en: string; es: string };
type IconType = ComponentType<{ className?: string }>;

// Ícone do WhatsApp inline (1 SVG) — evita baixar o react-icons/fa inteiro.
function WhatsappIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

// Trabalhos e aplicações — separados por contexto: clientes e aplicações próprias.
const clientWorks: Array<{
    img: string;
    badge: string;
    icon: IconType;
    name: Localized;
    nameStatic?: boolean;
    tagline: Localized;
    features: Localized[];
    url: string;
    external: boolean;
    cta: Localized;
}> = [
    {
        img: "/img/projects/cleriston.webp",
        badge: "WEB",
        icon: MonitorPlay,
        name: {
            ptBR: "Sites Institucionais",
            en: "Institutional Sites",
            es: "Sitios Institucionales",
        },
        tagline: {
            ptBR: "Sites rápidos, acessíveis e fáceis de atualizar — com CMS próprio para o cliente editar sem depender de ninguém.",
            en: "Fast, accessible, easy-to-update sites — with their own CMS so clients edit content without depending on anyone.",
            es: "Sitios rápidos, accesibles y fáciles de actualizar, con CMS propio para que el cliente edite sin depender de nadie.",
        },
        features: [
            {
                ptBR: "SEO e desempenho desde o primeiro commit",
                en: "SEO and performance baked in from day one",
                es: "SEO y rendimiento desde el primer commit",
            },
            {
                ptBR: "Editor visual de conteúdo",
                en: "Visual content editor",
                es: "Editor visual de contenido",
            },
            {
                ptBR: "Totalmente responsivo",
                en: "Fully responsive",
                es: "Totalmente responsive",
            },
            {
                ptBR: "Multi-idioma (pt/en/es)",
                en: "Multi-language (pt/en/es)",
                es: "Multiidioma (pt/en/es)",
            },
        ],
        url: "https://www.cleristonribeiro.com.br",
        external: true,
        cta: {
            ptBR: "Ver site",
            en: "View site",
            es: "Ver sitio",
        },
    },
    {
        img: "/img/projects/cms-login.webp",
        badge: "CMS",
        icon: LayoutDashboard,
        name: {
            ptBR: "Painel CMS Multi-Site",
            en: "Multi-Site CMS Panel",
            es: "Panel CMS Multi-Sitio",
        },
        tagline: {
            ptBR: "Um painel para gerenciar hero, sobre, portfólio e contato de vários sites em um só lugar — com login e publicação em um clique.",
            en: "One panel to manage hero, about, portfolio, and contact across multiple sites — with login and one-click publishing.",
            es: "Un panel para gestionar hero, sobre, portafolio y contacto de varios sitios, con inicio de sesión y publicación con un clic.",
        },
        features: [
            {
                ptBR: "Login e permissões por cliente",
                en: "Login and per-client permissions",
                es: "Inicio de sesión y permisos por cliente",
            },
            {
                ptBR: "Upload de imagens na nuvem",
                en: "Cloud image uploads",
                es: "Subida de imágenes a la nube",
            },
            {
                ptBR: "Publicação imediata no site",
                en: "Instant publishing to the site",
                es: "Publicación inmediata del sitio",
            },
            {
                ptBR: "Backup e histórico automático",
                en: "Automatic backup and history",
                es: "Copia de seguridad e historial automáticos",
            },
        ],
        url: "/login",
        external: false,
        cta: {
            ptBR: "Ver painel",
            en: "View panel",
            es: "Ver panel",
        },
    },
];

const ownApps: Array<{
    img: string;
    badge: string;
    icon: IconType;
    name: Localized;
    nameStatic?: boolean;
    tagline: Localized;
    features: Localized[];
    url: string;
    external: boolean;
    cta: Localized;
}> = [
    {
        img: "/img/projects/dashboard.webp",
        badge: "SaaS",
        icon: LayoutDashboard,
        name: {
            ptBR: "Dashboard",
            en: "Dashboard",
            es: "Dashboard",
        },
        tagline: {
            ptBR: "Minha própria ferramenta de gestão: projeto, tarefas e equipe em um único place de trabalho.",
            en: "My own management tool: projects, tasks, and your team in a single work OS.",
            es: "Mi propia herramienta de gestión: proyectos, tareas y equipo en un único sistema de trabajo.",
        },
        features: [
            {
                ptBR: "Kanban com time-tracking",
                en: "Kanban with time-tracking",
                es: "Kanban con registro de tiempo",
            },
            {
                ptBR: "Diagramas de Gantt",
                en: "Gantt charts",
                es: "Cronogramas de Gantt",
            },
            {
                ptBR: "Painel analítico em tempo real",
                en: "Real-time analytics",
                es: "Analíticas en tiempo real",
            },
            {
                ptBR: "Multi-workspace com permissões",
                en: "Multi-workspace permissions",
                es: "Multi-espacios con permisos",
            },
        ],
        url: "/dashboard",
        external: false,
        nameStatic: true,
        cta: {
            ptBR: "Abrir produto",
            en: "Open product",
            es: "Abrir producto",
        },
    },
    {
        img: "/img/projects/teleprompt.webp",
        badge: "SaaS",
        icon: MonitorPlay,
        name: {
            ptBR: "Teleprompt",
            en: "Teleprompt",
            es: "Teleprompt",
        },
        tagline: {
            ptBR: "Plataforma para roteiros de vídeo com teleprompter ao vivo: editor estruturado por cenas, rolagem inteligente e espelhos sincronizados.",
            en: "A video-script platform with a live teleprompter: scene-based editor, smart scrolling, and synchronized mirrors.",
            es: "Plataforma para guiones de vídeo con teleprompter en vivo: editor por escenas, desplazamiento inteligente y espejos sincronizados.",
        },
        features: [
            {
                ptBR: "Editor de roteiro por cenas e marcadores",
                en: "Scene-based script editor with cues",
                es: "Editor de guion por escenas y marcas",
            },
            {
                ptBR: "Rolagem inteligente com controle remoto",
                en: "Smart scrolling with remote control",
                es: "Desplazamiento inteligente con control remoto",
            },
            {
                ptBR: "Espelhos sincronizados (operador + gravação)",
                en: "Synchronized mirrors (operator + recording)",
                es: "Espejos sincronizados (operador + grabación)",
            },
            {
                ptBR: "Controle por acessibilidade e pronúncia",
                en: "Accessibility cues and pronunciation panel",
                es: "Accesibilidad y panel de pronunciación",
            },
        ],
        url: "/teleprompt",
        external: false,
        nameStatic: true,
        cta: {
            ptBR: "Escolher versão",
            en: "Choose version",
            es: "Elegir versión",
        },
    },
];

const socials: Array<{
    icon: IconType;
    href: string;
    label: string;
    hint?: Localized;
    hintStatic?: string;
}> = [
    {
        icon: WhatsappIcon,
        href: "https://wa.me/5511982101630",
        label: "WhatsApp",
        hint: {
            ptBR: "Resposta rápida em horário comercial",
            en: "Fast reply during business hours",
            es: "Respuesta rápida en horario comercial",
        },
    },
    {
        icon: Mail,
        href: "mailto:zecki1@hotmail.com",
        label: "E-mail",
        hintStatic: "zecki1@hotmail.com",
    },
    {
        icon: Github,
        href: "https://github.com/zecki1",
        label: "GitHub",
        hint: {
            ptBR: "Código, projetos e experimentos",
            en: "Code, projects and experiments",
            es: "Código, proyectos y experimentos",
        },
    },
    {
        icon: Linkedin,
        href: "https://linkedin.com/in/zecki1",
        label: "LinkedIn",
        hint: {
            ptBR: "Carreira e conexões profissionais",
            en: "Career and professional connections",
            es: "Carrera y conexiones profesionales",
        },
    },
];

const services = [
    {
        icon: Smartphone,
        title: {
            ptBR: "Desenvolvimento Mobile-First",
            en: "Mobile-First Development",
            es: "Desarrollo Mobile-First",
        },
        description: {
            ptBR: "Sites e apps otimizados para dispositivos móveis, com carregamento rápido, navegação fluida e design responsivo.",
            en: "Sites and apps optimized for mobile devices, with fast loading, smooth navigation, and responsive design.",
            es: "Sitios y apps optimizados para móviles, con carga rápida, navegación fluida y diseño responsive.",
        },
    },
    {
        icon: Search,
        title: {
            ptBR: "Otimização de SEO",
            en: "SEO Optimization",
            es: "Optimización SEO",
        },
        description: {
            ptBR: "SEO técnico e de conteúdo para o site ser encontrado no Google, maximizando visibilidade e cliques.",
            en: "Technical and content SEO so your site is found on Google, maximizing visibility and clicks.",
            es: "SEO técnico y de contenido para que tu sitio aparezca en Google, maximizando visibilidad y clics.",
        },
    },
    {
        icon: Accessibility,
        title: {
            ptBR: "Acessibilidade Digital",
            en: "Digital Accessibility",
            es: "Accesibilidad Digital",
        },
        description: {
            ptBR: "Interfaces acessíveis (WCAG 2.1) para que qualquer pessoa use seu produto, tornando o projeto inclusivo de verdade.",
            en: "Accessible interfaces (WCAG 2.1) so anyone can use your product, making the project truly inclusive.",
            es: "Interfaces accesibles (WCAG 2.1) para que cualquiera pueda usar tu producto, haciendo el proyecto realmente inclusivo.",
        },
    },
    {
        icon: UserCheck,
        title: {
            ptBR: "Usabilidade e UX",
            en: "Usability & UX",
            es: "Usabilidad y UX",
        },
        description: {
            ptBR: "Interfaces intuitivas, fluxos simples e CTAs claros — projetados para converter visitantes em clientes.",
            en: "Intuitive interfaces, simple flows, and clear CTAs — designed to turn visitors into customers.",
            es: "Interfaces intuitivas, flujos simples y CTAs claros, diseñados para convertir visitantes en clientes.",
        },
    },
    {
        icon: GanttChartSquare,
        title: {
            ptBR: "Sistemas e Gerenciadores",
            en: "Custom Systems & Managers",
            es: "Sistemas y Gestores a Medida",
        },
        description: {
            ptBR: "Ferramentas sob medida para gerenciar projetos, tarefas e regras de negócio — como o meu próprio Dashboard e o Teleprompt.",
            en: "Custom tools to manage projects, tasks, and business rules — like my own Dashboard and Teleprompt.",
            es: "Herramientas a medida para gestionar proyectos, tareas y reglas de negocio, como mi propio Dashboard y Teleprompt.",
        },
    },
    {
        icon: Rocket,
        title: {
            ptBR: "Performance e Escalabilidade",
            en: "Performance & Scalability",
            es: "Rendimiento y Escalabilidad",
        },
        description: {
            ptBR: "Código limpo e otimizado, pronto para crescer com o negócio — velocidade e suporte a picos de tráfego.",
            en: "Clean, optimized code, ready to grow with your business — speed and support for traffic spikes.",
            es: "Código limpio y optimizado, listo para crecer con tu negocio, con velocidad y soporte para picos de tráfico.",
        },
    },
];

function ProductCard({
    product,
    lang,
}: {
    product: {
        img: string;
        badge: string;
        icon: IconType;
        name: Localized;
        nameStatic?: boolean;
        tagline: Localized;
        features: Localized[];
        url: string;
        external: boolean;
        cta: Localized;
    };
    lang: Locale;
}) {
    return (
        <div className="product-card group overflow-hidden rounded-2xl border border-white/10 dark:border-border/50 text-glass-light flex flex-col transition-colors duration-300 hover:border-primary/50 bg-background">
            <div className="relative w-full overflow-hidden bg-background">
                <ProductImage src={product.img} alt={`${product.name.ptBR} — ${product.name.en}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
                <span className="absolute left-4 top-4 rounded-full border border-cyan-300/40 bg-black/60 px-3 py-1 text-xs font-bold tracking-widest text-cyan-300 uppercase backdrop-blur">
                    {product.badge}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur text-white">
                        <product.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white drop-shadow">
                        {pick(lang, product.name)}
                    </h3>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                <p className="text-lg text-white/90 dark:text-muted-foreground">
                    {pick(lang, product.tagline)}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, featureIndex) => (
                        <li
                            key={featureIndex}
                            className="flex items-start gap-2 text-white/90 dark:text-muted-foreground"
                        >
                            <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                            <span className="text-sm">{pick(lang, feature)}</span>
                        </li>
                    ))}
                </ul>
                <Button
                    asChild
                    size="lg"
                    className="mt-auto w-full rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300"
                >
                    <Link
                        href={product.url}
                        prefetch={false}
                        target={product.external ? "_blank" : undefined}
                        rel={product.external ? "noopener noreferrer" : undefined}
                    >
                        <span>{pick(lang, product.cta)}</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

function SectionTag({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-bold text-cyan-400 mb-4">
            <Sparkles className="h-4 w-4" />
            {children}
        </span>
    );
}

export default async function HomeContent() {
    const lang = await getLang();

    return (
        <div id="home-page">
            {/* HERO */}
            <section
                id="inicio"
                className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-slate-950 py-16 text-white md:py-24"
            >
                <HomeFX />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3)_0%,rgba(2,6,23,0.85)_100%)]"
                ></div>
                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center">
                    <span className="hero-anim mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                        </span>
                        {pick(lang, {
                            ptBR: "Disponível para novos projetos",
                            en: "Available for new projects",
                            es: "Disponible para nuevos proyectos",
                        })}
                    </span>
                    <h1 className="hero-anim text-4xl font-bold text-white md:text-6xl lg:text-7xl" style={{ "--hero-delay": "0.23s" } as CSSProperties}>
                        Ezequiel Regino Monção
                    </h1>
                    <h2 className="hero-anim mt-4 text-2xl font-bold text-cyan-400 md:text-3xl lg:text-4xl" style={{ "--hero-delay": "0.31s" } as CSSProperties}>
                        {pick(lang, {
                            ptBR: "Desenvolvedor Full-Stack & Designer",
                            en: "Full-Stack Developer & Designer",
                            es: "Desarrollador Full-Stack y Diseñador",
                        })}
                    </h2>
                    <p className="hero-anim mt-6 max-w-2xl text-lg text-slate-300 md:text-xl" style={{ "--hero-delay": "0.39s" as const } as CSSProperties}>
                        {pick(lang, {
                            ptBR: "Projetos digitais de ponta a ponta: sites, painéis CMS e aplicações sob medida com performance, acessibilidade e design que convertem.",
                            en: "End-to-end digital products: websites, CMS panels, and custom applications with performance, accessibility, and design that converts.",
                            es: "Productos digitales de principio a fin: sitios, paneles CMS y aplicaciones a medida con rendimiento, accesibilidad y diseño que convierte.",
                        })}
                    </p>

                    <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4" style={{ "--hero-delay": "0.5s" } as CSSProperties}>
                        <Button
                            asChild
                            size="lg"
                            className="magnetic rounded-full px-6 py-4 text-base shadow-lg hover:shadow-primary/50 transition-[box-shadow,color,background-color,border-color] duration-300 md:px-8 md:py-6 md:text-lg"
                        >
                            <Link href="#produtos">
                                <Briefcase className="mr-2 h-5 w-5" />
                                {pick(lang, {
                                    ptBR: "Ver meus trabalhos",
                                    en: "See my work",
                                    es: "Ver mis trabajos",
                                })}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="magnetic rounded-full border-white/25 bg-white/5 px-6 py-4 text-base text-white hover:bg-white/10 hover:text-[#00e1ff] transition-[color,background-color,border-color] duration-300 md:px-8 md:py-6 md:text-lg"
                        >
                            <Link href="#contato">
                                {pick(lang, {
                                    ptBR: "Solicitar proposta",
                                    en: "Request a proposal",
                                    es: "Solicitar propuesta",
                                })}
                            </Link>
                        </Button>
                    </div>

                    <div className="hero-cta mt-8 flex items-center justify-center gap-3" style={{ "--hero-delay": "0.6s" } as CSSProperties}>
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:border-cyan-400 hover:text-cyan-400"
                            >
                                <social.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <a
                    href="#produtos"
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cyan-400 transition-opacity hover:opacity-70"
                    aria-label={pick(lang, {
                        ptBR: "Ver trabalhos",
                        en: "See works",
                        es: "Ver trabajos",
                    })}
                >
                    <ChevronDown className="h-10 w-10 animate-bounce" />
                </a>
            </section>

            {/* FAIXA DE SKILLS */}
            <div className="relative z-10 border-y border-border/50 py-6">
                <SkillsMarquee
                    skills={skills}
                    skillClassName="border-cyan-400/40 dark:border-cyan-400/30 dark:bg-black/30"
                />
            </div>

            {/* NAVEGAÇÃO EM NÍVEIS (estilo game) — oculta no mobile (hambúrguer) */}
            <GameNav
                label={pick(lang, {
                    ptBR: "Navegação por níveis do site",
                    en: "Site level navigation",
                    es: "Navegación por niveles del sitio",
                })}
                items={navSections.map((item) => ({
                    href: item.href,
                    label: pick(lang, item.label),
                }))}
            />

            {/* TRABALHOS E APLICAÇÕES */}
            <section
                id="produtos"
                className="relative scroll-mt-24 px-2 py-16 md:py-24"
            >
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                        <SectionTag>
                            {pick(lang, {
                                ptBR: "Trabalhos e aplicações",
                                en: "Works & Applications",
                                es: "Trabajos y Aplicaciones",
                            })}
                        </SectionTag>
                        <h2 className="text-3xl font-bold md:text-5xl">
                            {pick(lang, {
                                ptBR: "Ferramentas que crio, uso e estão no ar",
                                en: "Tools I build, use, and ship",
                                es: "Herramientas que creo, uso y publico",
                            })}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {pick(lang, {
                                ptBR: "Uma amostra de produtos em produção — para clientes e de uso próprio — todos com a mesma base técnica.",
                                en: "A sample of products in production — for clients and my own use — all built on the same technical foundation.",
                                es: "Una muestra de productos en producción — para clientes y de uso propio — todos con la misma base técnica.",
                            })}
                        </p>
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Briefcase className="h-5 w-5" />
                        </span>
                        <h3 className="text-xl font-bold">
                            {pick(lang, {
                                ptBR: "Para clientes",
                                en: "For clients",
                                es: "Para clientes",
                            })}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {clientWorks.map((product, index) => (
                            <ProductCard key={index} product={product} lang={lang} />
                        ))}
                    </div>

                    <div className="mb-8 mt-16 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Rocket className="h-5 w-5" />
                        </span>
                        <h3 className="text-xl font-bold">
                            {pick(lang, {
                                ptBR: "Aplicações próprias",
                                en: "My own applications",
                                es: "Aplicaciones propias",
                            })}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {ownApps.map((product, index) => (
                            <ProductCard key={index} product={product} lang={lang} />
                        ))}
                    </div>
                </div>
            </section>

            {/* O QUE EU FAÇO */}
            <section
                id="servicos"
                className="relative scroll-mt-24 px-2 py-16 md:py-24 bg-muted/30"
            >
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                        <SectionTag>
                            {pick(lang, {
                                ptBR: "O que eu faço",
                                en: "What I Do",
                                es: "Lo Que Hago",
                            })}
                        </SectionTag>
                        <h2 className="text-3xl font-bold md:text-5xl">
                            {pick(lang, {
                                ptBR: "Do briefing ao deploy, entrego o projeto completo",
                                en: "From briefing to deployment, I deliver the complete project",
                                es: "Del briefing al despliegue, entrego el proyecto completo",
                            })}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {pick(lang, {
                                ptBR: "Front-end, back-end, design de interfaces, acessibilidade e infraestrutura — tudo em um só lugar.",
                                en: "Front-end, back-end, interface design, accessibility, and infrastructure — all in one place.",
                                es: "Front-end, back-end, diseño de interfaces, accesibilidad e infraestructura — todo en un solo lugar.",
                            })}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-card p-8 rounded-xl flex flex-col items-start gap-4 border border-white/10 dark:border-border/50 bg-background"
                            >
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {pick(lang, service.title)}
                                </h3>
                                <p className="text-muted-foreground">
                                    {pick(lang, service.description)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="reveal mt-12 flex justify-center">
                        <Button asChild variant="outline" size="lg" className="rounded-full">
                            <Link href="/servicos">
                                <span>
                                    {pick(lang, {
                                        ptBR: "Ver todos os serviços",
                                        en: "View all services",
                                        es: "Ver todos los servicios",
                                    })}
                                </span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* TECNOLOGIAS */}
            <section
                id="habilidades"
                className="relative scroll-mt-24 px-2 py-16 md:py-24"
            >
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 md:grid-cols-2 md:px-8">
                    <div className="reveal">
                        <SectionTag>
                            {pick(lang, {
                                ptBR: "Stack que impulsiona resultados",
                                en: "The stack behind the results",
                                es: "El stack que impulsa resultados",
                            })}
                        </SectionTag>
                        <h2 className="text-3xl font-bold md:text-4xl">
                            {pick(lang, {
                                ptBR: "Tecnologias escolhidas por necessidade, não por modismo",
                                en: "Technologies chosen by necessity, not by trend",
                                es: "Tecnologías elegidas por necesidad, no por moda",
                            })}
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground">
                            {pick(lang, {
                                ptBR: "Do protótipo no Figma ao front-end com React/Next.js, passando por back-end com .NET, Laravel e Node.js até a orquestração com Docker e o deploy na nuvem.",
                                en: "From Figma prototypes to a React/Next.js front-end, with .NET, Laravel, and Node.js back-ends up to Docker orchestration and cloud deployment.",
                                es: "Del prototipo en Figma al front-end con React/Next.js, pasando por back-ends con .NET, Laravel y Node.js hasta la orquestación con Docker y el despliegue en la nube.",
                            })}
                        </p>
                        <Button asChild variant="outline" size="lg" className="mt-8 rounded-full">
                            <Link href="/curriculo">
                                <span>
                                    {pick(lang, {
                                        ptBR: "Ver currículo completo",
                                        en: "View full résumé",
                                        es: "Ver currículum completo",
                                    })}
                                </span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative hidden h-96 md:flex md:h-[460px] items-center justify-center">
                        {/* A chuva Matrix (TechParticles) é carregada pela is
                            LazyTechParticles quando a seção #habilidades se
                            aproxima — sem react-icons no caminho crítico. */}
                        <LazyTechParticles />
                    </div>
                </div>
            </section>

            {/* CÓDIGO EM DESTAQUE */}
            <section
                id="codigo"
                className="relative scroll-mt-24 bg-muted/30 px-2 py-16 md:py-24"
            >
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="reveal mx-auto mb-14 max-w-3xl text-center">
                        <SectionTag>
                            <Sparkles className="h-4 w-4" />
                            <span>
                                {pick(lang, {
                                    ptBR: "Código em destaque",
                                    en: "Code showcase",
                                    es: "Código destacado",
                                })}
                            </span>
                        </SectionTag>
                        <h2 className="text-3xl font-bold md:text-5xl">
                            {pick(lang, {
                                ptBR: "Os bastidores deste site, em código real",
                                en: "The behind-the-scenes of this site, in real code",
                                es: "El detrás de cámaras de este sitio, en código real",
                            })}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {pick(lang, {
                                ptBR: "Acessibilidade, GSAP e integrações que estão no ar agora — explicados com o arquivo de verdade e o código completo.",
                                en: "Accessibility, GSAP, and integrations that are live right now — explained with the real file and the full code.",
                                es: "Accesibilidad, GSAP e integraciones que están en vivo ahora, explicadas con el archivo real y el código completo.",
                            })}
                        </p>
                    </div>

                    <CodeShowcase lang={lang} />
                </div>
            </section>

            {/* SOBRE + NÚMEROS */}
            <section
                id="sobre"
                className="relative scroll-mt-24 px-2 py-16 md:py-24 bg-muted/30"
            >
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="reveal grid grid-cols-1 gap-8 md:grid-cols-5">
                        <div className="md:col-span-3 p-8 rounded-2xl border border-white/10 dark:border-border/50 bg-background">
                            <SectionTag>
                                {pick(lang, {
                                    ptBR: "Sobre Mim",
                                    en: "About Me",
                                    es: "Sobre Mí",
                                })}
                            </SectionTag>
                            <h2 className="text-2xl font-bold md:text-4xl">
                                {pick(lang, {
                                    ptBR: "Transformo problemas em soluções digitais que geram resultado.",
                                    en: "I turn problems into digital solutions that deliver results.",
                                    es: "Convierto problemas en soluciones digitales que generan resultados.",
                                })}
                            </h2>
                            <p className="mt-6 text-lg text-muted-foreground">
                                {pick(lang, {
                                    ptBR: "Sou desenvolvedor full-stack com mais de 13 anos de experiência. Trabalho lado a lado com cada cliente para entregar muito além de um site bonito: uma ferramenta que cresce com ele.",
                                    en: "I'm a full-stack developer with over 13 years of experience. I work side by side with each client to deliver far beyond a pretty site: a tool that grows with them.",
                                    es: "Soy desarrollador full-stack con más de 13 años de experiencia. Trabajo codo a codo con cada cliente para entregar mucho más que un sitio bonito: una herramienta que crece con él.",
                                })}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                {skills.slice(0, 8).map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <Button
                                asChild
                                size="lg"
                                className="mt-10 rounded-full px-8 py-6 text-lg"
                            >
                                <Link href="/sobre">
                                    <span>
                                        {pick(lang, {
                                            ptBR: "Conheça Minha História",
                                            en: "Know My Story",
                                            es: "Conoce Mi Historia",
                                        })}
                                    </span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="md:col-span-2 grid grid-cols-2 gap-6 md:grid-cols-1">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center gap-2 p-6 text-center rounded-2xl border border-white/10 dark:border-border/50 bg-background"
                                >
                                    <span className="text-4xl font-black text-primary">{stat.value}</span>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {pick(lang, stat.label)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 dark:border-border/50 bg-background p-8 text-center md:flex-row md:gap-8 md:text-left">
                        <Clock className="h-10 w-10 flex-shrink-0 text-primary" />
                        <p className="text-lg text-muted-foreground">
                            {pick(lang, {
                                ptBR: "Disponível para novos projetos. Vamos criar algo incrível juntos?",
                                en: "Available for new projects. Let's build something amazing together?",
                                es: "Disponible para nuevos proyectos. ¿Construyamos algo increíble juntos?",
                            })}
                        </p>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="flex-shrink-0 rounded-full"
                        >
                            <Link href="#contato">
                                {pick(lang, {
                                    ptBR: "Entrar em Contato",
                                    en: "Get in Touch",
                                    es: "Contactar",
                                })}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* JORNADA: ÁRVORE DE EXPERIÊNCIAS, ESTUDOS E HABILIDADES */}
            <section
                id="jornada"
                className="relative scroll-mt-24 px-2 py-16 md:py-24"
            >
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="reveal mx-auto mb-12 max-w-3xl text-center">
                        <SectionTag>
                            {pick(lang, {
                                ptBR: "Minha jornada",
                                en: "My journey",
                                es: "Mi trayectoria",
                            })}
                        </SectionTag>
                        <h2 className="text-3xl font-bold md:text-5xl">
                            {pick(lang, {
                                ptBR: "A árvore de habilidades que cresceu com cada experiência",
                                en: "The skills tree that grew with every experience",
                                es: "El árbol de habilidades que creció con cada experiencia",
                            })}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {pick(lang, {
                                ptBR: "Estudos, experiências e projetos conectados em um fluxograma vivo. Filtre por tipo, toque numa habilidade e veja por onde ela floresceu — da origem até hoje.",
                                en: "Studies, experiences, and projects connected in a living flowchart. Filter by type, tap a skill, and trace where it flourished — from origin to today.",
                                es: "Estudios, experiencias y proyectos conectados en un diagrama de flujo vivo. Filtra por tipo, toca una habilidad y descubre dónde floreció, del origen hasta hoy.",
                            })}
                        </p>
                    </div>
                    <LazyJourney lang={lang} />
                </div>
            </section>

            {/* CONTATO */}
            <section data-cursor="dark" className="relative overflow-hidden py-32 text-center text-white md:py-48">
                <YouTubeBackground videoId="3mRQVJwqvrQ" />
                <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none"></div>
                <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-4">
                    <h2 className="reveal mb-4 max-w-4xl text-4xl font-bold md:text-6xl">
                        {pick(lang, {
                            ptBR: "Vamos tirar sua ideia do papel?",
                            en: "Ready to turn your idea into reality?",
                            es: "¿Listo para sacar tu idea del papel?",
                        })}
                    </h2>
                    <p className="mb-12 max-w-2xl text-lg text-white/90">
                        {pick(lang, {
                            ptBR: "Me chama pelo canal que preferir — respondo rápido e sem enrolação.",
                            en: "Reach out on your favorite channel — I reply fast and cut to the chase.",
                            es: "Escríbeme por el canal que prefieras: respondo rápido y sin rodeos.",
                        })}
                    </p>

                    <div
                        id="contato"
                        className="grid w-full max-w-3xl scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                        {socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-left backdrop-blur transition-colors hover:border-[#00e1ff]/60 hover:bg-white/10"
                            >
                                <div className="p-3 rounded-xl bg-white/10 text-white transition-colors group-hover:bg-[#00e1ff] group-hover:text-black">
                                    <social.icon className="h-7 w-7" />
                                </div>
                                <div>
                                    <span className="block text-lg font-bold">{social.label}</span>
                                    <span className="block text-sm text-white/70">
                                        {social.hintStatic
                                            ? social.hintStatic
                                            : social.hint
                                                ? pick(lang, social.hint)
                                                : null}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    <Button
                        asChild
                        size="lg"
                        className="mt-12 rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                        <Link href="/contato">
                            <span>
                                {pick(lang, {
                                    ptBR: "Solicitar Proposta",
                                    en: "Request a Proposal",
                                    es: "Solicitar Propuesta",
                                })}
                            </span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}