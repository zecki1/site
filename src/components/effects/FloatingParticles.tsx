"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { FaCode } from "react-icons/fa";
import { LuCodeXml, LuCode } from "react-icons/lu";
import { AiOutlineCode } from "react-icons/ai";
import { BiCodeCurly } from "react-icons/bi";

const icons = [FaCode, LuCodeXml, LuCode, AiOutlineCode, BiCodeCurly];
// AUMENTADO: Mais partículas para preencher a página
const particleCount = 40;
const repelRadius = 100; // A distância em pixels que o mouse começa a "empurrar" os ícones

const FloatingParticles = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Um array de refs para cada partícula, para podermos manipulá-las individualmente
    const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // 1. Animação de flutuação base (vertical) - SEM ALTERAÇÃO
            gsap.to(particleRefs.current, {
                y: "-=40",
                duration: gsap.utils.random(4, 7),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.5,
                    from: "random",
                },
            });

            // 2. NOVA LÓGICA: Interação com o mouse
            const handleMouseMove = (event: MouseEvent) => {
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                particleRefs.current.forEach(particle => {
                    if (!particle) return;

                    const { left, top, width, height } = particle.getBoundingClientRect();
                    const particleX = left + width / 2;
                    const particleY = top + height / 2;

                    const dx = particleX - mouseX;
                    const dy = particleY - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < repelRadius) {
                        const force = 1 - (distance / repelRadius);
                        const moveX = (dx / distance) * force * 50; // O 50 é a "força" do empurrão
                        const moveY = (dy / distance) * force * 50;

                        // Anima o ícone para longe do mouse
                        gsap.to(particle, {
                            x: moveX,
                            y: moveY,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    } else {
                        // Gradualmente retorna o ícone à sua flutuação normal se o mouse se afastar
                        gsap.to(particle, {
                            x: 0,
                            y: 0,
                            duration: 0.7,
                            ease: "power2.out"
                        });
                    }
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            // Limpeza: remove o listener quando o componente é desmontado
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };

        }, containerRef);

        return () => ctx.revert();
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
            aria-hidden="true"
        >
            {Array.from({ length: particleCount }).map((_, index) => {
                const IconComponent = icons[index % icons.length];
                const style = {
                    // CORREÇÃO DE ALTURA: Espalha as partículas por 400% da altura da tela
                    top: `${gsap.utils.random(5, 185)}%`,
                    left: `${gsap.utils.random(5, 95)}%`,
                    fontSize: `${gsap.utils.random(20, 50)}px`,
                };

                return (
                    <div
                        key={index}
                        ref={el => particleRefs.current[index] = el}
                        className="particle-icon animate-icon-color absolute"
                        style={style}
                    >
                        <IconComponent />
                    </div>
                );
            })}
        </div>
    );
};

export default FloatingParticles;