import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    try {
        // Converte o arquivo para um buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Usa um stream para fazer o upload para o Cloudinary
        const response = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'cleriston_portfolio',
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json(response);

    } catch (error) {
        console.error('Erro no upload para o Cloudinary:', error);
        return NextResponse.json({ error: 'Falha no upload.' }, { status: 500 });
    }
}