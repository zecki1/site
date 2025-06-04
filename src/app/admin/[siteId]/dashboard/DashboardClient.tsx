"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface SiteData {
    title: string;
    hero?: {
        title: string;
    };
    [key: string]: unknown; // Alterado de any para unknown
}

export default function DashboardClient({
    siteId,
    initialData,
}: {
    siteId: string;
    initialData: SiteData;
}) {
    const [siteData, setSiteData] = useState<SiteData>(initialData);

    useEffect(() => {
        if (!initialData) {
            const fetchData = async () => {
                const siteDoc = await getDoc(doc(db, "newSites", siteId));
                if (siteDoc.exists()) setSiteData(siteDoc.data() as SiteData);
            };
            fetchData();
        }
    }, [siteId, initialData]);

    const handleUpdate = async (field: string, value: string) => {
        await updateDoc(doc(db, "newSites", siteId), { [field]: value });
        setSiteData({ ...siteData, [field]: value } as SiteData);
    };

    if (!siteData) return <div>Carregando...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-4">Painel do {siteData.title}</h1>
            <section>
                <h2>Texto do Hero</h2>
                <input
                    value={siteData.hero?.title || ""}
                    onChange={(e) => handleUpdate("hero.title", e.target.value)}
                    className="border p-2 w-full"
                />
            </section>
            <a href={`/sites/${siteId}`} target="_blank" className="text-blue-600">
                Ver Site
            </a>
        </div>
    );
}