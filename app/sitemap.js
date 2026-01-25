import { MetadataRoute } from "next";

export default function sitemap() {
    const baseUrl = "https://channabasumathad.vercel.app";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
