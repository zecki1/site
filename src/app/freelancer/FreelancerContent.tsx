// src/app/freelancer/FreelancerContent.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/layout/Sections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dados fictícios de projetos (substitua pelos seus reais)
const projects = [
    {
        title: "Curso EAD - Senai",
        description: "Desenvolvimento de um curso EAD com React, Tailwind e integração SCORM para AVA.",
        skills: ["React", "Tailwind", "API", "SCORM"],
    },
    {
        title: "Site Institucional",
        description: "Site responsivo para uma startup, com animações e design moderno.",
        skills: ["Next.js", "Framer Motion", "Illustrator"],
    },
    {
        title: "CMS Personalizado",
        description: "Mini site editável para um cliente, com gestão de contatos e relatórios.",
        skills: ["Next.js", "Firebase", "shadcn/ui"],
    },
];

export default function FreelancerContent() {
    // Animações
    const staggerCards = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto py-12">
                {/* Título */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12"
                >
                    Meus Trabalhos como Freelancer
                </motion.h1>

                {/* Seção de Projetos */}
                <Section label="projetos" className="mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={staggerCards}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {projects.map((project) => (
                            <motion.div key={project.title} variants={cardVariants}>
                                <Card className="hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4">{project.description}</p>
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

                {/* Seção de Contato */}
                <Section label="contato" className="text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl font-semibold mb-6"
                    >
                        Gostou? Vamos Trabalhar Juntos!
                    </motion.h2>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="mailto:seuemail@exemplo.com">Me envie um email</Link>
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