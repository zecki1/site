// src/app/freelancer/page.tsx
import FreelancerContent from "./FreelancerContent";

export default function Freelancer() {
    return <FreelancerContent />;
}

export async function generateMetadata() {
    return {
        title: "Zecki1 - Portfólio de Freelancer",
        description: "Conheça meus projetos como desenvolvedor freelancer, com React, Next.js e design gráfico.",
    };
}