"use client";

import React from 'react';

// --- SEÇÃO 1: IMPORTAÇÃO DE TODOS OS COMPONENTES ---

// Componentes de Layout e UI
import { BentoCard } from "@/components/layout/BentoCard";
import { Cover } from "@/components/layout/Cover";
import Parallax from "@/components/layout/Parallax";
import { Section, SectionFluid } from "@/components/layout/Sections";
import ScrollIndicator from "@/components/layout/ScrollIndicator";
import { SkillsMarquee } from "@/components/layout/SkillsMarquee";
import TextTranslator from "@/components/layout/TextTranslator";
import { Topic, Topic2 } from "@/components/layout/Topic";
import { YouTubeBackground } from "@/components/layout/YouTubeBackground";

// Componentes de Animação (GSAP, Framer Motion, etc.)
import { ConstellationParticles } from "@/components/gsap/CanvasParticles";
import GsapImageParallax from "@/components/gsap/GsapImageParallax";
import GsapParallax from "@/components/gsap/GsapParallax";
import NavigationScrollTrigger from "@/components/gsap/NavigationScrollTrigger";
import { ProjectsCarousel } from "@/components/gsap/ProjectsCarousel";
import ScrollSmootherHeader from "@/components/gsap/ScrollSmootherHeader";
import ScrollSmootherThree from "@/components/gsap/ScrollSmootherThree";
import ScrollTriggerClamp from "@/components/gsap/ScrollTriggerClamp";
import SmoothScrollyImages from "@/components/gsap/SmoothScrollyImages";
import StaggeredText from "@/components/gsap/StaggeredText";

// Componentes de Cenas 3D (Three.js)
import { InteractiveScene } from "@/components/three/InteractiveScene";

// --- SEÇÃO 2: DADOS DE EXEMPLO (PROPS) PARA DEMONSTRAÇÃO ---

const sampleProjects = [
    { imageSrc: '/img/projects/dashboard-zecki.png', url: '#', altText: 'Exemplo de Dashboard', titlePT: 'Dashboard de Gestão', titleEN: 'Management Dashboard', titleES: 'Panel de Gestión', descPT: 'Uma plataforma para visualização de dados importantes.', descEN: 'A platform for visualizing important data.', descES: 'Una plataforma para visualización de datos importantes.' },
    { imageSrc: '/img/projects/gesso-porto-seguro.png', url: '#', altText: 'Exemplo de Site Institucional', titlePT: 'Site Institucional', titleEN: 'Corporate Website', titleES: 'Sitio Web Corporativo', descPT: 'Site focado em SEO e performance.', descEN: 'Website focused on SEO and performance.', descES: 'Sitio web enfocado en SEO y rendimiento.' },
    { imageSrc: '/img/projects/agendamento-salao.png', url: '#', altText: 'Exemplo de App de Agendamento', titlePT: 'Agendamento Online', titleEN: 'Online Scheduling', titleES: 'Agendamiento en Línea', descPT: 'Aplicação web completa para agendamentos.', descEN: 'A complete web application for scheduling.', descES: 'Una aplicación web completa para agendamientos.' }
];

const sampleSkills = ["React", "Next.js", "TypeScript", "GSAP", "Three.js", "Tailwind CSS", "Framer Motion", "Shadcn/UI", "Python", "Docker"];

const sampleImages = ['/img/projects/calendario.png', '/img/projects/cleriston-ilustrador.png', '/img/projects/dashboard_painel.png'];

const sampleNavSections = [
    { id: 'layout-ui-section', title: { ptBR: 'Layout & UI' } },
    { id: 'animations-section', title: { ptBR: 'Animações' } },
    { id: 'scroll-effects-section', title: { ptBR: 'Efeitos de Scroll' } }
];


// --- SEÇÃO 3: O COMPONENTE DA PÁGINA ---

export default function RecursosPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Componentes de fundo (globais para a página) */}
            <ConstellationParticles />

            {/* Este Header é especial, pois controla o scroll da página.
                Ele é demonstrado aqui, mas em um uso real, estaria no layout principal. */}
            <ScrollSmootherHeader backgroundImage="/img/projects/gesso-porto-seguro.png" />

            {/* O #main-content é necessário para o ScrollSmootherHeader funcionar corretamente */}
            <main id="main-content" className="relative z-10 bg-background">

                {/* O conteúdo principal começa aqui, depois do espaço reservado pelo header */}
                <div className="pt-16">
                    <Section label="introducao" className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Biblioteca de Componentes</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Um local centralizado para visualizar, testar e reutilizar todos os componentes do projeto, construídos para serem dinâmicos, responsivos e otimizados.
                        </p>
                    </Section>

                    <SectionFluid label="layout-ui-section" className="py-20">
                        <Topic label="layout-ui">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Layout & UI</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                <BentoCard className="md:col-span-2">
                                    <h3 className="font-bold text-lg mb-2">ProjectsCarousel</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Recebe um array de `projects` via props.</p>
                                    <ProjectsCarousel projects={sampleProjects} />
                                </BentoCard>
                                <BentoCard>
                                    <h3 className="font-bold text-lg mb-2">BentoCard</h3>
                                    <p className="text-sm text-muted-foreground">Card para layout em grid.</p>
                                </BentoCard>
                                <BentoCard className="lg:col-span-3">
                                    <h3 className="font-bold text-lg mb-2">SkillsMarquee</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Recebe um array de `skills` (strings) via props.</p>
                                    <SkillsMarquee skills={sampleSkills} />
                                </BentoCard>
                                <BentoCard>
                                    <h3 className="font-bold text-lg mb-2">TextTranslator</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Traduz o conteúdo com base no idioma.</p>
                                    <TextTranslator>{{ ptBR: "Texto em Português", en: "Text in English", es: "Texto en Español" }}</TextTranslator>
                                </BentoCard>
                                <BentoCard>
                                    <h3 className="font-bold text-lg mb-2">ScrollIndicator</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Indicador de rolagem animado.</p>
                                    <div className="relative h-24 w-full flex items-center justify-center"><ScrollIndicator /></div>
                                </BentoCard>
                            </div>
                        </Topic>
                    </SectionFluid>

                    <SectionFluid label="animations-section" className="py-20 bg-muted">
                        <Topic label="animacoes">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Animações e Efeitos Visuais</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-semibold">Cenas de Fundo</h3>
                                    <div className="relative h-80 w-full rounded-lg overflow-hidden border">
                                        <YouTubeBackground videoId="mAg8UyDt_sw" />
                                        <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center pointer-events-none">
                                            <p className="text-white text-lg font-bold">YouTubeBackground</p>
                                        </div>
                                    </div>
                                    <div className="relative h-80 w-full rounded-lg overflow-hidden border">
                                        <InteractiveScene />
                                        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                            <p className="text-white bg-black/60 p-2 rounded text-lg font-bold">InteractiveScene (3D)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-semibold">Animações de Texto e Imagem</h3>
                                    <BentoCard>
                                        <h3 className="font-bold text-lg mb-2">StaggeredText</h3>
                                        <StaggeredText text="Animação de texto com GSAP" className="text-2xl" />
                                    </BentoCard>
                                    <BentoCard>
                                        <h3 className="font-bold text-lg mb-2">Cover</h3>
                                        <p className="text-sm text-muted-foreground">Recebe `backgroundImage` e títulos via props.</p>
                                        <div className="relative h-40 mt-4 rounded overflow-hidden text-white flex items-center justify-center text-center" style={{ backgroundImage: `url(${sampleImages[0]})`, backgroundSize: 'cover' }}>
                                            <div className="absolute inset-0 bg-black/50" />
                                            <h4 className="relative z-10 text-xl font-bold">Cover Component</h4>
                                        </div>
                                    </BentoCard>
                                </div>
                            </div>
                        </Topic>
                    </SectionFluid>

                    <SectionFluid label="scroll-effects-section" className="py-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Efeitos de Rolagem (GSAP ScrollTrigger)</h2>
                    </SectionFluid>

                    {/* Componentes de Scroll são melhor demonstrados em largura total */}
                    <GsapParallax backgroundImage={sampleImages[1]} height="60vh">
                        <h3 className="text-5xl font-bold text-white bg-black/60 px-6 py-3 rounded-lg">GsapParallax</h3>
                    </GsapParallax>

                    <SmoothScrollyImages images={sampleImages} />

                    <ScrollTriggerClamp>
                        <div className="panel h-screen bg-purple-600 flex flex-col items-center justify-center text-white text-center p-4">
                            <h3 className="text-4xl font-bold">ScrollTriggerClamp</h3>
                            <p className="mt-2 max-w-md">Este componente recebe `children`. Cada filho com a classe `.panel` será "fixado" na tela durante a rolagem.</p>
                        </div>
                        <div className="panel h-screen bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                            Painel 2
                        </div>
                    </ScrollTriggerClamp>

                    <div className="relative h-screen w-full">
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-white text-center p-4">
                            <h3 className="text-4xl font-bold bg-black/60 p-3 rounded">ScrollSmootherThree</h3>
                            <p className="mt-2 max-w-md bg-black/60 p-2 rounded">Cena 3D que reage ao scroll da página.</p>
                        </div>
                        <ScrollSmootherThree />
                    </div>

                    <Section label="navegacao" className="py-20">
                        <Topic label="navigation-components">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Navegação</h2>
                            <div className="relative h-48 border rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground text-center p-4">O componente `NavigationScrollTrigger` fica fixo no topo da página e destaca o link da seção visível. Role para ver o efeito nas seções desta página.</p>
                                <NavigationScrollTrigger sections={sampleNavSections} />
                            </div>
                        </Topic>
                    </Section>
                </div>
            </main>
        </div>
    );
}