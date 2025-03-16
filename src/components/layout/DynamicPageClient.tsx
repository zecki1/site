// src/components/layout/DynamicPageClient.tsx
"use client";

import { notFound } from "next/navigation";

interface Section {
    type: string;
    text: string;
    image: string;
}

interface SiteData {
    sections: Section[];
    domain?: string;
    ownerId?: string;
}

interface DynamicPageClientProps {
    slug: string;
    initialData: SiteData | null;
}

export default function DynamicPageClient({ slug, initialData }: DynamicPageClientProps) {
    if (!initialData) notFound();

    return (
        <div className="p-4">
            <h1>Site: {slug}</h1>
            {initialData.sections.map((section, index) => (
                <div key={index}>
                    <h2>{section.text}</h2>
                    <img src={section.image} alt={section.text} />
                </div>
            ))}
        </div>
    );
}