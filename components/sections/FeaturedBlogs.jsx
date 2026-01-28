import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';

export async function FeaturedBlogs() {
    const allPosts = await getAllPosts();
    // Prioritize featured posts, then fallback to date
    const featuredPosts = allPosts.filter(post => post.featured);
    const otherPosts = allPosts.filter(post => !post.featured);

    // Combine: Featured first, then others. Slice top 3.
    const posts = [...featuredPosts, ...otherPosts].slice(0, 3);

    if (posts.length === 0) return null;

    return (
        <section className="py-24 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Latest Writing</h2>
                <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors group">
                    View all posts
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                        <article className="flex flex-col h-full p-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                            {/* Card Image - Optional but good for 'top 3' */}
                            {post.coverImage && (
                                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            <div className="px-2">
                                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </time>
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 leading-snug group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                                    {post.description}
                                </p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
