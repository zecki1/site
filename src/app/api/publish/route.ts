import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/firebaseAdmin';

type ClientSite = { siteUrl: string; revalidateToken: string };

function getClientSites(): Record<string, ClientSite> {
    try {
        return JSON.parse(process.env.CLIENT_SITES || '{}');
    } catch {
        return {};
    }
}

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    let uid: string;
    try {
        uid = await verifyFirebaseToken(token);
    } catch {
        return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const sites = getClientSites();
    let site: ClientSite | undefined = sites[uid];

    if (!site) {
        const legacyUrl = process.env.NEXT_PUBLIC_CLIENT_SITE_URL;
        const legacyToken = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
        if (legacyUrl && legacyToken) {
            site = { siteUrl: legacyUrl, revalidateToken: legacyToken };
        }
    }

    if (!site) {
        return NextResponse.json({ error: 'Site do cliente não configurado para publicação.' }, { status: 404 });
    }

    try {
        const res = await fetch(`${site.siteUrl}/api/revalidate?secret=${encodeURIComponent(site.revalidateToken)}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            return NextResponse.json(
                { error: data.message || `Falha na revalidação: status ${res.status}` },
                { status: 502 }
            );
        }
        return NextResponse.json({ revalidated: true, ...data });
    } catch (err) {
        console.error('Erro ao revalidar site do cliente:', err);
        return NextResponse.json({ error: 'Falha ao revalidar o site do cliente.' }, { status: 502 });
    }
}
