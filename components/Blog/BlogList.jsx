"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function BlogList({ posts }) {
    return (
        <motion.div
            className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-7"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {posts.length === 0 ? (
                <div className="border-y border-neutral-100 py-16 text-center dark:border-neutral-800 sm:py-20">
                    <p className="text-xs uppercase tracking-widest text-neutral-500 sm:text-sm">
                        No posts yet
                    </p>
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
            <Link
                href={`/blog/${post.slug}`}
                className="group relative block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                <article className="glass-hover rounded-2xl border-3 border-neutral-600 p-4 transition-all duration-300 sm:p-6 dark:border-neutral-800">
                    <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                        {/* Date */}
                        <div className="shrink-0 pt-0.5 font-mono text-[11px] text-neutral-400 transition-colors group-hover:text-primary sm:w-24 sm:pt-1 sm:text-xs dark:text-neutral-600">
                            {new Date(post.date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 space-y-2 sm:space-y-3">
                            <h2 className="font-display text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-primary sm:text-xl md:text-2xl dark:text-white">
                                {post.title}
                            </h2>

                            {post.description && (
                                <p className="line-clamp-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7 dark:text-neutral-400">
                                    {post.description}
                                </p>
                            )}

                            {/* Read more */}
                            <div className="flex translate-x-0 items-center gap-2 pt-1 text-xs font-medium text-primary transition-all duration-300 sm:translate-x-[-6px] sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100">
                                Read Post
                                <ArrowRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}

