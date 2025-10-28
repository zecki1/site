"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// REMOVIDO: Não precisamos mais importar o ScrollTrigger aqui
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FaCode } from "react-icons/fa";
import { LuCodeXml, LuCode } from "react-icons/lu";
import { AiOutlineCode } from "react-icons/ai";
import { BiCodeCurly } from "react-icons/bi";

// REMOVIDO: O registro do plugin não é mais necessário
// if (typeof window !== 'undefined') {
//     gsap.registerPlugin(ScrollTrigger);
// }

const FloatingScrollIcons = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // A animação agora só precisa rodar uma vez no cliente, sem gatilhos
        const ctx = gsap.context(() => {
            const icons = gsap.utils.toArray<HTMLElement>(".floating-icon");

            icons.forEach((icon) => {
                // --- A LÓGICA DE ANIMAÇÃO FOI TOTALMENTE SUBSTITUÍDA ---
                // Em vez de reagir ao scroll, criamos uma animação infinita e suave.
                gsap.to(icon, {
                    // O ícone se moverá para uma nova posição aleatória...
                    x: gsap.utils.random(-100, 100, 1), // Movimento horizontal mais sutil
                    y: gsap.utils.random(-150, 150, 1), // Movimento vertical
                    rotation: gsap.utils.random(-45, 45, 1), // Rotação suave

                    // ...durante um longo período de tempo...
                    duration: gsap.utils.random(15, 30), // Duração lenta e variada

                    // ...e fará isso para sempre.
                    repeat: -1, // Repetir infinitamente
                    yoyo: true, // A animação inverte no final, criando um movimento de "vai e vem"
                    ease: "sine.inOut", // Movimento suave sem acelerações bruscas
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []); // O array de dependências vazio garante que isso rode apenas uma vez

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 -z-10 w-full h-full hidden md:block"
            aria-hidden="true"
        >
            {/* O HTML permanece exatamente o mesmo */}
            <FaCode className="floating-icon animate-icon-color absolute top-[15%] left-[10%] text-primary/10" size={60} />
            <LuCodeXml className="floating-icon animate-icon-color absolute top-[30%] right-[15%] text-primary/10" size={80} />
            <LuCode className="floating-icon animate-icon-color absolute bottom-[40%] left-[20%] text-primary/10" size={50} />
            <AiOutlineCode className="floating-icon animate-icon-color absolute bottom-[10%] right-[25%] text-primary/10" size={70} />
            <BiCodeCurly className="floating-icon animate-icon-color absolute top-[60%] left-[5%] text-primary/10" size={90} />
            <FaCode className="floating-icon animate-icon-color absolute top-[80%] right-[5%] text-primary/10" size={40} />
        </div>
    );
};

export default FloatingScrollIcons; 