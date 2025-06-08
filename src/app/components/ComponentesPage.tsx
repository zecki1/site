"use client";

import { motion } from "framer-motion";
import { Container } from "lucide-react";
import GsapParallax from "@/components/gsap/GsapParallax";
import { Section } from "@/components/layout/Sections";
import { Flags } from "@/components/layout/Flags"; // Named import
import ScrollIndicator from "@/components/layout/ScrollIndicator";
import { Sidebar } from "@/components/layout/Sidebar";
import TextTranslator from "@/components/layout/TextTranslator";
import { Topic } from "@/components/layout/Topic";
import CanvasParticles from "@/components/gsap/CanvasParticles";
import GsapImageParallax from "@/components/gsap/GsapImageParallax";
import ScrollSmootherHeader from "@/components/gsap/ScrollSmootherHeader";
import ScrollSmootherThree from "@/components/gsap/ScrollSmootherThree";
import ScrollTriggerClamp from "@/components/gsap/ScrollTriggerClamp";
import SmoothScrollyImages from "@/components/gsap/SmoothScrollyImages";
import StaggeredText from "@/components/gsap/StaggeredText";
import { images } from "@/components/layout/ImageContainer";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

function ComponentsPage() {
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
        <div className="min-h-screen">
            <main className="relative z-10">
                <motion.div initial="hidden" animate="visible" variants={coverVariants}>
                    <GsapParallax
                        backgroundImage={images.capa}
                        className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-muted/70 to-muted-foreground/70 min-h-[80vh]"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                            <TextTranslator>
                                {{ ptBR: "Biblioteca de Componentes", en: "Components Library", es: "Biblioteca de Componentes" }}
                            </TextTranslator>
                        </h1>
                        <motion.p
                            className="text-foreground text-xl md:text-3xl mb-10 font-light max-w-3xl tracking-tight"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <TextTranslator>
                                {{
                                    ptBR: "Explore todos os meus componentes reutilizáveis em um só lugar, criados com paixão e precisão.",
                                    en: "Discover all my reusable components in one place, crafted with passion and precision.",
                                    es: "Explora todos mis componentes reutilizables en un solo lugar, creados con pasión y precisión.",
                                }}
                            </TextTranslator>
                        </motion.p>
                        <Button
                            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 text-lg tracking-tight"
                        >
                            <TextTranslator>
                                {{ ptBR: "Ver Exemplos", en: "See Examples", es: "Ver Ejemplos" }}
                            </TextTranslator>
                        </Button>
                    </GsapParallax>
                </motion.div>

                <Section label="components" className="py-32 bg-background">
                    <motion.div initial="hidden" whileInView="visible" variants={staggerText} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-16 tracking-tight">
                            <motion.span variants={staggerChild}>Todos</motion.span>{" "}
                            <motion.span variants={staggerChild}>os</motion.span>{" "}
                            <motion.span variants={staggerChild}>Componentes</motion.span>
                        </h2>
                        <motion.p
                            variants={staggerChild}
                            className="text-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12"
                        >
                            <TextTranslator>
                                {{
                                    ptBR: "Uma coleção de componentes reutilizáveis e modernos para acelerar seu desenvolvimento.",
                                    en: "A collection of reusable and modern components to speed up your development.",
                                    es: "Una colección de componentes reutilizables y modernos para acelerar tu desarrollo.",
                                }}
                            </TextTranslator>
                        </motion.p>

                        <div className="mb-16">
                            <h3 className="text-4xl font-bold text-center text-foreground mb-12">
                                <TextTranslator>{{ ptBR: "Layout", en: "Layout", es: "Diseño" }}</TextTranslator>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {[
                                    { title: "Container", content: <Container className="border p-4"><p>Exemplo</p></Container> },
                                    { title: "Flags", content: <Flags /> },
                                    { title: "ScrollIndicator", content: <ScrollIndicator /> },
                                    { title: "Sidebar", content: <Sidebar /> },
                                    { title: "TextTranslator", content: <TextTranslator>{{ ptBR: "Texto em português", en: "Text in English", es: "Texto en español" }}</TextTranslator> },
                                    { title: "Topic", content: <Topic label="exemplo"><p>Exemplo</p></Topic> },
                                ].map((comp, index) => (
                                    <motion.div
                                        key={comp.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="hover:shadow-lg transition-shadow duration-300">
                                            <CardHeader>
                                                <CardTitle>{comp.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>{comp.content}</CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-4xl font-bold text-center text-foreground mb-12">
                                <TextTranslator>{{ ptBR: "GSAP", en: "GSAP", es: "GSAP" }}</TextTranslator>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {[
                                    { title: "CanvasParticles", content: <CanvasParticles imageSrc={images.capa} className="h-64" /> },
                                    { title: "GsapImageParallax", content: <GsapImageParallax images={[images.capa]} className="h-64" /> },
                                    { title: "GsapParallax", content: <GsapParallax backgroundImage={images.capa} className="h-64"><p>Exemplo</p></GsapParallax> },
                                    { title: "ScrollSmootherHeader", content: <ScrollSmootherHeader className="h-64" /> },
                                    { title: "ScrollSmootherThree", content: <ScrollSmootherThree className="h-64" /> },
                                    { title: "ScrollTriggerClamp", content: <ScrollTriggerClamp className="h-64" /> },
                                    { title: "SmoothScrollyImages", content: <SmoothScrollyImages images={[images.capa]} className="h-64" /> },
                                    { title: "StaggeredText", content: <StaggeredText text="Texto Animado" /> },
                                ].map((comp, index) => (
                                    <motion.div
                                        key={comp.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="hover:shadow-lg transition-shadow duration-300">
                                            <CardHeader>
                                                <CardTitle>{comp.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>{comp.content}</CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <h3 className="text-4xl font-bold text-center text-foreground mb-12">
                                <TextTranslator>{{ ptBR: "shadcn/ui", en: "shadcn/ui", es: "shadcn/ui" }}</TextTranslator>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {[
                                    { title: "Button", content: <Button>Botão</Button> },
                                    { title: "Card", content: <Card><CardHeader><CardTitle>Título</CardTitle><CardDescription>Descrição</CardDescription></CardHeader><CardContent>Conteúdo</CardContent><CardFooter>Rodapé</CardFooter></Card> },
                                    { title: "Input", content: <Input placeholder="Digite aqui" /> },
                                    { title: "Sonner", content: <Button onClick={() => toast("Mensagem de exemplo")}>Mostrar Toast</Button> },
                                ].map((comp, index) => (
                                    <motion.div
                                        key={comp.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="hover:shadow-lg transition-shadow duration-300">
                                            <CardHeader>
                                                <CardTitle>{comp.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>{comp.content}</CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </Section>

                <Section label="cta" className="py-20 bg-purple-500 text-white text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        <TextTranslator>
                            {{ ptBR: "Quer Usar Esses Componentes?", en: "Want to Use These Components?", es: "¿Quieres Usar Estos Componentes?" }}
                        </TextTranslator>
                    </motion.h2>
                    <Button
                        variant="outline"
                        className="bg-white text-purple-500 hover:bg-gray-100 px-8 py-4 rounded-full text-lg"
                    >
                        <TextTranslator>
                            {{ ptBR: "Entre em Contato", en: "Get in Touch", es: "Contáctame" }}
                        </TextTranslator>
                    </Button>
                </Section>
            </main>
        </div>
    );
}

export default ComponentsPage;

export {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    toast as Sonner,
};