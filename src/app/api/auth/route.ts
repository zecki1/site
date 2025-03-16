// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
                const user = userCredential.user;
                return { id: user.uid, email: user.email };
            },
        }),
    ],
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
};

export default NextAuth(authOptions);