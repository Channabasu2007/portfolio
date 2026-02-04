import { getAllPosts, getPostData } from "@/lib/blog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ShareButtons from "@/components/Blog/ShareButtons";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ... (keeping existing imports)

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug) || (await getAllPosts()).find((p) => p.slug === slug);

  if (post) {
    const title = `${post.title} | Channabasavaswami Mathad`;
    const description = post.description || "Article by Channabasavaswami Mathad";

    return {
      title,
      description,
      authors: [{ name: "Channabasavaswami Mathad", url: "https://channabasumathad.vercel.app" }],
      keywords: [
        ...(post.tags || []),
        "Channabasu Mathad",
        "Channabasavaswami Mathad",
        "Full Stack Developer"
      ],
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post.date,
        authors: ["Channabasavaswami Mathad"],
        images: post.coverImage
          ? [{ url: post.coverImage, alt: post.title }]
          : [], // Could add author image here too but usually cover is preferred for sharing
        siteName: "Channabasavaswami Mathad",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  }
  return { title: "Post Not Found | Channabasavaswami Mathad" };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post = await getPostData(slug);

  if (!post) {
    const all = await getAllPosts();
    const found = all.find((p) => p.slug === slug);
    if (found) post = found;
    else notFound();
  }

  if (post.visibility === 'private') {
    notFound();
  }

  const publishedDate = new Date(post.date);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://channabasumathad.vercel.app";
  const url = `${baseUrl}/blog/${post.slug}`;
  const authorImage = "/Channabasumathad.jpg";
  const authorName = "Channabasavaswami Mathad";

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-background text-text-main pb-24">
        {/* Article JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description || "Article by Channabasavaswami Mathad.",
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: authorName,
                url: baseUrl,
                image: `${baseUrl}${authorImage}`
              },
              image: post.coverImage ? [post.coverImage] : undefined,
              url,
              keywords: post.tags && post.tags.length ? post.tags : undefined,
            }),
          }}
        />

        {/* Hero Section */}
        <div className="pt-32 pb-10 px-6">
          <div className="max-w-column mx-auto space-y-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-medium text-text-muted hover:text-text-main transition-colors"
            >
              ← Back to all writing
            </Link>

            <div className="space-y-6">
              {/* Author Byline */}
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
                  <Image
                    src={authorImage}
                    alt={authorName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-text-main">{authorName}</span>
                  <a href="https://linkedin.com/in/channabasumathad" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-[#0077b5] transition-colors">Connect on LinkedIn</a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-text-muted pt-2 border-t border-neutral-100 dark:border-neutral-800/50">
                <time dateTime={post.date}>
                  {publishedDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span>
                  {Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length || 0) / 200)} min read
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200/70 dark:border-neutral-800/80 px-2 py-0.5 text-[10px] tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-sm md:text-base text-text-light leading-relaxed max-w-xl">
                  {post.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-3xl mx-auto px-6 mb-10">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        <div className="max-w-column mx-auto px-6">
          <article
            className="prose prose-neutral dark:prose-invert prose-lg max-w-none
                        prose-headings:font-semibold prose-headings:tracking-tight
                        prose-h1:hidden
                        prose-p:text-text-main/85 prose-p:leading-7 prose-p:font-normal
                        prose-a:link-highlight
                        prose-img:rounded-xl prose-img:my-8
                        prose-code:text-sm prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-[#1e1e1e] prose-pre:text-gray-50 prose-pre:rounded-xl prose-pre:border prose-pre:border-neutral-800
                        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:font-mono"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            <hr className="my-12 border-neutral-100 dark:border-neutral-800" />

            <div className="not-prose flex flex-col items-center gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                Share
              </h3>
              <ShareButtons title={post.title} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
