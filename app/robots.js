import { MetadataRoute } from "next";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://channabasumathad.vercel.app/sitemap.xml",
    };
}
