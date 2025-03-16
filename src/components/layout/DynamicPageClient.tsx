"use client";
import { notFound } from "next/navigation";
import Cover from "./Cover";

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
            {initialData.sections.map((section, index) => (
                <Cover key={index} image={section.image} text={section.text} />
            ))}
        </div>
    );
}