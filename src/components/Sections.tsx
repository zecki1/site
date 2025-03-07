"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ContainerSection({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.fromTo(
            ".container-section",
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
    }, [])

    return (
        <section className="container-section py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Seção com Container</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input placeholder="Digite algo..." className="mb-4" />
                        <Button>Enviar</Button>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export function FullWidthSection({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        gsap.fromTo(
            ".full-width-section",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
        )
    }, [])

    return (
        <section className="full-width-section w-full py-16 bg-blue-500 text-white">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Seção de Largura Total</h2>
                <Button variant="outline">Clique Aqui</Button>
                {children}
            </div>
        </section>
    )
}