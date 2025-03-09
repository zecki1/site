"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import TextTranslator from "./TextTranslator"
import { Sidebar } from "@/components/layout/Sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BrazilFlag, USFlag, SpainFlag } from "./Flags"

export function Header() {
    const headerRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLHeadingElement>(null)
    const menuRef = useRef<HTMLButtonElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    const { i18n } = useTranslation()

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const header = headerRef.current
        const logo = logoRef.current
        const menu = menuRef.current
        const main = document.querySelector("main") // Pega o <main> do RootLayout

        if (!header || !logo || !menu || !main) return

        // Define o estado inicial do logo no meio do viewport
        gsap.set(logo, {
            position: "fixed",
            top: "50vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            scale: 4,
            textShadow: "0 0 2px rgba(0,0,0,0.3)",
            opacity: 0,
            zIndex: 60,
        })

        // Fade in inicial do logo
        gsap.fromTo(
            logo,
            { opacity: 0, yPercent: 50 },
            { yPercent: -50, opacity: 1, duration: 1, ease: "power3.out", immediateRender: true }
        )

        // Animação do logo para o header ao rolar
        const logoTl = gsap.timeline({
            scrollTrigger: {
                trigger: main, // Usa o <main> como trigger, não o document.body
                start: "top top",
                end: () => window.innerHeight * 1.2,
                scrub: 0.6,
                onUpdate: (self) => {
                    if (self.progress >= 1) {
                        setIsScrolled(true)
                    } else {
                        setIsScrolled(false)
                    }
                },
            },
        })

        logoTl.fromTo(
            logo,
            {
                top: "50vh",
                yPercent: -50,
                scale: 4,
                textShadow: "0 0 2px rgba(0,0,0,0.3)",
            },
            {
                position: "relative",
                top: "0%",
                left: "0%",
                transform: "none",
                scale: 1,
                textShadow: "0 0 2px rgba(0,0,0,0)",
                duration: 0.8,
            }
        )

        logoTl.fromTo(
            menu,
            { opacity: 0 },
            { opacity: 1, duration: 0.1 },
            0.9
        )

        logoTl.fromTo(
            header,
            { boxShadow: "0px 0px 10px rgba(0,0,0,0)" },
            { boxShadow: "0px 0px 10px rgba(0,0,0,0.15)", duration: 0.2 },
            0.8
        )

        menu.addEventListener("click", () => {
            ScrollTrigger.refresh()
        })

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            menu.removeEventListener("click", () => ScrollTrigger.refresh())
        }
    }, [])

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark")
        }
    }

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-[50] transition-all duration-300 ${isScrolled
                    ? "border-b border-border p-4 flex justify-between items-center bg-background"
                    : ""
                }`}
        >
            {isScrolled ? (
                <>
                    <nav className="flex items-center gap-6">
                        <Sidebar />
                    </nav>
                    <h1 className="text-center text-[2rem] uppercase text-[#F47340] font-bold font-['Luckiest_Guy']">
                        zecki1
                    </h1>
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
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                </>
            ) : (
                <>
                    <h1
                        ref={logoRef}
                        className="text-center text-[6vw] uppercase text-[#F47340] font-bold font-['Luckiest_Guy']"
                    >
                        zecki1
                    </h1>
                    <button
                        ref={menuRef}
                        className="absolute top-1/2 right-8 transform -translate-y-1/2 w-12 h-8 bg-transparent cursor-pointer border-none p-0 opacity-0 md:right-[10%]"
                    >
                        <span className="block w-full h-[2px] bg-black relative before:content-[''] before:absolute before:w-full before:h-[2px] before:left-0 before:top-0 before:bg-black after:content-[''] after:absolute after:w-full after:h-[2px] after:left-0 after:bottom-0 after:bg-black" />
                    </button>
                </>
            )}
        </header>
    )
}

export default Header