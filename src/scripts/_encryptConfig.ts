import { readFileSync, writeFileSync } from "fs";
import { createCipheriv, randomBytes } from "crypto";

const serviceAccountPath = process.cwd() + "/serviceAccountCleriston.json"; // Arquivo do Cleriston
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

// Gera chave e IV
const key = randomBytes(32); // 256 bits
const iv = randomBytes(16);  // 128 bits

// Encripta o serviceAccount
const cipher = createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(JSON.stringify(serviceAccount), "utf8", "hex");
encrypted += cipher.final("hex");

// Salva os arquivos com nomes específicos para o Cleriston
writeFileSync("firebaseConfigCleriston.enc", encrypted);
writeFileSync("firebaseKeyCleriston.key", key.toString("hex"));
writeFileSync("firebaseIVCleriston.iv", iv.toString("hex"));

console.log("Credenciais encriptadas salvas para Cleriston:");
console.log("Encrypted:", encrypted);
console.log("Key:", key.toString("hex"));
console.log("IV:", iv.toString("hex"));