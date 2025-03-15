"use client";

import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const ScrollIndicator: React.FC = () => {
    const { theme } = useTheme();
    const { i18n } = useTranslation();

    useEffect(() => {
        console.log("Idioma atual no ScrollIndicator:", i18n.language);
    }, [i18n.language]);

    return (
        <div
            className={cn(
                "flex flex-col items-center gap-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30"
            )}
        >
            <ChevronDown
                className={cn(
                    "w-8 h-8 animate-bounce",
                    theme === "dark" ? "text-white" : "text-gray-800",
                    "drop-shadow-md"
                )}
            />
            <span
                className={cn(
                    "py-1 px-3 rounded text-sm bg-black/30 border-0 whitespace-nowrap",
                    theme === "dark" ? "text-white" : "text-gray-800",
                    "drop-shadow-md"
                )}
            >
                <TextTranslator>
                    {{
                        ptBR: <>Role para baixo</>,
                        en: <>Scroll down</>,
                        es: <>Desplázate hacia abajo</>,
                    }}
                </TextTranslator>
            </span>
        </div>
    );
};

export default ScrollIndicator;