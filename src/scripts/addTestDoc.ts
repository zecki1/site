// src/scripts/addTestDoc.ts
import { readFileSync } from "fs";
import { createDecipheriv } from "crypto";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"; // Apenas getFirestore é necessário

// Lê os arquivos encriptados
const encryptedConfig = readFileSync(process.cwd() + "/firebaseConfig.enc", "utf8");
const key = Buffer.from(readFileSync(process.cwd() + "/firebaseKey.key", "utf8"), "hex");
const iv = Buffer.from(readFileSync(process.cwd() + "/firebaseIV.iv", "utf8"), "hex");

// Desencripta o serviceAccount
const decipher = createDecipheriv("aes-256-cbc", key, iv);
let decrypted = decipher.update(encryptedConfig, "hex", "utf8");
decrypted += decipher.final("utf8");

const serviceAccount = JSON.parse(decrypted);

const app = initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore(app);

const testData = {
    slug: "cleristonribeiro",
    domain: "cleristonribeiro.com.br",
    title: "Site do Cleriston",
    description: "Bem-vindo",
    text: "Texto inicial",
    images: [
        {
            url: "https://via.placeholder.com/150",
            alt: "Imagem inicial",
            meta: {
                title: "Imagem 1",
                description: "SEO da imagem",
            },
        },
    ],
    pages: [],
    trialEnd: "2025-03-25T00:00:00Z",
    plan: "trial",
    contacts: [
        {
            type: "email",
            value: "cliente1@email.com",
        },
        {
            type: "whatsapp",
            value: "+5511999999999",
        },
    ],
    updates: [
        {
            timestamp: "2025-03-18T12:00:00Z",
            action: "Adicionada imagem",
        },
    ],
};

async function addTestDocument() {
    try {
        console.log("Iniciando conexão com Firestore...");
        const docRef = db.collection("sites").doc("cleristonribeiro"); // Usando collection().doc()
        console.log("Referência do documento:", docRef.path);
        await docRef.set(testData); // Usando set() em vez de setDoc
        console.log("Documento adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar documento:", error);
    }
}

addTestDocument();