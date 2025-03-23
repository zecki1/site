// src/app/servicos/ServicosContent.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/layout/Sections";
import { Button } from "@/components/ui/button";

export default function ServicosContent() {
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
                    Meus Serviços
                </motion.h1>

                {/* Seção CMS */}
                <Section label="cms" className="mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-semibold mb-6">CMS para Mini Sites</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            Crie seu site personalizado com meu CMS gratuito. Edite conteúdo, gerencie contatos e notifique seus clientes por email ou WhatsApp quando atualizar seu site.
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground">
                            <li>Gratuito: Até 1 GB de armazenamento com Firebase Spark.</li>
                            <li>Futuro: Autenticação, notificações automáticas e escalabilidade.</li>
                        </ul>
                    </motion.div>
                </Section>

                {/* Seção Contato */}
                <Section label="contato" className="text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl font-semibold mb-6"
                    >
                        Quer um Site Incrível?
                    </motion.h2>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="mailto:seuemail@exemplo.com">Solicitar Orçamento</Link>
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