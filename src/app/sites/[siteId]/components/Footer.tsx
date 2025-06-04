"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Portfolio from "./components/Portfolio";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import BackToTop from "./components/BacktoTop";

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