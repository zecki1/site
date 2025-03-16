"use client";

import { Container } from "lucide-react";
import { Cover } from "@/components/layout/Cover";
import { Flags } from "@/components/layout/Flags";
import { Header } from "@/components/layout/Header";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { Section } from "@/components/layout/Sections";
import { Sidebar } from "@/components/layout/Sidebar";
import { TextTranslator } from "@/components/layout/TextTranslator";
import { Topic } from "@/components/layout/Topic";
import { ImageParallax } from "@/components/gsap/ImageParallax";
import { ScrollTriggerClamp } from "@/components/gsap/ScrollTriggerClamp";
import { ScrollSmootherThree } from "@/components/gsap/ScrollSmootherThree";
import { ScrollTriggerHorizontalGallery } from "@/components/gsap/ScrollTriggerHorizontalGallery";
import { ScrollSmoother } from "@/components/gsap/ScrollSmoother";
import { GsapImageParallax } from "@/components/gsap/GsapImageParallax";
import { SmoothScrollyImages } from "@/components/gsap/SmoothScrollyImages";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { StaggeredText } from "@/components/gsap/StaggeredText";
import { NavigationScrollTrigger } from "@/components/gsap/NavigationScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { images } from "@/components/layout/ImageContainer";

export default function ComponentsPage() {
    return (
        <div className="min-h-screen font-sans">
            {/* Capa */}
            <Cover
                titlePT="Biblioteca de Componentes"
                titleEN="Components Library"
                titleES="Biblioteca de Componentes"
                backgroundImage={images.capa}
                className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-muted/70 to-muted-foreground/70"
            >
                <p className="text-foreground text-xl md:text-2xl mb-6 font-light max-w-2xl tracking-tight">
                    <TextTranslator>
                        {{
                            ptBR: "Explore todos os meus componentes reutilizáveis em um só lugar, criados com paixão e precisão.",
                            en: "Discover all my reusable components in one place, crafted with passion and precision.",
                            es: "Explora todos mis componentes reutilizables en un solo lugar, creados con pasión y precisión.",
                        }}
                    </TextTranslator>
                </p>
            </Cover>

            {/* Seção de Componentes */}
            <Section label="components" className="py-16 bg-background">
                <Container>
                    <Topic label="todos-os-componentes">
                        <h2 className="text-4xl md:text-6xl font-bold text-center text-foreground mb-12 tracking-tight">
                            <StaggeredText text="Todos os Componentes" />
                        </h2>

                        {/* Componentes de Layout */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-semibold text-foreground mb-4">Layout</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">Container</h4>
                                    <Container className="border p-4">
                                        <p>Este é um exemplo de Container.</p>
                                    </Container>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">Flags</h4>
                                    <Flags />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ScrollIndicator</h4>
                                    <ScrollIndicator />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">Sidebar</h4>
                                    <Sidebar />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">TextTranslator</h4>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Texto em português",
                                            en: "Text in English",
                                            es: "Texto en español",
                                        }}
                                    </TextTranslator>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">Topic</h4>
                                    <Topic label="exemplo">
                                        <p>Este é um Topic de exemplo.</p>
                                    </Topic>
                                </div>
                            </div>
                        </div>

                        {/* Componentes GSAP */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-semibold text-foreground mb-4">GSAP</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ImageParallax</h4>
                                    <ImageParallax image={images.capa} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ScrollTriggerClamp</h4>
                                    <ScrollTriggerClamp />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ScrollSmootherThree</h4>
                                    <ScrollSmootherThree />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ScrollTriggerHorizontalGallery</h4>
                                    <ScrollTriggerHorizontalGallery />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ScrollSmoother</h4>
                                    <ScrollSmoother />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">GsapImageParallax</h4>
                                    <GsapImageParallax image={images.capa} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">SmoothScrollyImages</h4>
                                    <SmoothScrollyImages />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">ScrollSmootherHeader</h4>
                                    <ScrollSmootherHeader />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">StaggeredText</h4>
                                    <StaggeredText text="Texto Animado" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">NavigationScrollTrigger</h4>
                                    <NavigationScrollTrigger />
                                </div>
                            </div>
                        </div>

                        {/* Componentes UI (shadcn/ui) */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-semibold text-foreground mb-4">UI (shadcn/ui)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">Button</h4>
                                    <Button>Exemplo de Botão</Button>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-foreground mb-2">Input</h4>
                                    <Input placeholder="Digite aqui" />
                                </div>
                            </div>
                        </div>
                    </Topic>
                </Container>
            </Section>
        </div>
    );
}