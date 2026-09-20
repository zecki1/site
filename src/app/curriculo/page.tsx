"use client";

import { useEffect, useRef } from "react";
import {
    Mail,
    Phone,
    Github,
    Linkedin,
    Globe,
    Briefcase,
    Shield,
    Rocket,
    Bot,
    Award,
    GraduationCap,
    BadgeCheck,
    Languages,
    MapPin,
    Download,
    FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TextTranslator from "@/components/layout/TextTranslator";

type GsapContextType = ReturnType<typeof import("gsap").default["context"]>;

const experience = [
    {
        role: "Desenvolvedor Fullstack",
        company: "SENAI São Paulo",
        period: "2023 - Presente",
        bullets: [
            "Desenvolvimento fullstack de aplicações web em React, Next.js e Angular (incluindo Teleprompt) que atendem internamente o ecossistema EAD do SENAI.",
            "Construção de APIs RESTful (Java/Spring Boot, Node.js) com autenticação JWT, isolamento por workspace e tratamento de erros.",
            "Implementação de microsserviços com Docker, pipelines CI/CD (GitHub Actions) e deploy automatizado (Vercel / cloud).",
            "Cloud: infraestrutura corporativa Microsoft Azure (Azure Media Services — streaming HLS/DASH) e Google Cloud Platform (VM e2-micro com Docker Compose + nginx para hosting de APIs .NET, certbot HTTPS).",
            "Criação de Design System no Figma com design tokens e componentes reutilizáveis — redução de 40% no tempo de desenvolvimento.",
            "Testes unitários (Jest, 80% cobertura) e E2E (Cypress); acessibilidade WCAG 2.1 (AA/AAA); performance (SSR, lazy loading, Core Web Vitals).",
            "Monitoramento com Datadog e Dynatrace; code review, refatoração e mentoria; iniciativas com IA Autônoma (Spec Driven Development).",
        ],
    },
    {
        role: "Desenvolvedor Web",
        company: "SENAI São Paulo",
        period: "2019 - 2023",
        extra: "Admitido out/2019 (parceria Real Parceria) — efetivado ago/2020; promovido a Desenvolvedor Fullstack em 2023.",
        bullets: [
            "Interfaces web com HTML5, CSS3/SCSS, JavaScript, TypeScript, React, Next.js e Angular; componentes reutilizáveis, responsividade e abordagem mobile-first.",
            "Integração com APIs REST, versionamento com Git em ambiente colaborativo; acessibilidade (semântica, contraste, teclado) e performance (lazy loading).",
        ],
    },
    {
        role: "Desenvolvedor Full Stack & Designer",
        company: "GALL / Cia Sex",
        period: "2017 - 2020",
        bullets: [
            "Full stack com Laravel, PHP, Python, Node.js e bancos SQL; Java Spring para APIs e integrações.",
            "Interfaces web, SEO técnico, CRO para landing pages de alta conversão.",
        ],
    },
];

const skillGroups = [
    {
        title: "Frontend",
        items: "Angular 15+, React 19, Next.js, TypeScript, HTML5, SCSS, Tailwind CSS, Radix UI / Shadcn UI, Design Systems (Figma), WCAG 2.1 AA/AAA, responsividade",
    },
    {
        title: "Backend",
        items: "Java 17+, Spring Boot, Node.js, APIs RESTful, Microsserviços, JWT, SQL",
    },
    {
        title: "Cloud & Infra",
        items: "Azure (Media Services), AWS (S3, CloudFront, Lambda, API Gateway), Google Cloud Platform (VM e2-micro, Docker Compose, nginx, certbot), Docker, Kubernetes, IaC",
    },
    {
        title: "Testes & Build",
        items: "Jest, Vitest, Jasmine, Karma, Cypress (E2E), 80% cobertura mínima, Webpack, Vite, Turbopack, code splitting, lazy loading, SSR/SSG/ISR, Core Web Vitals",
    },
    {
        title: "CI/CD & Observabilidade",
        items: "Git, GitHub Actions, Vercel, pipelines automatizados, Datadog, Grafana, Dynatrace, Microsoft Clarity",
    },
    {
        title: "IA Aplicada",
        items: "Claude Code, Model Context Protocol (MCP), Spec Driven Development — certificado Anthropic",
    },
];

const education = [
    { degree: "Pós-Graduação — Desenvolvimento Full Stack", institution: "Descomplica", period: "out/2025 - mar/2026" },
    { degree: "Bacharelado em Engenharia de Computação", institution: "UNIVESP", period: "2017 - 2022" },
    { degree: "Graduação em Design Gráfico", institution: "UNIP", period: "2019 - 2021" },
    { degree: "Técnico em Web Design — 324 horas", institution: "Microcamp", period: "2012 - 2015" },
];

const certifications = [
    "Claude 101",
    "Building with the Claude API",
    "Claude Code in Action",
    "AI Fluency Framework & Foundations",
    "Introduction to Model Context Protocol (MCP)",
    "MCP: Advanced Topics",
    "Introduction to Agent Skills",
];

const projectsPersonal = [
    {
        name: "Zecki Dashboard",
        desc: "SaaS de produtividade: tarefas, métricas em tempo real, gráficos (Recharts), autenticação. 3 versões: Angular 15 (piloto) → React → Next.js com ISR.",
        url: "https://zecki1.com.br/dashboard",
        linkLabel: "zecki1.com.br/dashboard",
    },
    {
        name: "Teleprompt B2B",
        desc: "Plataforma de roteiros e teleprompter (multi-tenant). 3 frontends (Next.js SSR + 2 Angulares SPA em 2 versões) consomem API única .NET (Clean Architecture) com JWT, isolamento por workspace, SignalR (tempo real) e Docker/GCP.",
        url: "https://zecki1.com.br/teleprompt",
        linkLabel: "zecki1.com.br/teleprompt",
    },
    {
        name: "CMS Multi-Site Headless",
        desc: "ISR, edição em tempo real, design system compartilhado entre múltiplos sites.",
        url: "https://zecki1.com.br/login",
        linkLabel: "zecki1.com.br/login",
    },
];

const unitTestAnalysis = [
    "Testes unitários (Jest, Vitest, Jasmine + Karma) como ferramenta de análise de qualidade: cada teste é uma especificação executável do comportamento esperado do sistema.",
    "Cobertura mínima de 80% (linhas e branches) integrada ao pipeline de CI — merge bloqueado sem atingir o limite, tornando a análise contínua e não pontual.",
    "Detecção de regressões antes de chegar a produção: alterações em regras de negócio passam pela análise dos testes afetados antes do deploy.",
    "Refatoração segura: a suíte de testes funciona como rede de segurança para reestruturar código legado ou novo, validando comportamento em vez de implementação.",
    "Testes como documentação: cenários nomeados descrevem o que o sistema deve fazer, facilitando a análise de requisitos e o on-boarding do time.",
    "E2E (Cypress) nos fluxos críticos, complementando a análise unitária com a perspectiva do usuário final.",
    "IA Autônoma usada apenas na geração e padronização da massa de testes (lado máquina); a definição dos cenários, a análise de cobertura e a revisão das entregas são curadoria humana.",
];

const headerContact = [
    { icon: MapPin, label: "São Paulo - SP · Dispo.: Imediata · Home Office" },
    { icon: Phone, href: "tel:+5511982101630", label: "+55 11 98210-1630" },
    { icon: Mail, href: "mailto:zecki1@hotmail.com", label: "zecki1@hotmail.com" },
    { icon: Linkedin, href: "https://linkedin.com/in/zecki1", external: true, label: "linkedin.com/in/zecki1" },
    { icon: Github, href: "https://github.com/zecki1", external: true, label: "github.com/zecki1" },
    { icon: Globe, href: "https://zecki1.com.br", external: true, label: "zecki1.com.br" },
];

export default function ResumePage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: GsapContextType | null = null;
        let cancelled = false;

        const run = () => {
            if (cancelled) return;
            void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, scrollMod]) => {
                if (cancelled) return;
                const gsap = (gsapMod.default ?? gsapMod) as unknown as typeof import("gsap").default;
                const { ScrollTrigger } = scrollMod as typeof import("gsap/ScrollTrigger");
                gsap.registerPlugin(ScrollTrigger);

                ctx = gsap.context(() => {
                    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
                        gsap.fromTo(
                            el,
                            { opacity: 0, y: 32 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.7,
                                ease: "power3.out",
                                scrollTrigger: {
                                    trigger: el,
                                    start: "top 88%",
                                    toggleActions: "play none none none",
                                },
                            }
                        );
                    });

                    gsap.fromTo(
                        "[data-reveal-item]",
                        { opacity: 0, x: -18 },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            stagger: 0.05,
                            ease: "power3.out",
                            scrollTrigger: {
                                start: "top 88%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }, pageRef);
            });
        };

        const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
        let timeoutId: number | undefined;
        let idleId: number | undefined;
        if (w.requestIdleCallback) {
            idleId = w.requestIdleCallback(run, { timeout: 2000 });
        } else {
            timeoutId = window.setTimeout(run, 300);
        }

        return () => {
            cancelled = true;
            if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
            if (timeoutId !== undefined) window.clearTimeout(timeoutId);
            ctx?.revert();
        };
    }, []);

    const SectionTitle = ({
        icon: Icon,
        title,
    }: {
        icon: React.ComponentType<{ className?: string; size?: number }>;
        title: string;
    }) => (
        <h3 className="mb-4 flex items-center gap-3 border-b pb-2 text-2xl font-bold md:text-3xl">
            <Icon size={24} className="text-primary" />
            {title}
        </h3>
    );

    return (
        <div ref={pageRef}>
            {/* Cabeçalho */}
            <section className="px-4 py-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div data-reveal className="rounded-lg bg-background/70 px-4 py-8 text-center backdrop-blur md:px-8">
                        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Ezequiel Regino Monção</h1>
                        <h2 className="mt-4 mb-6 bg-linear-to-r from-blue-400 via-[#00e1ff] to-blue-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                            Desenvolvedor Fullstack Sênior | Angular, React, Next.js, Node.js, Java/Spring, AWS & Azure
                        </h2>
                        <ul className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                            {headerContact.map((c, i) => (
                                <li key={i} className="inline-flex items-center gap-1.5">
                                    <c.icon size={14} className="text-primary" />
                                    {c.href ? (
                                        <a
                                            href={c.href}
                                            target={c.external ? "_blank" : undefined}
                                            rel={c.external ? "noopener noreferrer" : undefined}
                                            className="hover:text-primary"
                                        >
                                            {c.label}
                                        </a>
                                    ) : (
                                        <span>{c.label}</span>
                                    )}
                                    {i < headerContact.length - 1 && <span className="mx-1 text-border">|</span>}
                                </li>
                            ))}
                        </ul>
                        <p className="mx-auto max-w-4xl text-left text-muted-foreground md:text-center">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Desenvolvedor Fullstack Sênior com 13+ anos de experiência em produtos digitais de alta performance, acessíveis e escaláveis. Especialista em Angular 15+, React 19 e Next.js no front-end, com atuação sólida em back-end (Java 17+/Spring Boot, Node.js) e experiência prática com microsserviços, Docker/Kubernetes, Azure, AWS e Google Cloud Platform (GCP). Formação em Engenharia da Computação e Design Gráfico. Lidero tecnicamente o time no SENAI, onde criei um Design System que reduziu em 40% o tempo de desenvolvimento e desenvolvi aplicações fullstack (React, Next.js, Angular) que atendem o ecossistema EAD internamente. Testes (Jest, Cypress), CI/CD (GitHub Actions, Vercel) e IA Autônoma (certificado Anthropic). Busco oportunidade em modelo home office.",
                                    en: "Desenvolvedor Fullstack Sênior com 13+ anos de experiência em produtos digitais de alta performance, acessíveis e escaláveis. Especialista em Angular 15+, React 19 e Next.js no front-end, com atuação sólida em back-end (Java 17+/Spring Boot, Node.js) e experiência prática com microsserviços, Docker/Kubernetes, Azure, AWS e Google Cloud Platform (GCP). Formação em Engenharia da Computação e Design Gráfico. Lidero tecnicamente o time no SENAI, onde criei um Design System que reduziu em 40% o tempo de desenvolvimento e desenvolvi aplicações fullstack (React, Next.js, Angular) que atendem o ecossistema EAD internamente. Testes (Jest, Cypress), CI/CD (GitHub Actions, Vercel) e IA Autônoma (certificado Anthropic). Busco oportunidade em modelo home office.",
                                    es: "Desenvolvedor Fullstack Sênior com 13+ anos de experiência em produtos digitais de alta performance, acessíveis e escaláveis. Especialista em Angular 15+, React 19 e Next.js no front-end, com atuação sólida em back-end (Java 17+/Spring Boot, Node.js) e experiência prática com microsserviços, Docker/Kubernetes, Azure, AWS e Google Cloud Platform (GCP). Formação em Engenharia da Computação e Design Gráfico. Lidero tecnicamente o time no SENAI, onde criei um Design System que reduziu em 40% o tempo de desenvolvimento e desenvolvi aplicações fullstack (React, Next.js, Angular) que atendem o ecossistema EAD internamente. Testes (Jest, Cypress), CI/CD (GitHub Actions, Vercel) e IA Autônoma (certificado Anthropic). Busco oportunidade em modelo home office.",
                                }}
                            </TextTranslator>
                        </p>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="mt-8 rounded-full transition-[color,background-color,border-color] duration-300"
                        >
                            <a href="/Ezequiel_Fullstack.pdf" download rel="noopener noreferrer">
                                <Download className="mr-2 h-5 w-5" />
                                Baixar currículo (PDF)
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Conteúdo */}
            <section className="px-4 pb-24 md:pb-32">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                        <aside className="flex flex-col gap-12 lg:col-span-1">
                            <div data-reveal>
                                <SectionTitle icon={Mail} title="CONTATO" />
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    {headerContact.map((c, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <c.icon size={16} className="text-primary" />
                                            {c.href ? (
                                                <a
                                                    href={c.href}
                                                    target={c.external ? "_blank" : undefined}
                                                    rel={c.external ? "noopener noreferrer" : undefined}
                                                    className="hover:text-primary"
                                                >
                                                    {c.label}
                                                </a>
                                            ) : (
                                                <span>{c.label}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div data-reveal>
                                <SectionTitle icon={GraduationCap} title="FORMAÇÃO" />
                                <div className="space-y-4">
                                    {education.map((item, i) => (
                                        <div key={i} data-reveal-item>
                                            <p className="text-sm font-semibold">{item.degree}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.institution} | {item.period}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div data-reveal>
                                <SectionTitle icon={BadgeCheck} title="CERTIFICAÇÕES" />
                                <p className="text-sm text-muted-foreground">Anthropic (mai/2026):</p>
                                <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                                    {certifications.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            </div>

                            <div data-reveal>
                                <SectionTitle icon={Languages} title="IDIOMAS" />
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Português:</strong> Nativo
                                    </li>
                                    <li>
                                        <strong>Inglês:</strong> Proficiência profissional (técnico)
                                    </li>
                                </ul>
                            </div>
                        </aside>

                        <div className="flex flex-col gap-12 lg:col-span-2">
                            <section data-reveal>
                                <SectionTitle icon={Shield} title="COMPETÊNCIAS TÉCNICAS" />
                                <div className="space-y-4">
                                    {skillGroups.map((group, i) => (
                                        <div key={i} data-reveal-item>
                                            <h4 className="mb-1 text-lg font-semibold">{group.title}:</h4>
                                            <p className="text-sm text-muted-foreground">{group.items}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section data-reveal>
                                <SectionTitle icon={FlaskConical} title="ANÁLISE ATRAVÉS DE TESTES UNITÁRIOS" />
                                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                                    {unitTestAnalysis.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section data-reveal>
                                <SectionTitle icon={Briefcase} title="EXPERIÊNCIA PROFISSIONAL" />
                                <div className="space-y-8">
                                    {experience.map((job, i) => (
                                        <div key={i} data-reveal-item>
                                            <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                                                <h4 className="text-xl font-semibold">{job.role}</h4>
                                                <p className="text-sm text-muted-foreground">{job.period}</p>
                                            </div>
                                            <p className="mb-2 text-primary">
                                                {job.company}
                                                {job.extra ? (
                                                    <span className="text-muted-foreground"> · {job.extra}</span>
                                                ) : null}
                                            </p>
                                            <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                                                {job.bullets.map((b, j) => (
                                                    <li key={j}>{b}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section data-reveal>
                                <SectionTitle icon={Rocket} title="PROJETOS PESSOAIS" />
                                <div className="space-y-6">
                                    {projectsPersonal.map((p, i) => (
                                        <div key={i} data-reveal-item>
                                            <h4 className="text-lg font-semibold">{p.name}</h4>
                                            <p className="mb-1 text-sm text-muted-foreground">{p.desc}</p>
                                            <a
                                                href={p.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline"
                                            >
                                                {p.linkLabel}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section data-reveal>
                                <SectionTitle icon={Bot} title="INTELIGÊNCIA ARTIFICIAL — APLICAÇÃO PRÁTICA" />
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    Uso diário de IA (Claude/Anthropic) para otimizar meu hub de sistemas (gerenciador de
                                    tarefas, sistema financeiro e teleprompt), com ganho de performance e qualidade.
                                    Iniciativas com IA Autônoma (Spec Driven Development, agentes) para evolução tecnológica
                                    dos produtos. A IA é utilizada apenas na parte repetitiva do processo (lado máquina):
                                    métricas, análise inicial de código, padronização e geração de testes unitários. A tomada
                                    de decisão, a definição de padrões e melhorias e o desenvolvimento das funcionalidades
                                    são feitos por mim, com curadoria e revisão pessoal de cada entrega.
                                </p>
                            </section>

                            <section data-reveal>
                                <SectionTitle icon={Award} title="CONHECIMENTOS / PRÁTICAS" />
                                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                                    {[
                                        "Componentização, gerenciamento de estado e arquitetura modular em Angular (módulos, services, guards).",
                                        "Estratégias de testes (Jest, Cypress), cobertura mínima de 80% e pipelines de CI/CD com qualidade.",
                                        "Boas práticas de segurança (JWT, CSP), acessibilidade (WCAG) e performance de aplicações.",
                                        "Colaboração em times com Git, code review e metodologias ágeis.",
                                    ].map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}