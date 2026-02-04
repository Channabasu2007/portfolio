"use client";

import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isBlog = pathname?.startsWith("/blog");
    const isOnBlogIndex = pathname === "/blog";

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const socialLinks = [
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/channabasumathad",
            icon: FaLinkedin,
            hoverColor: "hover:text-[#0077b5]",
        },
        {
            name: "X",
            href: "https://x.com/Channabasu34",
            icon: FaXTwitter,
            hoverColor: "hover:text-black dark:hover:text-white",
        },
        {
            name: "Instagram",
            href: "https://instagram.com/channabasu_mathad/",
            icon: FaInstagram,
            hoverColor: "hover:text-[#E1306C]",
        },
        {
            name: "GitHub",
            href: "https://github.com/channabasu2007",
            icon: FaGithub,
            hoverColor: "hover:text-[#333]",
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-neutral-100/50 dark:border-neutral-800/50 transition-all">
            <div className="mx-auto flex h-20 max-w-column items-center justify-between px-6 md:px-0">
                <Link
                    href="/"
                    className="text-sm font-bold tracking-wide text-text-main hover:opacity-70 transition-opacity z-50 relative"
                >
                    Channabasavaswami Mathad
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2 md:gap-4">
                    {!isOnBlogIndex && (
                        <Link
                            href="/blog"
                            className={clsx(
                                "text-sm font-medium px-4 py-2 rounded-full transition-colors mr-2 border border-transparent",
                                isBlog
                                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-sm"
                                    : "bg-neutral-100 dark:bg-neutral-800 text-text-main hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                            )}
                        >
                            Blog
                        </Link>
                    )}
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            aria-label={link.name}
                            target="_blank"
                            rel="noreferrer"
                            className={clsx(
                                "text-text-muted transition-colors text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-full",
                                link.hoverColor
                            )}
                        >
                            <link.icon />
                        </a>
                    ))}
                    <div className="pl-2 border-l border-neutral-200 dark:border-neutral-800 ml-2">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-text-main z-[60] relative hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 1. The Backdrop: This blurs the surroundings */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed top-20 inset-x-0 bottom-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
                        />

                        {/* 2. The Menu: Solid and opaque */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-24 left-4 right-4 z-50 flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:border-neutral-800 dark:bg-neutral-950 md:hidden"
                        >
                            <nav className="flex flex-col p-6">
                                {/* Navigation Section */}
                                {!isOnBlogIndex && (
                                    <div className="mb-8">
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Navigation</p>
                                        <Link
                                            href="/blog"
                                            className="flex items-center justify-between rounded-xl px-4 py-4 text-xl font-bold transition-all active:scale-[0.98] bg-primary text-black"
                                        >
                                            Read My Blog
                                            <span className="text-lg opacity-50">→</span>
                                        </Link>
                                    </div>
                                )}

                                {/* Socials Grid */}
                                <div className="mb-8">
                                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Find me on</p>
                                    <div className="grid grid-cols-4 gap-3">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex aspect-square items-center justify-center rounded-2xl bg-neutral-100 text-2xl text-text-main transition-transform active:scale-90 dark:bg-neutral-900"
                                            >
                                                <link.icon />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer / Theme Toggle */}
                                <div className="flex items-center justify-between border-t border-neutral-100 pt-6 dark:border-neutral-900">
                                    <div>
                                        <span className="block text-sm font-bold">Theme</span>
                                        <span className="block text-xs text-neutral-500">Light / Dark mode</span>
                                    </div>
                                    <div className="scale-110">
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
