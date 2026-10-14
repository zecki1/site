import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { resolve } from "path";

function getAdminApp() {
    if (getApps().length > 0) return getApp();

    const envCreds = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (envCreds) {
        try {
            initializeApp({
                credential: cert(JSON.parse(envCreds)),
            });
            return getApp();
        } catch (error) {
            console.error("FIREBASE_SERVICE_ACCOUNT inválido:", error);
        }
    }

    try {
        const serviceAccount = JSON.parse(
            readFileSync(resolve(process.cwd(), "serviceAccountKey.json"), "utf8")
        );
        initializeApp({
            credential: cert(serviceAccount),
        });
        return getApp();
    } catch (error) {
        console.error("Não foi possível inicializar firebase-admin:", error);
        throw new Error("Firebase Admin não configurado no servidor.");
    }
}

export async function verifyFirebaseToken(token: string): Promise<string> {
    if (!token) throw new Error("Token ausente.");
    try {
        const decoded = await getAuth(getAdminApp()).verifyIdToken(token);
        return decoded.uid;
    } catch {
        throw new Error("Token inválido ou expirado.");
    }
}
