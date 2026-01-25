import { MetadataRoute } from "next";

export default function sitemap() {
    const baseUrl = "https://channabasu.dev"; // replace with your real domain

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
