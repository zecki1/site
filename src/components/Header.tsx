// src/components/Header.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "./TextTranslator";

export function Header() {
    const { theme, setTheme } = useTheme();
    const { i18n } = useTranslation();

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");
        }
    };

    const toggleLanguage = () => {
        const languages = ["ptBR", "en", "es"];
        const currentIndex = languages.indexOf(i18n.language);
        const nextIndex = (currentIndex + 1) % languages.length;
        i18n.changeLanguage(languages[nextIndex]);
    };

    return (
        <header className="fixed top-0 w-full bg-background border-b border-border p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <TextTranslator>
                    {{
                        ptBR: "Meu CMS",
                        en: "My CMS",
                        es: "Mi CMS",
                    }}
                </TextTranslator>
            </h1>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleLanguage}>
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">
                        <TextTranslator>
                            {{
                                ptBR: "Mudar Idioma",
                                en: "Change Language",
                                es: "Cambiar Idioma",
                            }}
                        </TextTranslator>
                    </span>
                </Button>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                        <TextTranslator>
                            {{
                                ptBR: "Alternar Tema",
                                en: "Toggle Theme",
                                es: "Cambiar Tema",
                            }}
                        </TextTranslator>
                    </span>
                </Button>
            </div>
        </header>
    );
}