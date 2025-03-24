import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import DynamicPageClient from "./DynamicPageClient";

export async function generateStaticParams() {
    const sitesSnapshot = await getDocs(collection(db, "newSites"));
    return sitesSnapshot.docs.map((doc) => ({ siteId: doc.id }));
}

export async function generateMetadata({ params }: { params: { siteId: string } }) {
    const siteId = params.siteId;
    const siteDoc = await getDoc(doc(db, "newSites", siteId));
    if (!siteDoc.exists()) return { title: "Site não encontrado" };
    const siteData = siteDoc.data();
    return {
        title: siteData.title || "Cleriston Ribeiro - Ilustrador",
        description: siteData.description || "Ilustrador, amante da arte e bem humorado.",
    };
}

export default async function Page({ params }: { params: { siteId: string } }) {
    const siteId = params.siteId;
    const siteDoc = await getDoc(doc(db, "newSites", siteId));
    if (!siteDoc.exists()) notFound();
    const siteData = siteDoc.data();

    return <DynamicPageClient siteId={siteId} initialData={siteData} />;
}