import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export const authOptions = {
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            // Personalização do email de magic link
            async sendVerificationRequest({ identifier: email, url }) {
                const html = `
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Entrar no Zecki1</title>
                        <style>
                            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f4f4f4; padding: 20px; }
                            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                            .header { text-align: center; padding-bottom: 20px; }
                            .header img { max-width: 150px; }
                            .button { display: inline-block; padding: 12px 24px; background: #6b46c1; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; }
                            .button:hover { background: #553c9a; }
                            .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Bem-vindo ao Zecki1</h1>
                            </div>
                            <p>Olá,</p>
                            <p>Para acessar sua conta, clique no botão abaixo:</p>
                            <p style="text-align: center;">
                                <a href="${url}" class="button">Entrar Agora</a>
                            </p>
                            <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
                            <p><a href="${url}">${url}</a></p>
                            <p>Este link expira em 24 horas por motivos de segurança.</p>
                            <p>Se você não solicitou este email, pode ignorá-lo.</p>
                            <p>Atenciosamente,<br>Equipe Zecki1</p>
                            <div class="footer">
                                <p>&copy; 2025 Zecki1. Todos os direitos reservados.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;
                const text = `
                    Bem-vindo ao Zecki1

                    Olá,

                    Para acessar sua conta, clique no link abaixo:
                    ${url}

                    Se o link não funcionar, copie e cole no seu navegador.

                    Este link expira em 24 horas por motivos de segurança.

                    Se você não solicitou este email, pode ignorá-lo.

                    Atenciosamente,
                    Equipe Zecki1

                    © 2025 Zecki1. Todos os direitos reservados.
                `;

                // Enviar email usando o transporte padrão do next-auth
                const { createTransport } = await import("nodemailer");
                const transporter = createTransport({
                    host: process.env.EMAIL_SERVER_HOST,
                    port: Number(process.env.EMAIL_SERVER_PORT),
                    auth: {
                        user: process.env.EMAIL_SERVER_USER,
                        pass: process.env.EMAIL_SERVER_PASSWORD,
                    },
                });

                await transporter.sendMail({
                    to: email,
                    from: process.env.EMAIL_FROM,
                    subject: "Entrar no Zecki1",
                    text,
                    html,
                });
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            return session;
        },
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };