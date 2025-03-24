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

const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-purple-500 dark:text-purple-400">{children}</span>
);

export default function HomeContent() {
    const coverVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };
    const staggerText = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const staggerChild = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="">
            <main className="relative z-10">
                {/* Cover */}
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
                            className="text-foreground text-2xl md:text-4xl mb-10 font-light max-w-3xl tracking-tight"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <TextTranslator>
                                {{
                                    ptBR: "13 anos transformando ideias em sites e experiências digitais que conectam, impressionam e funcionam para todos.",
                                    en: "13 years turning ideas into websites and digital experiences that connect, impress, and work for everyone.",
                                    es: "13 años convirtiendo ideas en sitios web y experiencias digitales que conectan, impresionan y funcionan para todos.",
                                }}
                            </TextTranslator>
                        </motion.p>
                        <Button
                            asChild
                            className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 text-xl"
                        >
                            <Link href="/servicos">
                                <TextTranslator>
                                    {{
                                        ptBR: "Quero Meu Site!",
                                        en: "I Want My Site!",
                                        es: "¡Quiero Mi Sitio!",
                                    }}
                                </TextTranslator>
                            </Link>
                        </Button>
                    </Cover>
                </motion.div>

                {/* Sobre */}
                <Section label="sobre" className="py-32 bg-background">
                    <motion.div initial="hidden" whileInView="visible" variants={staggerText} viewport={{ once: true }}>
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-16 tracking-tight">
                            <motion.span variants={staggerChild}>
                                <TextTranslator>
                                    {{ ptBR: "Quem", en: "Who", es: "Quién" }}
                                </TextTranslator>
                            </motion.span>{" "}
                            <motion.span variants={staggerChild}>
                                <TextTranslator>
                                    {{ ptBR: "Sou", en: "I", es: "Soy" }}
                                </TextTranslator>
                            </motion.span>{" "}
                            <motion.span variants={staggerChild}>
                                <TextTranslator>
                                    {{ ptBR: "Eu", en: "Am", es: "Yo" }}
                                </TextTranslator>
                            </motion.span>
                        </h2>
                        <motion.p
                            variants={staggerChild}
                            className="text-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
                        >
                            <TextTranslator>
                                {{
                                    ptBR: (
                                        <>
                                            Sou Ezequiel Regino Monção, ou <Mark>Zecki</Mark>, um apaixonado por tecnologia e design com <Mark>13 anos de experiência</Mark>. Minha jornada começou unindo <Mark>arte</Mark> e <Mark>código</Mark>, criando soluções que equilibram beleza e funcionalidade. Trabalhei em startups, agências e, desde 2020, no <Mark>Senai</Mark>, onde desenvolvo cursos EAD com <Mark>React</Mark>, <Mark>Next.js</Mark>, <Mark>Tailwind</Mark> e integrações modernas como SCORM e APIs. Além disso, domino <Mark>design gráfico</Mark> (Illustrator, Photoshop) e <Mark>animações</Mark> (After Effects), trazendo vida a cada projeto. Meu foco? Criar experiências digitais <Mark>acessíveis</Mark>, <Mark>responsivas</Mark> e <Mark>impactantes</Mark> que qualquer pessoa possa usar e amar.
                                        </>
                                    ),
                                    en: (
                                        <>
                                            I’m Ezequiel Regino Monção, or <Mark>Zecki</Mark>, a tech and design enthusiast with <Mark>13 years of experience</Mark>. My journey started blending <Mark>art</Mark> and <Mark>code</Mark>, crafting solutions that balance beauty and functionality. I’ve worked at startups, agencies, and since 2020, at <Mark>Senai</Mark>, where I develop e-learning courses with <Mark>React</Mark>, <Mark>Next.js</Mark>, <Mark>Tailwind</Mark>, and modern integrations like SCORM and APIs. I also master <Mark>graphic design</Mark> (Illustrator, Photoshop) and <Mark>animations</Mark> (After Effects), bringing life to every project. My focus? Building <Mark>accessible</Mark>, <Mark>responsive</Mark>, and <Mark>impactful</Mark> digital experiences that anyone can use and love.
                                        </>
                                    ),
                                    es: (
                                        <>
                                            Soy Ezequiel Regino Monção, o <Mark>Zecki</Mark>, un apasionado por la tecnología y el diseño con <Mark>13 años de experiencia</Mark>. Mi viaje comenzó uniendo <Mark>arte</Mark> y <Mark>código</Mark>, creando soluciones que equilibran belleza y funcionalidad. Trabajé en startups, agencias y, desde 2020, en <Mark>Senai</Mark>, donde desarrollo cursos EAD con <Mark>React</Mark>, <Mark>Next.js</Mark>, <Mark>Tailwind</Mark> e integraciones modernas como SCORM y APIs. Además, domino <Mark>diseño gráfico</Mark> (Illustrator, Photoshop) y <Mark>animaciones</Mark> (After Effects), dando vida a cada proyecto. ¿Mi enfoque? Crear experiencias digitales <Mark>accesibles</Mark>, <Mark>responsivas</Mark> e <Mark>impactantes</Mark> que cualquiera pueda usar y amar.
                                        </>
                                    ),
                                }}
                            </TextTranslator>
                        </motion.p>
                    </motion.div>
                </Section>

                {/* Habilidades */}
                <Section label="habilidades" className="py-32 bg-muted">
                    <h2 className="text-4xl font-bold text-center text-foreground mb-12">
                        <TextTranslator>
                            {{
                                ptBR: "Minhas Ferramentas",
                                en: "My Tools",
                                es: "Mis Herramientas",
                            }}
                        </TextTranslator>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                titlePT: "Desenvolvimento Front-End",
                                titleEN: "Front-End Development",
                                titleES: "Desarrollo Front-End",
                                descPT: "Crio interfaces modernas com React, Next.js, Tailwind e animações com Framer Motion.",
                                descEN: "I create modern interfaces with React, Next.js, Tailwind, and animations with Framer Motion.",
                                descES: "Creo interfaces modernas con React, Next.js, Tailwind y animaciones con Framer Motion.",
                            },
                            {
                                titlePT: "Design e Multimídia",
                                titleEN: "Design and Multimedia",
                                titleES: "Diseño y Multimedia",
                                descPT: "Desenho layouts no Illustrator, edito vídeos no After Effects e crio artes que encantam.",
                                descEN: "I design layouts in Illustrator, edit videos in After Effects, and create captivating artwork.",
                                descES: "Diseño layouts en Illustrator, edito videos en After Effects y creo artes que encantan.",
                            },
                            {
                                titlePT: "Soluções CMS",
                                titleEN: "CMS Solutions",
                                titleES: "Soluciones CMS",
                                descPT: "Desenvolvo sistemas editáveis com Firebase, perfeitos para mini sites de clientes.",
                                descEN: "I develop editable systems with Firebase, perfect for client mini sites.",
                                descES: "Desarrollo sistemas editables con Firebase, perfectos para mini sitios de clientes.",
                            },
                        ].map((skill, index) => (
                            <motion.div
                                key={skill.titlePT}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Card className="hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>
                                            <TextTranslator>
                                                {{
                                                    ptBR: skill.titlePT,
                                                    en: skill.titleEN,
                                                    es: skill.titleES,
                                                }}
                                            </TextTranslator>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <TextTranslator>
                                            {{
                                                ptBR: skill.descPT,
                                                en: skill.descEN,
                                                es: skill.descES,
                                            }}
                                        </TextTranslator>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* CTA */}
                <Section label="cta" className="py-20 bg-purple-500 text-white text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        <TextTranslator>
                            {{
                                ptBR: "Seu Próximo Projeto Começa Aqui!",
                                en: "Your Next Project Starts Here!",
                                es: "¡Tu Próximo Proyecto Comienza Aquí!",
                            }}
                        </TextTranslator>
                    </motion.h2>
                    <Button
                        variant="outline"
                        className="bg-white text-purple-500 hover:bg-gray-100 px-10 py-5 rounded-full text-xl"
                        asChild
                    >
                        <Link href="/freelancer">
                            <TextTranslator>
                                {{
                                    ptBR: "Conheça Meus Trabalhos",
                                    en: "Check Out My Work",
                                    es: "Conoce Mis Trabajos",
                                }}
                            </TextTranslator>
                        </Link>
                    </Button>
                </Section>
            </main>
        </div>
    );
}