import { db } from "@/lib/firebase";

export default function TestPage() {
    console.log("Firestore:", db);
    return <div>Teste Firebase</div>;
}