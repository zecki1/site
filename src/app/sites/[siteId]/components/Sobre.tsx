export default function Sobre({ data }: { data: any }) {
    return (
        <section id="sobre" className="sobre py-16 bg-gray-100">
            <div className="container mx-auto" data-aos="fade-up">
                <div className="section-title text-center pb-8">
                    <h2 className="text-3xl font-bold uppercase text-gray-700 relative pb-5 before:content-[''] before:absolute before:w-32 before:h-px before:bg-gray-300 before:bottom-0 before:left-1/2 before:-translate-x-1/2 after:content-[''] after:absolute after:w-10 after:h-1 after:bg-blue-600 after:bottom-0 after:left-1/2 after:-translate-x-1/2">
                        Sobre
                    </h2>
                    <p className="text-gray-600">{data?.subtitle || "Um pouquinho da minha História"}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="md:w-3/4">
                        {data?.content?.map((paragraph: string, index: number) => (
                            <p key={index} className="text-gray-700 mb-4">
                                {paragraph}
                            </p>
                        )) || (
                                <>
                                    <p className="text-gray-700 mb-4">
                                        Sou um ilustrador brasileiro de 38 anos, casado e pai de uma linda menina de 10 anos. Atuo com ilustração desde 2008...
                                    </p>
                                    {/* Outros parágrafos estáticos como fallback */}
                                </>
                            )}
                    </div>
                    <div className="md:w-1/4">
                        <img
                            src={data?.image || "/perfil.jpg"}
                            alt="Cleriston Ribeiro - Ilustrador"
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}