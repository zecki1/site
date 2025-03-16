import DynamicPageClient from "@/components/layout/DynamicPageClient";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const docRef = doc(db, "sites", slug);
  const docSnap = await getDoc(docRef);
  const siteData = docSnap.exists() ? docSnap.data() : null;

  return <DynamicPageClient slug={slug} initialData={siteData} />;
}