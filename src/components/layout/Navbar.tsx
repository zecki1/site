"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Sidebar from "./Siderbar";
import ClearCache from "./ClearCache";
import SettingsMenu from "./SettingsMenu";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-40 w-screen bg-background border-b border-border transition-colors duration-300 ${isScrolled ? "shadow-md" : ""}`}
        >
            <div className="relative flex justify-center">
                <div className="absolute top-1 left-0 flex gap-2" id="botaoMenu">
                    <Sidebar />
                </div>
                <div className="absolute top-1 right-1 md:right-5 flex gap-2">
                    <ClearCache />
                    <ModeToggle />
                    <SettingsMenu />
                </div>
            </div>
        </header>
    );
};

export default Navbar;