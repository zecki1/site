"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
    const [isMobileNavActive, setIsMobileNavActive] = useState(false);

    const toggleMobileNav = () => setIsMobileNavActive(!isMobileNavActive);

    return (
        <>
            <button
                className="fixed right-2.5 top-2.5 z-[9998] bg-transparent text-2xl p-1.5 rounded-full cursor-pointer xl:hidden"
                onClick={toggleMobileNav}
            >
                {isMobileNavActive ? (
                    <FaTimes className="text-white" />
                ) : (
                    <FaBars className="text-gray-700" />
                )}
            </button>
            <header
                id="header"
                className={`fixed top-0 left-0 bottom-0 z-[9997] transition-all duration-500 p-4 overflow-y-auto ${isMobileNavActive ? "left-0" : "-left-[300px]"
                    } bg-white border-r border-gray-200 w-[300px] xl:w-[100px] xl:left-0`}
            >
                <nav id="navbar" className="nav-menu">
                    <ul>
                        {[
                            { href: "#hero", icon: "bx-home", label: "Início" },
                            { href: "#sobre", icon: "bxs-user-account", label: "Sobre" },
                            { href: "#portfolio", icon: "bx-book-content", label: "Portfólio" },
                            { href: "#contact", icon: "bx-envelope", label: "Contato" },
                        ].map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="flex items-center text-gray-700 p-2.5 mb-2 transition-all duration-300 text-base rounded-full bg-gray-100 h-14 w-full xl:w-14 hover:w-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => setIsMobileNavActive(false)}
                                >
                                    <i className={`bx ${item.icon} text-xl`} />
                                    <span className="pl-2 xl:hidden xl:group-hover:block">
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
}