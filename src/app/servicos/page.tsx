// src/app/servicos/page.tsx
import ServicosContent from "./ServicosContent";

export default function Servicos() {
    return <ServicosContent />;
}

export async function generateMetadata() {
    return {
        title: "Zecki1 - Serviços de CMS e Desenvolvimento",
        description: "Crie mini sites editáveis com meu CMS gratuito, com notificações e gestão simples.",
    };
}