"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import TextTranslator from "@/components/layout/TextTranslator";
import { Github, Linkedin, Mail } from "lucide-react";
import { ConstellationParticles } from "@/components/gsap/CanvasParticles";

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function ContactPage() {
    // A sua cor de destaque
    const highlightColorClass = "hover:text-[#00e1ff]";

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center bg-background p-8 overflow-hidden">
            {/* Troque o componente de partículas antigo por este */}
            <ConstellationParticles />

            {/* O resto do conteúdo permanece o mesmo */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center gap-8"
            >
                <motion.h3 variants={staggerItem} className="text-md uppercase tracking-widest text-muted-foreground">
                    <TextTranslator>
                        {{ ptBR: "Tem uma ideia?", en: "Have an idea?", es: "¿Tienes una idea?" }}
                    </TextTranslator>
                </motion.h3>

                <motion.h1 variants={staggerItem} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                    <TextTranslator>
                        {{ ptBR: "Vamos conversar.", en: "Let's talk.", es: "Hablemos." }}
                    </TextTranslator>
                </motion.h1>

                <motion.a
                    variants={staggerItem}
                    href="mailto:zecki1@hotmail.com"
                    className={`text-xl md:text-3xl text-muted-foreground ${highlightColorClass} transition-colors duration-300 flex items-center gap-3 group`}
                >
                    <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>zecki1@hotmail.com</span>
                </motion.a>

                <motion.div variants={staggerItem} className="flex items-center gap-6 mt-8">
                    <Link
                        href="https://github.com/zecki1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={`text-muted-foreground ${highlightColorClass} transition-colors`}
                    >
                        <Github className="w-8 h-8 transition-transform hover:scale-110" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/zecki1"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className={`text-muted-foreground ${highlightColorClass} transition-colors`}
                    >
                        <Linkedin className="w-8 h-8 transition-transform hover:scale-110" />
                    </Link>
                </motion.div>

            </motion.div>
        </section>
    );
}