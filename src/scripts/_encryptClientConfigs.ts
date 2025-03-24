import { writeFileSync } from "fs";
import { createCipheriv, randomBytes } from "crypto";

// Credenciais dos clientes (substitua pelos valores reais do Cleriston)
const clientConfigs = {
    "cleristonribeiro": {
        apiKey: "AIzaSyCduHnICb_HFLiiQZTDrjqAgPUava7C0D0",
        authDomain: "site-cleris.firebaseapp.com",
        projectId: "site-cleris",
        storageBucket: "site-cleris.firebasestorage.app",
        messagingSenderId: "688045195489",
        appId: "1:688045195489:web:a3cecc29ae0afd36afb7a0",
    },
    // Adicione outros clientes aqui no futuro
};

// Gera chave e IV para cada cliente e salva em arquivos
Object.entries(clientConfigs).forEach(([slug, config]) => {
    const key = randomBytes(32); // 256 bits
    const iv = randomBytes(16);  // 128 bits
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(JSON.stringify(config), "utf8", "hex");
    encrypted += cipher.final("hex");

    // Salva os valores em arquivos
    writeFileSync(`${slug}_encrypted.txt`, encrypted);
    writeFileSync(`${slug}_key.txt`, key.toString("hex"));
    writeFileSync(`${slug}_iv.txt`, iv.toString("hex"));

    console.log(`${slug}:`);
    console.log(`  Encrypted salvo em ${slug}_encrypted.txt`);
    console.log(`  Key salvo em ${slug}_key.txt`);
    console.log(`  IV salvo em ${slug}_iv.txt`);
});