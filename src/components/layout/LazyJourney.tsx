"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

type Lang = "ptBR" | "en" | "es";

const CareerTimeline = dynamic(() => import("@/components/layout/CareerTimeline"), {
    ssr: false,
    loading: () => null,
});

// A jornada (CareerTimeline) é pesada (framer-motion + dados). Em vez de
// hidratar e animar no carregamento, só montamos o componente quando a seção
// se aproxima da viewport — mantendo o thread principal livre (PageSpeed).
export function LazyJourney({ lang }: { lang: Lang }) {
    const [near, setNear] = useState(false);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = placeholderRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "600px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    if (!near) {
        return (
            <div
                ref={placeholderRef}
                aria-hidden="true"
                className="min-h-[420px] animate-pulse rounded-2xl border border-border/50 bg-muted/40"
            />
        );
    }

    return <CareerTimeline lang={lang} />;
}