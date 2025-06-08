"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GsapImageParallaxProps {
    images: string[];
    className?: string;
}

export const GsapImageParallax: React.FC<GsapImageParallaxProps> = ({ images, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const items = containerRef.current?.querySelectorAll(".parallax-item");
        if (items) {
            items.forEach((item) => {
                gsap.fromTo(
                    item,
                    { y: -100 },
                    {
                        y: 100,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });
        }
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [images]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-screen overflow-hidden", className)}>
            {images.map((src, i) => (
                <Image
                    key={i}
                    src={src}
                    alt={`Parallax ${i}`}
                    width={800}
                    height={600}
                    className="parallax-item absolute w-full h-full object-cover"
                    style={{ zIndex: i, transform: `translateY(${-i * 20}px)` }}
                />
            ))}
        </div>
    );
};

export default GsapImageParallax;