// src/components/gsap/ScrollSmootherHeader.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe, ChevronDown, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "@/components/layout/TextTranslator";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrazilFlag, USFlag, SpainFlag } from "@/components/layout/Flags";

interface ScrollSmootherHeaderProps {
  className?: string;
}

export const ScrollSmootherHeader: React.FC<ScrollSmootherHeaderProps> = ({ className }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    const title = titleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const nav = navRef.current;
    const mainContent = document.querySelector("#main-content");

    if (header && title && scrollIndicator && nav && mainContent) {
      // Estado inicial
      gsap.set(header, { height: "100vh" });
      gsap.set(title, { fontSize: "6vw" });
      gsap.set(scrollIndicator, { opacity: 1 });
      gsap.set(nav, { opacity: 0, display: "none" });
      gsap.set(mainContent, { opacity: 0, pointerEvents: "none" });

      // Animação do header
      gsap.to(header, {
        height: "64px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress > 0.5) { // Reduzido de 0.9 para 0.5
              header.classList.add("bg-background");
              gsap.to(mainContent, { opacity: 1, pointerEvents: "auto", duration: 0.5 });
              gsap.to(nav, { opacity: 1, display: "flex", duration: 0.5 });
              gsap.to(scrollIndicator, { opacity: 0, display: "none", duration: 0.2 });
            } else {
              header.classList.remove("bg-background");
              gsap.to(mainContent, { opacity: 0, pointerEvents: "none", duration: 0.2 });
              gsap.to(nav, { opacity: 0, display: "none", duration: 0.2 });
              gsap.to(scrollIndicator, { opacity: 1, display: "flex", duration: 0.2 });
            }
          },
        },
      });

      // Animação do título
      gsap.to(title, {
        fontSize: "1.5rem",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center transition-all duration-300",
        className
      )}
    >
      <h1
        ref={titleRef}
        className="text-center uppercase text-[#00e1ff] font-bold font-['Luckiest_Guy'] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] text-shadow-[0_0_2px_rgba(0,0,0,0.3)] md:text-4xl"
      >
        zecki1
      </h1>
      <div ref={scrollIndicatorRef} className="absolute bottom-4">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="w-6 h-6 animate-bounce text-white drop-shadow-md md:w-8 md:h-8" />
          <span className="py-1 px-2 rounded text-xs bg-black/30 text-white drop-shadow-md md:text-sm md:px-3">
            <TextTranslator>
              {{ ptBR: "Role para baixo", en: "Scroll down", es: "Desplaza hacia abajo" }}
            </TextTranslator>
          </span>
        </div>
      </div>
      <div
        ref={navRef}
        className="flex items-center justify-between w-full max-w-full px-2 absolute top-0 left-1/2 transform -translate-x-1/2 h-full md:px-4"
      >
        <Sidebar />
        <div className="flex gap-1 md:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10">
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
          <Button variant="outline" size="icon" onClick={toggleTheme} className="h-8 w-8 md:h-10 md:w-10">
            {theme === "dark" ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />}
            <span className="sr-only">
              <TextTranslator>
                {{ ptBR: "Alternar Tema", en: "Toggle Theme", es: "Cambiar Tema" }}
              </TextTranslator>
            </span>
          </Button>
          <Button variant="outline" size="icon" onClick={clearCache} className="h-8 w-8 md:h-10 md:w-10">
            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">
              <TextTranslator>
                {{ ptBR: "Limpar Cache", en: "Clear Cache", es: "Limpiar Caché" }}
              </TextTranslator>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ScrollSmootherHeader;