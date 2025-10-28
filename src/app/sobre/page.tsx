"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { History, Target } from 'lucide-react';
import TextTranslator from '@/components/layout/TextTranslator';
import { YouTubeBackground } from '@/components/layout/YouTubeBackground';

const sectionAnimation = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" } };

export default function AboutPage() {
    return (
        <>
            {/* Seção 1: Hero com Vídeo */}
            <section className="relative py-40 text-center text-white overflow-hidden">
                <YouTubeBackground videoId="BqFSHbzSs7U" />
                <div className="absolute inset-0 bg-black/70 z-10" />
                <div className="relative z-20 u-container">
                    <motion.h1
                        {...sectionAnimation}
                        className="text-4xl md:text-6xl font-bold tracking-tight pt-5"
                    >
                        <TextTranslator ignoreCheck={true}>
                            {{
                                ptBR: "Transformando Ideias em Experiências Digitais",
                                en: "Turning Ideas into Digital Experiences",
                                es: "Transformando Ideas en Experiencias Digitales"
                            }}
                        </TextTranslator>
                    </motion.h1>
                </div>
            </section>

            {/* Seção 2: Conteúdo Principal */}
            <section className="py-24 md:py-32">
                <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-16 bg-background/70 backdrop-blur u-container rounded-lg">
                    <motion.div {...sectionAnimation}>
                        <h2 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 text-primary ">
                            <Target size={24} />
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Resumo", en: "Summary", es: "Resumen" }}
                            </TextTranslator>
                        </h2>
                        <div className="text-muted-foreground leading-relaxed space-y-4">
                            <p>
                                <TextTranslator ignoreCheck={true}>
                                    {{
                                        ptBR: "Com mais de 17 anos de experiência em design e desenvolvimento, sou um desenvolvedor full-stack apaixonado por criar soluções digitais que unem estética, funcionalidade e acessibilidade.",
                                        en: "With over 17 years of experience in design and development, I am a full-stack developer passionate about creating digital solutions that blend aesthetics, functionality, and accessibility.",
                                        es: "Con más de 17 años de experiencia en diseño y desarrollo, soy un desarrollador full-stack apasionado por crear soluciones digitales que combinan estética, funcionalidad y accesibilidad."
                                    }}
                                </TextTranslator>
                            </p>
                            <p>
                                <TextTranslator ignoreCheck={true}>
                                    {{
                                        ptBR: "Minha trajetória multidisciplinar combina design gráfico, desenvolvimento web, acessibilidade, marketing digital e gestão de projetos, permitindo-me entregar interfaces intuitivas, visualmente impactantes e tecnicamente robustas. Minha missão é transformar suas ideias em sites e aplicações rápidos, acessíveis e otimizados, prontos para crescer com seu negócio.",
                                        en: "My multidisciplinary journey combines graphic design, web development, accessibility, digital marketing, and project management, allowing me to deliver intuitive, visually striking, and technically robust interfaces. My mission is to transform your ideas into fast, accessible, and optimized websites and applications, ready to grow with your business.",
                                        es: "Mi trayectoria multidisciplinar une diseño gráfico, desarrollo web, accesibilidad, marketing digital y gestión de proyectos, lo que me permite entregar interfaces intuitivas, visualmente impactantes y técnicamente robustas. Mi misión es transformar tus ideas en sitios y aplicaciones rápidas, accesibles y optimizadas, listas para crecer con tu negocio."
                                    }}
                                </TextTranslator>
                            </p>
                        </div>
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <h2 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 text-primary">
                            <History size={24} />
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Minha História", en: "My Story", es: "Mi Historia" }}
                            </TextTranslator>
                        </h2>
                        <div className="text-muted-foreground leading-relaxed space-y-4">
                            <p>
                                <TextTranslator ignoreCheck={true}>
                                    {{
                                        ptBR: "Desde os 13 anos, mergulhei no universo criativo e técnico, começando com artes plásticas por 6 anos, onde desenvolvi um olhar apurado para composição visual e harmonia estética. Aos 15, iniciei minha jornada em web design, trabalhando com HTML, CSS e ferramentas como Dreamweaver durante 5 anos, o que me levou a explorar a interseção entre design e código. Paralelamente, dediquei 3 anos ao marketing digital, aprendendo a criar campanhas estratégicas e otimizar conteúdos para maximizar engajamento.",
                                        en: "Since I was 13, I've been immersed in the creative and technical universe, starting with 6 years of fine arts, where I developed a keen eye for visual composition and aesthetic harmony. At 15, I began my journey in web design, working with HTML, CSS, and tools like Dreamweaver for 5 years, which led me to explore the intersection of design and code. In parallel, I dedicated 3 years to digital marketing, learning to create strategic campaigns and optimize content to maximize engagement.",
                                        es: "Desde los 13 años, me he sumergido en el universo creativo y técnico, comenzando con 6 años de artes plásticas, donde desarrollé un agudo sentido para la composición visual y la armonía estética. A los 15, inicié mi camino en el diseño web, trabajando con HTML, CSS y herramientas como Dreamweaver durante 5 años, lo que me llevó a explorar la intersección entre diseño y código. Paralelamente, dediqué 3 años al marketing digital, aprendiendo a crear campañas estratégicas y optimizar contenidos para maximizar el engagement."
                                    }}
                                </TextTranslator>
                            </p>
                            <p>
                                <TextTranslator ignoreCheck={true}>
                                    {{
                                        ptBR: "Hoje, com 30 anos, atuo como tech lead no Senai, liderando o desenvolvimento de cursos digitais. Sou responsável por criar templates responsivos com React e HTML5 no padrão SCORM para plataformas LMS, além de gerenciar equipes, organizar demandas e garantir entregas de alta qualidade. Minha paixão por acessibilidade digital e usabilidade me levou a especializar-me em WCAG 2.1, garantindo que minhas soluções sejam inclusivas e alcancem todos os públicos. Projetos como o Cleriston Ribeiro, Dashboard Zecki e Calendário Alpha refletem meu compromisso com performance, escalabilidade e experiência do usuário.",
                                        en: "Today, at 30, I work as a tech lead at Senai, leading the development of digital courses. I am responsible for creating responsive templates with React and HTML5 in the SCORM standard for LMS platforms, as well as managing teams, organizing demands, and ensuring high-quality deliveries. My passion for digital accessibility and usability has led me to specialize in WCAG 2.1, ensuring that my solutions are inclusive and reach all audiences. Projects like Cleriston Ribeiro, Dashboard Zecki, and Calendário Alpha reflect my commitment to performance, scalability, and user experience.",
                                        es: "Hoy, con 30 años, actúo como líder técnico en Senai, liderando el desarrollo de cursos digitales. Soy responsable de crear plantillas responsivas con React y HTML5 en el estándar SCORM para plataformas LMS, además de gestionar equipos, organizar demandas y garantizar entregas de alta calidad. Mi pasión por la accesibilidad digital y la usabilidad me ha llevado a especializarme en WCAG 2.1, garantizando que mis soluciones sean inclusivas y lleguen a todos los públicos. Proyectos como Cleriston Ribeiro, Dashboard Zecki y Calendário Alpha reflejan mi compromiso con el rendimiento, la escalabilidad y la experiencia del usuario."
                                    }}
                                </TextTranslator>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}