"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Hero from "./Hero";
import Sobre from "./Sobre";
import Portfolio from "./Portfolio";
import Contato from "./Contato";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

interface HeroData {
    title?: string;
}

interface SobreData {
    subtitle?: string;
    content?: string[];
    image?: string;
}

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

interface ContatoData {
    [key: string]: unknown;
}

interface FooterData {
    [key: string]: unknown;
}

interface InitialData {
    hero: HeroData;
    sobre: SobreData;
    portfolio: PortfolioData;
    contato: ContatoData;
    footer?: FooterData; // Tornar footer opcional
}

export default function DynamicPageClient({ initialData }: { initialData: InitialData }) {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="text-gray-900">
            <Header />
            <Hero data={initialData.hero} />
            <main id="main">
                <Sobre data={initialData.sobre} />
                <Portfolio data={initialData.portfolio} />
                <Contato data={initialData.contato} />
            </main>
            <Footer /> {/* Removida a prop data, já que Footer não a usa */}
            <BackToTop />
        </div>
    );
}