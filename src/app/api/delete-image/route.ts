import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para extrair o public_id da URL da imagem
function getPublicIdFromUrl(url: string): string | null {
    try {
        const regex = /\/v\d+\/(.+)\.\w+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (e) {
        // CORREÇÃO: Usamos a variável 'e' para logar o erro no console.
        console.error("Erro ao tentar extrair o public_id da URL:", e);
        return null;
    }
}

export async function POST(request: Request) {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
        return NextResponse.json({ error: 'URL da imagem é necessária.' }, { status: 400 });
    }

    const publicId = getPublicIdFromUrl(imageUrl);

    if (!publicId) {
        return NextResponse.json({ error: 'Não foi possível extrair o ID público da URL.' }, { status: 400 });
    }

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return NextResponse.json({ message: 'Imagem deletada com sucesso', result });
    } catch (error) {
        console.error('Erro ao deletar imagem do Cloudinary:', error);
        return NextResponse.json({ error: 'Falha ao deletar imagem.' }, { status: 500 });
    }
}