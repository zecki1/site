"use client"

import { notFound } from "next/navigation"
import Container from "@/components/Container"
import Home from "@/app/pages/home"
import About from "@/app/pages/about"
import Components from "@/app/pages/components"

const pageComponents: { [key: string]: React.ComponentType } = {
    home: Home,
    about: About,
    components: Components, // Corrigido para "components" (minúsculo) para corresponder ao slug
}

export default function DynamicPageClient({ slug }: { slug: string }) {
    const normalizedSlug = slug === "home" ? "home" : slug
    const PageComponent = pageComponents[normalizedSlug]

    if (!PageComponent) {
        notFound()
    }

    const isFluid = slug === "components" // "components" usa fluid

    return (
        <Container fluid={isFluid}>
            <PageComponent />
        </Container>
    )
}