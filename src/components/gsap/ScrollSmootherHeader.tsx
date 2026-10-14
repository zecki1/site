
"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, User, ArrowDownCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "@/components/layout/TextTranslator";
import { setLanguage } from "@/lib/setLanguage";

const SidebarDynamic = dynamic(
  () => import("@/components/layout/Sidebar").then((m) => m.Sidebar),
  { ssr: false, loading: () => null }
);
const SettingsMenuDynamic = dynamic(
  () => import("@/components/layout/SettingsMenu").then((m) => m.SettingsMenu),
  { ssr: false, loading: () => null }
);
const MobileOptions = dynamic(
  () => import("@/components/layout/MobileOptions").then((m) => m.MobileOptions),
  { ssr: false, loading: () => null }
);

interface ScrollSmootherHeaderProps {
  className?: string;
  capaMobile: string;
  desktopImage: string;
}

const languageAcronyms: { [key: string]: string } = {
  ptBR: "PT",
  en: "EN",
  es: "ES",
};

type GsapContextType = ReturnType<typeof import("gsap").default["context"]>;

export const ScrollSmootherHeader: React.FC<ScrollSmootherHeaderProps> = ({ className, capaMobile, desktopImage }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    // O header cobre 100vh no topo (o conteúdo começa em 60vh), então não há
    // flash — e o gsap só é baixado na primeira rolagem (PageSpeed / TBT).
    let ctx: GsapContextType | null = null;
    let started = false;
    let cleanupCtx: (() => void) | undefined;

    const cleanupListeners = () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("wheel", start);
    };

    const start = () => {
      if (started) return;
      started = true;
      cleanupListeners();
      setNavReady(true);

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([gsapMod, scrollMod]) => {
          const gsap = (gsapMod.default ?? gsapMod) as unknown as typeof import("gsap").default;
          const { ScrollTrigger } = scrollMod as typeof import("gsap/ScrollTrigger");
          gsap.registerPlugin(ScrollTrigger);

          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=400px",
                scrub: true,
              },
            });

            tl.to(backgroundRef.current, { opacity: 0, ease: "power1.inOut" }, 0);
            tl.to(headerRef.current, { height: "64px", ease: "power1.inOut" }, 0);
            // Centralização do logo fica 100% no CSS (`top-1/2 -translate-y-1/2`).
            // Não animar `top`/`yPercent` aqui: o Tailwind v4 usa a propriedade
            // independente `translate`, que somaria com o `transform` do GSAP e
            // deslocaria o "zecki1" o dobro para cima no mobile.
            ScrollTrigger.matchMedia({
              "(min-width: 769px)": () => tl.to(titleRef.current, { fontSize: "1.5rem", ease: "power1.inOut" }, 0),
              "(max-width: 768px)": () => tl.to(titleRef.current, { fontSize: "1.25rem", ease: "power1.inOut" }, 0),
            });
            tl.to(scrollIndicatorRef.current, { opacity: 0, ease: "power1.inOut" }, 0);
            tl.to(navRef.current, { opacity: 1, pointerEvents: "auto", ease: "power1.inOut" }, 0.3);
            tl.to(mainContent, { opacity: 1, ease: "power1.inOut" }, 0.3);
          });

          if (window.scrollY > 10) {
            void ScrollTrigger.refresh();
          }

          cleanupCtx = () => {
            ctx?.revert();
            // (kill global removido: matava reveals alheios — ctx.revert() ja limpa o proprio ctx)
          };
        }
      );
    };

    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("wheel", start, { passive: true });

    if (window.scrollY > 10) {
      start();
    }

    return () => {
      cleanupListeners();
      cleanupCtx?.();
    };
  }, [isMounted]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const languages = ["ptBR", "en", "es"];
  const handleLanguageCycle = () => {
    const currentLangIndex = languages.indexOf(i18n.language);
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    setLanguage(languages[nextLangIndex]);
  };
  const iconButtonClasses = "h-10 w-10 text-[#00e1ff] hover:bg-[#00e1ff]/20 transition-colors";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center bg-black border-b-2 animate-border-color",
        className
      )}
      style={{ height: "100dvh" }}
    >
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${capaMobile})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${desktopImage})` }}
        />
      </div>

      {/* Logo decorativa da capa — o <h1> da página é o do conteúdo (Lighthouse) */}
      <div
        aria-hidden="true"
        ref={titleRef}
        className="pointer-events-none text-center uppercase text-[#00e1ff] font-bold font-['Luckiest_Guy'] absolute top-1/2 left-0 right-0 -translate-y-1/2 z-[60] text-shadow-[0_0_2px_rgba(0,0,0,0.3)]"
        style={{ fontSize: "10vw" }}
      >
        zecki1
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-10 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-[#00e1ff]">
          <ArrowDownCircle className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
          {isMounted && (
            <span className="py-1 px-3 rounded-full text-sm bg-black/40 backdrop-blur-md border border-white/10 text-white drop-shadow-lg">
              <TextTranslator>{{ ptBR: "Role para explorar", en: "Scroll to explore", es: "Desplaza para explorar" }}</TextTranslator>
            </span>
          )}
        </div>
      </div>

      <div ref={navRef} className="flex items-center justify-between w-full max-w-7xl px-4 md:px-8 absolute top-0 left-1/2 -translate-x-1/2 h-16 z-10" style={{ opacity: 0, pointerEvents: "none" }}>
        <div className="flex-1 flex justify-start">
          {navReady && <SidebarDynamic />}
        </div>
        <div className="flex-1 hidden md:flex justify-center" />
        <div className="flex flex-1 items-center justify-end gap-1 md:gap-2">
          {isMounted && (
            <>
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLanguageCycle}
                  className={iconButtonClasses}
                  aria-label={t('changeLanguage')}
                >
                  <span key={i18n.language} className="icon-swap block font-bold">
                    {languageAcronyms[i18n.language] || "PT"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={iconButtonClasses}
                  aria-label={t('changeTheme')}
                >
                  <span key={theme} className="icon-swap block">
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </span>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={iconButtonClasses}
                  aria-label={t('clientArea')}
                >
                  <Link href="/login"><User className="h-5 w-5" /></Link>
                </Button>
              </div>

              {navReady && <SettingsMenuDynamic />}

              <div className="md:hidden">
                {navReady && <MobileOptions />}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ScrollSmootherHeader;