"use client";

import React, { useRef, useEffect } from 'react';

const ElectricLines = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.parentElement!.clientWidth;
        let height = canvas.height = 150;
        let points: { x: number; y: number; vx: number; vy: number }[] = [];
        let running = true;

        const Point = function (this: any, x: number, y: number) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
        };

        const init = () => {
            width = canvas.width = canvas.parentElement!.clientWidth;
            points = [];
            for (let i = 0; i < 3; i++) {
                points.push(new (Point as any)(
                    Math.random() * width,
                    Math.random() * height
                ));
            }
        };

        const update = () => {
            points.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x > width || p.x < 0) p.vx *= -1;
                if (p.y > height || p.y < 0) p.vy *= -1;
            });
        };

        const draw = () => {
            if (!running) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const p1 = points[i];
                    const p2 = points[j];
                    const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);

                        let segments = Math.floor(distance / 5);
                        segments = Math.max(5, segments);
                        const dx = (p2.x - p1.x) / segments;
                        const dy = (p2.y - p1.y) / segments;

                        for (let k = 1; k < segments; k++) {
                            const newX = p1.x + dx * k + (Math.random() - 0.5) * 20;
                            const newY = p1.y + dy * k + (Math.random() - 0.5) * 20;
                            ctx.lineTo(newX, newY);
                        }

                        ctx.lineTo(p2.x, p2.y);

                        const opacity = 1 - distance / 200;
                        const color = getComputedStyle(document.documentElement)
                            .getPropertyValue('--color-primary-interactive') || '#00e1ff';
                        ctx.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity * 0.5})`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const loop = () => {
            if (!running) return;
            update();
            draw();
            requestAnimationFrame(loop);
        };

        init();
        loop();

        const handleResize = () => init();
        window.addEventListener('resize', handleResize);

        return () => {
            running = false;
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-[150px]" />;
};

export default ElectricLines;
