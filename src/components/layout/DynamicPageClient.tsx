// src/components/layout/DynamicPageClient.tsx
"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Cover from "./Cover";

interface DynamicPageClientProps {
    slug: string;
}

export default function DynamicPageClient({ slug }: DynamicPageClientProps) {
    const [siteData, setSiteData] = useState(null);
    const normalizedSlug = slug.toLowerCase();

    useEffect(() => {
        const fetchSiteData = async () => {
            const docRef = doc(db, "sites", normalizedSlug);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSiteData(docSnap.data());
            } else {
                notFound();
            }
        };
        fetchSiteData();
    }, [normalizedSlug]);

    if (!siteData) return <div>Carregando...</div>;

    return (
        <div>
            {siteData.sections.map((section: any, index: number) => (
                <Cover key={index} image={section.image} text={section.text} />
            ))}
        </div>
    );
}