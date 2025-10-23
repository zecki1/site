"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CustomCursor = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = cursorDotRef.current;
        const outline = cursorOutlineRef.current;

        if (!dot || !outline) return;

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(dot, { x: clientX, y: clientY, duration: 0.1 });
            gsap.to(outline, { x: clientX, y: clientY, duration: 0.3, ease: 'power1.out' });
        };

        const handleMouseEnter = () => {
            gsap.to(outline, { scale: 1.5, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to(outline, { scale: 1, duration: 0.3 });
        };

        window.addEventListener('mousemove', moveCursor);

        // Adiciona efeito de hover a links, botões e elementos com a classe específica
        document.querySelectorAll('a, button, .cursor-hover-target').forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.querySelectorAll('a, button, .cursor-hover-target').forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 w-8 h-8 border-2 border-white/50 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
};