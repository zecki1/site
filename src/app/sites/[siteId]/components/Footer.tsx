export default function Footer({ data }: { data: any }) {
    return (
        <footer id="footer" className="bg-gray-50 text-gray-700 text-sm text-center py-8">
            <div className="container mx-auto">
                <div className="social-links mb-8">
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
                            className="text-lg inline-block bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full mr-2 transition-colors hover:bg-blue-700"
                        >
                            <i className={`bx ${link.icon}`} />
                        </a>
                    ))}
                </div>
                <div className="copyright">
                    Representado por Lemonade Illustration Agency.<br />
                    Todos os direitos de imagens são reservados aos seus autores e elaboradores de cada projeto, conforme contrato estabelecido. © 2022 <br />
                    Desenvolvido por <a href="https://zecki1.com.br" target="_blank" className="text-blue-600 hover:text-blue-700">zecki1</a>
                </div>
            </div>
        </footer>
    );
}