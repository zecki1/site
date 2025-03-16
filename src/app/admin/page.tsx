"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Cover from "@/components/layout/Cover";
import { useRouter } from "next/navigation";

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

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (session) {
            const fetchSiteData = async () => {
                const docRef = doc(db, "sites", session.user.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSiteData(docSnap.data() as SiteData);
                } else {
                    setSiteData({ sections: [{ type: "cover", text: "Bem-vindo", image: "/img/capa.png" }] });
                }
            };
            fetchSiteData();
        }
    }, [session, status, router]);

    const handleSave = async (newText: string, newImage: string) => {
        if (session) {
            const updatedData: SiteData = {
                sections: [{ type: "cover", text: newText, image: newImage }],
                ownerId: session.user.id,
                domain: `${session.user.id}.zecki1.com.br`,
            };
            await setDoc(doc(db, "sites", session.user.id), updatedData);
            setSiteData(updatedData);
        }
    };

    if (!siteData) return <div>Carregando...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Editar seu site</h1>
            <Cover
                image={siteData.sections[0].image}
                text={siteData.sections[0].text}
                isEditable={true}
                onSave={handleSave}
            />
        </div>
    );
}