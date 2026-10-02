import { getAllPosts, getPostData } from "@/lib/blog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ShareButtons from "@/components/Blog/ShareButtons";
import ArticleContent from "@/components/Blog/ArticleContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post =
    (await getPostData(slug)) ||
    (await getAllPosts()).find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Channabasavaswami Mathad" };
  }

  const title = `${post.title} | Channabasavaswami Mathad`;
  const description =
    post.description || "Article by Channabasavaswami Mathad";

  return {
    title,
    description,
    authors: [
      {
        name: "Channabasavaswami Mathad",
        url: "https://channabasumathad.vercel.app",
      },
    ],
    keywords: [
      ...(post.tags || []),
      "Channabasu Mathad",
      "Channabasavaswami Mathad",
      "Full Stack Developer",
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
        : [],
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

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let post = await getPostData(slug);

  if (!post) {
    const all = await getAllPosts();
    post = all.find((p) => p.slug === slug);

    if (!post) notFound();
  }

  if (post.visibility === "private") {
    notFound();
  }

  const publishedDate = new Date(post.date);
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://channabasumathad.vercel.app";

  const url = `${baseUrl}/blog/${post.slug}`;
  const authorImage = "/Channabasumathad.jpg";
  const authorName = "Channabasavaswami Mathad";

  const wordCount =
    post.content
      ?.replace(/<[^>]*>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length || 0;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Shared width for the article header, cover and body.
  const articleWidth = "w-full max-w-4xl mx-auto";

  return (
    <>
      <Header />

      <main className="min-h-screen w-full overflow-x-clip bg-background pb-20 text-text-main sm:pb-24">
        {/* Article JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description:
                post.description ||
                "Article by Channabasavaswami Mathad.",
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: authorName,
                url: baseUrl,
                image: `${baseUrl}${authorImage}`,
              },
              image: post.coverImage
                ? [post.coverImage]
                : undefined,
              url,
              keywords:
                post.tags && post.tags.length
                  ? post.tags
                  : undefined,
            }),
          }}
        />

        {/* Article header */}
        <section className="px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className={`${articleWidth} space-y-7 sm:space-y-8`}>
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors hover:text-text-main sm:text-sm"
            >
              <span aria-hidden="true">←</span>
              Back to all writing
            </Link>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800 sm:h-14 sm:w-14">
                <Image
                  src={authorImage}
                  alt={authorName}
                  fill
                  className="object-cover"
                  sizes="56px"
                  priority
                />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-medium text-text-main sm:text-base">
                  {authorName}
                </span>

                <a
                  href="https://linkedin.com/in/channabasumathad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted transition-colors hover:text-[#0077b5] sm:text-sm"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-neutral-100 pt-4 text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted dark:border-neutral-800/50 sm:gap-x-4 sm:text-[11px] sm:tracking-[0.2em]">
              <time dateTime={post.date}>
                {publishedDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <span
                className="h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"
                aria-hidden="true"
              />

              <span>{readingTime} min read</span>

              {post.tags?.length > 0 && (
                <>
                  <span
                    className="hidden h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700 sm:block"
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200/70 px-2 py-1 text-[9px] tracking-wide dark:border-neutral-800/80 sm:text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-text-main sm:text-3xl md:text-4xl lg:text-[42px]">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="max-w-2xl text-sm leading-7 text-text-light sm:text-base sm:leading-8">
                {post.description}
              </p>
            )}
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <section className="mt-8 px-4 sm:mt-10 sm:px-6 lg:px-8">
            <div className={`${articleWidth}`}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 sm:rounded-2xl">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                  className="object-contain"
                />
              </div>
            </div>
          </section>
        )}

        {/* Article body */}
        <section className="mt-8 px-4 sm:mt-12 sm:px-6 lg:px-8">
          <div className={articleWidth}>
            <ArticleContent content={post.content} />

            {/* Share section */}
            <div className="my-12 border-t border-neutral-100 pt-10 dark:border-neutral-800 sm:my-16 sm:pt-12">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                  Share
                </h3>

                <ShareButtons title={post.title} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

