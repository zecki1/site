"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header"; // Deve ser o Header do Cleriston
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Portfolio from "./components/Portfolio";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import BackToTop from "./components/BacktoTop";

export default function DynamicPageClient({
    siteId,
    initialData,
}: {
    siteId: string;
    initialData: any;
}) {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className=" text-gray-900">
            <Header /> {/* Este deve ser o sidebar do Cleriston */}
            <Hero data={initialData.hero} />
            <main id="main">
                <Sobre data={initialData.sobre} />
                <Portfolio data={initialData.portfolio} />
                <Contato data={initialData.contato} />
            </main>
            <Footer data={initialData.footer} />
            <BackToTop />
        </div>
    );
}