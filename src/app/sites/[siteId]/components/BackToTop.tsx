"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`fixed bottom-4 right-4 z-[996] bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-400 ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"
                } hover:bg-blue-700`}
            onClick={scrollToTop}
        >
            <FaArrowUp className="text-white text-xl" />
        </button>
    );
}