<<<<<<< HEAD
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

interface ScrollTriggerClampProps {
  className?: string
}

export const ScrollTriggerClamp: React.FC<ScrollTriggerClampProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const panels = containerRef.current?.querySelectorAll(".panel")
    if (panels) {
=======
// src/components/gsap/ScrollTriggerClamp.tsx

"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// NOVO: Adicionado 'children' às propriedades
interface ScrollTriggerClampProps {
  className?: string;
  children: ReactNode;
}

export const ScrollTriggerClamp: React.FC<ScrollTriggerClampProps> = ({ className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // O seletor '.panel' é aplicado aos filhos diretos do container
    const panels = gsap.utils.toArray<HTMLElement>('.panel', containerRef.current);

    if (panels.length > 0) {
>>>>>>> refazendo-header
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
<<<<<<< HEAD
          pinSpacing: false,
        })
      })
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <div className="panel h-screen bg-blue-500 flex items-center justify-center text-white text-4xl">
        Panel 1
      </div>
      <div className="panel h-screen bg-red-500 flex items-center justify-center text-white text-4xl">
        Panel 2
      </div>
      <div className="panel h-screen bg-green-500 flex items-center justify-center text-white text-4xl">
        Panel 3
      </div>
      <div className="panel h-screen bg-yellow-500 flex items-center justify-center text-white text-4xl">
        Panel 4
      </div>
    </div>
  )
}

export default ScrollTriggerClamp
=======
          pinSpacing: false, // Importante para o efeito de "empilhar"
        });
      });
    }

    return () => {
      // Mata todas as triggers criadas por este componente para evitar vazamento de memória
      ScrollTrigger.getAll().forEach((trigger) => {
        if (panels.some(p => p === trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []); // Dependência vazia para rodar apenas uma vez

  // ALTERADO: Renderiza os 'children' recebidos
  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      {children}
    </div>
  );
};

export default ScrollTriggerClamp;
>>>>>>> refazendo-header
