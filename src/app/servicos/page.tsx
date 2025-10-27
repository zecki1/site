"use client";

import React from 'react';
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { servicesData } from '@/lib/servicesData';
import TextTranslator from '@/components/layout/TextTranslator';
import FloatingParticles from "@/components/effects/FloatingParticles";

// NENHUMA MUDANÇA NESTE ARQUIVO. A ANIMAÇÃO É CONTROLADA PELO TAILWIND.CONFIG.TS

const sectionAnimation = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" } };

export default function ServicesPage() {
    return (
        <div className="relative bg-background text-foreground min-h-screen overflow-hidden isolate pt-40 md:pt-60">

            <div className="absolute inset-0 -z-10">
                <FloatingParticles />
            </div>

            <div className="container mx-auto px-4 py-16">

                <motion.header {...sectionAnimation} className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                        <TextTranslator ignoreCheck={true}>
                            {{ ptBR: "Serviços", en: "Services", es: "Servicios" }}
                        </TextTranslator>
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#00e1ff] to-primary mb-6 text-balance">
                        <TextTranslator ignoreCheck={true}>
                            {{ ptBR: "Soluções Personalizadas para Seu Sucesso Digital", en: "Custom Solutions for Your Digital Success", es: "Soluciones Personalizadas para Tu Éxito Digital" }}
                        </TextTranslator>
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance">
                        <TextTranslator ignoreCheck={true}>
                            {{
                                ptBR: "Cada serviço é projetado para transformar suas ideias em resultados concretos, conectando requisitos de negócio a protocolos eficientes e otimizados para performance.",
                                en: "Each service is designed to turn your ideas into concrete results, connecting business requirements to efficient, performance-optimized protocols.",
                                es: "Cada servicio está diseñado para transformar tus ideas en resultados concretos, conectando los requisitos del negocio con protocolos eficientes y optimizados para el rendimiento."
                            }}
                        </TextTranslator>
                    </p>
                </motion.header >

                <motion.div
                    {...sectionAnimation}
                    className="max-w-4xl mx-auto bg-background/70 backdrop-blur-md p-4 md:p-8 rounded-2xl border border-border/10"
                >
                    <Accordion type="single" collapsible className="w-full" defaultValue={servicesData[0].id}>
                        {servicesData.map((service) => (
                            <AccordionItem value={service.id} key={service.id} className="border-b border-border/10">
                                <AccordionTrigger className="text-left hover:no-underline">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-muted rounded-md text-primary">
                                            <service.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground">
                                            <TextTranslator ignoreCheck={true}>{service.title}</TextTranslator>
                                        </h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-4 pb-6 px-2">
                                    <p className="text-lg text-muted-foreground mb-8">
                                        <TextTranslator ignoreCheck={true}>{service.description}</TextTranslator>
                                    </p>
                                    <div className="space-y-6 border-l-2 border-primary/20 pl-6">
                                        {service.details.map((detail, index) => (
                                            <div key={index}>
                                                <h4 className="font-semibold text-lg mb-2 text-primary">
                                                    <TextTranslator ignoreCheck={true}>{detail.title}</TextTranslator>
                                                </h4>
                                                <p className="text-muted-foreground">
                                                    <TextTranslator ignoreCheck={true}>{detail.content}</TextTranslator>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </div>
    );
}