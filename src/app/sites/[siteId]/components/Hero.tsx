import { TypeAnimation } from "react-type-animation";

interface HeroData {
    title?: string;
}

export default function Hero({ data }: { data: HeroData }) {
    return (
        <section
            id="hero"
            className="flex flex-col justify-center w-full h-screen bg-[url('/hero-bg.jpg')] bg-no-repeat bg-cover bg-top-right relative before:content-[''] before:absolute before:inset-0 before:bg-white/55 pl-0 xl:pl-40 text-center xl:text-left"
        >
            <div className="container mx-auto" data-aos="zoom-in" data-aos-delay="100">
                <h1 className="text-4xl xl:text-6xl font-bold leading-tight text-gray-700">
                    {data?.title || "Cleriston Ribeiro"}
                </h1>
                <p className="text-xl xl:text-2xl mt-4 text-gray-700 font-poppins">
                    Eu sou{" "}
                    <TypeAnimation
                        sequence={[
                            "Ilustrador",
                            2000,
                            "Caricaturista",
                            2000,
                            "Concept Artist 2D",
                            2000,
                        ]}
                        wrapper="span"
                        repeat={Infinity}
                        speed={50}
                        className="text-blue-600"
                    />
                </p>
                <div className="social-links mt-8">
                    {[
                        { href: "https://www.instagram.com/cleriston_rib/", icon: "bxl-instagram" },
                        { href: "https://wa.me/5511993533001", icon: "bxl-whatsapp" },
                        { href: "https://www.behance.net/cleristonribeiro", icon: "bxl-behance" },
                        { href: "https://www.linkedin.com/in/cleristonrib/", icon: "bxl-linkedin" },
                    ].map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            className="text-2xl inline-block text-gray-700 mr-5 transition-colors hover:text-blue-600"
                        >
                            <i className={`bx ${link.icon}`} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}