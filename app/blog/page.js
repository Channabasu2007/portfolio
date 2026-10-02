import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import BlogList from "@/components/Blog/BlogList";

export const metadata = {
    title: "Channabasu Mathad's Blog | Web Development & AI",
    description:
        "Insights by Channabasavaswami Mathad (Channabasu). Minimal, practical articles on modern web development, Next.js, and design engineering.",
    keywords: [
        "Channabasu blogs",
        "Channabasavaswami blogs",
        "Web Development Blog",
        "Next.js Tutorials",
    ],
};

export default async function BlogIndexPage() {
    const allPosts = await getAllPosts();
    const posts = allPosts.filter(
        (post) => post.visibility === "public"
    );

    return (
        <>
            <Header />

            <main className="min-h-screen w-full bg-background pt-28 pb-20 text-text-main sm:pt-32 sm:pb-24">
                <div className="mx-auto max-w-5xl space-y-8 px-5 sm:space-y-10 sm:px-6 lg:px-0">
                    <header className="max-w-3xl space-y-3 sm:space-y-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted sm:text-xs sm:tracking-[0.25em]">
                            Journal
                        </p>

                        <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                            Thoughts on building with the web and AI.
                        </h1>

                        <p className="max-w-xl text-sm leading-6 text-text-light sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                            From concept to commit. Practical insights from the projects I ship.
                        </p>
                    </header>

                    <BlogList posts={posts} />
                </div>
            </main>

            <Footer />
        </>
    );
}

