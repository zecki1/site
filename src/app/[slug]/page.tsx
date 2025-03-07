// src/app/[slug]/page.tsx
import DynamicPageClient from "@/components/DynamicPageClient";
// Define os slugs que serão pré-renderizados
export async function generateStaticParams() {
  return [
    { slug: "home" },
    { slug: "about" },
    { slug: "components" },
  ];
}

export default function DynamicPage({ params }: { params: { slug: string } }) {
  return <DynamicPageClient slug={params.slug} />;
}