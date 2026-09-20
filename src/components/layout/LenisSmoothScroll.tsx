"use client";

import { useEffect } from "react";

export const LenisSmoothScroll = () => {
  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let ticker: ((time: number) => void) | null = null;
    let started = false;

    const cleanupListeners = () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("wheel", start);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };

    const start = () => {
      if (started) return;
      started = true;
      cleanupListeners();

      // lenis + gsap só são baixados na primeira interação do usuário —
      // o thread principal fica livre no carregamento (PageSpeed / TBT).
      void Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).then(([{ default: Lenis }, gsapMod, scrollMod]) => {
        const gsap = gsapMod.default ?? gsapMod;
        const { ScrollTrigger } = scrollMod;
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          anchors: { offset: -72 },
          respectReducedMotion: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        ticker = (time: number) => {
          lenis?.raf(time * 1000);
        };

        if (ticker) {
          gsap.ticker.add(ticker);
        }
        gsap.ticker.lagSmoothing(0);

        // Se a página já chegou com scroll (reload mid-page), já aplica.
        if (window.scrollY > 10) {
          ScrollTrigger.refresh();
        }
      });
    };

    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("wheel", start, { passive: true });
    window.addEventListener("pointerdown", start, { passive: true });
    window.addEventListener("keydown", start);

    if (window.scrollY > 10) {
      start();
    }

    return () => {
      cleanupListeners();
      lenis?.destroy();
      if (ticker) {
        const callback = ticker;
        void import("gsap").then((mod) => {
          const gsap = mod.default ?? mod;
          gsap.ticker.remove(callback);
        });
      }
    };
  }, []);

  return null;
};