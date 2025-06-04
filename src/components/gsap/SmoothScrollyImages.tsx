"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import Image from "next/image" // Adicionado

interface SmoothScrollyImagesProps {
  images: string[]
  className?: string
}

export const SmoothScrollyImages: React.FC<SmoothScrollyImagesProps> = ({ images, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const gallery = containerRef.current
    if (gallery) {
      const totalWidth = gallery.scrollWidth
      gsap.to(gallery, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
        },
      })
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [images])

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
  )
}

export default SmoothScrollyImages