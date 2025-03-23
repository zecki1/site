// src/app/home/HomeContent.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cover } from "@/components/layout/Cover";
import { Section } from "@/components/layout/Sections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextTranslator from "@/components/layout/TextTranslator";
import { images } from "@/components/layout/ImageContainer";

// Componente Mark para destaque
const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-purple-500 dark:text-purple-400">{children}</span>
);

export default function HomeContent() {
    // Animação inicial do Cover
    const coverVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };

    // Animação para stagger nos textos
    const staggerText = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const staggerChild = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="font-sans">
            <main className="relative z-10">
                {/* Cover - Banner Inicial */}
                <motion.div initial="hidden" animate="visible" variants={coverVariants}>
                    <Cover
                        titlePT="Ezequiel 'Zecki' Monção"
                        titleEN="Ezequiel 'Zecki' Monção"
                        titleES="Ezequiel 'Zecki' Monção"
                        backgroundImage={images.capa}
                        className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-muted/70 to-muted-foreground/70 min-h-[80vh]"
                        ignoreCheck={true}
                    >
                        <motion.p
                            className="text-foreground text-xl md:text-3xl mb-10 font-light max-w-3xl tracking-tight"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <TextTranslator>
                                {{
                                    ptBR: "Transformando ideias em experiências digitais vibrantes e acessíveis com 13 anos de paixão por código, design e inovação.",
                                    en: "Turning ideas into vibrant, accessible digital experiences with 13 years of passion for code, design, and innovation.",
                                    es: "Convirtiendo ideas en experiencias digitales vibrantes y accesibles con 13 años de pasión por el código, diseño e innovación.",
                                }}
                            </TextTranslator>
                        </motion.p>
                        <Button
                            asChild
                            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 text-lg tracking-tight"
                        >
                            <Link href="/servicos">
                                <TextTranslator>
                                    {{ ptBR: "Crie Seu Site Comigo", en: "Build Your Site With Me", es: "Crea Tu Sitio Conmigo" }}
                                </TextTranslator>
                            </Link>
                        </Button>
                    </Cover>
                </motion.div>

                {/* Seção Sobre */}
                <Section label="sobre" className="py-32 bg-background">
                    <motion.div initial="hidden" whileInView="visible" variants={staggerText} viewport={{ once: true }}>
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-16 tracking-tight">
                            <motion.span variants={staggerChild}>Quem</motion.span>{" "}
                            <motion.span variants={staggerChild}>Sou</motion.span>{" "}
                            <motion.span variants={staggerChild}>Eu</motion.span>
                        </h2>
                        <motion.p
                            variants={staggerChild}
                            className="text-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
                        >
                            <TextTranslator>
                                {{
                                    ptBR: (
                                        <>
                                            Eu sou Ezequiel Regino Monção, ou simplesmente <Mark>Zecki</Mark>, um desenvolvedor e designer com <Mark>13 anos</Mark> de experiência unindo <Mark>arte</Mark> e <Mark>tecnologia</Mark>. Desde o início, meu foco é criar soluções digitais que sejam <Mark>acessíveis</Mark>, <Mark>responsivas</Mark> e <Mark>impactantes</Mark>. Passei por startups, empresas de educação e projetos corporativos, desenvolvendo desde interfaces simples até sistemas complexos. Hoje, atuo no <Mark>Senai</Mark> (desde 2020) criando cursos EAD com <Mark>React</Mark>, <Mark>Tailwind</Mark>, <Mark>shadcn/ui</Mark> e integrações via APIs, além de cuidar de design, animações e usabilidade. Minha missão? Tornar o digital mais <Mark>inclusivo</Mark> e <Mark>cativante</Mark> para todos.
                                        </>
                                    ),
                                }}
                            </TextTranslator>
                        </motion.p>
                    </motion.div>
                </Section>

                {/* Seção Habilidades */}
                <Section label="habilidades" className="py-32 bg-muted">
                    <h2 className="text-4xl font-bold text-center text-foreground mb-12">O Que Eu Faço</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Desenvolvimento Web", desc: "Sites dinâmicos com React, Next.js e Tailwind." },
                            { title: "Design Gráfico", desc: "Layouts e animações com Illustrator e After Effects." },
                            { title: "CMS Personalizado", desc: "Mini sites editáveis para seus clientes." },
                        ].map((skill, index) => (
                            <motion.div
                                key={skill.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Card className="hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>{skill.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>{skill.desc}</CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* Call to Action Final */}
                <Section label="cta" className="py-20 bg-purple-500 text-white text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Vamos Criar Algo Incrível Juntos?
                    </motion.h2>
                    <Button
                        variant="outline"
                        className="bg-white text-purple-500 hover:bg-gray-100 px-8 py-4 rounded-full text-lg"
                        asChild
                    >
                        <Link href="/freelancer">Veja Meus Trabalhos</Link>
                    </Button>
                </Section>
            </main>
        </div>
    );
}