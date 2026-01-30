export const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://channabasumathad.vercel.app/#person",
            "name": "Channabasavaswami Mathad",
            "alternateName": [
                "Channabasu Mathad",
                "Channabasu",
                "Channabasavaswami"
            ],
            "url": "https://channabasumathad.vercel.app",
            "image": "https://channabasumathad.vercel.app/opengraph-image",
            "jobTitle": "Full-Stack Web Developer",
            "description":
                "Full-Stack Web Developer specializing in Next.js, React, and AI-powered web applications.",
            "sameAs": [
                "https://github.com/Channabasu2007",
                "https://linkedin.com/in/channabasumathad"
            ],
            "knowsAbout": [
                "Next.js",
                "React",
                "JavaScript",
                "Node.js",
                "MongoDB",
                "AI Integration",
                "SEO Optimization",
                "Web Development"
            ],
            "affiliation": {
                "@type": "CollegeOrUniversity",
                "name": "PES University"
            },
            "mainEntityOfPage": {
                "@id": "https://channabasumathad.vercel.app/"
            }
        },
        {
            "@type": "WebSite",
            "@id": "https://channabasumathad.vercel.app/#website",
            "url": "https://channabasumathad.vercel.app",
            "name": "Channabasavaswami Mathad",
            "description":
                "Portfolio of Channabasavaswami Mathad, a Full-Stack Web Developer building scalable and SEO-optimized web applications using Next.js and AI.",
            "publisher": {
                "@id": "https://channabasumathad.vercel.app/#person"
            },
            "inLanguage": "en-IN",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://channabasumathad.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    ]
};
