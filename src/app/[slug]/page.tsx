import DynamicPageClient from "@/components/DynamicPageClient"

// Definir tipo para os parâmetros estáticos
type StaticParams = { slug: string }[]

export async function generateStaticParams(): Promise<StaticParams> {
  return [
    { slug: "home" },
    { slug: "about" },
    { slug: "components" },
  ]
}

// Interface para os props do DynamicPage
interface DynamicPageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params // Desestruturar diretamente
  return <DynamicPageClient slug={slug} />
}