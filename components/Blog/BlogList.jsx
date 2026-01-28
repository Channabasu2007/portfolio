"use client";

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function BlogList({ posts }) {
    return (
        <motion.div
            className="max-w-2xl mx-auto space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {posts.length === 0 ? (
                <div className="py-20 text-center border-y border-neutral-100 dark:border-neutral-800">
                    <p className="text-neutral-500 text-sm tracking-widest uppercase">No posts yet</p>
                </div>
            ) : (
                posts.map((post) => (
                    <BlogItem key={post.id} post={post} />
                ))
            )}
        </motion.div>
    );
}

function BlogItem({ post }) {
    return (
        <motion.div variants={item}>
            <Link href={`/blog/${post.slug}`} className="group block relative">
                <article className="glass-hover p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-baseline relative z-10">
                        <div className="w-24 shrink-0 text-xs font-mono text-neutral-400 dark:text-neutral-600 pt-1 group-hover:text-primary transition-colors">
                            {new Date(post.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>

                        <div className="flex-1 space-y-3">
                            <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            {post.description && (
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md line-clamp-2">
                                    {post.description}
                                </p>
                            )}
                            <div className="flex items-center gap-2 text-xs font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                Read Post
                                <ArrowRight size={12} />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
