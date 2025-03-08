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
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
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