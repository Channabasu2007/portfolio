"use client";

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogList({ posts }) {
    return (
        <div className="max-w-2xl mx-auto space-y-12">
            {posts.length === 0 ? (
                <div className="py-20 text-center border-y border-neutral-100 dark:border-neutral-800">
                    <p className="text-neutral-500 text-sm tracking-widest uppercase">No posts yet</p>
                </div>
            ) : (
                posts.map((post) => (
                    <BlogItem key={post.id} post={post} />
                ))
            )}
        </div>
    );
}

function BlogItem({ post }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-baseline">
                <div className="w-24 shrink-0 text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-1">
                    {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>

                <div className="flex-1 space-y-2">
                    <h2 className="text-lg font-medium text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                        {post.title}
                    </h2>
                    {post.description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-md">
                            {post.description}
                        </p>
                    )}
                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors pt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-300">
                        Read
                        <ArrowRight size={12} />
                    </div>
                </div>
            </article>
        </Link>
    );
}
