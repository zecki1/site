"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Smartphone,
    Search,
    Accessibility,
    UserCheck,
    GanttChartSquare,
    Rocket,
    Code,
    Brush,
    Users,
    Award,
    Clock,
    CheckCircle2,
    MonitorPlay,
    LayoutDashboard,
    Sparkles,
    Check,
    Mail,
    Github,
    Linkedin,
} from "lucide-react";

import { FaReact, FaWhatsapp } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoNodejs, BiLogoTypescript, BiLogoPhp } from "react-icons/bi";
import { SiLaravel, SiMysql, SiFigma, SiDocker, SiDotnet } from "react-icons/si";
import { DiHtml5, DiCss3 } from "react-icons/di";
import { BsGit } from "react-icons/bs";

import TextTranslator from "@/components/layout/TextTranslator";
import { Button } from "@/components/ui/button";
import { YouTubeBackground } from "@/components/layout/YouTubeBackground";
import TechParticles from "@/components/effects/TechParticles";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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

const techStack = [
    { name: "React", Icon: FaReact },
    { name: "Next.js", Icon: TbBrandNextjs },
    { name: "Node.js", Icon: BiLogoNodejs },
    { name: "TypeScript", Icon: BiLogoTypescript },
    { name: ".NET", Icon: SiDotnet },
    { name: "PHP", Icon: BiLogoPhp },
    { name: "Laravel", Icon: SiLaravel },
    { name: "MySQL", Icon: SiMysql },
    { name: "Figma", Icon: SiFigma },
    { name: "Git", Icon: BsGit },
    { name: "Docker", Icon: SiDocker },
    { name: "HTML5", Icon: DiHtml5 },
    { name: "CSS3", Icon: DiCss3 },
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
        href: "#sobre",
        label: {
            ptBR: "Sobre",
            en: "About",
            es: "Sobre mí",
        },
    },
    {
        href: "#habilidades",
        label: {
            ptBR: "Habilidades",
            en: "Skills",
            es: "Competencias",
        },
    },
    {
        href: "#produtos",
        label: {
            ptBR: "Produtos",
            en: "Products",
            es: "Productos",
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
type IconType = React.ComponentType<{ className?: string }>;

const products: Array<{
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
        img: "/img/projects/cleriston.png",
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
        img: "/img/projects/cms-login.png",
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
            es: "Un panel para gestionar hero, sobre, portafolio y contacto de varios sitios en un solo lugar, con inicio de sesión y publicación con un clic.",
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
                es: "Publicación inmediata en el sitio",
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
    {
        img: "/img/projects/dashboard.png",
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
        img: "/img/projects/teleprompt.png",
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
        icon: FaWhatsapp,
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

function ProductImage({ src, alt }: { src: string; alt: string }) {
    const [errored, setErrored] = useState(false);
    if (errored) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-[#00e1ff]/20 via-background to-[#7f00ff]/20">
                <MonitorPlay className="h-14 w-14 text-primary/70" />
                <span className="px-6 text-center text-sm text-muted-foreground">
                    <TextTranslator>
                        {{
                            ptBR: "Print em breve",
                            en: "Screenshot coming soon",
                            es: "Captura próximamente",
                        }}
                    </TextTranslator>
                </span>
            </div>
        );
    }
    return (
        <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="transition-transform duration-500 group-hover:scale-105"
            onError={() => setErrored(true)}
        />
    );
}

export default function HomeContent() {
    const mainRef = useRef<HTMLDivElement>(null);
    const introSectionRef = useRef<HTMLDivElement>(null);
    const pillarsSectionRef = useRef<HTMLDivElement>(null);
    const servicesSectionRef = useRef<HTMLDivElement>(null);
    const techSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                },
            });
            heroTimeline
                .fromTo(
                    ".hero-title-1",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1 }
                )
                .to(".hero-title-1", { opacity: 0, y: -50, duration: 1 }, "+=1.5");
            gsap.utils.toArray<HTMLElement>(".pillar-item").forEach((pillar) => {
                heroTimeline
                    .fromTo(
                        pillar,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 1 }
                    )
                    .to(pillar, { opacity: 0, y: -50, duration: 1 }, "+=1.5");
            });

            const scrollTriggerConfig = { toggleActions: "play none none none" };
            gsap.from(introSectionRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: introSectionRef.current,
                    start: "top 80%",
                    ...scrollTriggerConfig,
                },
            });
            gsap.from(".pillar-card", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: pillarsSectionRef.current,
                    start: "top 85%",
                    ...scrollTriggerConfig,
                },
            });
            gsap.from(".service-card", {
                opacity: 0,
                scale: 0.95,
                y: 30,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: servicesSectionRef.current,
                    start: "top 80%",
                    ...scrollTriggerConfig,
                },
            });
            gsap.from(".product-card", {
                opacity: 0,
                scale: 0.96,
                y: 30,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#produtos",
                    start: "top 75%",
                    ...scrollTriggerConfig,
                },
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef}>
            {/* SEÇÃO 1: Início */}
            <section id="inicio" className="hero-section relative h-screen w-full overflow-hidden bg-background">
                <div className="relative z-20 flex h-full w-full items-center justify-center text-center">
                    <div className="hero-title-1 absolute inset-0 flex flex-col justify-center items-center px-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            Ezequiel Regino Monção
                        </h1>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-400 mt-4">
                            <TextTranslator>
                                {{
                                    ptBR: "Desenvolvedor Full-Stack & Designer",
                                    en: "Full-Stack Developer & Designer",
                                    es: "Desarrollador Full-Stack y Diseñador",
                                }}
                            </TextTranslator>
                        </h2>
                    </div>
                    {[
                        {
                            icon: Code,
                            title: {
                                ptBR: "Desenvolvimento de Ponta",
                                en: "Cutting-Edge Development",
                                es: "Desarrollo de Vanguardia",
                            },
                        },
                        {
                            icon: Brush,
                            title: {
                                ptBR: "Design Centrado no Usuário",
                                en: "User-Centered Design",
                                es: "Diseño Centrado en el Usuario",
                            },
                        },
                        {
                            icon: Users,
                            title: {
                                ptBR: "Liderança e Visão Técnica",
                                en: "Leadership and Technical Vision",
                                es: "Liderazgo y Visión Técnica",
                            },
                        },
                    ].map((pillar, index) => (
                        <div
                            key={index}
                            className="pillar-item absolute inset-0 flex flex-col justify-center items-center px-4 opacity-0"
                        >
                            <pillar.icon className="h-16 w-16 text-cyan-400 mb-6" />
                            <h3 className="text-3xl md:text-5xl font-bold max-w-3xl">
                                <TextTranslator>{pillar.title}</TextTranslator>
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* SEÇÃO 1.5: Navegação da página */}
            <nav className="relative z-10 -mt-16 mb-0 flex justify-center px-4">
                <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-primary/30 bg-background/80 px-4 py-3 backdrop-blur-md shadow-lg">
                    {navSections.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                            <TextTranslator>{item.label}</TextTranslator>
                        </a>
                    ))}
                </div>
            </nav>

            {/* Seção 2: Introdução */}
            <section
                ref={introSectionRef}
                className="relative flex items-center justify-center min-h-screen py-24 md:py-32"
            >
                <div className="u-container text-center max-w-4xl mx-auto py-10 text-glass-light rounded-2xl px-6 md:px-10">
                    <p className="text-xl md:text-2xl text-white/90 dark:text-muted-foreground mb-8">
                        <TextTranslator>
                            {{
                                ptBR: "Você não precisa de mais um template genérico. Precisa de um desenvolvedor que entenda o projeto do início ao fim.",
                                en: "You don't need yet another generic template. You need a developer who understands the whole project from start to finish.",
                                es: "No necesitas otra plantilla genérica. Necesitas un desarrollador que entienda el proyecto de principio a fin.",
                            }}
                        </TextTranslator>
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-400 via-[#00e1ff] to-blue-400 bg-clip-text text-transparent animate-gradient-loop">
                        <TextTranslator>
                            {{
                                ptBR: "Desenvolvo produtos digitais de ponta a ponta",
                                en: "I build digital products end to end",
                                es: "Construyo productos digitales de principio a fin",
                            }}
                        </TextTranslator>
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 dark:text-muted-foreground">
                        <TextTranslator>
                            {{
                                ptBR: "Sou full-stack: crio a experiência no front-end, projeto a arquitetura no back-end e cuido da infraestrutura até o deploy. Em cada entrega, SEO, acessibilidade e performance já nascem junto com o código — não são adicionados depois.",
                                en: "I'm a full-stack developer: I craft the front-end experience, design the back-end architecture, and handle the infrastructure up to deployment. In every delivery, SEO, accessibility, and performance are born with the code — not bolted on later.",
                                es: "Soy full-stack: creo la experiencia en el front-end, diseño la arquitectura del back-end y me encargo de la infraestructura hasta el despliegue. En cada entrega, SEO, accesibilidad y rendimiento nacen con el código, no se agregan después.",
                            }}
                        </TextTranslator>
                    </p>
                </div>
            </section>

            {/* Seção 3: Pilares */}
            <section
                ref={pillarsSectionRef}
                className="relative py-24 md:py-32 bg-muted/30 px-2"
            >
                <div className="u-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                ptBR: "Clareza, Não Sobrecarga",
                                en: "Clarity, Not Overload",
                                es: "Claridad, No Sobrecarga",
                            },
                            {
                                ptBR: "Soluções, Não Remendos",
                                en: "Solutions, Not Patches",
                                es: "Soluciones, No Arreglos",
                            },
                            {
                                ptBR: "Resultados, Não Promessas",
                                en: "Results, Not Promises",
                                es: "Resultados, No Promesas",
                            },
                        ].map((pillar, index) => (
                            <div
                                key={index}
                                className="pillar-card text-center p-8 bg-background rounded-lg shadow-sm"
                            >
                                <h3 className="text-2xl font-bold text-primary">
                                    <TextTranslator>{pillar}</TextTranslator>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 4: Sobre mim */}
            <section
                id="sobre"
                className="relative py-24 md:py-32 px-2"
            >
                <div className="u-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="text-glass-light rounded-2xl p-6 md:p-10">
                            <p className="text-sm font-semibold uppercase tracking-widest text-white dark:text-primary mb-3">
                                <TextTranslator>
                                    {{
                                        ptBR: "Sobre Mim",
                                        en: "About Me",
                                        es: "Sobre Mí",
                                    }}
                                </TextTranslator>
                            </p>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white dark:text-foreground">
                                <TextTranslator>
                                    {{
                                        ptBR: "Transformo problemas em soluções digitais que geram resultado.",
                                        en: "I turn problems into digital solutions that deliver results.",
                                        es: "Convierto problemas en soluciones digitales que generan resultados.",
                                    }}
                                </TextTranslator>
                            </h2>
                            <p className="text-lg text-white/90 dark:text-muted-foreground mb-6">
                                <TextTranslator>
                                    {{
                                        ptBR: "Sou desenvolvedor full-stack com mais de 13 anos de experiência, especializado em construir sites e aplicações rápidas, acessíveis e otimizadas para conversão. Trabalho lado a lado com cada cliente para entender o negócio e entregar muito além de um site bonito: entrego uma ferramenta que cresce com você.",
                                        en: "I'm a full-stack developer with over 13 years of experience, specialized in building fast, accessible, conversion-optimized websites and applications. I work side by side with each client to understand the business and deliver far beyond a pretty site: a tool that grows with you.",
                                        es: "Soy desarrollador full-stack con más de 13 años de experiencia, especializado en construir sitios y aplicaciones rápidos, accesibles y optimizados para la conversión. Trabajo codo a codo con cada cliente para entender el negocio y entregar mucho más que un sitio bonito: una herramienta que crece contigo.",
                                    }}
                                </TextTranslator>
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {skills.map((skill) => (
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
                                className="rounded-full text-lg px-8 py-6"
                            >
                                <Link href="/sobre">
                                    <span>
                                        <TextTranslator>
                                            {{
                                                ptBR: "Conheça Minha História",
                                                en: "Know My Story",
                                                es: "Conoce Mi Historia",
                                            }}
                                        </TextTranslator>
                                    </span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Award,
                                    stat: stats[0],
                                },
                                {
                                    icon: CheckCircle2,
                                    stat: stats[1],
                                },
                                {
                                    icon: Smartphone,
                                    stat: stats[2],
                                },
                                {
                                    icon: Accessibility,
                                    stat: stats[3],
                                },
                            ].map(({ icon: StatIcon, stat }, index) => (
                                <div
                                    key={index}
                                    className="p-8 text-glass-light rounded-2xl text-center flex flex-col items-center justify-center gap-3 border border-white/10 dark:border-border/50"
                                >
                                    <div className="p-3 bg-white/10 dark:bg-primary/10 rounded-xl text-white dark:text-primary">
                                        <StatIcon className="h-8 w-8" />
                                    </div>
                                    <span className="text-4xl font-black text-white dark:text-primary">{stat.value}</span>
                                    <span className="text-sm text-white/80 dark:text-muted-foreground font-medium">
                                        <TextTranslator>{stat.label}</TextTranslator>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col items-center justify-center gap-4 rounded-2xl border text-glass-light p-8 text-center md:flex-row md:gap-8 md:text-left border-white/10 dark:border-border/50">
                        <Clock className="h-10 w-10 text-white dark:text-primary flex-shrink-0" />
                        <p className="text-lg text-white/90 dark:text-muted-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Disponível para novos projetos. Vamos criar algo incrível juntos?",
                                    en: "Available for new projects. Let's build something amazing together?",
                                    es: "Disponible para nuevos proyectos. ¿Construyamos algo increíble juntos?",
                                }}
                            </TextTranslator>
                        </p>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="rounded-full flex-shrink-0 text-white border-white/40 hover:bg-white/10 hover:text-white dark:text-foreground dark:border-input dark:hover:bg-accent dark:hover:text-accent-foreground"
                        >
                            <Link href="#contato">
                                <TextTranslator>
                                    {{
                                        ptBR: "Entrar em Contato",
                                        en: "Get in Touch",
                                        es: "Contactar",
                                    }}
                                </TextTranslator>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Seção 5: O que eu faço */}
            <section
                ref={servicesSectionRef}
                id="habilidades"
                className="relative py-24 md:py-32 px-2 backdrop-blur"
            >
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16 text-glass-light rounded-2xl p-6 md:p-8">
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-bold text-cyan-400 mb-4">
                            <Sparkles className="h-4 w-4" />
                            <TextTranslator>
                                {{
                                    ptBR: "O que eu faço",
                                    en: "What I Do",
                                    es: "Lo Que Hago",
                                }}
                            </TextTranslator>
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Habilidades que aplico em cada entrega",
                                    en: "Skills I apply to every delivery",
                                    es: "Habilidades que aplico en cada entrega",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-white/90 dark:text-muted-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Do briefing ao deploy: front-end, back-end, design de interfaces, acessibilidade e infraestrutura.",
                                    en: "From briefing to deployment: front-end, back-end, interface design, accessibility, and infrastructure.",
                                    es: "Del briefing al despliegue: front-end, back-end, diseño de interfaces, accesibilidad e infraestructura.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
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
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="service-card p-8 text-glass-light rounded-xl flex flex-col items-start gap-4 border border-white/10 dark:border-transparent"
                            >
                                <div className="p-3 bg-white/10 dark:bg-primary/10 rounded-lg text-white dark:text-primary">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white dark:text-foreground">
                                    <TextTranslator>{service.title}</TextTranslator>
                                </h3>
                                <p className="text-white/90 dark:text-muted-foreground">
                                    <TextTranslator>{service.description}</TextTranslator>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 6: Produtos com prints */}
            <section
                id="produtos"
                className="relative py-24 md:py-32 px-2 backdrop-blur bg-muted/40"
            >
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16 text-glass-light rounded-2xl p-6 md:p-8">
                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-bold text-cyan-400 mb-4">
                            <Sparkles className="h-4 w-4" />
                            <TextTranslator>
                                {{
                                    ptBR: "Produtos e projetos",
                                    en: "Products & Projects",
                                    es: "Productos y Proyectos",
                                }}
                            </TextTranslator>
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white dark:text-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Ferramentas que crio, uso e estão no ar",
                                    en: "Tools I build, use and ship",
                                    es: "Herramientas que creo, uso y publico",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-white/90 dark:text-muted-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Uma amostra de produtos em produção — sites institucionais, painel CMS, sistema de gestão e teleprompter — todos com a mesma base técnica.",
                                    en: "A sample of products in production — institutional sites, a CMS panel, a management system, and a teleprompter — all built on the same technical foundation.",
                                    es: "Una muestra de productos en producción: sitios institucionales, panel CMS, sistema de gestión y teleprompter, todos con la misma base técnica.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="product-card group overflow-hidden rounded-2xl border border-white/10 dark:border-border/50 text-glass-light flex flex-col transition-colors duration-300 hover:border-primary/50"
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-background">
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
                                            <TextTranslator ignoreCheck={product.nameStatic}>{product.name}</TextTranslator>
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                                    <p className="text-lg text-white/90 dark:text-muted-foreground">
                                        <TextTranslator>{product.tagline}</TextTranslator>
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {product.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start gap-2 text-white/90 dark:text-muted-foreground"
                                            >
                                                <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                                                <span className="text-sm">
                                                    <TextTranslator>{feature}</TextTranslator>
                                                </span>
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
                                            target={product.external ? "_blank" : undefined}
                                            rel={product.external ? "noopener noreferrer" : undefined}
                                        >
                                            <span>
                                                <TextTranslator>{product.cta}</TextTranslator>
                                            </span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEÇÃO 7: Tecnologias */}
            <section
                ref={techSectionRef}
                className="relative py-24 md:py-48 container mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-background backdrop-blur">
                    <div className="text-content px-2 text-glass-light rounded-2xl p-6 md:p-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Stack que impulsiona resultados",
                                    en: "The stack behind the results",
                                    es: "El stack que impulsa resultados",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-white/90 dark:text-muted-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Do protótipo no Figma ao front-end com React/Next.js, passando por back-end com .NET, Laravel e Node.js até a orquestração com Docker e o deploy na nuvem — cada tecnologia é escolhida por necessidade, não por modismo.",
                                    en: "From Figma prototypes to a React/Next.js front-end, with .NET, Laravel, and Node.js back-ends up to Docker orchestration and cloud deployment — every technology is chosen by necessity, not by trend.",
                                    es: "Del prototipo en Figma al front-end con React/Next.js, pasando por back-ends con .NET, Laravel y Node.js hasta la orquestación con Docker y el despliegue en la nube: cada tecnología se elige por necesidad, no por moda.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                    <div className="relative h-96 md:h-[500px] items-center justify-center hidden md:flex">
                        <TechParticles techStack={techStack} />
                    </div>
                </div>
            </section>

            {/* SEÇÃO 8: Contato */}
            <section data-cursor="dark" className="py-32 md:py-48 relative text-center text-white overflow-hidden">
                <YouTubeBackground videoId="3mRQVJwqvrQ" />
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
                <div className="u-container relative z-20 flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-4">
                        <TextTranslator>
                            {{
                                ptBR: "Vamos tirar sua ideia do papel?",
                                en: "Ready to turn your idea into reality?",
                                es: "¿Listo para sacar tu idea del papel?",
                            }}
                        </TextTranslator>
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mb-12">
                        <TextTranslator>
                            {{
                                ptBR: "Me chama pelo canal que preferir — respondo rápido e sem enrolação.",
                                en: "Reach out on your favorite channel — I reply fast and cut to the chase.",
                                es: "Escríbeme por el canal que prefieras: respondo rápido y sin rodeos.",
                            }}
                        </TextTranslator>
                    </p>

                    <div id="contato" className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
                        {socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-left backdrop-blur transition-colors hover:border-primary/60 hover:bg-white/10"
                            >
                                <div className="p-3 rounded-xl bg-white/10 text-white transition-colors group-hover:bg-primary group-hover:text-white">
                                    <social.icon className="h-7 w-7" />
                                </div>
                                <div>
                                    <span className="block font-bold text-lg">{social.label}</span>
                                    <span className="block text-white/70 text-sm">
                                        {social.hintStatic
                                            ? social.hintStatic
                                            : social.hint
                                              ? (
                                                    <TextTranslator>{social.hint}</TextTranslator>
                                                )
                                              : null}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    <Button
                        asChild
                        size="lg"
                        className="mt-12 rounded-full text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                        <Link href="/contato">
                            <span>
                                <TextTranslator>
                                    {{
                                        ptBR: "Solicitar Proposta",
                                        en: "Request a Proposal",
                                        es: "Solicitar Propuesta",
                                    }}
                                </TextTranslator>
                            </span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}