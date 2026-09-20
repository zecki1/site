"use client";

import { ComponentType, MouseEvent, useEffect, useRef, useState } from "react";
import {
    Briefcase,
    Code2,
    Cpu,
    Home,
    Mail,
    Rocket,
    Route,
    Sparkles,
    User,
} from "lucide-react";

type IconType = ComponentType<{ className?: string }>;

export interface GameNavItem {
    href: string;
    label: string;
}

interface GameNavProps {
    items: GameNavItem[];
    label?: string;
}

// Ícone fixo por ancora da home. Fallback: Home (caso mude).
const ICONS: Record<string, IconType> = {
    "#inicio": Home,
    "#produtos": Briefcase,
    "#servicos": Sparkles,
    "#habilidades": Cpu,
    "#codigo": Code2,
    "#jornada": Route,
    "#sobre": User,
    "#contato": Mail,
};

const OFFSET = 80;

export function GameNav({ items, label }: GameNavProps) {
    const [active, setActive] = useState(0);
    const barRef = useRef<HTMLDivElement>(null);
    const shipRef = useRef<HTMLSpanElement>(null);
    const nodeRefs = useRef<Array<HTMLAnchorElement | null>>([]);

    // Scroll-spy: marca o "level" atual. gsap é carregado sob demanda para
    // não inflar o JS inicial da home.
    useEffect(() => {
        let alive = true;
        const created: Array<{ kill: () => void }> = [];

        void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
            ([gsapMod, scrollMod]) => {
                if (!alive) return;
                const gsap = (gsapMod.default ?? gsapMod) as unknown as typeof import("gsap").default;
                const { ScrollTrigger } = scrollMod as typeof import("gsap/ScrollTrigger");
                gsap.registerPlugin(ScrollTrigger);

                items.forEach((item, index) => {
                    const id = item.href.slice(1);
                    if (!document.getElementById(id)) return;
                    created.push(
                        ScrollTrigger.create({
                            trigger: `#${id}`,
                            start: "top 55%",
                            end: "bottom 55%",
                            onEnter: () => setActive(index),
                            onEnterBack: () => setActive(index),
                        })
                    );
                });
            }
        );

        return () => {
            alive = false;
            created.forEach((t) => t.kill());
        };
    }, [items]);

    // Move a nave deslizante para o centro do level ativo.
    useEffect(() => {
        const bar = barRef.current;
        const ship = shipRef.current;
        const node = nodeRefs.current[active];
        if (!bar || !ship || !node) return;
        const cx = node.offsetLeft + node.offsetWidth / 2;
        ship.style.transform = `translateX(${cx - bar.offsetWidth / 2}px) translateY(-50%)`;
    }, [active, items]);

    const scrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.slice(1);
        const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
        window.scrollTo({ top: top + window.scrollY - OFFSET, behavior: "smooth" });
    };

    return (
        <nav
            aria-label={label}
            className="relative z-10 hidden justify-center px-4 pb-12 pt-8 md:flex"
        >
            <div
                ref={barRef}
                className="relative flex items-center gap-1 rounded-full border border-primary/30 bg-background/80 px-5 py-2.5 shadow-lg backdrop-blur-md"
            >
                {/* Trilho de fundo */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-9 right-9 top-1/2 h-px -translate-y-1/2 bg-white/10"
                />

                {items.map((item, index) => {
                    const Icon = ICONS[item.href] ?? Home;
                    const isActive = index === active;
                    return (
                        <a
                            key={item.href}
                            ref={(el) => {
                                nodeRefs.current[index] = el;
                            }}
                            href={item.href}
                            data-nav={item.href.slice(1)}
                            aria-label={item.label}
                            aria-current={isActive ? "true" : undefined}
                            title={item.label}
                            onClick={(e) => scrollTo(e, item.href)}
                            className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e1ff] ${
                                isActive
                                    ? "scale-110 border-[#00e1ff] bg-[#00e1ff] text-black shadow-[0_0_24px_rgba(0,225,255,0.55)]"
                                    : "border-white/10 text-muted-foreground hover:scale-110 hover:border-[#00e1ff]/60 hover:text-[#00e1ff]"
                            }`}
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    );
                })}

                {/* Nave que desliza sobre o "level" atual */}
                <span
                    ref={shipRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 z-[5] text-[#00e1ff] drop-shadow-[0_0_8px_rgba(0,225,255,0.9)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                >
                    <Rocket className="h-5 w-5 rotate-90" />
                </span>
            </div>
        </nav>
    );
}