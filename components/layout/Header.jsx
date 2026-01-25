import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { clsx } from "clsx";

export function Header() {
    const socialLinks = [
        {
            name: "LinkedIn",
            href: "https://linkedin.com/in/channabasumathad",
            icon: FaLinkedin,
            hoverColor: "hover:text-[#0077b5]",
        },
        {
            name: "X (Twitter)",
            href: "https://x.com/Channabasu34",
            icon: FaXTwitter,
            hoverColor: "hover:text-black",
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
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm transition-all">
            <div className="mx-auto flex h-20 max-w-column items-center justify-between px-6 md:px-0">
                <Link
                    href="#"
                    className="text-sm font-semibold tracking-wide text-text-main hover:opacity-70 transition-opacity"
                >
                    Channabasavaswami Mathad
                </Link>

                <nav className="flex items-center gap-5">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            aria-label={link.name}
                            target="_blank"
                            rel="noreferrer"
                            className={clsx(
                                "text-text-muted transition-colors text-lg",
                                link.hoverColor
                            )}
                        >
                            <link.icon />
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
