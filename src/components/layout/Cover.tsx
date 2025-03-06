"use client";

import React from "react";
import TextTranslator from "@/components/TextTranslator";
import Mouse from "./Mouse";

interface CoverProps {
    titlePT?: string;
    titleES?: string;
    titleEN?: string;
    backgroundImage: string;
}

const Cover: React.FC<CoverProps> = ({
    titlePT,
    titleES,
    titleEN,
    backgroundImage,
}) => {
    return (
        <div
            className="w-full h-screen overflow-hidden relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none"></div>
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
                <h1 className="mt-4 px-16 py-5 text-center text-foreground text-4xl md:text-6xl">
                    <TextTranslator>
                        {{
                            ptBR: titlePT,
                            en: titleEN,
                            es: titleES,
                        }}
                    </TextTranslator>
                </h1>
            </div>
            <Mouse />
        </div>
    );
};

export default Cover;