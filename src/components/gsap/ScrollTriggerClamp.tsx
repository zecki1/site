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
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
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