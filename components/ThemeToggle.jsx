"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2 text-text-muted transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <div className="w-5 h-5" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-text-muted transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-text-main"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun size={20} className="transition-all" />
            ) : (
                <Moon size={20} className="transition-all" />
            )}
        </button>
    );
}
