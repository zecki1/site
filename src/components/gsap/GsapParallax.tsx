"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GsapParallaxProps {
  backgroundImage?: string;
  videoSrc?: string;
  images?: string[];
  children: React.ReactNode;
  height?: string;
  className?: string;
}

export const GsapParallax: React.FC<GsapParallaxProps> = ({
  backgroundImage,
  videoSrc,
  images,
  children,
  height = "100vh",
  className,
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const parallaxElement = parallaxRef.current;

    if (parallaxElement) {
      if (videoSrc && videoRef.current) {
        const video = videoRef.current;
        video.onloadedmetadata = () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: parallaxElement,
              start: "top top",
              end: "bottom+=200% bottom",
              scrub: 2,
            },
          });
          tl.to(video, { currentTime: video.duration });
          const isTouchDevice = () =>
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
          if (isTouchDevice()) {
            video.play().catch(() => { }); // Simplified, handle errors
          }
        };
      } else if (backgroundImage && backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      } else if (images && backgroundRef.current) {
        const items = backgroundRef.current.querySelectorAll(".parallax-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { y: -100 },
            {
              y: 100,
              ease: "none",
              scrollTrigger: {
                trigger: parallaxElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [backgroundImage, videoSrc, images]);

  return (
    <div ref={parallaxRef} className={cn("relative overflow-hidden", className)} style={{ height }}>
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          playsInline
          webkit-playsinline="true"
          preload="auto"
          muted
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "120%",
            top: "-10%",
          }}
        />
      ) : images ? (
        <div ref={backgroundRef} className="absolute inset-0 z-0">
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
      ) : (
        <div className="absolute inset-0 z-0 bg-gray-200" /> // Fallback UI
      )}
      <div className="relative z-10 flex items-center justify-center h-full">{children}</div>
    </div>
  );
};

export default GsapParallax;