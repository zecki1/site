"use client"

import { notFound } from "next/navigation"
import Home from "@/app/pages/home"
import About from "@/app/pages/about"
import Components from "@/app/pages/components"

type PageComponentType = React.ComponentType
const pageComponents: Record<string, PageComponentType> = {
    home: Home,
    about: About,
    components: Components,
} as const

interface DynamicPageClientProps {
    slug: string
}

export default function DynamicPageClient({ slug }: DynamicPageClientProps) {
    const normalizedSlug = slug.toLowerCase()
    const PageComponent = pageComponents[normalizedSlug]

    if (!PageComponent) {
        notFound()
    }

    // const isFluid = normalizedSlug === "components"

    return (

        <PageComponent />
    )
}