import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DeleteButton from '@/components/Dashboard/DeleteButton'; // We'll make this small client component

export const dynamic = 'force-dynamic'; // Ensure we get fresh data on every load

export default function DashboardPage() {
    const posts = getAllPosts();

    return (
        <div className="space-y-8 animate-in fade-in duration-500 w-full mx-auto p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Overview</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">Manage your blog posts and content.</p>
                </div>
                <Link
                    href="/dashboard/create"
                    className="group flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full hover:bg-primary-dark transition-all active:scale-95 shadow-lg shadow-primary/20 font-semibold tracking-wide"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    New Post
                </Link>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                                <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider">Title</th>
                                <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider w-32">Date</th>
                                <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider w-32">Status</th>
                                <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400 text-sm uppercase tracking-wider w-32 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-neutral-500 dark:text-neutral-400">
                                        <p className="mb-4">No posts yet.</p>
                                        <Link href="/dashboard/create" className="text-primary hover:underline">Create your first one!</Link>
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors group">
                                        <td className="p-4 font-medium text-neutral-900 dark:text-white">{post.title}</td>
                                        <td className="p-4 text-neutral-500 dark:text-neutral-400 text-sm">{new Date(post.date).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                                Published
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/dashboard/edit/${post.id}`}
                                                    className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-primary-dark dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 rounded-md transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <DeleteButton id={post.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
