import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({ variant = 'primary', className, href, children, ...props }) {
    const baseStyles = "text-sm font-medium text-text-main transition-all flex items-center gap-2 pb-1";

    const variants = {
        primary: "border-b-2 border-primary hover:border-primary-dark hover:text-primary-dark",
        link: "link-highlight hover:text-text-main",
        icon: "text-text-muted hover:text-black text-lg p-0 border-none",
        ghost: "hover:opacity-70",
    };

    const combinedClasses = twMerge(baseStyles, variants[variant], className);

    if (href) {
        if (href.startsWith('http')) {
            return (
                <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                </a>
            )
        }
        return (
            <Link href={href} className={combinedClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
