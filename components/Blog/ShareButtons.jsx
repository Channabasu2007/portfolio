"use client";

import { Facebook, Linkedin, Link as LinkIcon, Check, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ShareButtons({ title }) {
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        setUrl(window.location.href);
        setCanShare(!!navigator.share);
    }, []);

    const handleShare = async () => {
        if (!url) return;

        // Try native share first
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                });
                return; // Success, don't copy
            } catch (err) {
                // Ignore abort errors (user cancelled share)
                if (err.name === 'AbortError') return;
                console.error('Share failed:', err);
                // Continue to fallback if share failed for other reasons
            }
        }

        // Fallback to Copy Link
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
            alert("Failed to copy link. Please manually copy the URL.");
        }
    };

    const XIcon = () => (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
    );

    const shareLinks = [
        {
            name: "X",
            icon: <XIcon />,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "hover:text-black hover:bg-black/5 dark:hover:text-white dark:hover:bg-white/10"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={18} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:text-[#0a66c2] hover:bg-[#0a66c2]/10"
        },
        {
            name: "Facebook",
            icon: <Facebook size={18} />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: "hover:text-[#1877f2] hover:bg-[#1877f2]/10"
        }
    ];

    return (
        <div className="flex items-center gap-2">
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-full text-neutral-500 hover:scale-110 transition-all duration-200 bg-neutral-100 dark:bg-neutral-800 ${link.color}`}
                    title={`Share on ${link.name}`}
                >
                    {link.icon}
                </a>
            ))}
            <button
                onClick={handleShare}
                className="p-2.5 rounded-full text-neutral-500 bg-neutral-100 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all hover:scale-110 duration-200"
                title={canShare ? "Share" : "Copy Link"}
            >
                {copied ? <Check size={18} className="text-green-600" /> : (canShare ? <Share2 size={18} /> : <LinkIcon size={18} />)}
            </button>
        </div>
    );
}
