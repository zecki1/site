export async function generateStaticParams() {
  // Substitua isso pela lógica que retorna os slugs válidos
  const slugs = ["pagina1", "pagina2", "pagina3"]; // Exemplo estático

  // Retorne um array de objetos com os parâmetros
  return slugs.map((slug) => ({
    slug, // O nome do parâmetro deve corresponder ao nome do arquivo: [slug]
  }));
}

export default function Page({ params }) {
  const { slug } = params;
  return <h1>Página: {slug}</h1>;
}