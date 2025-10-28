const skills = [
    "React", "Next.js", "TypeScript", "Python", "FastAPI", "LangChain",
    "OpenAI API", "OpenCV", "Pinecone", "Prisma", "PostgreSQL", "Docker",
    "Vercel", "Stripe", "Clerk", "Hugging Face"
];

// Componente para um único item do marquee
const SkillTag = ({ skill }: { skill: string }) => (
    <div className="flex items-center gap-3 px-4 py-2 border border-[#353739] rounded-full bg-black/20 whitespace-nowrap">
        {/* Você pode adicionar ícones aqui se quiser */}
        <span className="font-sans text-sm text-[#f2f2f2]">{skill}</span>
    </div>
);

export const SkillsMarquee = () => {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Gradiente para suavizar as bordas */}
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

            {/* O container da animação */}
            <div className="flex gap-4 animate-scroll w-max">
                {/* Renderiza a lista duas vezes para o efeito de loop infinito */}
                {skills.map((skill, index) => <SkillTag key={`a-${index}`} skill={skill} />)}
                {skills.map((skill, index) => <SkillTag key={`b-${index}`} skill={skill} />)}
            </div>
        </div>
    );
};