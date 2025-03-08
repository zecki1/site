"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

interface StaggeredTextProps {
  text: string
  className?: string
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({ text, className }) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const chars = text.split("").map((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char // Preserva espaços
      span.style.display = "inline-block" // Para animar cada caractere
      return span
    })

    const container = textRef.current
    if (container) {
      container.innerHTML = "" // Limpa o conteúdo
      chars.forEach((char) => container.appendChild(char)) // Adiciona os spans

      gsap.from(chars, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [text])

  return <div ref={textRef} className={cn("text-4xl font-bold", className)} />
}

export default StaggeredText