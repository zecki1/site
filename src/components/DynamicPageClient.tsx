// src/components/DynamicPageClient.tsx
"use client";

import { Header } from "@/components/Header";
import { notFound } from "next/navigation";
import Home from "@/app/pages/home";
import About from "@/app/pages/about";
import Contact from "@/app/pages/contact";

// Mapeamento de slugs para componentes de página
const pageComponents: { [key: string]: React.ComponentType } = {
    home: Home,
    about: About,
    contact: Contact,
};

export default function DynamicPageClient({ slug }: { slug: string }) {
    const normalizedSlug = slug === "home" ? "home" : slug; // "home" como padrão
    const PageComponent = pageComponents[normalizedSlug];

    if (!PageComponent) {
        notFound(); // Retorna 404 se a página não existir
    }

    return (
        <>
            <Header />
            <PageComponent />
        </>
    );
}