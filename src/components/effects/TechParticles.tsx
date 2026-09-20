"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoNodejs, BiLogoTypescript, BiLogoPhp } from "react-icons/bi";
import { SiLaravel, SiMysql, SiFigma, SiDocker, SiDotnet } from "react-icons/si";
import { DiHtml5, DiCss3 } from "react-icons/di";
import { BsGit } from "react-icons/bs";

// Os ícones (react-icons) ficam neste chunk: o TechParticles é carregado só
// com `dynamic()` quando a seção #habilidades se aproxima (desktop) — assim a
// home mobile não baixa react-icons (PageSpeed).

const techStack = [
    { name: "React", Icon: FaReact },
    { name: "Next.js", Icon: TbBrandNextjs },
    { name: "Node.js", Icon: BiLogoNodejs },
    { name: "TypeScript", Icon: BiLogoTypescript },
    { name: ".NET", Icon: SiDotnet },
    { name: "PHP", Icon: BiLogoPhp },
    { name: "Laravel", Icon: SiLaravel },
    { name: "MySQL", Icon: SiMysql },
    { name: "Figma", Icon: SiFigma },
    { name: "Git", Icon: BsGit },
    { name: "Docker", Icon: SiDocker },
    { name: "HTML5", Icon: DiHtml5 },
    { name: "CSS3", Icon: DiCss3 },
];

interface Particle {
    ref: HTMLDivElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    colorTween?: gsap.core.Tween;
}

const twoColors = ["#38bdf8", "#9ca3af"];
const PARTICLE_RADIUS = 40;
const HOVER_COLOR = "#00e1ff";

const TechParticles = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const particleRefs = Array.from(container.children) as HTMLDivElement[];

        const ctx = gsap.context(() => {
            // --- INICIALIZAÇÃO DAS PARTÍCULAS ---
            particles.current = particleRefs.map((ref) => {
                let x, y, isOverlapping;
                let attempts = 0;
                do {
                    isOverlapping = false;
                    x = gsap.utils.random(PARTICLE_RADIUS, container.clientWidth - PARTICLE_RADIUS);
                    y = gsap.utils.random(PARTICLE_RADIUS, container.clientHeight - PARTICLE_RADIUS);
                    for (const p of particles.current) {
                        const distance = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2));
                        if (distance < p.radius + PARTICLE_RADIUS) {
                            isOverlapping = true;
                            break;
                        }
                    }
                    attempts++;
                } while (isOverlapping && attempts < 100);

                gsap.set(ref, { x, y, xPercent: -50, yPercent: -50 });

                return {
                    ref, x, y,
                    vx: gsap.utils.random(-0.5, 0.5),
                    vy: gsap.utils.random(-0.5, 0.5),
                    radius: PARTICLE_RADIUS,
                };
            });

            particles.current.forEach(p => {
                const startColor = gsap.utils.random(twoColors);
                const endColor = startColor === twoColors[0] ? twoColors[1] : twoColors[0];
                gsap.set(p.ref, { color: startColor });
                p.colorTween = gsap.to(p.ref, {
                    color: endColor,
                    duration: gsap.utils.random(4, 8),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            // --- LOOP DE ANIMAÇÃO (TICKER) ---
            const ticker = () => {
                const width = container.clientWidth;
                const height = container.clientHeight;
                particles.current.forEach((p1, i) => {
                    p1.x += p1.vx;
                    p1.y += p1.vy;
                    if (p1.x < p1.radius || p1.x > width - p1.radius) p1.vx *= -1;
                    if (p1.y < p1.radius || p1.y > height - p1.radius) p1.vy *= -1;
                    for (let j = i + 1; j < particles.current.length; j++) {
                        const p2 = particles.current[j];
                        const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                        if (distance < p1.radius + p2.radius) {
                            [p1.vx, p2.vx] = [p2.vx, p1.vx];
                            [p1.vy, p2.vy] = [p2.vy, p1.vy];
                        }
                    }
                    gsap.set(p1.ref, { x: p1.x, y: p1.y });
                });
            };
            gsap.ticker.add(ticker);

            // --- EFEITO DE HOVER ---
            const listeners: { ref: HTMLDivElement; enter: () => void; leave: () => void }[] = [];

            particleRefs.forEach((ref, index) => {
                const particle = particles.current[index];
                const onMouseEnter = () => {
                    particle.colorTween?.pause();
                    gsap.to(ref, { scale: 1.3, color: HOVER_COLOR, opacity: 1, duration: 0.3, ease: "power2.out" });
                };
                const onMouseLeave = () => {
                    gsap.to(ref, {
                        scale: 1,
                        opacity: 0.6,
                        color: gsap.getProperty(ref, "color") as string,
                        duration: 0.5,
                        ease: "power2.out",
                        // --- CORREÇÃO APLICADA AQUI ---
                        // Adicionamos chaves {} para criar um corpo de função que não retorna um valor.
                        onComplete: () => {
                            particle.colorTween?.resume();
                        }
                    });
                };
                ref.addEventListener('mouseenter', onMouseEnter);
                ref.addEventListener('mouseleave', onMouseLeave);
                listeners.push({ ref, enter: onMouseEnter, leave: onMouseLeave });
            });

            return () => {
                gsap.ticker.remove(ticker);
                listeners.forEach(({ ref, enter, leave }) => {
                    ref.removeEventListener('mouseenter', enter);
                    ref.removeEventListener('mouseleave', leave);
                });
            };

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            {techStack.map(({ name, Icon }) => (
                <div key={name} className="absolute cursor-pointer" title={name}>
                    <Icon className="h-10 w-10 md:h-12 md:w-12 opacity-60" title={name} />
                </div>
            ))}
        </div>
    );
};

export default TechParticles;