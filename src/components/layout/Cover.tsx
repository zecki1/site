"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CoverProps {
    image: string;
    text: string;
    isEditable?: boolean;
    onSave?: (newText: string, newImage: string) => void;
}

export default function Cover({ image, text, isEditable = false, onSave }: CoverProps) {
    const [editedText, setEditedText] = useState(text);
    const [editedImage, setEditedImage] = useState(image);

    const handleSave = () => {
        if (onSave) onSave(editedText, editedImage);
    };

    return (
        <div className="relative h-64 bg-cover" style={{ backgroundImage: `url(${editedImage})` }}>
            {isEditable ? (
                <div className="p-4">
                    <Input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="mb-2"
                    />
                    <Input
                        value={editedImage}
                        onChange={(e) => setEditedImage(e.target.value)}
                        placeholder="URL da imagem"
                        className="mb-2"
                    />
                    <Button onClick={handleSave}>Salvar</Button>
                </div>
            ) : (
                <h1 className="text-white text-3xl p-4">{editedText}</h1>
            )}
        </div>
    );
}