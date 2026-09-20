"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, FileCode2, ArrowLeft, Github } from "lucide-react";
import Link from "next/link";
import TextTranslator from "@/components/layout/TextTranslator";
import {
    categories,
    codeHighlights,
    type CodeCategory,
} from "@/lib/codeShowcaseData";
import { cn } from "@/lib/utils";

const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const },
};

const CodeBlock: React.FC<{ code: string; fileName: string }> = ({ code, fileName }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1017] dark:bg-black/60 shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-300">
                    <FileCode2 className="h-3.5 w-3.5 shrink-0 text-[#00e1ff]" />
                    <span className="truncate font-mono">{fileName}</span>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-xs text-slate-200 transition-colors hover:border-[#00e1ff]/50 hover:text-[#00e1ff]"
                    aria-label="Copiar código"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copiado!" : "Copiar"}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default function CodigoPage() {
    const [active, setActive] = useState<CodeCategory | "todos">("todos");

    const highlights = useMemo(
        () =>
            active === "todos"
                ? codeHighlights
                : codeHighlights.filter((h) => h.category === active),
        [active]
    );

    return (
        <>
            {/* Cabeçalho */}
            <section className="py-24 md:py-32">
                <div className="u-container">
                    <motion.header {...sectionAnimation} className="mx-auto max-w-3xl text-center">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-[#00e1ff]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Voltar para o início", en: "Back to home", es: "Volver al inicio" }}
                            </TextTranslator>
                        </Link>
                        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Código em Destaque", en: "Code Showcase", es: "Código Destacado" }}
                            </TextTranslator>
                        </h1>
                        <h2 className="mt-4 bg-linear-to-r from-blue-400 via-[#00e1ff] to-blue-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Do que este site é feito, com a prova",
                                    en: "What this site is made of, with proof",
                                    es: "De qué está hecho este sitio, con la prueba",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Trechos reais que estão no ar aqui — acessibilidade, GSAP, integrações, performance e i18n. Cada card conecta o conceito ao arquivo de verdade, com o código completo para copiar.",
                                    en: "Real snippets that are live here — accessibility, GSAP, integrations, performance, and i18n. Each card connects the concept to the real file, with the full code ready to copy.",
                                    es: "Fragmentos reales que están en vivo aquí: accesibilidad, GSAP, integraciones, rendimiento e i18n. Cada tarjeta conecta el concepto con el archivo real y el código completo para copiar.",
                                }}
                            </TextTranslator>
                        </p>
                    </motion.header>
                </div>
            </section>

            {/* Filtro por categoria */}
            <section className="pb-16 md:pb-20">
                <div className="u-container">
                    <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filtrar por categoria">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                aria-selected={active === cat.id}
                                onClick={() => setActive(cat.id)}
                                className={cn(
                                    "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                                    active === cat.id
                                        ? "border-[#00e1ff]/60 bg-[#00e1ff]/10 text-[#00e1ff]"
                                        : "border-white/10 bg-background text-muted-foreground hover:border-[#00e1ff]/40 hover:text-[#00e1ff]"
                                )}
                            >
                                <TextTranslator ignoreCheck={true}>{cat.label}</TextTranslator>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cards de código */}
            <section className="pb-24 md:pb-32">
                <div className="u-container">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {highlights.map((highlight, index) => (
                            <motion.article
                                key={highlight.id}
                                {...sectionAnimation}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 * (index % 2) }}
                                className="flex flex-col rounded-2xl border border-white/10 bg-background p-6 transition-colors hover:border-[#00e1ff]/40 md:p-8"
                            >
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00e1ff]/10 text-[#00e1ff]">
                                            <highlight.icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="text-xl font-bold leading-tight">
                                            <TextTranslator ignoreCheck={true}>{highlight.title}</TextTranslator>
                                        </h3>
                                    </div>
                                    <span className="shrink-0 rounded-full border border-[#00e1ff]/30 bg-[#00e1ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#00e1ff]">
                                        <TextTranslator ignoreCheck={true}>
                                            {categories.find((c) => c.id === highlight.category)?.label ?? categories[0].label}
                                        </TextTranslator>
                                    </span>
                                </div>

                                <p className="mb-6 text-muted-foreground">
                                    <TextTranslator ignoreCheck={true}>{highlight.intro}</TextTranslator>
                                </p>

                                <div className="mt-auto">
                                    <CodeBlock code={highlight.code} fileName={highlight.fileName} />
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {highlight.stack.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <motion.div {...sectionAnimation} className="mt-16 flex flex-col items-center gap-4 text-center">
                        <p className="max-w-xl text-muted-foreground">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Todo este código é de verdade: é o que roda neste site agora. Quer ver o restante do painel ativo, o dashboard e os outros projetos?",
                                    en: "All this code is real: it's what powers this site right now. Want to see the rest — the live CMS panel, dashboard, and other projects?",
                                    es: "Todo este código es real: es lo que hace funcionar este sitio ahora. ¿Quieres ver el resto: el panel CMS, el dashboard y otros proyectos?",
                                }}
                            </TextTranslator>
                        </p>
                        <a
                            href="https://github.com/zecki1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background px-6 py-3 font-semibold text-muted-foreground transition-colors hover:border-[#00e1ff]/50 hover:text-[#00e1ff]"
                        >
                            <Github className="h-5 w-5" />
                            GitHub
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}