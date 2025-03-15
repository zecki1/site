"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import TextTranslator from "@/components/layout/TextTranslator";

interface CoverProps {
    titlePT?: string;
    titleES?: string;
    titleEN?: string;
    backgroundImage: string;
    className?: string;
    children?: React.ReactNode;
    ignoreCheck?: boolean; // Adicionado pra ignorar a verificação de traduções
}

export const Cover: React.FC<CoverProps> = ({
    titlePT,
    titleES,
    titleEN,
    backgroundImage,
    className,
    children,
    ignoreCheck = false, // Default é false pra manter o comportamento padrão
}) => {
    const coverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cover = coverRef.current;
        if (!cover) return;

        gsap.set(cover, {
            y: "100vh",
            opacity: 0,
        });

        gsap.to(cover, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: "power3.out",
            onComplete: () => console.log("Cover animado e visível"),
        });
    }, []);

    return (
        <section
            ref={coverRef}
            className={cn("w-full h-screen overflow-hidden relative bg-background", className)}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
                <div className="mt-2 px-3 rounded text-white text-sm bg-black/50 border-0">
                    <h1 className="mt-4 px-16 py-5 text-center text-4xl text-white md:text-6xl">
                        <TextTranslator ignoreCheck={ignoreCheck}>
                            {{ ptBR: titlePT, en: titleEN, es: titleES }}
                        </TextTranslator>
                    </h1>
                </div>
                {children}
            </div>
        </section>
    );
};

export default Cover;