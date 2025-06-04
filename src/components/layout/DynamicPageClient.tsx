"use client";

import { notFound } from "next/navigation";
import Image from "next/image"; // Adicionado

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
    initialData: SiteData | null;
}

export default function DynamicPageClient({ initialData }: DynamicPageClientProps) {
    if (!initialData) notFound();

    return (
        <div className="p-4">
            <h1>Site</h1>
            {initialData.sections.map((section, index) => (
                <div key={index}>
                    <h2>{section.text}</h2>
                    <Image
                        src={section.image}
                        alt={section.text}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                    />
                </div>
            ))}
        </div>
    );
}