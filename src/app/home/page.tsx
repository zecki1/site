"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Linkedin } from 'lucide-react';

import { cn } from '@/lib/utils';
import ScrollSmootherHeader from '@/components/gsap/ScrollSmootherHeader';
import TextTranslator from '@/components/layout/TextTranslator';
import { Button } from '@/components/ui/button';

// Garante que o plugin ScrollTrigger esteja registrado
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- DADOS (PROPS) ---
const featureItems = [
    {
        number: "01",
        titlePT: "Conheça sua Base", titleEN: "Know Your Baseline", titleES: "Conozca su Base",
        descPT: "Análise completa do seu negócio digital para identificar oportunidades ocultas.",
        descEN: "Complete analysis of your digital business to identify hidden opportunities.",
        descES: "Análisis completo de su negocio digital para identificar oportunidades ocultas.",
        imageUrl: "/img/projects/dashboard-zecki.png" // Substitua por suas imagens reais
    },
    {
        number: "02",
        titlePT: "Receba seu Projeto", titleEN: "Get Your Blueprint", titleES: "Obtenga su Proyecto",
        descPT: "Um plano personalizado, desenhado em torno dos seus objetivos e dados.",
        descEN: "A personalized plan, designed around your goals and data.",
        descES: "Un plan personalizado, diseñado en torno a sus objetivos y datos.",
        imageUrl: "/img/projects/calendario.png"
    },
    {
        number: "03",
        titlePT: "Transforme sua Presença", titleEN: "Transform Your Presence", titleES: "Transforme su Presencia",
        descPT: "Implementação robusta com tecnologias modernas para resultados reais.",
        descEN: "Robust implementation with modern technologies for real results.",
        descES: "Implementación robusta con tecnologías modernas para resultados reales.",
        imageUrl: "/img/projects/agendamento-salao.png"
    }
];

const teamMembers = [
    { name: "Zecki", rolePT: "Fundador & Desenvolvedor", roleEN: "Founder & Developer", roleES: "Fundador y Desarrollador", image: "/img/projects/cleriston-ilustrador.png", link: "https://linkedin.com/in/zecki1" },
    // Adicione mais membros se houver, ou repita para testar o marquee
    { name: "Zecki (Clone)", rolePT: "Designer UI/UX", roleEN: "UI/UX Designer", roleES: "Diseñador UI/UX", image: "/img/projects/cleriston-ilustrador.png", link: "#" },
    { name: "Zecki (Clone 2)", rolePT: "Fullstack Dev", roleEN: "Fullstack Dev", roleES: "Desarrollador Fullstack", image: "/img/projects/cleriston-ilustrador.png", link: "#" },
];


// --- SUBCOMPONENTES ---

// Seção Sobre (Sticky com troca de texto)
const StickyAboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Textos para alternar durante o scroll
    const aboutTexts = [
        { pt: "Cansado de soluções digitais genéricas que não geram resultados?", en: "Tired of generic digital solutions that don't drive results?", es: "¿Cansado de soluciones digitales genéricas que no generan resultados?" },
        { pt: "Minha abordagem é 360°: Design, Código e Estratégia unidos para sua marca.", en: "My approach is 360°: Design, Code, and Strategy united for your brand.", es: "Mi enfoque es 360°: Diseño, Código y Estrategia unidos para su marca." }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=200%", // Duração do "pin" (2x a altura da tela)
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    // Alterna o índice do texto com base no progresso do scroll
                    const index = Math.min(
                        Math.floor(self.progress * aboutTexts.length),
                        aboutTexts.length - 1
                    );
                    setActiveIndex(index);
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen flex items-center justify-center bg-background">
            <div className="u-container text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#00e1ff] to-primary">
                            <TextTranslator>
                                {{
                                    ptBR: aboutTexts[activeIndex].pt,
                                    en: aboutTexts[activeIndex].en,
                                    es: aboutTexts[activeIndex].es
                                }}
                            </TextTranslator>
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

// Seção "Como Funciona"
const HowItWorksSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animação simples de entrada para os itens
            gsap.from(".feature-item", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-muted/30">
            <div className="u-container">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <TextTranslator>{{ ptBR: "Como Funciona", en: "How It Works", es: "Cómo Funciona" }}</TextTranslator>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#00e1ff] mx-auto rounded-full" />
                </div>

                <div className="space-y-32">
                    {featureItems.map((item, index) => (
                        <div key={index} className={cn(
                            "feature-item flex flex-col md:flex-row items-center gap-12 md:gap-24",
                            index % 2 !== 0 ? "md:flex-row-reverse" : "" // Alterna a direção
                        )}>
                            {/* Imagem */}
                            <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                <Image
                                    src={item.imageUrl}
                                    alt={item.titleEN}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Texto */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="text-6xl md:text-8xl font-bold text-primary/20">{item.number}</div>
                                <h3 className="text-3xl md:text-4xl font-bold">
                                    <TextTranslator>{{ ptBR: item.titlePT, en: item.titleEN, es: item.titleES }}</TextTranslator>
                                </h3>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    <TextTranslator>{{ ptBR: item.descPT, en: item.descEN, es: item.descES }}</TextTranslator>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Marquee Infinito para a Equipe
const InfiniteMarquee = ({ children, direction = 'left' }: { children: React.ReactNode, direction?: 'left' | 'right' }) => {
    return (
        <div className="flex overflow-hidden w-full mask-gradient-x">
            <div className={cn(
                "flex shrink-0 gap-8 py-4",
                direction === 'left' ? "animate-marquee-left" : "animate-marquee-right"
            )}>
                {children}
                {children} {/* Duplicado para o efeito infinito */}
            </div>
        </div>
    );
};

// Seção da Equipe
const TeamSection = () => {
    return (
        <section className="py-32 overflow-hidden">
            <div className="u-container text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
                    <TextTranslator>
                        {{
                            ptBR: <>Não apenas código — <span className="text-primary">cuidado real</span>, de quem entende que seu projeto é pessoal.</>,
                            en: <>Not just code — <span className="text-primary">real care</span>, from someone who knows your project is personal.</>,
                            es: <>No solo código — <span className="text-primary">cuidado real</span>, de quien entiende que su proyecto es personal.</>
                        }}
                    </TextTranslator>
                </h2>
            </div>

            <InfiniteMarquee>
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center gap-4 px-8 min-w-[250px]">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 p-1">
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <Image src={member.image} alt={member.name} fill className="object-cover" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-bold">{member.name}</h4>
                            <p className="text-sm text-primary">
                                <TextTranslator>{{ ptBR: member.rolePT, en: member.roleEN, es: member.roleES }}</TextTranslator>
                            </p>
                        </div>
                        <Link href={member.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </Link>
                    </div>
                ))}
            </InfiniteMarquee>
        </section>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function HomeContent() {
    // O 'backgroundImage' aqui será a imagem inicial do seu Hero
    return (
        <div className="bg-background text-foreground overflow-x-hidden">
            <ScrollSmootherHeader backgroundImage="/img/projects/gesso-porto-seguro.png" />

            {/* O ID 'main-content' é crucial para o ScrollSmootherHeader saber o que animar */}
            <main id="main-content" className="relative z-10 bg-background">

                {/* Espaçador para compensar a altura inicial do Hero que agora é controlada pelo Header */}
                <div className="h-screen" />

                <StickyAboutSection />
                <HowItWorksSection />
                <TeamSection />

                {/* Seção CTA Final */}
                <section className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />
                    <div className="u-container text-center">
                        <h2 className="text-5xl md:text-7xl font-bold mb-8">
                            <TextTranslator>
                                {{
                                    ptBR: "Vamos começar?",
                                    en: "Ready to start?",
                                    es: "¿Listo para empezar?"
                                }}
                            </TextTranslator>
                        </h2>
                        <Button asChild size="lg" className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300">
                            <Link href="/contato">
                                <TextTranslator>{{ ptBR: "Solicitar Proposta", en: "Request Proposal", es: "Solicitar Propuesta" }}</TextTranslator>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>

            </main>
        </div>
    );
}