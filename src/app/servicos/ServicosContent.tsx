// src/app/servicos/ServicosContent.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/layout/Sections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextTranslator from "@/components/layout/TextTranslator";

export default function ServicosContent() {
    const staggerCards = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const benefits = [
        {
            title: {
                ptBR: "Gratuito",
                en: "Free",
                es: "Gratuito",
            },
            desc: {
                ptBR: "Sem custos iniciais.",
                en: "No initial costs.",
                es: "Sin costos iniciales.",
            },
        },
        {
            title: {
                ptBR: "Personalizado",
                en: "Customized",
                es: "Personalizado",
            },
            desc: {
                ptBR: "Sites únicos.",
                en: "Unique websites.",
                es: "Sitios únicos.",
            },
        },
        {
            title: {
                ptBR: "Suporte",
                en: "Support",
                es: "Soporte",
            },
            desc: {
                ptBR: "Ajuda direta.",
                en: "Direct assistance.",
                es: "Asistencia directa.",
            },
        },
    ];

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
                            ptBR: "Meus Serviços",
                            en: "My Services",
                            es: "Mis Servicios",
                        }}
                    </TextTranslator>
                </motion.h1>
                <Section label="cms" className="mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-semibold mb-6">
                            <TextTranslator>
                                {{
                                    ptBR: "CMS para Mini Sites",
                                    en: "CMS for Mini Sites",
                                    es: "CMS para Mini Sitios",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
                            <TextTranslator>
                                {{
                                    ptBR: "Crie e edite mini sites incríveis com meu CMS gratuito, com notificações por email ou WhatsApp.",
                                    en: "Create and edit amazing mini sites with my free CMS, with email or WhatsApp notifications.",
                                    es: "Crea y edita mini sitios increíbles con mi CMS gratuito, con notificaciones por email o WhatsApp.",
                                }}
                            </TextTranslator>
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mb-6">
                            <li>
                                <strong>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Gratuito",
                                            en: "Free",
                                            es: "Gratuito",
                                        }}
                                    </TextTranslator>
                                </strong>
                                :{" "}
                                <TextTranslator>
                                    {{
                                        ptBR: "Até 1 GB com Firebase Spark.",
                                        en: "Up to 1 GB with Firebase Spark.",
                                        es: "Hasta 1 GB con Firebase Spark.",
                                    }}
                                </TextTranslator>
                            </li>
                            <li>
                                <strong>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Fácil",
                                            en: "Easy",
                                            es: "Fácil",
                                        }}
                                    </TextTranslator>
                                </strong>
                                :{" "}
                                <TextTranslator>
                                    {{
                                        ptBR: "Interface intuitiva.",
                                        en: "Intuitive interface.",
                                        es: "Interfaz intuitiva.",
                                    }}
                                </TextTranslator>
                            </li>
                            <li>
                                <strong>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Notificações",
                                            en: "Notifications",
                                            es: "Notificaciones",
                                        }}
                                    </TextTranslator>
                                </strong>
                                :{" "}
                                <TextTranslator>
                                    {{
                                        ptBR: "Manual agora, automático em breve.",
                                        en: "Manual now, automatic soon.",
                                        es: "Manual ahora, automático pronto.",
                                    }}
                                </TextTranslator>
                            </li>
                        </ul>
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4">
                        <TextTranslator>
                            {{
                                ptBR: "Por Que Escolher Meu CMS?",
                                en: "Why Choose My CMS?",
                                es: "¿Por Qué Elegir Mi CMS?",
                            }}
                        </TextTranslator>
                    </h3>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={staggerCards}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {benefits.map((benefit) => (
                            <motion.div key={benefit.title.ptBR} variants={cardVariants}>
                                <Card className="hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>
                                            <TextTranslator>{benefit.title}</TextTranslator>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <TextTranslator>{benefit.desc}</TextTranslator>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </Section>
                <Section label="exemplos" className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">
                        <TextTranslator>
                            {{
                                ptBR: "Como Posso Ajudar Você",
                                en: "How I Can Help You",
                                es: "Cómo Puedo Ayudarte",
                            }}
                        </TextTranslator>
                    </h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        <TextTranslator>
                            {{
                                ptBR: "Sites para portfólios, lojas pequenas, blogs pessoais — tudo com edição simples e design moderno.",
                                en: "Websites for portfolios, small stores, personal blogs — all with simple editing and modern design.",
                                es: "Sitios web para portafolios, tiendas pequeñas, blogs personales — todo con edición simple y diseño moderno.",
                            }}
                        </TextTranslator>
                    </p>
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
                                ptBR: "Vamos Começar Seu Site?",
                                en: "Ready to Start Your Website?",
                                es: "¿Listo para Empezar Tu Sitio?",
                            }}
                        </TextTranslator>
                    </motion.h2>
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