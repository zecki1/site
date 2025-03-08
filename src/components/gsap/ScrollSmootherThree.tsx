"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

interface ScrollSmootherThreeProps {
  className?: string
}

export const ScrollSmootherThree: React.FC<ScrollSmootherThreeProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    camera.position.z = 5
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
    gsap.to(cube.rotation, {
      x: "+=6.28",
      y: "+=6.28",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("w-full h-screen", className)}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ScrollSmootherThree