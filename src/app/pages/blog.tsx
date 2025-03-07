// src/pages/blog.tsx
"use client";

import TextTranslator from "@/components/TextTranslator";

export default function Blog() {
    return (
        <>
            <h1 className="text-3xl font-bold text-primary mb-4">
                <TextTranslator>
                    {{
                        ptBR: "Blog",
                        en: "Blog",
                        es: "Blog",
                    }}
                </TextTranslator>
            </h1>
            <p>
                <TextTranslator>
                    {{
                        ptBR: "Bem-vindo ao nosso blog!",
                        en: "Welcome to our blog!",
                        es: "¡Bienvenido a nuestro blog!",
                    }}
                </TextTranslator>
            </p>
        </>
    );
}