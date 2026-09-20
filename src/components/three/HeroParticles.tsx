"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
    className?: string;
}

// Símbolos da chuva — binários 0-1, com os demais dígitos para densidade.
const GLYPH_CODES = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const FONT_BASE = 15;
// Velocidade por coluna (linhas por frame): valores baixos = queda lenta,
// com uma dispersão por coluna — algumas partes caem mais devagar que outras.
const SPEED_MIN = 0.28;
const SPEED_MAX = 0.62;

// Efeito do cursor: raio (px) em que as letras crescem e desaceleram.
const HOVER_RADIUS = 240;
// Zoom máximo (multiplicador de fonte) bem no centro do cursor.
const MAX_ZOOM = 2.0;
// Fração mínima de velocidade perto do cursor (0.2 = fica ~5x mais lento).
const HOVER_MIN_SPEED = 0.2;

interface Column {
    y: number;
    speed: number;
}

const HeroParticles = ({ className }: MatrixRainProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;
        if (width === 0 || height === 0) {
            const parent = canvas.parentElement?.getBoundingClientRect();
            width = parent?.width ?? 320;
            height = parent?.height ?? 240;
        }

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        const columns = Math.max(1, Math.floor(width / FONT_BASE));
        const drops: Column[] = Array.from({ length: columns }, () => ({
            y: Math.floor(Math.random() * -90),
            speed: rand(SPEED_MIN, SPEED_MAX),
        }));

        let mouse = { x: -9999, y: -9999 };
        const onMouseMove = (e: MouseEvent) => {
            const { left, top } = canvas.getBoundingClientRect();
            mouse = { x: e.clientX - left, y: e.clientY - top };
        };
        const onMouseLeave = () => {
            mouse = { x: -9999, y: -9999 };
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseout", onMouseLeave, { passive: true });

        let rafId = 0;
        let running = true;

        ctx.textAlign = "center";

        const tick = () => {
            if (!running) return;
            ctx.fillStyle = "rgba(2, 6, 23, 0.12)";
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < columns; i++) {
                const col = drops[i];
                const cx = i * FONT_BASE + FONT_BASE / 2;
                const colY = col.y * FONT_BASE;

                const dx = cx - mouse.x;
                const dy = colY - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const near =
                    dist >= HOVER_RADIUS
                        ? 0
                        : Math.pow(1 - dist / HOVER_RADIUS, 2);

                // Quanto mais perto do cursor, mais devagar cai a coluna.
                const speedFactor = 1 - (1 - HOVER_MIN_SPEED) * near;
                col.y += col.speed * speedFactor;

                if (colY > height + 24 && Math.random() > 0.985) {
                    col.y = Math.floor(Math.random() * -50);
                    col.speed = rand(SPEED_MIN, SPEED_MAX);
                }

                const glyph =
                    GLYPH_CODES[Math.floor(Math.random() * GLYPH_CODES.length)];

                // Corpo (rastro) — tom apagado, sempre no tamanho base.
                ctx.font = `${FONT_BASE}px monospace`;
                ctx.fillStyle = "rgba(13, 148, 184, 0.55)";
                ctx.fillText(glyph, cx, colY);

                // Cabeça da gota — brilha e dá "zoom" perto do cursor.
                const zoom = 1 + MAX_ZOOM * near;
                ctx.font = `${Math.round(FONT_BASE * zoom * 10) / 10}px monospace`;
                ctx.fillStyle = near > 0.45 ? "#f0fdff" : near > 0.12 ? "#67e8f9" : "#22d3ee";
                ctx.fillText(glyph, cx, colY);
            }
            rafId = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseout", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
            aria-hidden="true"
        />
    );
};

function rand(min: number, max: number) {
    return min + Math.random() * (max - min);
}

export default HeroParticles;