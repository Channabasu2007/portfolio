import { MetadataRoute } from "next";

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard/", "/api/", "/login/"],
        },
        sitemap: "https://channabasumathad.vercel.app/sitemap.xml",
    };
}
