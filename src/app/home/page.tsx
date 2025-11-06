"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
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
} from "lucide-react";

import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoPhp, BiLogoNodejs, BiLogoTypescript } from "react-icons/bi";
import { SiLaravel, SiMysql, SiFigma, SiDocker } from "react-icons/si";
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
const projects = [
    {
        name: "Cleriston Ilustrações",
        img: "/img/projects/cleriston.png",
        url: "https://www.cleristonribeiro.com.br",
    },
    {
        name: "Dashboard Zecki",
        img: "/img/projects/dashboard.png",
        url: "https://dashboard-zecki.vercel.app",
    },
    {
        name: "Agendamento Salão",
        img: "/img/projects/agendamento.png",
        url: "https://agendamento-salao.vercel.app",
    },
    {
        name: "Nick Gomes",
        img: "/img/projects/nickgomes.jpg",
        url: "https://www.nickgomes.com.br",
    },
];

const techStack = [
    { name: "React", Icon: FaReact },
    { name: "Next.js", Icon: TbBrandNextjs },
    { name: "Node.js", Icon: BiLogoNodejs },
    { name: "TypeScript", Icon: BiLogoTypescript },
    { name: "PHP", Icon: BiLogoPhp },
    { name: "Laravel", Icon: SiLaravel },
    { name: "MySQL", Icon: SiMysql },
    { name: "Figma", Icon: SiFigma },
    { name: "Git", Icon: BsGit },
    { name: "Docker", Icon: SiDocker },
    { name: "HTML5", Icon: DiHtml5 },
    { name: "CSS3", Icon: DiCss3 },
];

export default function HomeContent() {
    const mainRef = useRef<HTMLDivElement>(null);
    const introSectionRef = useRef<HTMLDivElement>(null);
    const pillarsSectionRef = useRef<HTMLDivElement>(null);
    const servicesSectionRef = useRef<HTMLDivElement>(null);
    const processSectionRef = useRef<HTMLDivElement>(null);
    const horizontalScrollRef = useRef<HTMLDivElement>(null);
    const projectsContainerRef = useRef<HTMLDivElement>(null);
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
            gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
                gsap.from(step, {
                    opacity: 0,
                    x: -50,
                    duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 85%",
                    ...scrollTriggerConfig,
                },
            });
        });

            const projectsGallery = projectsContainerRef.current;
            if (projectsGallery && horizontalScrollRef.current) {
                const totalWidth = projectsGallery.scrollWidth;
                const amountToScroll = totalWidth - window.innerWidth;
                gsap.to(projectsGallery, {
                    x: () => `-${amountToScroll}px`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalScrollRef.current,
                        start: "top top",
                        end: () => `+=${amountToScroll}`,
                        scrub: true,
                        pin: true,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    },
        });
            }

        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={mainRef}>
            {/* SEÇÃO 1: Inicio */}
            <section className="hero-section relative h-screen w-full overflow-hidden bg-background">
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

            {/* Seção 2: Introdução */}
            <section
                ref={introSectionRef}
                className="relative flex items-center justify-center min-h-screen py-24 md:py-32"
            >
                <div className="u-container text-center max-w-4xl mx-auto py-10">
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        <TextTranslator>
                            {{
                                ptBR: "Cansado de templates genéricos que não convertem? A maioria é confusa, não otimizada para SEO e ignora a experiência do usuário.",
                                en: "Tired of generic templates that don't convert? Most are confusing, not SEO-optimized, and ignore the user experience.",
                                es: "¿Cansado de plantillas genéricas que no convierten? La mayoría son confusas, no están optimizadas para SEO e ignoran la experiencia del usuario.",
                            }}
                        </TextTranslator>
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-linear-to-r from-blue-400 via-[#00e1ff] to-blue-400 bg-clip-text text-transparent animate-gradient-loop">
                        <TextTranslator>
                            {{
                                ptBR: "Bem-vindo ao que seu Site Pode Ser",
                                en: "Welcome to What Your Website Can Be",
                                es: "Bienvenido a lo que tu Sitio Web Puede Ser",
                            }}
                        </TextTranslator>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        <TextTranslator>
                            {{
                                ptBR: "Seu projeto não vive isolado. Por isso, conecto suas regras de negócio, requisitos e fluxos de trabalho em um processo de desenvolvimento claro e eficiente — projetado para criar sites rápidos, acessíveis, bem ranqueados no Google e otimizados para mobile-first.",
                                en: "Your project doesn't live in isolation. That's why I connect your business rules, requirements, and workflows into a clear and efficient development process—designed to create fast, accessible, high-ranking sites on Google, optimized for mobile-first.",
                                es: "Tu proyecto no vive de forma aislada. Por eso, conecto tus reglas de negocio, requisitos y flujos de trabajo en un proceso de desarrollo claro y eficiente, diseñado para crear sitios web rápidos, accesibles, bien posicionados en Google y optimizados para mobile-first.",
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

            {/* Seção 4: Serviços */}
            <section
                ref={servicesSectionRef}
                className="relative py-24 md:py-32 px-2 backdrop-blur"
            >
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <TextTranslator>
                                {{
                                    ptBR: "Soluções Claras para Sua Presença Digital",
                                    en: "Clear Solutions for Your Digital Presence",
                                    es: "Soluciones Claras para Tu Presencia Digital",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Jornadas desenhadas para você. Informadas por expertise em front-end, usabilidade, acessibilidade e SEO.",
                                    en: "Journeys designed for you. Informed by expertise in front-end, usability, accessibility, and SEO.",
                                    es: "Trayectorias diseñadas para ti. Informadas por la experiencia en front-end, usabilidad, accesibilidad y SEO.",
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
                                    ptBR: "Construção de sites otimizados para dispositivos móveis, garantindo carregamento rápido, navegação fluida e design responsivo.",
                                    en: "Building sites optimized for mobile devices, ensuring fast loading, smooth navigation, and responsive design.",
                                    es: "Construcción de sitios optimizados para dispositivos móviles, garantizando una carga rápida, navegación fluida y diseño responsive.",
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
                                    ptBR: "Estratégias de SEO técnico e de conteúdo para garantir que seu site seja encontrado no Google, maximizando visibilidade e cliques.",
                                    en: "Technical and content SEO strategies to ensure your site is found on Google, maximizing visibility and clicks.",
                                    es: "Estrategias de SEO técnico y de contenido para garantizar que tu sitio sea encontrado en Google, maximizando la visibilidad y los clics.",
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
                                    ptBR: "Desenvolvimento de interfaces acessíveis (WCAG 2.1) para garantir que seu site seja utilizável por todos, tornando seu projeto inclusivo.",
                                    en: "Developing accessible interfaces (WCAG 2.1) to ensure your site is usable by everyone, making your project inclusive.",
                                    es: "Desarrollo de interfaces accesibles (WCAG 2.1) para garantizar que tu sitio sea utilizable por todos, haciendo tu proyecto inclusivo.",
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
                                    ptBR: "Criação de interfaces intuitivas com fluxos de navegação simples e CTAs claros, projetados para converter visitantes em clientes.",
                                    en: "Creating intuitive interfaces with simple navigation flows and clear CTAs, designed to convert visitors into customers.",
                                    es: "Creación de interfaces intuitivas con flujos de navegación simples y CTAs claros, diseñados para convertir visitantes en clientes.",
                                },
                            },
                            {
                                icon: GanttChartSquare,
                                title: {
                                    ptBR: "Gerenciadores de Tarefas",
                                    en: "Custom Task Managers",
                                    es: "Gestores de Tareas a Medida",
                                },
                                description: {
                                    ptBR: "Desenvolvimento de ferramentas sob medida para gerenciar projetos, integrando regras de negócio para organizar fluxos de trabalho.",
                                    en: "Developing custom tools to manage projects, integrating business rules to organize workflows.",
                                    es: "Desarrollo de herramientas a medida para gestionar proyectos, integrando reglas de negocio para organizar flujos de trabajo.",
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
                                    ptBR: "Construção de sites com código limpo e otimizado, prontos para crescer com seu negócio, garantindo velocidade e suporte a picos de tráfego.",
                                    en: "Building sites with clean, optimized code, ready to grow with your business, ensuring speed and support for traffic spikes.",
                                    es: "Construcción de sitios con código limpio y optimizado, listos para crecer con tu negocio, garantizando velocidad y soporte para picos de tráfico.",
                                },
                            },
                        ].map((service, index) => (
                          <div
                              key={index}
                              className="service-card p-8 bg-muted/30 rounded-xl flex flex-col items-start gap-4"
                          >
                              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                  <service.icon className="h-8 w-8" />
                              </div>
                              <h3 className="text-xl font-bold">
                                  <TextTranslator>{service.title}</TextTranslator>
                              </h3>
                              <p className="text-muted-foreground">
                                  <TextTranslator>{service.description}</TextTranslator>
                              </p>
                          </div>
                      ))}
                    </div>
                </div>
            </section>

            {/* Seção 5: Projetos em Destaque */}
            <section
                ref={horizontalScrollRef}
                className="relative h-screen w-full overflow-hidden backdrop-blur"
            >
                <div ref={projectsContainerRef} className="flex h-full items-center">
                    <div className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center px-8 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <TextTranslator>
                                {{
                                    ptBR: "Projetos em Destaque",
                                    en: "Featured Projects",
                                    es: "Proyectos Destacados",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            <TextTranslator>
                                {{
                                    ptBR: "Aqui estão alguns projetos que demonstram a aplicação prática de soluções robustas, criativas e centradas no usuário.",
                                    en: "Here are some projects that demonstrate the practical application of robust, creative, and user-centered solutions.",
                                    es: "Aquí hay algunos proyectos que demuestran la aplicación práctica de soluciones robustas, creativas y centradas en el usuario.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[90vw] md:w-[60vw] h-[70vh] mx-8 relative rounded-2xl overflow-hidden group shadow-2xl"
                        >
                            <Image
                                src={project.img}
                                alt={project.name}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h3 className="text-3xl font-bold">{project.name}</h3>
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-foreground/80 hover:text-primary-foreground inline-flex items-center mt-2 hover:underline"
                                >
                                    <TextTranslator>
                                        {{
                                            ptBR: "Visitar Projeto",
                                            en: "Visit Project",
                                            es: "Visitar Proyecto",
                                        }}
                                    </TextTranslator>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">
                                <TextTranslator>
                                    {{
                                        ptBR: "Pronto para o Próximo Nível?",
                                        en: "Ready for the Next Level?",
                                        es: "¿Listo para el Siguiente Nivel?",
                                    }}
                                </TextTranslator>
                            </h2>
                            <Button
                                asChild
                                size="lg"
                                className="rounded-full text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300"
                            >
                                <Link href="/contato">
                                    <span>
                                        <TextTranslator>
                                            {{
                                                ptBR: "Vamos Conversar",
                                                en: "Let's Talk",
                                                es: "Hablemos",
                                            }}
                                        </TextTranslator>
                                    </span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO 6: Tecnologias */}
            <section
                ref={techSectionRef}
                className="relative py-24 md:py-48 container mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-background  backdrop-blur ">
                    <div className="text-content px-2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <TextTranslator>
                                {{
                                    ptBR: "Tecnologias que Impulsionam Resultados",
                                    en: "Technologies that Drive Results",
                                    es: "Tecnologías que Impulsan Resultados",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            <TextTranslator>
                                {{
                                    ptBR: "Utilizo um ecossistema de ferramentas modernas e robustas para arquitetar soluções de alta performance. Da prototipação no Figma à implementação com React e Next.js, e do back-end com Laravel/Node.js à orquestração com Docker, cada tecnologia é escolhida para garantir escalabilidade, segurança e uma experiência de usuário impecável.",
                                    en: "I use an ecosystem of modern, robust tools to architect high-performance solutions. From prototyping in Figma to implementation with React and Next.js, and from back-end with Laravel/Node.js to orchestration with Docker, each technology is chosen to ensure scalability, security, and a flawless user experience.",
                                    es: "Utilizo un ecosistema de herramientas modernas y robustas para arquitectar soluciones de alto rendimiento. Desde el prototipado en Figma hasta la implementación con React y Next.js, y desde el back-end con Laravel/Node.js hasta la orquestación con Docker, cada tecnología es elegida para garantizar escalabilidad, seguridad y una experiencia de usuario impecable.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                    <div className="relative h-96 md:h-[500px] items-center justify-center hidden md:flex">
                        <TechParticles techStack={techStack} />
                    </div>
                </div>
            </section>

            {/* Seção 7: Processo */}
            <section
                ref={processSectionRef}
                className="relative py-24 md:py-32 bg-muted/30 px-2"
            >
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <TextTranslator>
                                {{
                                    ptBR: "Como Transformar Sua Ideia em um Site",
                                    en: "How to Turn Your Idea into a Website",
                                    es: "Cómo Convertir Tu Idea en un Sitio Web",
                                }}
                            </TextTranslator>
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto flex flex-col gap-12">
                        {[
                            {
                                number: "01",
                                title: {
                                    ptBR: "Conheça Sua Base",
                                    en: "Know Your Baseline",
                                    es: "Conoce Tu Base",
                                },
                                description: {
                                    ptBR: "Analiso seu projeto através de auditorias técnicas, regras de negócio e feedback de usuários. Dados são a base para criar uma solução que realmente funciona.",
                                    en: "I analyze your project through technical audits, business rules, and user feedback. Data is the foundation for creating a solution that truly works.",
                                    es: "Analizo tu proyecto a través de auditorías técnicas, reglas de negocio y feedback de usuarios. Los datos son la base para crear una solución que realmente funcione.",
                                },
                            },
                            {
                                number: "02",
                                title: {
                                    ptBR: "Obtenha Sua Solução",
                                    en: "Get Your Solution",
                                    es: "Obtén Tu Solución",
                                },
                                description: {
                                    ptBR: "Receba um plano de desenvolvimento personalizado, projetado com base nos seus objetivos, com foco em mobile-first e SEO.",
                                    en: "Receive a custom development plan, designed based on your goals, focusing on mobile-first and SEO.",
                                    es: "Recibe un plan de desarrollo personalizado, diseñado en base a tus objetivos, con un enfoque en mobile-first y SEO.",
                                },
                            },
                            {
                                number: "03",
                                title: {
                                    ptBR: "Transforme Sua Presença",
                                    en: "Transform Your Presence",
                                    es: "Transforma Tu Presencia",
                                },
                                description: {
                                    ptBR: "Implemento seu site ou aplicação com código limpo, design acessível e otimizações para SEO, ajustando tudo conforme o projeto evolui.",
                                    en: "I implement your site or application with clean code, accessible design, and SEO optimizations, adjusting everything as the project evolves.",
                                    es: "Implemento tu sitio o aplicación con código limpio, diseño accesible y optimizaciones SEO, ajustando todo a medida que el proyecto evoluciona.",
                                },
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="process-step flex items-start gap-8 p-6 bg-background rounded-lg"
                            >
                                <div className="text-5xl font-bold text-primary/30 mt-1">
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        <TextTranslator>{step.title}</TextTranslator>
                                    </h3>
                                    <p className="text-lg text-muted-foreground">
                                        <TextTranslator>{step.description}</TextTranslator>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 8: Contato Final */}
            <section className="py-32 md:py-48 relative text-center text-white overflow-hidden">
                <YouTubeBackground videoId="3mRQVJwqvrQ" />
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
                <div className="u-container relative z-20 flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                        <TextTranslator>
                            {{
                                ptBR: "Transforme suas ideias em sites rápidos, acessíveis e otimizados.",
                                en: "Turn your ideas into fast, accessible, and optimized websites.",
                                es: "Convierte tus ideas en sitios web rápidos, accesibles y optimizados.",
                            }}
                        </TextTranslator>
                    </h2>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    >
                        <Link href="/contato">
                            <span>
                                <TextTranslator>
                                    {{
                                        ptBR: "Solicitar Proposta",
                                        en: "Request Proposal",
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
