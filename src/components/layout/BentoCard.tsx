<<<<<<< HEAD
=======

import { ReactNode } from "react";
>>>>>>> refazendo-header
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoCardProps {
<<<<<<< HEAD
    children: React.ReactNode;
    className?: string;
    // Adicione outras props que você possa precisar, como variantes de animação
}

export const BentoCard: React.FC<BentoCardProps> = ({ children, className }) => {
=======
    children: ReactNode;
    className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ children, className }) => {

>>>>>>> refazendo-header
    const cardAnimation = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
<<<<<<< HEAD
        transition: { duration: 0.6, ease: "easeOut" },
=======
        transition: { duration: 0.6, ease: "easeOut" as const },
>>>>>>> refazendo-header
    };

    return (
        <motion.div
            {...cardAnimation}
            className={cn(
                "bg-black border border-[#353739] rounded-3xl p-6 flex flex-col text-[#f2f2f2] transition-all duration-300 hover:border-[#555759] hover:-translate-y-1",
                className
            )}
        >
            {children}
        </motion.div>
    );
};