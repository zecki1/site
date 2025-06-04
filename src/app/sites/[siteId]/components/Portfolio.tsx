"use client";
import { useState, useEffect } from "react";
import GLightbox from "glightbox";
import Image from "next/image";

interface PortfolioItem {
    image: string;
    title: string;
    description: string;
    category: string;
}

interface PortfolioData {
    subtitle?: string;
    items?: PortfolioItem[];
}

export default function Portfolio({ data }: { data: PortfolioData }) {
    const [filter, setFilter] = useState("*");

    useEffect(() => {
        GLightbox({ selector: ".portfolio-lightbox" });
    }, []);

    const filters = [
        { label: "Todos", value: "*" },
        { label: "Character Design", value: ".character-design" },
        { label: "Caricaturas", value: ".caricatura" },
        { label: "Publicidade", value: ".publi" },
        { label: "Editorial", value: ".editorial" },
    ];

    const items = data?.items || [
        {
            image: "/portfolio/cleriston.ribeiro_characterdesign-dog.jpg",
            title: "Mascote Canino",
            description: "Criado para material publicitário...",
            category: "character-design",
        },
        // Outros itens estáticos como fallback
    ];

    return (
        <section id="portfolio" className="portfolio py-16 bg-gray-100">
            <div className="container mx-auto" data-aos="fade-up">
                <div className="section-title text-center pb-8">
                    <h2 className="text-3xl font-bold uppercase text-gray-700 relative pb-5 before:content-[''] before:absolute before:w-32 before:h-px before:bg-gray-300 before:bottom-0 before:left-1/2 before:-translate-x-1/2 after:content-[''] after:absolute after:w-10 after:h-1 after:bg-blue-600 after:bottom-0 after:left-1/2 after:-translate-x-1/2">
                        Portfólio
                    </h2>
                    <p className="text-gray-600">{data?.subtitle || "Desenhos digitais disponibilizados em formato vetorial."}</p>
                </div>
                <div className="flex justify-center" data-aos="fade-up" data-aos-delay="100">
                    <ul id="portfolio-flters" className="flex flex-wrap gap-2 bg-white rounded-full p-2">
                        {filters.map((f) => (
                            <li
                                key={f.value}
                                className={`cursor-pointer px-4 py-2 text-sm font-semibold uppercase text-gray-900 transition-colors ${filter === f.value ? "text-blue-600" : "hover:text-blue-600"
                                    }`}
                                onClick={() => setFilter(f.value)}
                            >
                                {f.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6" data-aos="fade-up" data-aos-delay="200">
                    {items
                        .filter((item: PortfolioItem) => filter === "*" || item.category === filter.slice(1))
                        .map((item: PortfolioItem, index: number) => (
                            <div key={index} className={`portfolio-item ${item.category}`}>
                                <div className="portfolio-wrap relative overflow-hidden group">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                    <div className="portfolio-info absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/70">
                                        <h4 className="text-lg font-semibold text-gray-700">{item.title}</h4>
                                        <p className="text-sm text-gray-700 uppercase">{item.description}</p>
                                        <a
                                            href={item.image}
                                            className="portfolio-lightbox text-2xl text-gray-700 mt-2 hover:text-blue-500"
                                        >
                                            <i className="bx bx-zoom-in" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}