"use client";

import { useEffect, useState } from "react";
import { IoTrashOutline, IoTrashSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const ClearCache: React.FC = () => {
    const [hasLocalStorageData, setHasLocalStorageData] = useState(false);
    const [isLocalhost, setIsLocalhost] = useState(false);

    useEffect(() => {
        setIsLocalhost(window.location.hostname === "localhost");
        setHasLocalStorageData(localStorage.length > 0);
    }, []);

    const handleClearCache = () => {
        localStorage.clear();
        window.location.reload();
    };

    if (!isLocalhost) return null;

    return (
        <Button size="icon" onClick={handleClearCache}>
            {hasLocalStorageData ? (
                <IoTrashOutline className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <IoTrashSharp className="h-[1.2rem] w-[1.2rem]" />
            )}
        </Button>
    );
};

export default ClearCache;