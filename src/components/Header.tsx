// src/components/Header.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "./TextTranslator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrazilFlag, USFlag, SpainFlag } from "./Flags";
import Link from "next/link";

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

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <header className="fixed top-0 w-full bg-background border-b border-border p-4 flex justify-between items-center z-50">
            <nav className="flex items-center gap-6">
                <Link href="/home" className="text-xl font-bold">
                    <TextTranslator>
                        {{
                            ptBR: "Meu CMS",
                            en: "My CMS",
                            es: "Mi CMS",
                        }}
                    </TextTranslator>
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    <TextTranslator>
                        {{
                            ptBR: "Sobre",
                            en: "About",
                            es: "Sobre",
                        }}
                    </TextTranslator>
                </Link>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    <TextTranslator>
                        {{
                            ptBR: "Contato",
                            en: "Contact",
                            es: "Contacto",
                        }}
                    </TextTranslator>
                </Link>
            </nav>
            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
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
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => changeLanguage("ptBR")}>
                            <BrazilFlag className="h-5 w-5 mr-2" />
                            <TextTranslator>
                                {{
                                    ptBR: "Português",
                                    en: "Portuguese",
                                    es: "Portugués",
                                }}
                            </TextTranslator>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage("en")}>
                            <USFlag className="h-5 w-5 mr-2" />
                            <TextTranslator>
                                {{
                                    ptBR: "Inglês",
                                    en: "English",
                                    es: "Inglés",
                                }}
                            </TextTranslator>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeLanguage("es")}>
                            <SpainFlag className="h-5 w-5 mr-2" />
                            <TextTranslator>
                                {{
                                    ptBR: "Espanhol",
                                    en: "Spanish",
                                    es: "Español",
                                }}
                            </TextTranslator>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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