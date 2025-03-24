import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contato({ data }: { data: any }) {
    return (
        <section id="contact" className="contact py-16">
            <div className="container mx-auto" data-aos="fade-up">
                <div className="section-title text-center pb-8">
                    <h2 className="text-3xl font-bold uppercase text-gray-700 relative pb-5 before:content-[''] before:absolute before:w-32 before:h-px before:bg-gray-300 before:bottom-0 before:left-1/2 before:-translate-x-1/2 after:content-[''] after:absolute after:w-10 after:h-1 after:bg-blue-600 after:bottom-0 after:left-1/2 after:-translate-x-1/2">
                        Contato
                    </h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                        <div className="info space-y-10">
                            {[
                                { icon: "bi-geo-alt", title: "Brasil", text: "São Paulo - SP" },
                                { icon: "bi-envelope", title: "E-mail", text: "cleristonrib@gmail.com", href: "mailto:cleristonrib@gmail.com" },
                                { icon: "bi-phone", title: "Telefone", text: "55+(11) 99353-3001", href: "https://wa.me/5511993533001" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <i
                                        className={`bi ${item.icon} text-xl text-blue-600 bg-blue-50 w-11 h-11 flex items-center justify-center rounded-full mr-4 transition-colors hover:bg-blue-600 hover:text-white`}
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-700">{item.title}:</h4>
                                        {item.href ? (
                                            <p>
                                                <a href={item.href} target="_blank" className="text-gray-600 hover:text-blue-600">
                                                    {item.text}
                                                </a>
                                            </p>
                                        ) : (
                                            <p className="text-gray-600">{item.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-2/3 mt-5 lg:mt-0">
                        <form className="php-email-form space-y-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <Input placeholder="Nome" required className="md:w-1/2" />
                                <Input placeholder="E-mail" type="email" required className="md:w-1/2" />
                            </div>
                            <Input placeholder="Assunto" required />
                            <Textarea placeholder="Mensagem" required className="h-32" />
                            <div className="text-center">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full">
                                    Enviar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}