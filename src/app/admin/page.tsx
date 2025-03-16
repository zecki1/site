// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Cover from "@/components/layout/Cover";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [siteData, setSiteData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/login");
            } else {
                const docRef = doc(db, "sites", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSiteData(docSnap.data());
                } else {
                    // Dados padrão iniciais
                    setSiteData({ sections: [{ type: "cover", text: "Bem-vindo", image: "/default.png" }] });
                }
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleSave = async (newText: string, newImage: string) => {
        const user = auth.currentUser;
        if (user) {
            const updatedData = { sections: [{ type: "cover", text: newText, image: newImage }] };
            await setDoc(doc(db, "sites", user.uid), {
                ...updatedData,
                domain: `${user.uid}.zecki1.com.br`,
                ownerId: user.uid,
            });
            setSiteData(updatedData);
        }
    };

    if (!siteData) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Editar seu site</h1>
            <Cover
                image={siteData.sections[0].image}
                text={siteData.sections[0].text}
                isEditable={true}
                onSave={handleSave}
            />
        </div>
    );
}