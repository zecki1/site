"use client"

import { useEffect, useRef, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { navSections } from "@/lib/navSections"

// Tipo inferido de navSections
type NavSection = (typeof navSections)[number]

interface NavigationScrollTriggerProps {
  sections: readonly NavSection[]
  children?: ReactNode // Permite passar componentes personalizados
  className?: string
}

export const NavigationScrollTrigger: React.FC<NavigationScrollTriggerProps> = ({
  sections,
  children,
  className,
}) => {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    sections.forEach((section) => {
      const link = navRef.current?.querySelector(`[data-section="${section.id}"]`)
      if (link) {
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => link.classList.add("active"),
          onLeave: () => link.classList.remove("active"),
          onEnterBack: () => link.classList.add("active"),
          onLeaveBack: () => link.classList.remove("active"),
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [sections])

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 z-50 w-full bg-white shadow-md p-4 flex items-center justify-center gap-6",
        "border-b border-gray-200 backdrop-blur-md bg-opacity-90",
        className
      )}
    >
      {children ? (
        children // Renderiza os componentes personalizados passados
      ) : (
        // Fallback para links simples se nenhum children for fornecido
        sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            data-section={section.id} // Atributo para identificar a seção
            className="text-gray-700 hover:text-blue-500 transition-colors duration-200 active:text-blue-600 active:font-semibold"
          >
            {section.title.ptBR} {/* Pode usar TextTranslator aqui se preferir */}
          </a>
        ))
      )}
    </nav>
  )
}

export default NavigationScrollTrigger