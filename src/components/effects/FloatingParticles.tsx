"use client";

import React, { useEffect, useRef, useState } from 'react'; // 1. Importar useState
import { gsap } from 'gsap';

import { FaCode } from "react-icons/fa";
import { LuCodeXml, LuCode } from "react-icons/lu";
import { AiOutlineCode } from "react-icons/ai";
import { BiCodeCurly } from "react-icons/bi";

const icons = [FaCode, LuCodeXml, LuCode, AiOutlineCode, BiCodeCurly];
const particleCount = 15;

const FloatingParticles = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false); // 2. Adicionar estado de montagem

    // Este useEffect garante que o conteúdo só seja renderizado no cliente
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // A animação só deve rodar se o container existir (após a montagem)
        if (!isMounted || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(".particle-icon", {
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
        }, containerRef);

        return () => ctx.revert();
    }, [isMounted]); // 3. Re-executar o efeito quando isMounted mudar

    // 4. Se não estiver montado, não renderiza NADA. Isso resolve o erro de hidratação.
    if (!isMounted) {
        return null;
    }

    return (
        <div 
            ref={containerRef} 
            // MUDANÇA: Alterado de `lg:block` para `md:block` para aparecer em mais telas.
            className="absolute inset-0 -z-10 w-full h-full hidden md:block pointer-events-none"
            aria-hidden="true"
        >
            {Array.from({ length: particleCount }).map((_, index) => {
                const IconComponent = icons[index % icons.length];
                const style = {
                    top: `${gsap.utils.random(5, 95)}%`,
                    left: `${gsap.utils.random(5, 95)}%`,
                    fontSize: `${gsap.utils.random(20, 50)}px`,
                };

                return (
                    <IconComponent
                        key={index}
                        // Revertido para a classe de animação de cor, que é segura.
                        className="particle-icon animate-icon-color absolute"
                        style={style}
                    />
                );
            })}
        </div>
    );
};

export default FloatingParticles;