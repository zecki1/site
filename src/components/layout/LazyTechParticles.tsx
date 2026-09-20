"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// O TechParticles (react-icons + gsap) só é baixado quando a seção
// #habilidades se aproxima da viewport. Na home mobile ele fica fora do
// caminho crítico (PageSpeed).
const TechParticles = dynamic(() => import("@/components/effects/TechParticles"), {
    ssr: false,
    loading: () => null,
});

export function LazyTechParticles() {
    const [near, setNear] = useState(false);
    const holderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = holderRef.current;
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

    return (
        <div ref={holderRef} className="relative h-full w-full">
            {near ? <TechParticles /> : null}
        </div>
    );
}