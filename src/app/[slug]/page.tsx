import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const siteRef = doc(db, "sites", params.slug);
  const siteSnap = await getDoc(siteRef);
  const siteData = siteSnap.exists() ? siteSnap.data() : {};

  return {
    title: siteData.title || "Site não encontrado",
    description: siteData.description || "Descrição padrão",
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Exclui rotas reservadas
  if (["home", "admin", "login"].includes(slug)) return notFound();

  const siteRef = doc(db, "sites", params.slug);
  const siteSnap = await getDoc(siteRef);
  if (!siteSnap.exists()) return notFound();

  const siteData = siteSnap.data();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{siteData.title}</h1>
      <p className="text-lg">{siteData.description}</p>
      <p>{siteData.text}</p>
      <div className="mt-4">
        {siteData.images?.map((img: any, index: number) => (
          <div key={index} className="mb-4">
            <img src={img.url} alt={img.alt} className="max-w-full h-auto" />
            <p>{img.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}