import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

let initialized = false;

function getAdminApp() {
    if (initialized) return admin.app();

    const envCreds = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (envCreds) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(envCreds)),
            });
            initialized = true;
            return admin.app();
        } catch (error) {
            console.error("FIREBASE_SERVICE_ACCOUNT inválido:", error);
        }
    }

    try {
        const serviceAccount = JSON.parse(
            readFileSync(resolve(process.cwd(), "serviceAccountKey.json"), "utf8")
        );
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        initialized = true;
        return admin.app();
    } catch (error) {
        console.error("Não foi possível inicializar firebase-admin:", error);
        throw new Error("Firebase Admin não configurado no servidor.");
    }
}

export async function verifyFirebaseToken(token: string): Promise<string> {
    if (!token) throw new Error("Token ausente.");
    try {
        const decoded = await getAdminApp().auth().verifyIdToken(token);
        return decoded.uid;
    } catch {
        throw new Error("Token inválido ou expirado.");
    }
}

export default getAdminApp;
