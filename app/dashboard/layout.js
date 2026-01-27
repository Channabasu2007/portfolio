"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenSquare, FileText, LogOut, ExternalLink, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/login', { method: 'DELETE' });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="flex h-screen bg-background font-sans text-text-main">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-background/80 backdrop-blur-xl border-r border-neutral-200/50 dark:border-neutral-800/50 transition-transform duration-300 md:relative md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-text-main">Portfolio CMS</h1>
                        <p className="text-xs text-text-muted">Manage your content</p>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-text-muted hover:text-text-main transition-colors">
                        <Menu size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem
                        href="/dashboard"
                        icon={<LayoutDashboard size={18} />}
                        label="Overview"
                        active={pathname === '/dashboard'}
                    />
                    <NavItem
                        href="/dashboard/create"
                        icon={<PenSquare size={18} />}
                        label="New Post"
                        active={pathname === '/dashboard/create'}
                    />
                    <div className="pt-4 pb-2">
                        <p className="px-4 text-xs font-medium text-text-muted/60 uppercase tracking-wider">External</p>
                    </div>
                    <NavItem
                        href="/blog"
                        icon={<ExternalLink size={18} />}
                        label="View Live Site"
                        target="_blank"
                    />
                </nav>

                <div className="p-4 border-t border-neutral-200/50 dark:border-neutral-800/50 space-y-1">
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-input-bg mb-2">
                        <span className="text-sm font-medium text-text-muted">Theme</span>
                        <ThemeToggle />
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 p-4 flex items-center gap-4 z-40">
                <button onClick={() => setSidebarOpen(true)} className="text-text-muted">
                    <Menu size={24} />
                </button>
                <span className="font-bold text-text-main">Dashboard</span>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0 relative scroll-smooth bg-background">
                {/* Full width container, no user padding forced here to allow full-bleed editors */}
                <div className="w-full max-w-full overflow-x-hidden min-h-full">
                    {children}
                </div>
            </main>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

function NavItem({ href, icon, label, active, target }) {
    return (
        <Link
            href={href}
            target={target}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors
                ${active
                    ? 'bg-primary/10 text-primary-dark'
                    : 'text-text-muted hover:bg-input-bg hover:text-text-main'}
            `}
        >
            {icon}
            {label}
        </Link>
    );
}
