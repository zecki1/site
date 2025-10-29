"use client";

// ✅ CORREÇÃO: A linha de importação foi corrigida para incluir useRef, useState e useEffect.
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"; // Importe o hook recomendado para React
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Trash2, User, Settings, Languages, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "@/components/layout/TextTranslator";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsMenu } from "@/components/layout/SettingsMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuyFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface ScrollSmootherHeaderProps {
  className?: string;
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
}

const languageAcronyms: { [key: string]: string } = {
  ptBR: "PT",
  en: "EN",
  es: "ES",
};

export const ScrollSmootherHeader: React.FC<ScrollSmootherHeaderProps> = ({
  className,
  desktopImage,
  mobileImage,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!isMounted) return;

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      gsap.set(mainContent, { opacity: 1 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=500px",
        scrub: 0.3,
      },
    });

    tl.to(backgroundRef.current, { autoAlpha: 0, ease: "power1.inOut" }, 0);
    tl.to(headerRef.current, { height: "64px", ease: "power1.inOut" }, 0);
    tl.to(titleRef.current, { top: '50%', yPercent: -50, ease: "power1.inOut" }, 0);
    tl.to(scrollIndicatorRef.current, { autoAlpha: 0, ease: "power1.inOut" }, 0);
    tl.to(navRef.current, { autoAlpha: 1, pointerEvents: "auto", ease: "power1.inOut" }, 0.3);

    gsap.to(titleRef.current, {
      scale: 0.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=500px",
        scrub: 0.3,
      }
    });

  }, { dependencies: [isMounted] });

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const languages = ["ptBR", "en", "es"];
  const handleLanguageCycle = () => {
    const currentLangIndex = languages.indexOf(i18n.language);
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextLangIndex]);
  };
  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  const iconButtonClasses = "h-10 w-10 text-[#00e1ff] hover:bg-[#00e1ff]/20 transition-colors";

  return (
    <header
      ref={headerRef}
      data-speed="0.8"
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center bg-black backdrop-blur-md border-b-2 animate-border-color",
        "will-change-height",
        className
      )}
      style={{ height: "100vh" }}
    >
      <div
        ref={backgroundRef}
        data-speed="0.5"
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src={mobileImage}
          alt="Imagem de fundo para mobile"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="md:hidden"
        />
        <Image
          src={desktopImage}
          alt="Imagem de fundo para desktop"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="hidden md:block"
        />
      </div>

      <h1
        ref={titleRef}
        className={cn(
          "text-center uppercase text-[#00e1ff] font-bold absolute top-1/2 -translate-y-1/2 z-[60] text-shadow-[0_0_2px_rgba(0,0,0,0.3)]",
          luckiestGuyFont.className
        )}
        style={{ fontSize: "10vw", transformOrigin: 'center center' }}
      >
        zecki1
      </h1>

      <div ref={scrollIndicatorRef} className="absolute bottom-10 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-[#00e1ff]">
          <IoArrowDownCircleOutline className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
          {isMounted && (
            <span className="py-1 px-3 rounded-full text-sm bg-black/40 backdrop-blur-md border border-white/10 text-white drop-shadow-lg">
              <TextTranslator>{{ ptBR: "Role para explorar", en: "Scroll to explore", es: "Desplaza para explorar" }}</TextTranslator>
            </span>
          )}
        </div>
      </div>

      <div ref={navRef} className="flex items-center justify-between w-full max-w-7xl px-4 md:px-8 absolute top-0 left-1/2 -translate-x-1/2 h-16 z-10" style={{ opacity: 0, visibility: 'hidden', pointerEvents: "none" }}>
        <div className="flex-1 flex justify-start">
          <Sidebar />
        </div>
        <div className="flex-1 hidden md:flex justify-center" />
        <div className="flex flex-1 items-center justify-end gap-1 md:gap-2">
          {isMounted && (
            <>
              <div className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={handleLanguageCycle} className={iconButtonClasses} aria-label={i18n.t('changeLanguageLabel', 'Mudar Idioma')}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={i18n.language} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }} className="font-bold">
                      {languageAcronyms[i18n.language] || "PT"}
                    </motion.div>
                  </AnimatePresence>
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className={iconButtonClasses} aria-label={i18n.t('changeThemeLabel', 'Mudar Tema')}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={theme} initial={{ scale: 0.5, opacity: 0, rotate: -90 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.5, opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
                <Button asChild variant="ghost" size="icon" className={iconButtonClasses} aria-label={i18n.t('clientAreaLabel', 'Área do Cliente')}>
                  <Link href="/login"><User className="h-5 w-5" /></Link>
                </Button>
              </div>
              <SettingsMenu />
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={iconButtonClasses} aria-label={i18n.t('optionsLabel', 'Abrir Opções')}>
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel><TextTranslator>{{ ptBR: "Opções", en: "Options", es: "Opciones" }}</TextTranslator></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLanguageCycle}>
                      <Languages className="mr-2 h-4 w-4" />
                      <span><TextTranslator>{{ ptBR: "Mudar Idioma", en: "Change Language", es: "Cambiar Idioma" }}</TextTranslator> ({languageAcronyms[i18n.language]})</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleTheme}>
                      <Palette className="mr-2 h-4 w-4" />
                      <span><TextTranslator>{{ ptBR: "Mudar Tema", en: "Change Theme", es: "Cambiar Tema" }}</TextTranslator> ({theme})</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/login">
                        <User className="mr-2 h-4 w-4" />
                        <span><TextTranslator>{{ ptBR: "Área do Cliente", en: "Client Area", es: "Área de Cliente" }}</TextTranslator></span>
                      </Link>
                    </DropdownMenuItem>
                    {process.env.NODE_ENV === 'development' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={clearCache} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span><TextTranslator>{{ ptBR: "Limpar Cache", en: "Clear Cache", es: "Limpiar Caché" }}</TextTranslator></span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ScrollSmootherHeader;