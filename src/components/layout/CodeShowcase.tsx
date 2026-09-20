"use client";

import { useState } from "react";
import { Check, Copy, Maximize2 } from "lucide-react";
import {
    categories,
    codeHighlights,
    type CodeHighlight,
    type Localized,
} from "@/lib/codeShowcaseData";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Locale } from "@/lib/locale";

interface CodeShowcaseProps {
    lang: Locale;
}

const T = (lang: Locale, obj: Localized): string =>
    obj[lang] ?? obj.ptBR;

export function CodeShowcase({ lang }: CodeShowcaseProps) {
    const [filter, setFilter] = useState<string>("todos");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<CodeHighlight | null>(null);

    const visible =
        filter === "todos"
            ? codeHighlights
            : codeHighlights.filter((h) => h.category === filter);

    const copyCode = async (id: string, code: string) => {
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            /* clipboard indisponível — silencioso */
        }
        setCopiedId(id);
        window.setTimeout(() => {
            setCopiedId((cur) => (cur === id ? null : cur));
        }, 2000);
    };

    return (
        <div>
            {/* FILTRO POR CATEGORIA */}
            <div
                role="group"
                aria-label={T(lang, {
                    ptBR: "Filtrar trechos de código por categoria",
                    en: "Filter code snippets by category",
                    es: "Filtrar fragmentos de código por categoría",
                })}
                className="mb-10 flex flex-wrap items-center justify-center gap-2"
            >
                {categories.map((cat) => {
                    const isActive = filter === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setFilter(cat.id)}
                            className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e1ff] ${
                                isActive
                                    ? "border-[#00e1ff] bg-[#00e1ff] text-black shadow-[0_0_18px_rgba(0,225,255,0.4)]"
                                    : "border-border bg-background text-muted-foreground hover:border-[#00e1ff]/50 hover:text-foreground"
                            }`}
                        >
                            {T(lang, cat.label)}
                        </button>
                    );
                })}
            </div>

            {/* GRID DE TRECHOS */}
            <div className="grid auto-rows-fr grid-cols-1 gap-8 lg:grid-cols-2">
                {visible.map((item) => {
                    const Icon = item.icon;
                    const isCopied = copiedId === item.id;
                    return (
                        <article
                            key={item.id}
                            className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm"
                        >
                            <div className="flex flex-1 flex-col p-6 md:p-8">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00e1ff]/10 text-[#00e1ff]">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <h3 className="text-lg font-bold leading-snug md:text-xl">
                                        {T(lang, item.title)}
                                    </h3>
                                </div>
                                <p className="text-foreground/80 leading-relaxed">
                                    {T(lang, item.intro)}
                                </p>
                                <ul className="mt-5 flex flex-wrap gap-2" aria-label={T(lang, { ptBR: "Tecnologias", en: "Stack", es: "Tecnologías" })}>
                                    {item.stack.map((tag) => (
                                        <li
                                            key={tag}
                                            className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mx-0 overflow-hidden rounded-b-2xl border-t border-white/10 bg-[#0d1117]">
                                <div className="flex items-center justify-between gap-2 px-4 py-2.5">
                                    <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-slate-400">
                                        <span
                                            aria-hidden="true"
                                            className="h-2 w-2 shrink-0 rounded-full bg-[#00e1ff]"
                                        ></span>
                                        <span className="truncate">{item.fileName}</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(item)}
                                        aria-label={T(lang, {
                                            ptBR: `Ampliar código de ${T(lang, item.title)}`,
                                            en: `Expand code from ${T(lang, item.title)}`,
                                            es: `Ampliar código de ${T(lang, item.title)}`,
                                        })}
                                        className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-white/10 px-3 text-slate-300 transition-colors hover:border-[#00e1ff]/50 hover:text-[#00e1ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e1ff]"
                                    >
                                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => copyCode(item.id, item.code)}
                                        aria-label={
                                            isCopied
                                                ? T(lang, {
                                                      ptBR: "Código copiado",
                                                      en: "Code copied",
                                                      es: "Código copiado",
                                                  })
                                                : T(lang, {
                                                      ptBR: `Copiar código de ${T(lang, item.title)}`,
                                                      en: `Copy code from ${T(lang, item.title)}`,
                                                      es: `Copiar código de ${T(lang, item.title)}`,
                                                  })
                                        }
                                        className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e1ff] ${
                                            isCopied
                                                ? "bg-emerald-400 text-black"
                                                : "bg-[#00e1ff] text-black hover:bg-[#7deeff]"
                                        }`}
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                                {T(lang, { ptBR: "Copiado!", en: "Copied!", es: "¡Copiado!" })}
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                                {T(lang, { ptBR: "Copiar", en: "Copy", es: "Copiar" })}
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre
                                    aria-label={`${T(lang, item.title)} — ${item.fileName}`}
                                    className="h-52 overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-relaxed text-slate-200 md:h-60"
                                    tabIndex={0}
                                >
                                    <code>{item.code}</code>
                                </pre>
                                {/* Anúncio do resultado do copiar (leitor de tela) */}
                                <p aria-live="polite" className="sr-only">
                                    {isCopied
                                        ? T(lang, {
                                              ptBR: "Código copiado para a área de transferência",
                                              en: "Code copied to the clipboard",
                                              es: "Código copiado al portapapeles",
                                          })
                                        : ""}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* MODAL: código completo expandido */}
            <Dialog open={expanded !== null} onOpenChange={(open) => { if (!open) setExpanded(null); }}>
                <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0 sm:max-w-4xl">
                    <DialogHeader className="border-b border-white/10 px-5 py-4 pr-14 text-left">
                        <DialogTitle className="leading-snug">
                            {expanded ? T(lang, expanded.title) : ""}
                        </DialogTitle>
                        <DialogDescription className="font-mono text-xs break-all">
                            {expanded ? expanded.fileName : ""}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-[#0d1117]">
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-3">
                            <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-slate-400">
                                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#00e1ff]"></span>
                                <span className="truncate">{expanded?.fileName}</span>
                            </span>
                            {expanded && (
                                <button
                                    type="button"
                                    onClick={() => copyCode(expanded.id, expanded.code)}
                                    aria-label={
                                        copiedId === expanded.id
                                            ? T(lang, { ptBR: "Código copiado", en: "Code copied", es: "Código copiado" })
                                            : T(lang, {
                                                  ptBR: `Copiar código de ${T(lang, expanded.title)}`,
                                                  en: `Copy code from ${T(lang, expanded.title)}`,
                                                  es: `Copiar código de ${T(lang, expanded.title)}`,
                                              })
                                    }
                                    className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e1ff] ${
                                        copiedId === expanded.id
                                            ? "bg-emerald-400 text-black"
                                            : "bg-[#00e1ff] text-black hover:bg-[#7deeff]"
                                    }`}
                                >
                                    {copiedId === expanded.id ? (
                                        <>
                                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                            {T(lang, { ptBR: "Copiado!", en: "Copied!", es: "¡Copiado!" })}
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                            {T(lang, { ptBR: "Copiar", en: "Copy", es: "Copiar" })}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                        {expanded && (
                            <pre
                                aria-label={`${T(lang, expanded.title)} — ${expanded.fileName}`}
                                className="max-h-[70vh] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words p-5 font-mono text-[13px] leading-relaxed text-slate-200"
                                tabIndex={0}
                            >
                                <code>{expanded.code}</code>
                            </pre>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}