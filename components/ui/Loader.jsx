"use client";

import { motion } from 'framer-motion';

export default function Loader({ size = "medium", className = "" }) {
    const sizes = {
        small: "w-4 h-4",
        medium: "w-8 h-8",
        large: "w-12 h-12"
    };

    return (
        <div className={`flex items-center justify-center p-4 ${className}`}>
            <motion.div
                className={`${sizes[size]} border-2 border-neutral-200 dark:border-neutral-800 border-t-primary rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader size="large" />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm font-medium text-text-muted uppercase tracking-widest"
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
}
