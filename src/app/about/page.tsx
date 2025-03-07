// src/app/about/page.tsx
"use client";

import { Header } from "@/components/Header";
import TextTranslator from "@/components/TextTranslator";

const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-primary">{children}</span>
);

export default function About() {
    return (
        <div className="pt-16">
            <Header />
            <main className="p-4 bg-background text-foreground min-h-screen">
                <h2 className="text-2xl font-bold text-primary">
                    <TextTranslator>
                        {{
                            ptBR: "Sobre Nós",
                            en: "About Us",
                            es: "Sobre Nosotros",
                        }}
                    </TextTranslator>
                </h2>
                <p className="mt-2">
                    <TextTranslator>
                        {{
                            ptBR: (
                                <>
                                    Esta é uma página sobre o <Mark>CMS</Mark> que estamos construindo.
                                </>
                            ),
                            en: (
                                <>
                                    This is a page about the <Mark>CMS</Mark> we are building.
                                </>
                            ),
                            es: (
                                <>
                                    Esta es una página sobre el <Mark>CMS</Mark> que estamos construyendo.
                                </>
                            ),
                        }}
                    </TextTranslator>
                </p>
            </main>
        </div>
    );
}