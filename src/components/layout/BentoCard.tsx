
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ children, className }) => {

    const cardAnimation = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: "easeOut" as const },
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