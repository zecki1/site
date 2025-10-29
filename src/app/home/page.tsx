
"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, Smartphone, Search, Accessibility, UserCheck, GanttChartSquare, Rocket } from 'lucide-react';

import TextTranslator from '@/components/layout/TextTranslator';
import { Button } from '@/components/ui/button';
import { YouTubeBackground } from '@/components/layout/YouTubeBackground';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HomeContent() {
    // Refs para cada seção que será animada
    const introSectionRef = useRef<HTMLDivElement>(null);
    const pillarsSectionRef = useRef<HTMLDivElement>(null);
    const servicesSectionRef = useRef<HTMLDivElement>(null);
    const processSectionRef = useRef<HTMLDivElement>(null);
    const testimonialsSectionRef = useRef<HTMLDivElement>(null);

    // Efeitos para animar cada seção quando ela entra na tela
    useEffect(() => {
        const ctx = gsap.context(() => {
            // CORREÇÃO: Adicionado 'toggleActions' para que a animação rode apenas uma vez ao entrar na tela.
            // Isso evita re-execuções desnecessárias e melhora a performance.
            const scrollTriggerConfig = {
                toggleActions: 'play none none none', // play on enter, do nothing on leave, enter back, or leave back
            };

            gsap.from(introSectionRef.current, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: introSectionRef.current, start: 'top 80%', ...scrollTriggerConfig } });
            gsap.from(".pillar-card", { opacity: 0, y: 40, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: pillarsSectionRef.current, start: 'top 85%', ...scrollTriggerConfig } });
            gsap.from(".service-card", { opacity: 0, scale: 0.95, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: servicesSectionRef.current, start: 'top 80%', ...scrollTriggerConfig } });

            gsap.utils.toArray<HTMLElement>('.process-step').forEach((step) => {
                gsap.from(step, {
                    opacity: 0,
                    x: -50,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        ...scrollTriggerConfig,
                    },
                });
            });

            gsap.from(".testimonial-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: testimonialsSectionRef.current, start: 'top 80%', ...scrollTriggerConfig } });
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Seção 1: Introdução (SEM CARD) */}
            <section ref={introSectionRef} className="relative flex items-center justify-center min-h-screen py-24 md:py-32">
                <div className="u-container text-center max-w-4xl mx-auto bg-background py-10">
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                        <TextTranslator>
                            {{
                                ptBR: "Cansado de templates genéricos que não convertem? A maioria é confusa, não otimizada para SEO e ignora a experiência do usuário.",
                                en: "Tired of generic templates that don't convert? Most are confusing, not SEO-optimized, and ignore the user experience.",
                                es: "¿Cansado de plantillas genéricas que no convierten? La mayoría son confusas, no están optimizadas para SEO e ignoran la experiencia del usuario."
                            }}
                        </TextTranslator>
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#00e1ff] to-primary mb-8">
                        <TextTranslator>
                            {{
                                ptBR: "Bem-vindo ao que seu Site Pode Ser",
                                en: "Welcome to What Your Website Can Be",
                                es: "Bienvenido a lo que tu Sitio Web Puede Ser"
                            }}
                        </TextTranslator>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        <TextTranslator>
                            {{
                                ptBR: "Seu projeto não vive isolado. Por isso, conecto suas regras de negócio, requisitos e fluxos de trabalho em um processo de desenvolvimento claro e eficiente — projetado para criar sites rápidos, acessíveis, bem ranqueados no Google e otimizados para mobile-first.",
                                en: "Your project doesn't live in isolation. That's why I connect your business rules, requirements, and workflows into a clear and efficient development process—designed to create fast, accessible, high-ranking sites on Google, optimized for mobile-first.",
                                es: "Tu proyecto no vive de forma aislada. Por eso, conecto tus reglas de negocio, requisitos y flujos de trabajo en un proceso de desarrollo claro y eficiente, diseñado para crear sitios web rápidos, accesibles, bien posicionados en Google y optimizados para mobile-first."
                            }}
                        </TextTranslator>
                    </p>
                </div>
            </section>

            {/* Seção 2: Pilares (COM FUNDO PRÓPRIO) */}
            <section ref={pillarsSectionRef} className="relative py-24 md:py-32 bg-muted/30 px-2">
                <div className="u-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ptBR: "Clareza, Não Sobrecarga", en: "Clarity, Not Overload", es: "Claridad, No Sobrecarga" },
                            { ptBR: "Soluções, Não Remendos", en: "Solutions, Not Patches", es: "Soluciones, No Arreglos" },
                            { ptBR: "Resultados, Não Promessas", en: "Results, Not Promises", es: "Resultados, No Promesas" }
                        ].map((pillar, index) => (
                            <div key={index} className="pillar-card text-center p-8 bg-background rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold text-primary">
                                    <TextTranslator>{pillar}</TextTranslator>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 3: Serviços (SEM CARD NO TÍTULO) */}
            <section ref={servicesSectionRef} className="relative py-24 md:py-32 px-2">
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 backdrop-blur">
                            <TextTranslator>
                                {{ ptBR: "Soluções Claras para Sua Presença Digital", en: "Clear Solutions for Your Digital Presence", es: "Soluciones Claras para Tu Presencia Digital" }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            <TextTranslator>
                                {{ ptBR: "Jornadas desenhadas para você. Informadas por expertise em front-end, usabilidade, acessibilidade e SEO.", en: "Journeys designed for you. Informed by expertise in front-end, usability, accessibility, and SEO.", es: "Trayectorias diseñadas para ti. Informadas por la experiencia en front-end, usabilidad, accesibilidad y SEO." }}
                            </TextTranslator>
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-background">
                        {[
                            { icon: Smartphone, title: { ptBR: "Desenvolvimento Mobile-First", en: "Mobile-First Development", es: "Desarrollo Mobile-First" }, description: { ptBR: "Construção de sites otimizados para dispositivos móveis, garantindo carregamento rápido, navegação fluida e design responsivo.", en: "Building sites optimized for mobile devices, ensuring fast loading, smooth navigation, and responsive design.", es: "Construcción de sitios optimizados para dispositivos móviles, garantizando una carga rápida, navegación fluida y diseño responsive." } },
                            { icon: Search, title: { ptBR: "Otimização de SEO", en: "SEO Optimization", es: "Optimización SEO" }, description: { ptBR: "Estratégias de SEO técnico e de conteúdo para garantir que seu site seja encontrado no Google, maximizando visibilidade e cliques.", en: "Technical and content SEO strategies to ensure your site is found on Google, maximizing visibility and clicks.", es: "Estrategias de SEO técnico y de contenido para garantizar que tu sitio sea encontrado en Google, maximizando la visibilidad y los clics." } },
                            { icon: Accessibility, title: { ptBR: "Acessibilidade Digital", en: "Digital Accessibility", es: "Accesibilidad Digital" }, description: { ptBR: "Desenvolvimento de interfaces acessíveis (WCAG 2.1) para garantir que seu site seja utilizável por todos, tornando seu projeto inclusivo.", en: "Developing accessible interfaces (WCAG 2.1) to ensure your site is usable by everyone, making your project inclusive.", es: "Desarrollo de interfaces accesibles (WCAG 2.1) para garantizar que tu sitio sea utilizable por todos, haciendo tu proyecto inclusivo." } },
                            { icon: UserCheck, title: { ptBR: "Usabilidade e UX", en: "Usability & UX", es: "Usabilidad y UX" }, description: { ptBR: "Criação de interfaces intuitivas com fluxos de navegação simples e CTAs claros, projetados para converter visitantes em clientes.", en: "Creating intuitive interfaces with simple navigation flows and clear CTAs, designed to convert visitors into customers.", es: "Creación de interfaces intuitivas con flujos de navegación simples y CTAs claros, diseñados para convertir visitantes en clientes." } },
                            { icon: GanttChartSquare, title: { ptBR: "Gerenciadores de Tarefas", en: "Custom Task Managers", es: "Gestores de Tareas a Medida" }, description: { ptBR: "Desenvolvimento de ferramentas sob medida para gerenciar projetos, integrando regras de negócio para organizar fluxos de trabalho.", en: "Developing custom tools to manage projects, integrating business rules to organize workflows.", es: "Desarrollo de herramientas a medida para gestionar proyectos, integrando reglas de negocio para organizar flujos de trabajo." } },
                            { icon: Rocket, title: { ptBR: "Performance e Escalabilidade", en: "Performance & Scalability", es: "Rendimiento y Escalabilidad" }, description: { ptBR: "Construção de sites com código limpo e otimizado, prontos para crescer com seu negócio, garantindo velocidade e suporte a picos de tráfego.", en: "Building sites with clean, optimized code, ready to grow with your business, ensuring speed and support for traffic spikes.", es: "Construcción de sitios con código limpio y optimizado, listos para crecer con tu negocio, garantizando velocidad y soporte para picos de tráfico." } }
                        ].map((service, index) => (
                            <div key={index} className="service-card p-8 bg-muted/30 rounded-xl flex flex-col items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary"><service.icon className="h-8 w-8" /></div>
                                <h3 className="text-xl font-bold"><TextTranslator>{service.title}</TextTranslator></h3>
                                <p className="text-muted-foreground"><TextTranslator>{service.description}</TextTranslator></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 4: Processo (COM FUNDO PRÓPRIO) */}
            <section ref={processSectionRef} className="relative py-24 md:py-32 bg-muted/30 px-2">
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <TextTranslator>{{ ptBR: "Como Transformar Sua Ideia em um Site", en: "How to Turn Your Idea into a Website", es: "Cómo Convertir Tu Idea en un Sitio Web" }}</TextTranslator>
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto flex flex-col gap-12">
                        {[
                            { number: "01", title: { ptBR: "Conheça Sua Base", en: "Know Your Baseline", es: "Conoce Tu Base" }, description: { ptBR: "Analiso seu projeto através de auditorias técnicas, regras de negócio e feedback de usuários. Dados são a base para criar uma solução que realmente funciona.", en: "I analyze your project through technical audits, business rules, and user feedback. Data is the foundation for creating a solution that truly works.", es: "Analizo tu proyecto a través de auditorías técnicas, reglas de negocio y feedback de usuarios. Los datos son la base para crear una solución que realmente funcione." } },
                            { number: "02", title: { ptBR: "Obtenha Sua Solução", en: "Get Your Solution", es: "Obtén Tu Solución" }, description: { ptBR: "Receba um plano de desenvolvimento personalizado, projetado com base nos seus objetivos, com foco em mobile-first e SEO.", en: "Receive a custom development plan, designed based on your goals, focusing on mobile-first and SEO.", es: "Recibe un plan de desarrollo personalizado, diseñado en base a tus objetivos, con un enfoque en mobile-first y SEO." } },
                            { number: "03", title: { ptBR: "Transforme Sua Presença", en: "Transform Your Presence", es: "Transforma Tu Presencia" }, description: { ptBR: "Implemento seu site ou aplicação com código limpo, design acessível e otimizações para SEO, ajustando tudo conforme o projeto evolui.", en: "I implement your site or application with clean code, accessible design, and SEO optimizations, adjusting everything as the project evolves.", es: "Implemento tu sitio o aplicación con código limpio, diseño accesible y optimizaciones SEO, ajustando todo a medida que el proyecto evoluciona." } }
                        ].map((step, index) => (
                            <div key={index} className="process-step flex items-start gap-8 p-6 bg-background rounded-lg">
                                <div className="text-5xl font-bold text-primary/30 mt-1">{step.number}</div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2"><TextTranslator>{step.title}</TextTranslator></h3>
                                    <p className="text-lg text-muted-foreground"><TextTranslator>{step.description}</TextTranslator></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 5: Depoimentos (SEM CARD NO TÍTULO) */}
            <section ref={testimonialsSectionRef} className="relative py-24 md:py-32 px-2">
                <div className="u-container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            <TextTranslator>{{ ptBR: "Histórias Reais de Projetos Transformados", en: "Real Stories of Transformed Projects", es: "Historias Reales de Proyectos Transformados" }}</TextTranslator>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                        {[
                            { quote: { ptBR: "O Zecki transformou minha ideia em um site mobile-first que elevou minha presença digital. Meu tráfego orgânico cresceu e os usuários adoram a navegação.", en: "Zecki turned my idea into a mobile-first site that elevated my digital presence. My organic traffic grew, and users love the navigation.", es: "Zecki convirtió mi idea en un sitio mobile-first que elevó mi presencia digital. Mi tráfico orgánico creció y a los usuarios les encanta la navegación." }, author: { ptBR: "Clerinston Ribeiro", en: "Clerinston Ribeiro", es: "Clerinston Ribeiro" }, company: { ptBR: "Fundador, Clerinston Ilustrações", en: "Founder, Clerinston Ilustrações", es: "Fundador, Clerinston Ilustrações" } },
                            { quote: { ptBR: "As otimizações de SEO colocaram meu site nas primeiras páginas do Google, e o gerenciador de tarefas personalizado mudou minha forma de organizar projetos.", en: "The SEO optimizations put my site on the first pages of Google, and the custom task manager changed how I organize projects.", es: "Las optimizaciones SEO pusieron mi sitio en las primeras páginas de Google, y el gestor de tareas personalizado cambió mi forma de organizar proyectos." }, author: { ptBR: "Monnappa", en: "Monnappa", es: "Monnappa" }, company: { ptBR: "Fundador, CodeHive Workspaces", en: "Founder, CodeHive Workspaces", es: "Fundador, CodeHive Workspaces" } },
                            { quote: { ptBR: "A abordagem focada em acessibilidade e usabilidade fez toda a diferença. Meu site agora é inclusivo, rápido e fácil de usar.", en: "The focus on accessibility and usability made all the difference. My site is now inclusive, fast, and easy to use.", es: "El enfoque en accesibilidad y usabilidad marcó toda la diferencia. Mi sitio ahora es inclusivo, rápido y fácil de usar." }, author: { ptBR: "Fozzy", en: "Fozzy", es: "Fozzy" }, company: { ptBR: "Estética Automotiva", en: "Automotive Aesthetics", es: "Estética Automotriz" } }
                        ].map((testimonial, index) => (
                            <figure key={index} className="testimonial-card flex flex-col justify-between p-8 bg-muted/30 rounded-lg backdrop-blur">
                                <blockquote className="text-lg italic border-l-4 border-primary pl-6 mb-6 "><TextTranslator>{testimonial.quote}</TextTranslator></blockquote>
                                <figcaption>
                                    <div className="font-bold"><TextTranslator>{testimonial.author}</TextTranslator></div>
                                    <div className="text-sm text-muted-foreground"><TextTranslator>{testimonial.company}</TextTranslator></div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seção 6: CTA Final (COM FUNDO PRÓPRIO E YOUTUBE OTIMIZADO) */}
            <section className="py-32 md:py-48 relative text-center text-white overflow-hidden">
                <YouTubeBackground videoId="3mRQVJwqvrQ" />
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
                <div className="u-container relative z-20 flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8">
                        <TextTranslator>{{ ptBR: "Transforme suas ideias em sites rápidos, acessíveis e otimizados.", en: "Turn your ideas into fast, accessible, and optimized websites.", es: "Convierte tus ideas en sitios web rápidos, accesibles y optimizados." }}</TextTranslator>
                    </h2>
                    <Button asChild size="lg" className="rounded-full text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300">
                        <Link href="/contato">
                            <span><TextTranslator>{{ ptBR: "Solicitar Proposta", en: "Request Proposal", es: "Solicitar Propuesta" }}</TextTranslator></span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </>
    );
}