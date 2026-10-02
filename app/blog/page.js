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
    // Personal brand
    "Channabasu blogs",
    "Channabasavaswami blogs",
    "Channabasu Mathad",
    "Channabasavaswami Mathad",
    "Channabasu Mathad portfolio",
    "Channabasu Mathad developer",

    // General blog topics
    "Web Development Blog",
    "Programming Blog",
    "Software Engineering Blog",
    "Tech Blog",
    "Developer Blog",
    "Coding Tutorials",
    "Programming Tutorials",
    "Technology Articles",
    "Technical Writing",

    // Frontend development
    "Frontend Development",
    "React.js Tutorials",
    "React.js Developer",
    "Next.js Tutorials",
    "Next.js Development",
    "JavaScript Tutorials",
    "TypeScript Development",
    "Tailwind CSS",
    "Responsive Web Design",
    "Modern Web Development",

    // Backend development
    "Backend Development",
    "Node.js Tutorials",
    "REST API Development",
    "Full Stack Development",
    "PostgreSQL",
    "Prisma ORM",
    "Database Design",
    "Authentication and Authorization",

    // AI and emerging technologies
    "Artificial Intelligence",
    "AI Development",
    "Generative AI",
    "Large Language Models",
    "LLM Integration",
    "AI-Powered Applications",
    "Computer Vision",
    "Machine Learning Projects",
    "Ollama",
    "Open Source AI",

    // Developer learning and projects
    "Developer Projects",
    "Full Stack Projects",
    "Web Development Projects",
    "Programming Tips",
    "Software Development Best Practices",
    "Open Source Projects",
    "Learning to Code",
    "Developer Experiences",

    // Location and professional topics
    "Bengaluru Developer",
    "Web Developer Bengaluru",
    "Full Stack Developer India",
    "Software Developer India",
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

