import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const userId = session.user.id;
    const slug = session.user.email?.split("@")[0] || "default"; // Ex.: "cleristonribeiro"
    const siteRef = doc(db, "sites", slug);
    const siteSnap = await getDoc(siteRef);
    const siteData = siteSnap.exists() ? siteSnap.data() : {};

    async function saveSite(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const text = formData.get("text") as string;
        const imageFile = formData.get("image") as File;

        let imageData = siteData.images || [];
        if (imageFile) {
            const storage = getStorage();
            const imageRef = ref(storage, `sites/${slug}/${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef);
            imageData.push({
                url: imageUrl,
                alt: formData.get("imageAlt") as string,
                meta: {
                    title: formData.get("imageMetaTitle") as string,
                    description: formData.get("imageMetaDescription") as string,
                },
            });
        }

        await setDoc(siteRef, {
            slug,
            domain: `${slug}.com.br`, // Ajuste conforme o domínio real
            userId,
            title,
            description,
            text,
            images: imageData,
        }, { merge: true });
        return redirect(`/admin`);
    }

    return (
        <form action={saveSite} className="flex flex-col gap-4 p-4">
            <Input name="title" defaultValue={siteData.title} placeholder="Título" />
            <Input name="description" defaultValue={siteData.description} placeholder="Descrição" />
            <Input name="text" defaultValue={siteData.text} placeholder="Texto principal" />
            <Input name="image" type="file" />
            <Input name="imageAlt" placeholder="Descrição da imagem" />
            <Input name="imageMetaTitle" placeholder="Título SEO da imagem" />
            <Input name="imageMetaDescription" placeholder="Descrição SEO da imagem" />
            <Button type="submit">Salvar</Button>
        </form>
    );
}