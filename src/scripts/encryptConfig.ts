// src/scripts/encryptConfig.ts
import { readFileSync, writeFileSync } from "fs";
import { createCipheriv, randomBytes } from "crypto";

const serviceAccountPath = process.cwd() + "/serviceAccount.json";
console.log("Caminho do serviceAccount.json:", serviceAccountPath);

let serviceAccount;
try {
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
} catch (error) {
    console.error("Erro ao ler serviceAccount.json:", error.message);
    console.error("Certifique-se de que o arquivo está no diretório raiz do projeto.");
    process.exit(1);
}

// Gera chave e IV
const key = randomBytes(32); // Chave de 256 bits para AES-256
const iv = randomBytes(16);  // IV de 128 bits

// Encripta o serviceAccount
const cipher = createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(JSON.stringify(serviceAccount), "utf8", "hex");
encrypted += cipher.final("hex");

// Salva os arquivos
writeFileSync("firebaseConfig.enc", encrypted);
writeFileSync("firebaseKey.key", key.toString("hex"));
writeFileSync("firebaseIV.iv", iv.toString("hex"));

console.log("Credenciais encriptadas salvas em firebaseConfig.enc");
console.log("Chave salva em firebaseKey.key");
console.log("IV salvo em firebaseIV.iv");