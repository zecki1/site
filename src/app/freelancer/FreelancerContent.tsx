// src/app/freelancer/FreelancerContent.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/layout/Sections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextTranslator from "@/components/layout/TextTranslator";

const projects = [
    {
        title: {
            ptBR: "Cursos EAD - Senai (2020 - Atual)",
            en: "EAD Courses - Senai (2020 - Present)",
            es: "Cursos EAD - Senai (2020 - Actual)",
        },
        description: {
            ptBR: "Desenvolvimento de cursos EAD interativos para o Senai, utilizando React, Tailwind e shadcn/ui. Integração com APIs e SCORM para plataformas AVA, além de design de interfaces e animações.",
            en: "Development of interactive EAD courses for Senai, using React, Tailwind, and shadcn/ui. Integration with APIs and SCORM for LMS platforms, plus interface design and animations.",
            es: "Desarrollo de cursos EAD interactivos para Senai, utilizando React, Tailwind y shadcn/ui. Integración con APIs y SCORM para plataformas AVA, además de diseño de interfaces y animaciones.",
        },
        skills: ["React", "Tailwind", "shadcn/ui", "SCORM", "APIs"], // Skills não precisam de tradução
    },
    {
        title: {
            ptBR: "Site para Pequena Empresa",
            en: "Website for Small Business",
            es: "Sitio web para Pequeña Empresa",
        },
        description: {
            ptBR: "Criação de um site responsivo para uma startup local, com foco em usabilidade, animações sutis e SEO otimizado, entregue em tempo recorde.",
            en: "Creation of a responsive website for a local startup, focusing on usability, subtle animations, and optimized SEO, delivered in record time.",
            es: "Creación de un sitio web responsivo para una startup local, con enfoque en usabilidad, animaciones sutiles y SEO optimizado, entregado en tiempo récord.",
        },
        skills: ["Next.js", "Framer Motion", "Tailwind", "SEO"],
    },
    {
        title: {
            ptBR: "Mini CMS para Cliente",
            en: "Mini CMS for Client",
            es: "Mini CMS para Cliente",
        },
        description: {
            ptBR: "Sistema de mini site editável hospedado no Firebase, com gestão de contatos e relatórios básicos, ideal para pequenos negócios.",
            en: "Editable mini site system hosted on Firebase, with contact management and basic reports, ideal for small businesses.",
            es: "Sistema de mini sitio editable alojado en Firebase, con gestión de contactos e informes básicos, ideal para pequeños negocios.",
        },
        skills: ["Next.js", "Firebase", "shadcn/ui", "CMS"],
    },
];

export default function FreelancerContent() {
    const staggerCards = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-[200vh] bg-background pt-10">
            <main className="container mx-auto py-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12"
                >
                    <TextTranslator>
                        {{
                            ptBR: "Meus Trabalhos como Freelancer",
                            en: "My Freelance Work",
                            es: "Mis Trabajos como Freelancer",
                        }}
                    </TextTranslator>
                </motion.h1>

                <Section label="projetos" className="mb-16">
                    <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                        <TextTranslator>
                            {{
                                ptBR: "Aqui estão alguns dos projetos que desenvolvi ao longo de 13 anos, combinando criatividade, tecnologia e um toque pessoal para entregar resultados únicos.",
                                en: "Here are some of the projects I’ve developed over 13 years, blending creativity, technology, and a personal touch to deliver unique results.",
                                es: "Aquí están algunos de los proyectos que desarrollé durante 13 años, combinando creatividad, tecnología y un toque personal para entregar resultados únicos.",
                            }}
                        </TextTranslator>
                    </p>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={staggerCards}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {projects.map((project) => (
                            <motion.div key={project.title.ptBR} variants={cardVariants}>
                                <Card className="hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>
                                            <TextTranslator>{project.title}</TextTranslator>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4">
                                            <TextTranslator>{project.description}</TextTranslator>
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </Section>

                <Section label="contato" className="text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl font-semibold mb-6"
                    >
                        <TextTranslator>
                            {{
                                ptBR: "Pronto para Seu Próximo Projeto?",
                                en: "Ready for Your Next Project?",
                                es: "¿Listo para Tu Próximo Proyecto?",
                            }}
                        </TextTranslator>
                    </motion.h2>
                    <p className="text-muted-foreground mb-6">
                        <TextTranslator>
                            {{
                                ptBR: "Entre em contato e vamos transformar sua ideia em realidade!",
                                en: "Get in touch and let’s turn your idea into reality!",
                                es: "¡Ponte en contacto y convirtamos tu idea en realidad!",
                            }}
                        </TextTranslator>
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="mailto:seuemail@exemplo.com">
                                <TextTranslator>
                                    {{
                                        ptBR: "Solicitar Orçamento",
                                        en: "Request a Quote",
                                        es: "Solicitar Presupuesto",
                                    }}
                                </TextTranslator>
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://wa.me/5511999999999" target="_blank">
                                WhatsApp
                            </Link>
                        </Button>
                    </div>
                </Section>
            </main>
        </div>
    );
}