import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { createDecipheriv, createCipheriv, randomBytes } from "crypto";

// Simulação de credenciais encriptadas (substitua por sua lógica real)
const encryptedClientConfigs = {
    "cleristonribeiro": {
        encrypted: "f366674f89ca0cc271a1303124dd6d0131e6829325d2f1e9625a1f98d75be946b8cff38ec6321e606278ebf12785c69f0ba5df76f139d9014a952999adfda7cbf4fcb497d6a5b244170af0eb2ec3ac72670538d310e73030fbfc8253bcc15c81372e5bbc2d469a1c0c32f2018f2d856a8793f60120f57b902cf59acbcb221d2c684de850fe428e864bb588bab66b84686c9e2ec806c71ca447ab92760d37303fd4cea9a305604b7a418f7692cae5c26c8ea238da4e7293ff8b3f06dbc812a836a5e9e75812fd4aeaf4ea28a12c92df7438e4e2acb008b618ab53d607f0fecfa289278dfc1884b4af76ddc79462a646e3bbf1552f373e065b06f37d5a541a7778338310f8d3b6d330e7830eceb4af519d", // Substitua pelo dado encriptado real
        key: "9307323e5a7d001db4cb70df3d444f7949ccbfb1a65d83a87828f8eaca8982d4",                  // Substitua pela chave em hex
        iv: "ae6c6364d404631aeb3631a6d8b5a030"                     // Substitua pelo IV em hex
    },
    // Adicione outros clientes aqui
};

// Chave para encriptar a resposta da API (em produção, use uma chave segura)
const apiResponseKey = Buffer.from("32_CHARACTERS_LONG_KEY_1234567890", "utf8"); // 32 bytes para AES-256
const apiResponseIV = randomBytes(16);

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;

    // Verifica autenticação (exemplo simples, melhore em produção)
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== "SUA_CHAVE_SECRETA") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientConfig = encryptedClientConfigs[slug];
    if (!clientConfig) {
        return NextResponse.json({ error: "Site não encontrado" }, { status: 404 });
    }

    // Desencripta as credenciais do cliente
    const decipher = createDecipheriv("aes-256-cbc", Buffer.from(clientConfig.key, "hex"), Buffer.from(clientConfig.iv, "hex"));
    let decrypted = decipher.update(clientConfig.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    const firebaseConfig = JSON.parse(decrypted);

    // Conecta ao Firebase do cliente
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docSnap = await getDoc(doc(db, "sites", slug));

    if (!docSnap.exists()) {
        return NextResponse.json({ error: "Site não encontrado" }, { status: 404 });
    }

    const siteData = docSnap.data();

    // Encripta a resposta da API
    const cipher = createCipheriv("aes-256-cbc", apiResponseKey, apiResponseIV);
    let encryptedResponse = cipher.update(JSON.stringify(siteData), "utf8", "hex");
    encryptedResponse += cipher.final("hex");

    return NextResponse.json({
        data: encryptedResponse,
        iv: apiResponseIV.toString("hex"), // Envia o IV para o cliente desencriptar
    });
}