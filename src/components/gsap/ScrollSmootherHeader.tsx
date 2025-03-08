"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/layout/ThemeProvider"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import TextTranslator from "@/components/layout/TextTranslator"
import { Sidebar } from "@/components/layout/Sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BrazilFlag, USFlag, SpainFlag } from "@/components/layout/Flags"
import { images } from "@/components/layout/ImageContainer"

interface ScrollSmootherHeaderProps {
  className?: string
}

export const ScrollSmootherHeader: React.FC<ScrollSmootherHeaderProps> = ({ className }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const { i18n } = useTranslation()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = headerRef.current
    const bg = bgRef.current
    const content = contentRef.current

    if (header && bg && content) {
      // Efeito parallax no fundo
      gsap.to(bg, {
        y: "-30%", // Move o fundo mais devagar que o scroll
        ease: "none",
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Encolhimento do header
      gsap.to(header, {
        height: 80, // Altura final (ajuste conforme necessário)
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "200 top",
          scrub: true,
        },
      })

      // Fade e movimento do conteúdo
      gsap.to(content, {
        y: -20,
        opacity: 0.8,
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "200 top",
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
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
      className={cn(
        "fixed top-0 w-full h-64 text-white flex flex-col z-50 overflow-hidden", // Altura inicial maior
        className
      )}
    >
      {/* Camada de fundo com parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.capa})` }}
      />

      {/* Conteúdo do header */}
      <div
        ref={contentRef}
        className="relative flex justify-between items-center w-full h-full px-4"
      >
        <nav className="flex items-center gap-6">
          <Sidebar /> {/* Links no Sidebar */}
          <h1 className="text-4xl font-bold">zecki1</h1> {/* Substitui "Simba" */}
        </nav>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
                <Globe className="h-5 w-5" />
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
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">
              <TextTranslator>
                {{ ptBR: "Alternar Tema", en: "Toggle Theme", es: "Cambiar Tema" }}
              </TextTranslator>
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default ScrollSmootherHeader