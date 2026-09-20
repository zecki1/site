"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, ArrowRight, MousePointerClick, TreeDeciduous } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    JOURNEY,
    SKILLS,
    SKILL_MAP,
    LEVELS,
    LEVEL_ORDER,
    KIND_META,
    CONTRACT_META,
    getEntryMeta,
    type JourneyEntry,
    type EntryKind,
    type SkillLevel,
    type LocaleText,
} from "@/lib/journeyData";

type Lang = "ptBR" | "en" | "es";

const LEVEL_LABELS: Record<SkillLevel, LocaleText> = {
    intro: {
        ptBR: "Aprendi",
        en: "Learned",
        es: "Aprendí",
    },
    applied: {
        ptBR: "Apliquei",
        en: "Applied",
        es: "Apliqué",
    },
    master: {
        ptBR: "Domino",
        en: "Master",
        es: "Domino",
    },
};

interface SkillStep {
    milestone: JourneyEntry;
    level: SkillLevel;
}

function CareerTimeline({ lang }: { lang: Lang }) {
    const t = (o: LocaleText) => o[lang] ?? o.ptBR;
    const [filterKind, setFilterKind] = useState<EntryKind | "all">("all");
    const [focusSkill, setFocusSkill] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    // Índice: onde cada habilidade aparece, em ordem cronológica -> "árvore".
    const skillTree = useMemo(() => {
        const map = new Map<string, SkillStep[]>();
        JOURNEY.forEach((milestone) => {
            milestone.skills.forEach((use) => {
                const list = map.get(use.id) ?? [];
                list.push({ milestone, level: use.level });
                map.set(use.id, list);
            });
        });
        return map;
    }, []);

    const focusedSkill = focusSkill ? SKILL_MAP[focusSkill] : null;
    const focusedPath = focusSkill ? skillTree.get(focusSkill) ?? [] : [];

    const visible = JOURNEY.filter((m) => filterKind === "all" || m.kind === filterKind);

    const toggleExpand = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    const kindFilters: Array<EntryKind | "all"> = ["all", "work", "study", "project"];

    return (
        <div className="relative">
            {/* CONTROLES */}
            <div className="mb-6 flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {kindFilters.map((kind) => {
                            const active = filterKind === kind;
                            const count =
                                kind === "all" ? JOURNEY.length : JOURNEY.filter((m) => m.kind === kind).length;
                            return (
                                <button
                                    key={kind}
                                    type="button"
                                    onClick={() => setFilterKind(kind)}
                                    className={cn(
                                        "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                                        active
                                            ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
                                            : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                    )}
                                >
                                    {kind === "all" ? t({ ptBR: "Tudo", en: "All", es: "Todo" }) : t(KIND_META[kind].label)}
                                    <span className="ml-1.5 text-xs opacity-60">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <MousePointerClick className="h-4 w-4" />
                        {t({
                            ptBR: "Clique numa habilidade para ver a árvore dela",
                            en: "Click a skill to see its tree",
                            es: "Haz clic en una habilidad para ver su árbol",
                        })}
                    </span>
                </div>

                {/* CHIPS DE HABILIDADES */}
                <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => {
                        const active = focusSkill === skill.id;
                        const occurrences = skillTree.get(skill.id)?.length ?? 0;
                        return (
                            <button
                                key={skill.id}
                                type="button"
                                onClick={() => setFocusSkill(active ? null : skill.id)}
                                title={`${skill.label[lang] ?? skill.label.ptBR} — ${occurrences}x`}
                                className={cn(
                                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-all",
                                    skill.accent,
                                    active
                                        ? "scale-105 ring-2 ring-current shadow-md"
                                        : "hover:scale-105"
                                )}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span
                                        className={cn(
                                            "h-2 w-2 rounded-full",
                                            skill.dot,
                                            active && "animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-60"
                                        )}
                                    />
                                    <span className={cn("absolute h-2 w-2 rounded-full", skill.dot)} />
                                </span>
                                <span>{t(skill.label)}</span>
                                <span className="text-[10px] opacity-70">×{occurrences}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* PAINEL DA ÁRVORE DA HABILIDADE FOCADA */}
            <AnimatePresence>
                {focusedSkill && (
                    <motion.div
                        key={focusedSkill.id}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background p-6 md:p-8">
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00e1ff]/60 to-transparent" />
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={cn(
                                            "flex h-11 w-11 items-center justify-center rounded-xl",
                                            focusedSkill.accent
                                        )}
                                    >
                                        <TreeDeciduous className="h-6 w-6" />
                                    </span>
                                    <div>
                                        <p className="text-lg font-bold leading-tight">{t(focusedSkill.label)}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {t({
                                                ptBR: "Onde essa habilidade cresceu",
                                                en: "Where this skill grew",
                                                es: "Dónde creció esta habilidad",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFocusSkill(null)}
                                    aria-label={t({ ptBR: "Limpar seleção", en: "Clear selection", es: "Limpiar selección" })}
                                    className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Trilha de evolução: nós conectados */}
                            <div className="mt-6 flex items-stretch gap-2 overflow-x-auto pb-2 md:gap-3">
                                {focusedPath.map((step, i) => {
                                    const level = LEVELS[step.level];
                                    const isFirst = i === 0;
                                    const isLast = i === focusedPath.length - 1;
                                    return (
                                        <div key={step.milestone.id} className="flex shrink-0 items-stretch">
                                            {!isFirst && (
                                                <div className="mr-2 flex items-center md:mr-3">
                                                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div
                                                className="w-44 rounded-xl border border-border/60 bg-muted/20 p-3 transition-colors hover:border-current md:w-52"
                                                style={{ color: "inherit" }}
                                            >
                                                <div
                                                    className={cn(
                                                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold",
                                                        level.chip
                                                    )}
                                                >
                                                    <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", level.dot)} />
                                                    {isFirst
                                                        ? t({ ptBR: "Origem", en: "Origin", es: "Origen" })
                                                        : isLast
                                                            ? t({ ptBR: "Hoje", en: "Today", es: "Hoy" })
                                                            : t(LEVEL_LABELS[step.level])}
                                                </div>
                                                <p className="mt-2 text-xs font-semibold text-foreground">
                                                    {t(step.milestone.title)}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground">{step.milestone.period}</p>
                                                <div className="mt-2 flex items-center gap-1">
                                                    {LEVEL_ORDER.map((_, dotIndex) => (
                                                        <span
                                                            key={dotIndex}
                                                            className={cn(
                                                                "h-1.5 flex-1 rounded-full transition-colors",
                                                                dotIndex < level.steps ? "bg-current" : "bg-muted"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">
                                {t({
                                    ptBR: `${focusedPath.length} ${focusedPath.length === 1 ? "etapa" : "etapas"} conectadas à essa habilidade.`,
                                    en: `${focusedPath.length} ${focusedPath.length === 1 ? "step" : "steps"} connected to this skill.`,
                                    es: `${focusedPath.length} ${focusedPath.length === 1 ? "paso" : "pasos"} conectados a esta habilidad.`,
                                })}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TIMELINE / TRONCO */}
            <div className="relative mx-auto max-w-5xl">
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="pointer-events-none absolute left-4 top-0 h-full w-px origin-top bg-linear-to-b from-[#00e1ff]/60 via-[#00e1ff]/25 to-transparent md:left-1/2 md:-translate-x-1/2"
                />

                <div className="space-y-8 md:space-y-10">
                    {visible.map((milestone, index) => {
                        const isLeft = index % 2 === 0;
                        const isOpen = expanded[milestone.id] ?? false;
                        const hasFocus =
                            focusSkill != null && milestone.skills.some((s) => s.id === focusSkill);
                        const dimmed = focusSkill != null && !hasFocus;
                        const meta = getEntryMeta(milestone);

                        return (
                            <div
                                key={milestone.id}
                                className={cn(
                                    "relative md:grid md:grid-cols-2 md:gap-12",
                                    !isLeft && "md:col-start-1"
                                )}
                            >
                                {/* Nó no tronco */}
                                <span
                                    className={cn(
                                        "absolute left-4 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-500 md:left-1/2 md:h-10 md:w-10",
                                        hasFocus ? "scale-110 ring-4" : "border-white/10"
                                    )}
                                    style={
                                        hasFocus && focusedSkill
                                            ? { borderColor: focusedSkill.hex, boxShadow: `0 0 0 4px ${focusedSkill.hex}22` }
                                            : undefined
                                    }
                                >
                                    <meta.icon
                                        className={cn(
                                            "h-4 w-4 transition-colors",
                                            !hasFocus && "text-muted-foreground"
                                        )}
                                        style={hasFocus && focusedSkill ? { color: focusedSkill.hex } : undefined}
                                    />
                                </span>

                                {/* Conector lateral do galho */}
                                <div
                                    aria-hidden
                                    className={cn(
                                        "absolute top-10 hidden h-px w-12 md:block",
                                        isLeft
                                            ? "right-1/2 bg-linear-to-l from-[#00e1ff]/50 to-transparent md:mr-8"
                                            : "left-1/2 bg-linear-to-r from-[#00e1ff]/50 to-transparent md:ml-8"
                                    )}
                                />

                                <div
                                    className={cn(
                                        "ml-12 md:ml-0",
                                        isLeft ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12"
                                    )}
                                >
                                    <motion.article
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={cn(
                                            "group rounded-2xl border border-white/10 dark:border-border/50 bg-background p-5 transition-all duration-500 md:p-6",
                                            dimmed && "opacity-35 saturate-50",
                                            hasFocus && "shadow-lg"
                                        )}
                                        style={hasFocus && focusedSkill ? { borderColor: focusedSkill.hex, boxShadow: `0 8px 40px -12px ${focusedSkill.hex}66` } : undefined}
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold", meta.accent)}>
                                                <meta.icon className="mr-1.5 h-3.5 w-3.5" />
                                                {t(meta.label)}
                                            </span>
                                            {milestone.kind === "work" && milestone.contract && (
                                                <span
                                                    className={cn(
                                                        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold",
                                                        CONTRACT_META[milestone.contract].accent
                                                    )}
                                                >
                                                    {milestone.contract}
                                                </span>
                                            )}
                                            <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                                                {milestone.period}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => toggleExpand(milestone.id)}
                                                aria-expanded={isOpen}
                                                className="ml-auto inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                                            >
                                                {isOpen
                                                    ? t({ ptBR: "Recolher", en: "Collapse", es: "Contraer" })
                                                    : t({
                                                        ptBR: "Explorar",
                                                        en: "Explore",
                                                        es: "Explorar",
                                                    })}
                                                <ChevronDown
                                                    className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
                                                />
                                            </button>
                                        </div>

                                        <h3 className="mt-3 text-xl font-bold leading-tight md:text-2xl">
                                            {t(milestone.title)}
                                        </h3>
                                        <p className="text-sm font-medium text-muted-foreground">{t(milestone.org)}</p>
                                        <p className="mt-3 text-muted-foreground">{t(milestone.summary)}</p>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-4 space-y-4 border-t border-border/60 pt-4">
                                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                                            {t(milestone.details)}
                                                        </p>
                                                        <div>
                                                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                                {t({
                                                                    ptBR: "Habilidades neste marco",
                                                                    en: "Skills in this milestone",
                                                                    es: "Habilidades en este hito",
                                                                })}
                                                            </p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {milestone.skills.map((use) => {
                                                                    const info = SKILL_MAP[use.id];
                                                                    const lvl = LEVELS[use.level];
                                                                    const activeUse = focusSkill === use.id;
                                                                    return (
                                                                        <button
                                                                            key={use.id}
                                                                            type="button"
                                                                            onClick={() => setFocusSkill(activeUse ? null : use.id)}
                                                                            title={t(LEVEL_LABELS[use.level])}
                                                                            className={cn(
"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-all",
                                                info.accent,
                                                                                activeUse && "ring-2 ring-current"
                                                                            )}
                                                                        >
                                                                            <span className={cn("h-1.5 w-1.5 rounded-full", lvl.dot)} />
                                                                            {t(info.label)}
                                                                            <span className="text-[10px] opacity-60">{t(LEVEL_LABELS[use.level])}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* LEGENDA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                {LEVEL_ORDER.map((level) => {
                    const lvl = LEVELS[level];
                    return (
                        <span key={level} className="inline-flex items-center gap-1.5">
                            <span className={cn("h-2 w-2 rounded-full", lvl.dot)} />
                            {t(LEVEL_LABELS[level])}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default CareerTimeline;