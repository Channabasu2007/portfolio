"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
            {/* Minimal Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-lg w-full text-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/50 mb-8 border border-neutral-200 dark:border-neutral-800">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-wider text-text-muted uppercase">
                        404 Error
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-semibold text-text-main mb-6 tracking-tight">
                    Page not found
                </h1>

                <p className="text-lg text-text-muted leading-relaxed mb-10 font-light">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <div className="flex items-center justify-center gap-6">
                    <Button variant="link" asChild className="text-text-muted hover:text-text-main transition-colors px-0">
                        <Link href="/" className="flex items-center gap-2">
                            <Home size={16} />
                            <span>Home</span>
                        </Link>
                    </Button>
                    <span className="text-neutral-300 dark:text-neutral-700">/</span>
                    <Button variant="link" asChild className="text-text-muted hover:text-text-main transition-colors px-0">
                        <Link href="/blog" className="flex items-center gap-2">
                            <span>Read Blog</span>
                            <ArrowLeft size={16} className="rotate-180" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
