"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface CanvasParticlesProps {
    imageSrc: string;
    className?: string;
}

export const CanvasParticles: React.FC<CanvasParticlesProps> = ({ imageSrc, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d")!;
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCtx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;

            const particles: { x: number; y: number; size: number; speed: number; color: string }[] = [];
            const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.5;
            const offsetX = (canvas.width - img.width * scaleFactor) / 2;
            const offsetY = (canvas.height - img.height * scaleFactor) / 2;

            for (let y = 0; y < img.height; y += 4) {
                for (let x = 0; x < img.width; x += 4) {
                    const i = (y * img.width + x) * 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];

                    if (a > 0) {
                        particles.push({
                            x: x * scaleFactor + offsetX,
                            y: y * scaleFactor + offsetY,
                            size: Math.random() * 2 + 1,
                            speed: Math.random() * 0.5 + 0.1,
                            color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
                        });
                    }
                }
            }

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach((p) => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                });
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animate();

            gsap.to(particles, {
                y: () => canvas.height,
                stagger: 0.01,
                ease: "none",
                scrollTrigger: {
                    trigger: canvas,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        };

        img.onerror = () => {
            console.error("Erro ao carregar a imagem:", imageSrc);
        };

        window.addEventListener("resize", updateCanvasSize);

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, [imageSrc]);

    return <canvas ref={canvasRef} className={cn("w-full h-screen", className)} />;
};

export default CanvasParticles;