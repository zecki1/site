import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "@/lib/firebase";

export const authOptions = {
    adapter: FirebaseAdapter(db),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST, // Ex.: smtp.gmail.com
                port: process.env.EMAIL_SERVER_PORT, // Ex.: 587
                auth: {
                    user: process.env.EMAIL_SERVER_USER, // Teu email SMTP
                    pass: process.env.EMAIL_SERVER_PASSWORD, // Senha ou app password
                },
            },
            from: process.env.EMAIL_FROM, // Ex.: "no-reply@zecki1.com.br"
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id; // Adiciona o ID do usuário à sessão
            return session;
        },
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };