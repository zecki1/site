// src/app/home/page.tsx
import HomeContent from "./HomeContent";

export default function Home() {
    return <HomeContent />;
}

// Metadata para SEO
export async function generateMetadata() {
    return {
        title: "Zecki1 - Desenvolvedor e Designer Full-Stack",
        description: "Transformo ideias em sites acessíveis e dinâmicos com 13 anos de experiência em código e design.",
    };
}