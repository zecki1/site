"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// gsap + ScrollTrigger só são baixados quando o usuário interage (rola ou
// move o mouse) — a home SSR pinta sem depender de JS (PageSpeed / TBT).
const loadGsap = () =>
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);

// Three.js é carregado só após interação do usuário (PageSpeed / TBT).
const HeroParticles = dynamic(
    () => import("@/components/three/HeroParticles"),
    { ssr: false, loading: () => null }
);

export function HomeFX() {
    const [fxOn, setFxOn] = useState(false);
    // A chuva Matrix é efeito de cursor (hover) — só monta em desktop com
    // mouse. No mobile/touch o chunk do rain nem é baixado (Lighthouse / CPU).
    const [hasFinePointer, setHasFinePointer] = useState(false);

    useEffect(() => {
        setHasFinePointer(window.matchMedia("(pointer: fine)").matches);
    }, []);

    useEffect(() => {
        if (!hasFinePointer) return;
        // Monta o WebGL (three.js) apenas quando o usuário interage com a página.
        const events = [
            "pointermove",
            "pointerdown",
            "touchstart",
            "scroll",
            "wheel",
            "keydown",
        ] as const;
        // Fallback: mesmo sem interação, a chuva Matrix do fundo aparece
        // logo após o carregamento (canvas 2D, chunk leve).
        const fallbackTimer = window.setTimeout(() => setFxOn(true), 800);
        const enable = () => {
            setFxOn(true);
            window.clearTimeout(fallbackTimer);
            events.forEach((ev) => window.removeEventListener(ev, enable));
        };
        events.forEach((ev) =>
            window.addEventListener(ev, enable, { passive: true })
        );
        return () => {
            window.clearTimeout(fallbackTimer);
            events.forEach((ev) => window.removeEventListener(ev, enable));
        };
    }, [hasFinePointer]);

    useEffect(() => {
        const root = document.getElementById("home-page");
        if (!root) return;

        let dispose: (() => void) | undefined;

        void loadGsap().then(([gsapMod, scrollMod]) => {
            const gsap = (gsapMod.default ?? gsapMod) as unknown as typeof import("gsap").default;
            const { ScrollTrigger } = scrollMod as typeof import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            const domListeners: {
                el: HTMLElement;
                type: string;
                fn: EventListener;
            }[] = [];
            let scrollFXReady = false;
            let scrollCleanup: (() => void) | undefined;

        // Efeitos de scroll (barra de progresso, reveals, cards).
        // Registrados apenas quando o usuário começa a rolar.
        const initScrollFX = () => {
            if (scrollFXReady) return;
            scrollFXReady = true;
            window.removeEventListener("scroll", onFirstScroll);
            window.removeEventListener("wheel", onFirstScroll);

            const scrollCtx = gsap.context(() => {
                gsap.to(".progress-bar", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        start: 0,
                        end: "max",
                        scrub: 0.3,
                    },
                });

                // immediateRender: false — o estado inicial (opacidade 0) só é
                // aplicado quando o gatilho REALMENTE dispara. Se um trigger
                // falhar por qualquer motivo (medição errada, imagem atrasada,
                // conteúdo-visibility, navegador sem suporte), os cards ficam
                // visíveis por padrão em vez de invisíveis para sempre.
                gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
                    gsap.fromTo(
                        el,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: el,
                                start: "top 92%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                });

                gsap.from(".product-card", {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: "#produtos",
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                });

                gsap.from(".service-card", {
                    opacity: 0,
                    scale: 0.95,
                    y: 30,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: "#servicos",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }, root);

            scrollCleanup = () => scrollCtx.revert();

            // Segurança #1: recalcula triggers quando imagens/layout terminam de
            // carregar (evita reveals presos por posição inicial errada).
            window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
            // Segurança #2: fallback à prova de bala — se por algum motivo um
            // reveal não disparou (trigger morto, imagem atrasada, reduced-motion
            // com gsap carregado), garante que os cards ficam SEMPRE visíveis.
            // O site não pode depender de deliver tchau de triggers para renderizar
            // conteúdo (PageSpeed/Core Web Vitals: conteúdo visível é obrigatório).
            gsap.delayedCall(2.5, () => {
                gsap.set([".reveal", ".product-card", ".service-card"], {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    clearProps: "opacity,transform,visibility",
                });
                // Recalcula posições após o layout estabilizar — evita
                // triggers "presos" por medição feita cedo demais.
                ScrollTrigger.refresh();
            });
        };

        const onFirstScroll = () => initScrollFX();
        window.addEventListener("scroll", onFirstScroll, { passive: true });
        window.addEventListener("wheel", onFirstScroll, { passive: true });

        if (window.scrollY > 10 || window.scrollY < 0) {
            initScrollFX();
        }

        // Animações do hero agora são CSS (`.hero-anim`/`.hero-cta` em
        // globals.css): o H1 pinta assim que o CSS chega, sem depender de JS.
        // O gsap aqui só cuida de interações posteriores (magnetic, cards).
        const ctx = gsap.context(() => {

            gsap.utils.toArray<HTMLElement>(".magnetic").forEach((el) => {
                const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
                const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });
                const move = (e: Event) => {
                    const me = e as MouseEvent;
                    const r = el.getBoundingClientRect();
                    xTo((me.clientX - (r.left + r.width / 2)) * 0.3);
                    yTo((me.clientY - (r.top + r.height / 2)) * 0.3);
                };
                const leave = () => {
                    xTo(0);
                    yTo(0);
                };
                el.addEventListener("mousemove", move);
                el.addEventListener("mouseleave", leave);
                domListeners.push({ el, type: "mousemove", fn: move });
                domListeners.push({ el, type: "mouseleave", fn: leave });
            });

            gsap.utils.toArray<HTMLElement>(".product-card").forEach((el) => {
                gsap.set(el, { transformPerspective: 900 });
                const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3.out" });
                const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3.out" });
                const move = (e: Event) => {
                    const me = e as MouseEvent;
                    const r = el.getBoundingClientRect();
                    const px = (me.clientX - r.left) / r.width - 0.5;
                    const py = (me.clientY - r.top) / r.height - 0.5;
                    ry(px * 6);
                    rx(-py * 6);
                };
                const leave = () => {
                    rx(0);
                    ry(0);
                };
                el.addEventListener("mousemove", move);
                el.addEventListener("mouseleave", leave);
                domListeners.push({ el, type: "mousemove", fn: move });
                domListeners.push({ el, type: "mouseleave", fn: leave });
            });
        }, root);

        dispose = () => {
            domListeners.forEach(({ el, type, fn }) => {
                el.removeEventListener(type, fn);
            });
            window.removeEventListener("scroll", onFirstScroll);
            window.removeEventListener("wheel", onFirstScroll);
            scrollCleanup?.();
            ctx.revert();
        };
        });

        return () => dispose?.();
    }, []);

    return (
        <>
            {/* BARRA DE PROGRESSO DE LEITURA */}
            <div
                className="progress-bar pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 origin-left scale-x-0 bg-linear-to-r from-[#00e1ff] via-[#38bdf8] to-[#7f00ff]"
                aria-hidden="true"
            ></div>
            {fxOn && hasFinePointer && <HeroParticles />}
        </>
    );
}