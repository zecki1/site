// src/components/DynamicPageClient.tsx
"use client";

import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Home from "@/app/pages/home";
import About from "@/app/pages/about";
import Components from "@/app/pages/components";

const pageComponents: { [key: string]: React.ComponentType } = {
    home: Home,
    about: About,
    Components: Components,
};

export default function DynamicPageClient({ slug }: { slug: string }) {
    const normalizedSlug = slug === "home" ? "home" : slug;
    const PageComponent = pageComponents[normalizedSlug];

    if (!PageComponent) {
        notFound();
    }

    const isFluid = slug === "Components"; // Exemplo: Components usa fluid

    return (
        <Container fluid={isFluid}>
            <PageComponent />
        </Container>
    );
}