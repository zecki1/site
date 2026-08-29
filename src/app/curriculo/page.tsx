"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    Github,
    Linkedin,
    Send,
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
} from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";

const sectionAnimation = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" as const } };
const staggerContainer = { whileInView: { transition: { staggerChildren: 0.08 } } };
const staggerItem = { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true } };

const experience = [
    {
        role: "Tech Lead / Engenheiro Front-End",
        company: "SENAI São Paulo",
        period: "abr/2023 - Atual",
        bullets: [
            "Arquitetura e desenvolvimento de plataformas transacionais com Angular 15+ e TypeScript — componentes reutilizáveis, lazy loading e gerenciamento de estado.",
            "Back-end e integrações: APIs RESTful, autenticação JWT, interceptors HTTP, tratamento de erros e políticas de segurança (CSP).",
            "Motores de vídeo (Vanilla JS) com protocolos HLS/DASH integrados ao Azure Media Services, com entrega resiliente em larga escala.",
            "Arquitetura de sincronização de progresso via API SCORM em LMS (Moodle, Blackboard), resiliente a redes instáveis.",
            "Automação de testes unitários com Jest (cobertura mínima de 80%) e E2E com Cypress, incluindo fluxos críticos e cenários de borda.",
            "Exposição das aplicações na AWS (S3, CloudFront, Lambda, API Gateway) com caching, code splitting, minificação e lazy loading; observabilidade com Datadog.",
            "Design System no Figma (design tokens + componentes) — redução de 40% no tempo de desenvolvimento do time.",
            "Acessibilidade WCAG 2.1 (AA/AAA) com ARIA e VLibras, atuando como multiplicador interno.",
            "Liderança técnica: fluxo de demandas, code review, refatoração e mentoria; iniciativas com IA Autônoma (Claude Code, MCP, Spec Driven Development).",
        ],
    },
    {
        role: "Web Designer Gráfico",
        company: "SENAI São Paulo",
        period: "out/2020 - abr/2023",
        extra: "Promovido internamente.",
        bullets: [
            "Interfaces responsivas mobile-first (React, Angular, TypeScript) integradas a APIs REST.",
            "Templates e componentes reutilizáveis que se tornaram a base dos produtos internos.",
            "Boas práticas de acessibilidade (semântica, contraste, navegação por teclado) e otimização de performance (assets, lazy loading).",
        ],
    },
    {
        role: "Desenvolvedor Full Stack & Designer",
        company: "GALL / Cia Sex",
        period: "2017 - 2020",
        bullets: [
            "Desenvolvimento full stack com Laravel, PHP, Python e Node.js, com integração a bancos SQL.",
            "Atuação em Java Spring na construção de APIs e fluxos de integração.",
            "Interfaces web, artes gráficas, SEO técnico e CRO para landing pages de alta conversão.",
        ],
    },
    {
        role: "Analista de E-commerce",
        company: "Elogin",
        period: "jul/2018 - nov/2019",
        bullets: [
            "Funções front-end (chat, integração WhatsApp, marketplaces) e criação de arte para redes sociais, blog, catálogo e site.",
        ],
    },
    {
        role: "Suporte de Sistema",
        company: "Wortsmann Associados",
        period: "jan/2019 - nov/2019",
        bullets: [
            "Desenvolvimento de interfaces web responsivas e integração com APIs.",
        ],
    },
    {
        role: "Administração de Marketing",
        company: "Diem",
        period: "ago/2017 - nov/2019",
        bullets: [
            "Desenvolvimento de arte para Google Ads e plataformas de anúncio.",
        ],
    },
];

const skillGroups = [
    {
        title: "Frontend & Interfaces",
        items: "Angular 15+, React 19, Next.js, TypeScript, HTML5, SCSS, Tailwind CSS, Radix UI, Shadcn UI; Acessibilidade (WCAG 2.1 AA/AAA), ARIA, responsividade, VLibras; animações com Framer Motion, GSAP e Three.js; Design Systems (Figma) e prototipação de alta fidelidade.",
    },
    {
        title: "Back-End & Dados",
        items: "Node.js, PHP (Laravel), Python, Java Spring Boot; APIs RESTful e microsserviços; bancos SQL (SQL Server, MySQL, PostgreSQL) e NoSQL em tempo real (Firebase/Firestore).",
    },
    {
        title: "Testes, Build & Performance",
        items: "Jest, Vitest e Cypress (E2E) com cobertura mínima de 80%; Webpack, Rollup, Vite e Turbopack; SSR/SSG/ISR, code splitting, minificação e lazy loading; Core Web Vitals.",
    },
    {
        title: "Cloud & DevOps",
        items: "AWS (S3, CloudFront, Lambda, API Gateway), Azure Media Services, Vercel e Docker; Git, GitHub Actions, pipelines CI/CD e deploy automatizado; observabilidade com Datadog.",
    },
    {
        title: "Arquitetura & Integrações",
        items: "Sistemas multi-tenant, arquitetura modular Angular (módulos, services, guards) e Clean Architecture; autenticação JWT e políticas de segurança (CSP); integrações SCORM/LMS (Moodle, Blackboard) e HLS/DASH (Azure Media Services).",
    },
    {
        title: "Inteligência Artificial",
        items: "Claude Code, Model Context Protocol (MCP), Agent Skills e Google Vertex AI; IA Autônoma com Spec Driven Development e agentes — usada só na parte repetitiva, com decisão e revisão humanas.",
    },
];

const education = [
    { degree: "Pós-Graduação Lato Sensu, Desenvolvimento Full Stack", institution: "Descomplica", period: "nov/2025 - mar/2026" },
    { degree: "Bacharelado, Engenharia de Computação", institution: "UNIVESP", period: "2017 - 2022" },
    { degree: "Bacharelado, Design Gráfico", institution: "Universidade Paulista - UNIP", period: "2019 - 2021" },
    { degree: "Técnico, Web Design", institution: "Microcamp", period: "2012" },
];

const projectsPersonal = [
    {
        name: "Zecki Dashboard",
        desc: "SaaS de produtividade com dashboard de tarefas e métricas em tempo real, gráficos (Recharts), animações (Framer Motion), autenticação e banco em tempo real (Firebase). Desenvolvido em 3 versões — Angular, React e Next.js — com a versão final em Next.js usando ISR por escalabilidade.",
        url: "https://zecki1.com.br/dashboard",
        linkLabel: "zecki1.com.br/dashboard",
    },
    {
        name: "Teleprompt",
        desc: "Sistema de gestão de roteiros multi-tenant com workspaces que isolam os dados por empresa, editor estruturado por cenas, teleprompter ao vivo e controle remoto. Stack: Next.js, Angular, .NET, SQL.",
        url: "https://zecki1.com.br/teleprompt",
        linkLabel: "zecki1.com.br/teleprompt",
    },
    {
        name: "CMS Multi-Site Headless",
        desc: "Arquitetura front-end centralizada com ISR, experiência de edição em tempo real e um painel que gerencia conteúdo (hero, sobre, portfólio e contato) de vários sites em um só lugar. Stack: Next.js, ISR, Tailwind, Firebase.",
        url: "https://zecki1.com.br/login",
        linkLabel: "zecki1.com.br/login",
    },
    {
        name: "Cleriston Ilustrações / Nick Gomes",
        desc: "Sites institucionais com design system próprio, animações e SEO. Stack: Next.js, Tailwind, Framer Motion.",
        url: "https://www.cleristonribeiro.com.br",
        linkLabel: "cleristonribeiro.com.br",
    },
];

const practices = [
    "Componentização, gerenciamento de estado e arquitetura modular em Angular (módulos, services, guards).",
    "Estratégias de testes (Jest, Cypress), cobertura mínima de 80% e pipelines de CI/CD com qualidade.",
    "Boas práticas de segurança (JWT, CSP), acessibilidade (WCAG) e performance de aplicações.",
    "Colaboração em times com Git, code review e metodologias ágeis.",
];

export default function ResumePage() {
    return (
        <>
            {/* Seção 1: Cabeçalho */}
            <section className="py-24 md:py-32">
                <div className="u-container">
                    <motion.header {...sectionAnimation} className="text-center bg-background/70 backdrop-blur py-8 rounded-lg px-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Ezequiel Regino Monção</h1>
                        <h3 className="text-2xl md:text-4xl font-bold mb-6 mt-4 bg-linear-to-r from-blue-400 via-[#00e1ff] to-blue-400 bg-clip-text text-transparent animate-gradient-loop">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Desenvolvedor Full Stack | TypeScript, React, Next.js, Node.js, AWS",
                                    en: "Desenvolvedor Full Stack | TypeScript, React, Next.js, Node.js, AWS",
                                    es: "Desenvolvedor Full Stack | TypeScript, React, Next.js, Node.js, AWS",
                                }}
                            </TextTranslator>
                        </h3>
                        <p className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1"><MapPin size={14} /> São Paulo - SP (CEP 02286-000)</span>
                            <span>|</span> <a href="tel:+5511982101630" className="hover:text-primary">+55 11 98210-1630</a>
                            <span>|</span> <a href="mailto:zecki1@hotmail.com" className="hover:text-primary">zecki1@hotmail.com</a>
                            <span>|</span> <a href="https://linkedin.com/in/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">linkedin.com/in/zecki1</a>
                            <span>|</span> <a href="https://github.com/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/zecki1</a>
                            <span>|</span> <a href="https://zecki1.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary">zecki1.com.br</a>
                        </p>
                        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-left md:text-center">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Desenvolvedor Full Stack com 13+ anos construindo aplicações web completas — do front-end ao back-end, infraestrutura e deploy. Especialista em Angular, React, Next.js e TypeScript, Node.js, PHP (Laravel) e Java Spring, bancos SQL e Firebase/Firestore. APIs RESTful seguras (JWT/CSP), testes Jest/Cypress com cobertura mínima de 80%, pipelines CI/CD e cloud AWS/Azure. Construo sistemas multi-tenant com IA generativa (Google Vertex AI) e mantenho SaaS próprios em produção. Uso IA Autônoma (Claude Code, MCP, Spec Driven Development) apenas na parte repetitiva — decisão e revisão humanas.",
                                    en: "Desenvolvedor Full Stack com 13+ anos construindo aplicações web completas — do front-end ao back-end, infraestrutura e deploy. Especialista em Angular, React, Next.js e TypeScript, Node.js, PHP (Laravel) e Java Spring, bancos SQL e Firebase/Firestore. APIs RESTful seguras (JWT/CSP), testes Jest/Cypress com cobertura mínima de 80%, pipelines CI/CD e cloud AWS/Azure. Construo sistemas multi-tenant com IA generativa (Google Vertex AI) e mantenho SaaS próprios em produção. Uso IA Autônoma (Claude Code, MCP, Spec Driven Development) apenas na parte repetitiva — decisão e revisão humanas.",
                                    es: "Desenvolvedor Full Stack com 13+ anos construindo aplicações web completas — do front-end ao back-end, infraestrutura e deploy. Especialista em Angular, React, Next.js e TypeScript, Node.js, PHP (Laravel) e Java Spring, bancos SQL e Firebase/Firestore. APIs RESTful seguras (JWT/CSP), testes Jest/Cypress com cobertura mínima de 80%, pipelines CI/CD e cloud AWS/Azure. Construo sistemas multi-tenant com IA generativa (Google Vertex AI) e mantenho SaaS próprios em produção. Uso IA Autônoma (Claude Code, MCP, Spec Driven Development) apenas na parte repetitiva — decisão e revisão humanas.",
                                }}
                            </TextTranslator>
                        </p>
                    </motion.header>
                </div>
            </section>

            {/* Seção 2: Conteúdo */}
            <section className="pb-24 md:pb-32 bg-background/70 backdrop-blur container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 u-container py-16">
                    <motion.aside {...sectionAnimation} className="lg:col-span-1 flex flex-col gap-12 mx-10">
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><Mail size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "CONTATO", en: "CONTATO", es: "CONTATO" }}</TextTranslator></h3>
                            <ul className="space-y-3 text-muted-foreground text-sm">
                                <li className="flex items-center gap-3"><MapPin size={16} /> São Paulo - SP, Brasil</li>
                                <li className="flex items-center gap-3"><Send size={16} /> <a href="mailto:zecki1@hotmail.com" className="hover:text-primary">zecki1@hotmail.com</a></li>
                                <li className="flex items-center gap-3"><Phone size={16} /> <a href="tel:+5511982101630" className="hover:text-primary">+55 11 98210-1630</a></li>
                                <li className="flex items-center gap-3"><Globe size={16} /> <a href="https://zecki1.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary">zecki1.com.br</a></li>
                                <li className="flex items-center gap-3"><Github size={16} /> <a href="https://github.com/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/zecki1</a></li>
                                <li className="flex items-center gap-3"><Linkedin size={16} /> <a href="https://linkedin.com/in/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">linkedin.com/in/zecki1</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><GraduationCap size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "FORMAÇÃO", en: "FORMAÇÃO", es: "FORMAÇÃO" }}</TextTranslator></h3>
                            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-4">
                                {education.map((item, i) => (
                                    <motion.div key={i} variants={staggerItem}>
                                        <p className="font-semibold text-sm">{item.degree}</p>
                                        <p className="text-sm text-muted-foreground">{item.institution} | {item.period}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><BadgeCheck size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "CERTIFICAÇÕES", en: "CERTIFICAÇÕES", es: "CERTIFICAÇÕES" }}</TextTranslator></h3>
                            <p className="text-sm text-muted-foreground">Anthropic (mai/2026):</p>
                            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground text-sm">
                                <li>Claude 101</li>
                                <li>Building with the Claude API</li>
                                <li>Claude Code in Action</li>
                                <li>AI Fluency Framework & Foundations</li>
                                <li>Introduction to Model Context Protocol (MCP)</li>
                                <li>MCP: Advanced Topics</li>
                                <li>Introduction to Agent Skills</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><Languages size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "IDIOMAS", en: "IDIOMAS", es: "IDIOMAS" }}</TextTranslator></h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li><strong>Português:</strong> Nativo</li>
                                <li><strong>Inglês:</strong> Proficiência profissional (técnico)</li>
                            </ul>
                        </div>
                    </motion.aside>

                    <div className="lg:col-span-2 flex flex-col gap-12">
                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 mx-8"><Shield size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "COMPETÊNCIAS TÉCNICAS", en: "COMPETÊNCIAS TÉCNICAS", es: "COMPETÊNCIAS TÉCNICAS" }}</TextTranslator></h3>
                            <div className="space-y-4 mx-8">
                                {skillGroups.map((group, i) => (
                                    <div key={i}>
                                        <h4 className="font-semibold text-lg mb-1">{group.title}:</h4>
                                        <p className="text-muted-foreground text-sm">{group.items}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 mx-8"><Briefcase size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "EXPERIÊNCIA PROFISSIONAL", en: "EXPERIÊNCIA PROFISSIONAL", es: "EXPERIÊNCIA PROFISSIONAL" }}</TextTranslator></h3>
                            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-8 mx-8">
                                {experience.map((job, i) => (
                                    <motion.div key={i} variants={staggerItem}>
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                                            <h4 className="text-xl font-semibold">{job.role}</h4>
                                            <p className="text-sm text-muted-foreground">{job.period}</p>
                                        </div>
                                        <p className="text-primary mb-2">
                                            {job.company}
                                            {job.extra ? <span className="text-muted-foreground"> · {job.extra}</span> : null}
                                        </p>
                                        <ul className="list-disc list-inside space-y-1.5 text-muted-foreground text-sm">
                                            {job.bullets.map((b, j) => (
                                                <li key={j}>{b}</li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 mx-8"><Rocket size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "PROJETOS PESSOAIS / MICRO SAAS", en: "PROJETOS PESSOAIS / MICRO SAAS", es: "PROJETOS PESSOAIS / MICRO SAAS" }}</TextTranslator></h3>
                            <div className="space-y-6 mx-8">
                                {projectsPersonal.map((p, i) => (
                                    <div key={i}>
                                        <h4 className="font-semibold text-lg">{p.name}</h4>
                                        <p className="text-muted-foreground text-sm mb-1">{p.desc}</p>
                                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{p.linkLabel}</a>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 mx-8"><Bot size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "INTELIGÊNCIA ARTIFICIAL — APLICAÇÃO PRÁTICA", en: "INTELIGÊNCIA ARTIFICIAL — APLICAÇÃO PRÁTICA", es: "INTELIGÊNCIA ARTIFICIAL — APLICAÇÃO PRÁTICA" }}</TextTranslator></h3>
                            <p className="text-muted-foreground text-sm mx-8 leading-relaxed">
                                Uso diário de IA (Claude/Anthropic) para otimizar meu hub de sistemas (gerenciador de tarefas, sistema financeiro e teleprompt), com ganho de performance e qualidade. Iniciativas com IA Autônoma (Spec Driven Development, agentes) para evolução tecnológica dos produtos. A IA é utilizada apenas na parte repetitiva do processo (lado máquina): métricas, análise inicial de código, padronização e geração de testes unitários. A tomada de decisão, a definição de padrões e melhorias e o desenvolvimento das funcionalidades são feitos por mim, com curadoria e revisão pessoal de cada entrega.
                            </p>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 mx-8"><Award size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "CONHECIMENTOS / PRÁTICAS", en: "CONHECIMENTOS / PRÁTICAS", es: "CONHECIMENTOS / PRÁTICAS" }}</TextTranslator></h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm mx-8">
                                {practices.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </motion.section>
                    </div>
                </div>
            </section>
        </>
    );
}