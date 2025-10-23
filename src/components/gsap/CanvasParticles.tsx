"use client";

import React, { useEffect, useRef } from 'react';

// Helper para converter HEX para RGB, útil para mudar a opacidade da cor
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update(width: number, height: number) {
        if (this.x > width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > height || this.y < 0) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export const ConstellationParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const highlightColor = "#00e1ff"; // Sua cor de destaque

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = window.innerWidth < 768 ? 40 : 80;
        const mouse = { x: -1000, y: -1000 };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * (window.innerWidth - size * 2) + size;
                const y = Math.random() * (window.innerHeight - size * 2) + size;
                const speedX = (Math.random() - 0.5) * 0.5;
                const speedY = (Math.random() - 0.5) * 0.5;
                particles.push(new Particle(x, y, size, speedX, speedY));
            }
        };

        const connect = () => {
            const highlightRgb = hexToRgb(highlightColor);
            if (!highlightRgb) return;

            for (let a = 0; a < particles.length; a++) {
                // Conectar com o mouse
                const dxMouse = particles[a].x - mouse.x;
                const dyMouse = particles[a].y - mouse.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distanceMouse < 150) {
                    const opacity = 1 - distanceMouse / 150;
                    ctx.strokeStyle = `rgba(${highlightRgb.r}, ${highlightRgb.g}, ${highlightRgb.b}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                // Conectar com outras partículas
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const opacity = 1 - distance / 120;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx, 'rgba(255, 255, 255, 0.8)');
            });
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOut = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        setCanvasSize();
        init();
        animate();

        window.addEventListener('resize', () => {
            setCanvasSize();
            init();
        });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};