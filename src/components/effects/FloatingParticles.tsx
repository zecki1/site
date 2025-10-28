
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { FaCode } from "react-icons/fa";
import { LuCodeXml, LuCode } from "react-icons/lu";
import { AiOutlineCode } from "react-icons/ai";
import { BiCodeCurly } from "react-icons/bi";
import { RxGithubLogo } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { RxImage } from "react-icons/rx";
import { CiCloudOn } from "react-icons/ci";
import { CiAt } from "react-icons/ci";
import { CiChat2 } from "react-icons/ci";

const icons = [FaCode, LuCodeXml, LuCode, AiOutlineCode, BiCodeCurly, RxGithubLogo, RxCross2, RxImage, CiCloudOn, CiAt, CiChat2];
// ✨ CORREÇÃO: Aumentado o número de partículas para melhor preenchimento.
const particleCount = 80;
const repelRadius = 100;

const FloatingParticles = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !containerRef.current) return;

        const ctx = gsap.context(() => {
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
                        const moveX = (dx / distance) * force * 50;
                        const moveY = (dy / distance) * force * 50;

                        gsap.to(particle, {
                            x: moveX,
                            y: moveY,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    } else {
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
            // ✨ CORREÇÃO CRÍTICA:
            // 'fixed' -> Fixa o container na janela de visualização, independente da rolagem.
            // '-z-10' -> Coloca o container atrás de todo o outro conteúdo da página.
            // 'inset-0' -> Garante que ele ocupe 100% da altura e largura da janela.
            className="fixed inset-0 w-full h-full -z-10 hidden md:block pointer-events-none"
            aria-hidden="true"
        >
            {Array.from({ length: particleCount }).map((_, index) => {
                const IconComponent = icons[index % icons.length];
                const style = {
                    // A lógica de espalhar as partículas verticalmente ainda funciona bem com 'position: fixed'
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