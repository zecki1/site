"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SmoothScrollyImagesProps {
  images: string[];
  className?: string;
}

export const SmoothScrollyImages: React.FC<SmoothScrollyImagesProps> = ({ images, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const gallery = containerRef.current;
    let ctx: gsap.Context;

    const updateScroll = () => {
      if (gallery) {
        const totalWidth = gallery.scrollWidth;
        ctx = gsap.context(() => {
          gsap.to(gallery, {
            x: () => -(totalWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: gallery,
              start: "top top",
              end: () => `+=${totalWidth - window.innerWidth}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    };

    updateScroll();
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("resize", updateScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (ctx) ctx.revert();
    };
  }, [images]);

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div ref={containerRef} className="flex h-screen">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Gallery ${i}`}
            width={800}
            height={600}
            className="h-full w-auto object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default SmoothScrollyImages;