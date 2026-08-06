import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyFirebaseToken } from '@/lib/firebaseAdmin';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getAuthenticatedUid(request: Request): Promise<string> {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    return verifyFirebaseToken(token);
}

export async function POST(request: Request) {
    let uid: string;
    try {
        uid = await getAuthenticatedUid(request);
    } catch {
        return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'clients_portfolio';

    const safeFolder = folder.replace(/[^a-zA-Z0-9_\-/]/g, '').replace(/\.\./g, '').replace(/^\/+/, '');

    if (!file) {
        return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: safeFolder,
                    public_id: `${uid}_${Date.now()}`,
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
