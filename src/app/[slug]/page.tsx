import DynamicPageClient from "@/components/DynamicPageClient"

export async function generateStaticParams() {
  return [
    { slug: "home" },
    { slug: "about" },
    { slug: "Components" },
  ]
}

export default function DynamicPage({ params }: { params: { slug: string } }) {
  return <DynamicPageClient slug={params.slug} />
}