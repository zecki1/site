import { readFileSync } from "fs";
import { createDecipheriv } from "crypto";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const encryptedConfig = readFileSync(process.cwd() + "/firebaseConfig.enc", "utf8");
const key = Buffer.from(readFileSync(process.cwd() + "/firebaseKey.key", "utf8"), "hex");
const iv = Buffer.from(readFileSync(process.cwd() + "/firebaseIV.iv", "utf8"), "hex");

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
    title: "Cleriston Ribeiro - Ilustrador",
    description: "Ilustrações criativas e únicas por Cleriston Ribeiro",
    sections: [
        {
            id: "hero",
            type: "hero",
            title: "Bem-vindo ao meu portfólio",
            description: "Ilustrações que contam histórias",
            image: {
                url: "https://cleristonribeiro.com.br/wp-content/uploads/2023/10/IMG_20231003_074920-scaled.jpg",
                alt: "Ilustração principal do Cleriston",
            },
        },
        {
            id: "sobre",
            type: "about",
            title: "Sobre Mim",
            text: "Sou Cleriston Ribeiro, ilustrador apaixonado por criar mundos visuais que inspiram.",
            image: {
                url: "https://cleristonribeiro.com.br/wp-content/uploads/2023/10/IMG_20231003_074920-scaled.jpg",
                alt: "Foto do Cleriston Ribeiro",
            },
        },
        {
            id: "projetos",
            type: "gallery",
            title: "Projetos",
            items: [
                {
                    title: "Ilustração 1",
                    image: {
                        url: "https://cleristonribeiro.com.br/wp-content/uploads/2023/10/IMG_20231003_074920-scaled.jpg",
                        alt: "Ilustração 1 do Cleriston",
                        meta: { description: "Descrição para SEO" },
                    },
                },
                {
                    title: "Ilustração 2",
                    image: {
                        url: "https://cleristonribeiro.com.br/wp-content/uploads/2023/10/IMG_20231003_075013-scaled.jpg",
                        alt: "Ilustração 2 do Cleriston",
                        meta: { description: "Descrição para SEO" },
                    },
                },
            ],
        },
        {
            id: "contato",
            type: "contact",
            title: "Contato",
            email: "cleristonribeiro@gmail.com",
            whatsapp: "+5511999999999",
        },
    ],
};

async function addTestDocument() {
    try {
        console.log("Iniciando conexão com Firestore...");
        const docRef = db.collection("sites").doc("cleristonribeiro");
        console.log("Referência do documento:", docRef.path);
        await docRef.set(testData);
        console.log("Documento adicionado com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar documento:", error);
    }
}

addTestDocument();