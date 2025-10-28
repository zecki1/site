"use client";

import { useEffect, useRef } from "react";
import Link from "next/link"; // Importar o Link do Next.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe, ChevronDown, Trash2, User } from "lucide-react"; // Importar o ícone User
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
  backgroundImage?: string;
}

export const ScrollSmootherHeader: React.FC<ScrollSmootherHeaderProps> = ({ className, backgroundImage }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    const title = titleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const nav = navRef.current;
    const background = backgroundRef.current;
    const mainContent = document.querySelector("#main-content") as HTMLElement;

    if (header && title && scrollIndicator && nav && mainContent && background) {
      gsap.set(mainContent, { opacity: 0, y: 50 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=500px",
          scrub: 1,
        },
      });
      tl.to(background, { opacity: 0, ease: "power1.inOut" }, 0);
      tl.to(header, { height: "64px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)", ease: "power1.inOut" }, 0);
      tl.to(title, { fontSize: "1.5rem", ease: "power1.inOut" }, 0);
      tl.to(scrollIndicator, { opacity: 0, ease: "power1.inOut" }, 0);
      tl.to(nav, { opacity: 1, pointerEvents: "auto", ease: "power1.inOut" }, 0.3);
      tl.to(mainContent, { opacity: 1, y: 0, ease: "power1.inOut" }, 0.3);
      tl.to(header, {
        onStart: () => header.classList.add('bg-black'),
        onReverseComplete: () => header.classList.remove('bg-black'),
      }, 0.1);
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
    <header ref={headerRef} className={cn("fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center transition-colors duration-300", className)} style={{ height: "100vh" }}>
      <div ref={backgroundRef} className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }} />
      <h1 ref={titleRef} className="text-center uppercase text-[#00e1ff] font-bold font-['Luckiest_Guy'] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60] text-shadow-[0_0_2px_rgba(0,0,0,0.3)]" style={{ fontSize: "6vw" }}>
        zecki1
      </h1>
      <div ref={scrollIndicatorRef} className="absolute bottom-4 z-10">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown className="w-6 h-6 animate-bounce drop-shadow-md md:w-8 md:h-8" />
          <span className="py-1 px-2 rounded text-xs bg-black/30 drop-shadow-md md:text-sm md:px-3">
            <TextTranslator>{{ ptBR: "Role para baixo", en: "Scroll down", es: "Desplaza hacia abajo" }}</TextTranslator>
          </span>
        </div>
      </div>
      <div ref={navRef} className="flex items-center justify-between w-full max-w-full px-2 absolute top-0 left-1/2 transform -translate-x-1/2 h-full md:px-4 z-10 border-b-2 border-color1" style={{ opacity: 0, pointerEvents: "none" }}>
        <Sidebar />
        <div className="flex items-center gap-1 md:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 border-color1">
                <Globe className="h-4 w-4 md:h-5 md:w-5 text-color1" />
                <span className="sr-only"><TextTranslator>{{ ptBR: "Mudar Idioma", en: "Change Language", es: "Cambiar Idioma" }}</TextTranslator></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("ptBR")}><BrazilFlag className="h-5 w-5 mr-2" /><TextTranslator>{{ ptBR: "Português", en: "Portuguese", es: "Portugués" }}</TextTranslator></DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("en")}><USFlag className="h-5 w-5 mr-2" /><TextTranslator>{{ ptBR: "Inglês", en: "English", es: "Inglés" }}</TextTranslator></DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("es")}><SpainFlag className="h-5 w-5 mr-2" /><TextTranslator>{{ ptBR: "Espanhol", en: "Spanish", es: "Español" }}</TextTranslator></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={toggleTheme} className="h-8 w-8 md:h-10 md:w-10 border-color1">
            {theme === "dark" ? <Sun className="h-4 w-4 md:h-5 md:w-5 text-color1" /> : <Moon className="h-4 w-4 md:h-5 md:w-5 text-color1" />}
            <span className="sr-only"><TextTranslator>{{ ptBR: "Alternar Tema", en: "Toggle Theme", es: "Cambiar Tema" }}</TextTranslator></span>
          </Button>

          {/* Botão de Login para a Área do Cliente */}
          <Button asChild variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 border-color1">
            <Link href="/login" aria-label="Área do Cliente">
              <User className="h-4 w-4 md:h-5 md:w-5 text-color1" />
              <span className="sr-only"><TextTranslator>{{ ptBR: "Área do Cliente", en: "Client Area", es: "Área de Cliente" }}</TextTranslator></span>
            </Link>
          </Button>

          {/* Botão de Limpar Cache (só aparece em desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && (
            <Button variant="outline" size="icon" onClick={clearCache} className="h-8 w-8 md:h-10 md:w-10 border-color1">
              <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-color1" />
              <span className="sr-only"><TextTranslator>{{ ptBR: "Limpar Cache", en: "Clear Cache", es: "Limpiar Caché" }}</TextTranslator></span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ScrollSmootherHeader;