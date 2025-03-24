import Link from "next/link";
import DynamicPageClient from "./DynamicPageClient";

export async function generateStaticParams() {
  return [{ slug: "zecki1" }]; // Apenas slugs do seu site principal
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (params.slug === "zecki1") {
    return {
      title: "Zecki1 - Desenvolvedor Web",
      description: "Bem-vindo ao meu portfólio pessoal!",
    };
  }
  return { title: "Página não encontrada" };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (params.slug !== "zecki1") {
    return (
      <div>
        Site não encontrado. Acesse{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          /login
        </Link>{" "}
        para entrar na área administrativa.
      </div>
    );
  }

  return (
    <div>
      <DynamicPageClient slug={params.slug} />
      <div className="mt-4">
        <Link href="/login" className="text-blue-600 hover:underline">
          Área de Login para Clientes
        </Link>
      </div>
    </div>
  );
}