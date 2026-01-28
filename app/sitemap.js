import { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";

export default async function sitemap() {
    const baseUrl = "https://channabasumathad.vercel.app";
    const posts = await getAllPosts();

    const blogEntries = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily", // Blog index changes when new posts are added
            priority: 0.9,
        },
        ...blogEntries,
    ];
}
