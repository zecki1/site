"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// 1. Importe o hook useTheme do seu provedor de tema
import { useTheme } from "@/components/layout/ThemeProvider";

export const CustomCursor = () => {
    // 2. Obtenha o tema atual usando o hook
    const { theme } = useTheme();

    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const hoverAnimationRef = useRef<gsap.core.Timeline | null>(null);

    // 3. Adicione `theme` ao array de dependências do useEffect.
    // Isso fará com que o efeito seja re-executado sempre que o tema mudar.
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const dot = cursorDotRef.current;
        const outline = cursorOutlineRef.current;

        if (!dot || !outline) return;

        document.documentElement.classList.add('cursor-active');

        // 4. Defina as cores base do cursor com base no tema atual
        const isLightTheme = theme === 'light';
        const dotColor = isLightTheme ? 'black' : 'white';
        const outlineColor = isLightTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';

        // 5. Pega a cor primária do tema para a animação de hover
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();

        // 6. Use gsap.set() para aplicar as cores corretas imediatamente
        // Isso garante que o cursor tenha a cor certa ao carregar a página e ao trocar de tema.
        gsap.set(dot, { backgroundColor: dotColor });
        gsap.set(outline, { borderColor: outlineColor });


        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(dot, { x: clientX, y: clientY, duration: 0.1 });
            gsap.to(outline, { x: clientX, y: clientY, duration: 0.3, ease: 'power1.out' });
        };

        const handleMouseEnter = () => {
            if (hoverAnimationRef.current) return;

            hoverAnimationRef.current = gsap.timeline({
                repeat: -1,
                yoyo: true,
            })
                .to(outline, {
                    scale: 2.5,
                    borderColor: themeColor,
                    duration: 0.5,
                    ease: 'power2.inOut',
                })
                .to(dot, {
                    backgroundColor: themeColor,
                    duration: 0.5,
                    ease: 'power2.inOut',
                }, "<");
        };

        const handleMouseLeave = () => {
            if (hoverAnimationRef.current) {
                hoverAnimationRef.current.kill();
                hoverAnimationRef.current = null;
            }

            // 7. Ao sair do hover, retorne para as cores base corretas do tema
            gsap.to(outline, {
                scale: 1,
                borderColor: outlineColor, // Usa a variável de cor dinâmica
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(dot, {
                backgroundColor: dotColor, // Usa a variável de cor dinâmica
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', moveCursor);

        const hoverTargets = document.querySelectorAll(
            'a, button, [role="button"], .cursor-hover-target'
        );

        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.documentElement.classList.remove('cursor-active');
            window.removeEventListener('mousemove', moveCursor);
            hoverTargets.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            // Garante que a animação pare se o componente for desmontado durante o hover
            if (hoverAnimationRef.current) {
                hoverAnimationRef.current.kill();
            }
        };
    }, [theme]); // O efeito agora depende do tema!

    // 8. Remova as classes de cor hardcoded do JSX.
    // GSAP agora controla totalmente as cores, evitando conflitos.
    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
};