"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Trash2, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "@/components/layout/TextTranslator";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsMenu } from "@/components/layout/SettingsMenu";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSmootherHeaderProps {
  className?: string;
  backgroundImage?: string;
}

const languageAcronyms: { [key: string]: string } = {
  ptBR: "PT",
  en: "EN",
  es: "ES",
};

// Ícone de Seta para Baixo
const ArrowDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
);

export const ScrollSmootherHeader: React.FC<ScrollSmootherHeaderProps> = ({ className, backgroundImage }) => {
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

  useEffect(() => {
    if (!isMounted) return;

    const header = headerRef.current;
    const title = titleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const nav = navRef.current;
    const background = backgroundRef.current;
    const mainContent = document.getElementById("main-content");

    if (!header || !title || !scrollIndicator || !nav || !mainContent || !background) return;

    const ctx = gsap.context(() => {
      gsap.set(mainContent, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=500px",
          // ALTERAÇÃO 1: Mudei de 0.8 para `true` para remover o atraso.
          scrub: true,
          onToggle: self => self.isActive
            ? header.classList.add('glass-header-active')
            : header.classList.remove('glass-header-active'),
        },
      });

      tl.to(background, { opacity: 0, ease: "power1.inOut" }, 0);
      tl.to(header, { height: "64px", ease: "power1.inOut" }, 0);

      // ALTERAÇÃO 2: Animação de posição do título fora do matchMedia.
      // Ele agora sempre se moverá para o centro, evitando o deslocamento lateral.
      tl.to(title, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        ease: "power1.inOut"
      }, 0);

      // ALTERAÇÃO 3: Usamos matchMedia apenas para o que é diferente: o tamanho da fonte.
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          tl.to(title, { fontSize: "1.5rem", ease: "power1.inOut" }, 0);
        },
        "(max-width: 768px)": function () {
          tl.to(title, { fontSize: "1.25rem", ease: "power1.inOut" }, 0);
        }
      });

      tl.to(scrollIndicator, { opacity: 0, ease: "power1.inOut" }, 0);
      tl.to(nav, { opacity: 1, pointerEvents: "auto", ease: "power1.inOut" }, 0.3);
      tl.to(mainContent, { opacity: 1, y: 0, ease: "power1.inOut" }, 0.3);
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMounted]);

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

  return (
    <header
      ref={headerRef}
      className={cn("fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center transition-all duration-300", className)}
      style={{ height: "100vh" }}
    >
      <div ref={backgroundRef} className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }} />

      <h1
        ref={titleRef}
        className="text-center uppercase text-[#00e1ff] font-bold font-['Luckiest_Guy'] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] text-shadow-[0_0_2px_rgba(0,0,0,0.3)] transition-all duration-300"
        style={{ fontSize: "10vw" }}
      >
        zecki1
      </h1>

      <div ref={scrollIndicatorRef} className="absolute bottom-10 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-[#00e1ff]">
          <ArrowDown className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
          <span className="py-1 px-3 rounded-full text-sm bg-black/40 backdrop-blur-md border border-white/10 text-white drop-shadow-lg">
            <TextTranslator>{{ ptBR: "Role para explorar", en: "Scroll to explore", es: "Desplaza para explorar" }}</TextTranslator>
          </span>
        </div>
      </div>

      <div
        ref={navRef}
        className="flex items-center justify-between w-full max-w-7xl px-4 md:px-8 absolute top-0 left-1/2 -translate-x-1/2 h-16 z-10"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className="flex-1 flex justify-start">
          <Sidebar />
        </div>

        <div className="flex-1 hidden md:flex justify-center">
          {/* Espaço para links de navegação no desktop se necessário */}
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 md:gap-2">
          <SettingsMenu />
          <Button variant="ghost" size="icon" onClick={handleLanguageCycle} className="h-10 w-10 text-[#00e1ff] hover:bg-white/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={i18n.language} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.2 }} className="font-bold">
                {languageAcronyms[i18n.language] || "PT"}
              </motion.div>
            </AnimatePresence>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-10 text-[#00e1ff] hover:bg-white/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={theme} initial={{ scale: 0.5, opacity: 0, rotate: -90 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.5, opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-[#00e1ff] hover:bg-white/10">
            <Link href="/login"><User className="h-5 w-5" /></Link>
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <Button variant="ghost" size="icon" onClick={clearCache} className="h-10 w-10 text-red-500 hover:bg-red-500/10">
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ScrollSmootherHeader;