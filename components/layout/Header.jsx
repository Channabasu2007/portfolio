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
                    className="md:hidden p-2 text-text-main z-50 relative hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-3xl md:hidden flex flex-col pt-28 px-6"
                    >
                        <nav className="flex flex-col gap-6">
                            <Link
                                href="/blog"
                                className="text-2xl font-bold text-text-main"
                            >
                                Read Blog
                            </Link>

                            <div className="h-px bg-neutral-100 dark:bg-neutral-800 w-full" />

                            <div className="flex flex-col gap-4">
                                <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Socials</span>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-2xl text-text-main"
                                        >
                                            <link.icon />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-neutral-100 dark:bg-neutral-800 w-full" />

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium text-text-main">Appearance</span>
                                <ThemeToggle />
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
