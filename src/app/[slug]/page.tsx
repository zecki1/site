// src/app/[slug]/page.tsx
import DynamicPageClient from "@/components/layout/DynamicPageClient";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notFound } from "next/navigation";

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;

  // Ignora o slug "home" para evitar conflito com a página estática
  if (slug === "home") {
    notFound(); // Ou redirecione, se preferir
  }

  const docRef = doc(db, "sites", slug);
  const docSnap = await getDoc(docRef);
  const siteData = docSnap.exists() ? docSnap.data() : null;

  if (!siteData) {
    notFound(); // Retorna 404 se o slug não existir no Firestore
  }

  return <DynamicPageClient slug={slug} initialData={siteData} />;
}