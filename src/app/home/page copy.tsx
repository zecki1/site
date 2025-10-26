"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TextTranslator from "@/components/layout/TextTranslator";
import { ProjectsCarousel } from "@/components/gsap/ProjectsCarousel";
import { YouTubeBackground } from "@/components/layout/YouTubeBackground";

// NOVO: Os dados dos projetos agora vivem na página que usa o carrossel.
const projectsData = [
    {
        imageSrc: '/img/projects/dashboard-zecki.png',
        url: 'https://dashboard-zecki.vercel.app/login',
        altText: 'Captura de tela do Dashboard de Gestão Zecki',
        titlePT: 'Dashboard de Gestão', titleEN: 'Management Dashboard', titleES: 'Panel de Gestión',
        descPT: 'Plataforma de visualização de dados.', descEN: 'Data visualization platform.', descES: 'Plataforma de visualización de datos.'
    },
    {
        imageSrc: '/img/projects/gesso-porto-seguro.png',
        url: 'https://gessoportoseguro.com.br',
        altText: 'Página inicial do site Gesso Porto Seguro',
        titlePT: 'Gesso Porto Seguro', titleEN: 'Gesso Porto Seguro', titleES: 'Gesso Porto Seguro',
        descPT: 'Site institucional focado em SEO.', descEN: 'Institutional website focused on SEO.', descES: 'Sitio web institucional centrado en SEO.'
    },
    {
        imageSrc: '/img/projects/agendamento-salao.png',
        url: 'https://agendamento-salao.vercel.app/login',
        altText: 'Tela de login do sistema de Agendamento de Salão',
        titlePT: 'Agendamento de Salão', titleEN: 'Salon Scheduling', titleES: 'Citas para Salón',
        descPT: 'Aplicação web completa para agendamentos.', descEN: 'Complete web application for scheduling.', descES: 'Aplicación web completa para citas.'
    },
    {
        imageSrc: '/img/projects/calendario.png',
        url: 'https://calendario-alpha-drab.vercel.app/login',
        altText: 'Interface do Calendário de Eventos',
        titlePT: 'Calendário de Eventos', titleEN: 'Event Calendar', titleES: 'Calendario de Eventos',
        descPT: 'Sistema de calendário com autenticação.', descEN: 'Calendar system with authentication.', descES: 'Sistema de calendario con autenticación.'
    },
    // NOVO: Adicionado o projeto Cleriston Ribeiro
    {
        imageSrc: '/img/projects/cleriston-ilustrador.png', // IMPORTANTE: Adicione esta imagem na sua pasta public/img/projects/
        url: 'https://cleristonribeiro.com.br',
        altText: 'Página inicial do portfólio de Cleriston Ribeiro',
        titlePT: 'Portfólio Pessoal', titleEN: 'Personal Portfolio', titleES: 'Portafolio Personal',
        descPT: 'Site pessoal e portfólio de projetos.', descEN: 'Personal website and project portfolio.', descES: 'Sitio web personal y portafolio de proyectos.'
    }
];


const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-purple-500 dark:text-purple-400">{children}</span>
);

const revealAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.8, ease: "easeOut" }
};

export default function HomeContent() {
    return (
        <main className="bg-background">
            {/* Seção 1: Introdução com Vídeo de Fundo */}
            <section className="relative min-h-screen flex items-center justify-center text-center p-8 text-white">
                <YouTubeBackground videoId="mAg8UyDt_sw" />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <motion.div {...revealAnimation} className="z-20 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        <TextTranslator>
                            {{
                                ptBR: <>Com <Mark>13 anos de experiência</Mark>, crio soluções digitais completas — do conceito visual à implementação robusta.</>,
                                en: <>With <Mark>13 years of experience</Mark>, I craft complete digital solutions—from visual concept to robust implementation.</>,
                                es: <>Con <Mark>13 años de experiencia</Mark>, creo soluciones digitales completas, desde el concepto visual hasta la implementación robusta.</>,
                            }}
                        </TextTranslator>
                    </h2>
                </motion.div>
            </section>

            {/* Seção 2: Serviços (Design Minimalista) */}
            <section className="min-h-screen flex flex-col justify-center p-8 md:p-16">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.h3 {...revealAnimation} className="text-sm uppercase text-muted-foreground mb-8">
                        <TextTranslator>{{ ptBR: "O que eu ofereço", en: "What I Offer", es: "Lo que ofrezo" }}</TextTranslator>
                    </motion.h3>
                    <motion.div>
                        {[
                            { pt: 'Design de Interfaces (UI/UX)', en: 'Interface Design (UI/UX)', es: 'Diseño de Interfaces (UI/UX)' },
                            { pt: 'Desenvolvimento Front-end', en: 'Front-End Development', es: 'Desarrollo Front-End' },
                            { pt: 'Aplicações Web Completas', en: 'Full Web Applications', es: 'Aplicaciones Web Completas' },
                            { pt: 'Sites Institucionais e SEO', en: 'Institutional Sites & SEO', es: 'Sitios Institucionales y SEO' },
                        ].map((service, index) => (
                            <motion.div {...revealAnimation} key={index} className="border-b py-8">
                                <h4 className="text-3xl md:text-5xl font-semibold">
                                    <TextTranslator>{{ ptBR: service.pt, en: service.en, es: service.es }}</TextTranslator>
                                </h4>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Seção 3: Projetos em Destaque */}
            <section className="min-h-screen flex flex-col justify-center bg-muted py-16 md:py-24 overflow-hidden">
                <motion.h2 {...revealAnimation} className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16 px-8 tracking-tight">
                    <TextTranslator>{{ ptBR: "Projetos em Destaque", en: "Featured Projects", es: "Proyectos Destacados" }}</TextTranslator>
                </motion.h2>
                <motion.div {...revealAnimation} className="w-full">
                    {/* ALTERADO: Passando os dados dos projetos para o componente */}
                    <ProjectsCarousel projects={projectsData} />
                </motion.div>
            </section>

            {/* Seção 4: CTA Final com Vídeo de Fundo */}
            <section className="relative min-h-screen flex items-center justify-center text-center p-8 text-white">
                <YouTubeBackground videoId="BqFSHbzSs7U" />
                <div className="absolute inset-0 bg-black/70 z-10" />
                <motion.div {...revealAnimation} className="z-20">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                        <TextTranslator>{{ ptBR: "Vamos construir algo incrível juntos?", en: "Let's build something amazing together?", es: "¿Construimos algo increíble juntos?" }}</TextTranslator>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/projetos">
                                <TextTranslator>{{ ptBR: "Ver Meus Projetos", en: "See My Projects", es: "Ver Mis Proyectos" }}</TextTranslator>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" size="lg">
                            <Link href="/contato">
                                <TextTranslator>{{ ptBR: "Entrar em Contato", en: "Get in Touch", es: "Contactar" }}</TextTranslator>
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}