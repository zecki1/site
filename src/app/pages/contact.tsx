// src/pages/contact.tsx
"use client";

import TextTranslator from "@/components/TextTranslator";

export default function Contact() {
    return (
        <>
            <h1 className="text-3xl font-bold text-primary mb-4">
                <TextTranslator>
                    {{
                        ptBR: "Contato",
                        en: "Contact",
                        es: "Contacto",
                    }}
                </TextTranslator>
            </h1>
            <p>
                <TextTranslator>
                    {{
                        ptBR: "Entre em contato conosco pelo e-mail: contato@meucms.com",
                        en: "Reach out to us at: contact@my-cms.com",
                        es: "Contáctenos en: contacto@mi-cms.com",
                    }}
                </TextTranslator>
            </p>
        </>
    );
}