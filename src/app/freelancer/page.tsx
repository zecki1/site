// src/app/freelancer/page.tsx
import FreelancerContent from "./FreelancerContent";

export default function Freelancer() {
    return <FreelancerContent />;
}

export async function generateMetadata() {
    return {
        title: "Zecki1 - Meus Trabalhos como Freelancer",
        description: "Veja meus projetos como desenvolvedor e designer freelancer, com foco em React, Next.js e design gráfico.",
    };
}