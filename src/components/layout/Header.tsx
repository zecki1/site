"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "./TextTranslator";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrazilFlag, USFlag, SpainFlag } from "./Flags";
import ScrollIndicator from "@/components/layout/ScrollIndicator";

export function Header() {
    const headerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (!gsap || !ScrollTrigger) {
            console.error("GSAP ou ScrollTrigger não carregados!");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const header = headerRef.current;
        const logo = logoRef.current;

        if (!header || !logo) {
            console.error("Referências não encontradas:", { header, logo });
            return;
        }

        gsap.set(logo, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            scale: 4,
            fontSize: window.innerWidth < 768 ? "8vw" : "6vw",
            opacity: 0,
            textShadow: "0 0 2px rgba(0,0,0,0.3)",
            zIndex: 60,
        });

        gsap.to(logo, {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
        });

        const logoTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top top",
                end: "bottom+=50vh top", // Encolhe mais tarde pra não cobrir o Cover
                scrub: 0.6,
                onUpdate: (self) => {
                    setIsScrolled(self.progress > 0.8);
                },
            },
        });

        logoTl.to(logo, {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            scale: 1,
            fontSize: window.innerWidth < 768 ? "1.5rem" : "2rem",
            textShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.8,
        });

        logoTl.to(header, {
            boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
            duration: 0.2,
        }, 0.8);

        const updateAnimation = () => {
            const isMobile = window.innerWidth < 768;
            gsap.set(logo, {
                fontSize: isMobile ? "8vw" : "6vw",
            });
            logoTl.to(logo, {
                fontSize: isMobile ? "1.5rem" : "2rem",
            });
        };

        window.addEventListener("resize", updateAnimation);
        return () => {
            window.removeEventListener("resize", updateAnimation);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("light");
        else setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const clearCacheAndStorage = async () => {
        try {
            localStorage.clear();
            if ("caches" in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map((name) => caches.delete(name)));
            }
            await i18n.changeLanguage("ptBR"); // Força ptBR após limpar o cache
            console.log("Idioma após limpar cache:", i18n.language);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao limpar cache/storage:", error);
            alert("Erro ao limpar cache e localStorage.");
        }
    };

    const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-[50] transition-all duration-300 bg-background ${isScrolled
                    ? "h-16 md:h-16 border-b border-border p-2 md:p-4 flex justify-between items-center"
                    : "h-screen flex flex-col items-center justify-center"
                }`}
        >
            <h1
                ref={logoRef}
                className="text-center uppercase text-[#00e1ff] font-bold font-['Luckiest_Guy']"
            >
                zecki1
            </h1>
            {!isScrolled && (
                <div className="absolute bottom-4">
                    <ScrollIndicator />
                </div>
            )}
            {isScrolled && (
                <>
                    <nav className="flex items-center gap-2 md:gap-6">
                        <Sidebar />
                    </nav>
                    <div className="flex gap-1 md:gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Globe className="h-4 w-4 md:h-5 md:w-5" />
                                    <span className="sr-only">
                                        <TextTranslator>
                                            {{ ptBR: "Mudar Idioma", en: "Change Language", es: "Cambiar Idioma" }}
                                        </TextTranslator>
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => changeLanguage("ptBR")}>
                                    <BrazilFlag className="h-5 w-5 mr-2" />
                                    <TextTranslator>
                                        {{ ptBR: "Português", en: "Portuguese", es: "Portugués" }}
                                    </TextTranslator>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                                    <USFlag className="h-5 w-5 mr-2" />
                                    <TextTranslator>
                                        {{ ptBR: "Inglês", en: "English", es: "Inglés" }}
                                    </TextTranslator>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeLanguage("es")}>
                                    <SpainFlag className="h-5 w-5 mr-2" />
                                    <TextTranslator>
                                        {{ ptBR: "Espanhol", en: "Spanish", es: "Español" }}
                                    </TextTranslator>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="icon" onClick={toggleTheme}>
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4 md:h-5 md:w-5" />
                            ) : (
                                <Moon className="h-4 w-4 md:h-5 md:w-5" />
                            )}
                            <span className="sr-only">
                                <TextTranslator>
                                    {{ ptBR: "Alternar Tema", en: "Toggle Theme", es: "Cambiar Tema" }}
                                </TextTranslator>
                            </span>
                        </Button>
                        {isLocalhost && (
                            <Button variant="outline" size="icon" onClick={clearCacheAndStorage}>
                                <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                                <span className="sr-only">
                                    <TextTranslator>
                                        {{ ptBR: "Limpar Cache", en: "Clear Cache", es: "Limpiar Caché" }}
                                    </TextTranslator>
                                </span>
                            </Button>
                        )}
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;