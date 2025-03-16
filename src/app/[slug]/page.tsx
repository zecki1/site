// app/[slug]/page.tsx
import DynamicPageClient from "@/components/layout/DynamicPageClient";

interface DynamicPageProps {
  params: { slug: string };
}

// Não usamos generateStaticParams porque os slugs são dinâmicos no SaaS
export default function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = params;
  return <DynamicPageClient slug={slug} />;
}