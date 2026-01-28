import { getAllPosts } from "@/lib/blog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import BlogList from "@/components/Blog/BlogList";

export const metadata = {
  title: "Channabasu Mathad's Blog | Web Development & AI",
  description:
    "Insights by Channabasavaswami Mathad (Channabasu). Minimal, practical articles on modern web development, Next.js, and design engineering.",
  keywords: ["Channabasu blogs", "Channabasavaswami blogs", "Web Development Blog", "Next.js Tutorials"],
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-background text-text-main pt-32 pb-24">
        <div className="max-w-column mx-auto px-6 md:px-0 space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted">
              Journal
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Thoughts on building with the web and AI.
            </h1>
            <p className="text-sm md:text-base text-text-light max-w-xl leading-relaxed">
              Short, practical notes from projects I&apos;m shipping. No fluff,
              just what actually worked.
            </p>
          </header>

          <BlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
