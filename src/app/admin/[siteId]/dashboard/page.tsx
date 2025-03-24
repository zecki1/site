import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import DashboardClient from "./DashboardClient";

export async function generateStaticParams() {
    const sitesSnapshot = await getDocs(collection(db, "newSites"));
    return sitesSnapshot.docs.map((doc) => ({ siteId: doc.id }));
}

export default async function Page({ params }: { params: { siteId: string } }) {
    const siteDoc = await getDoc(doc(db, "newSites", params.siteId));
    const initialData = siteDoc.exists() ? siteDoc.data() : null;

    return <DashboardClient siteId={params.siteId} initialData={initialData} />;
}