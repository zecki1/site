"use client";

import { useState } from "react";
import Image from "next/image";
import { MonitorPlay } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";

const IMAGE_DIMS: Record<string, { w: number; h: number }> = {
    "/img/projects/cleriston.webp": { w: 1280, h: 800 },
    "/img/projects/cms-login.webp": { w: 1280, h: 800 },
    "/img/projects/dashboard.webp": { w: 1920, h: 1080 },
    "/img/projects/teleprompt.webp": { w: 1919, h: 1078 },
};

export function ProductImage({ src, alt }: { src: string; alt: string }) {
    const [errored, setErrored] = useState(false);
    if (errored) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-[#00e1ff]/20 via-background to-[#7f00ff]/20">
                <MonitorPlay className="h-14 w-14 text-primary/70" />
                <span className="px-6 text-center text-sm text-muted-foreground">
                    <TextTranslator>
                        {{
                            ptBR: "Print em breve",
                            en: "Screenshot coming soon",
                            es: "Captura próximamente",
                        }}
                    </TextTranslator>
                </span>
            </div>
        );
    }
    const { w, h } = IMAGE_DIMS[src] ?? { w: 1280, h: 800 };
    return (
        <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            onError={() => setErrored(true)}
        />
    );
}