import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { jsonLd } from "./jsonld";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://channabasumathad.vercel.app"),
  title: {
    default: "Channabasu Mathad | Full Stack Developer & Designer",
    template: "%s | Channabasu Mathad",
  },
  description: "Portfolio of Channabasavaswami Mathad (Channabasu). Full-Stack Web Developer building scalable applications with Next.js, React, and Modern UI.",
  keywords: [
    "Channabasu Mathad",
    "Channabasavaswami Mathad",
    "Channabasu",
    "Channabasavaswami",
    "Channabasu blogs",
    "Channabasavaswami blogs",
    "Full-Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "Frontend Engineer",
    "PES University",
    "MERN Stack developer at PES University",
    "MERN Stack developer",
    "AI and Ml student at PES University",
    "Channabasu Mathad Developer",
    "Channabasavaswami Mathad LinkedIn",
    "Channabasu Mathad GitHub",
    "Next.js Full-Stack Developer",
    "TypeScript Web Engineer",
    "Tailwind CSS Frontend Developer",
    "AI-Powered Web Applications",
    "Siglyk Sign Language AI",
    "MERN Stack Developer Bengaluru",
    "PES University Web Developer",
    "PESU RR Campus Developer",
    "Firebase and Next.js Developer",
    "Scalable Production-Ready Web Apps",
    "Freelance Web Developer India",
    "Modern Web Solutions",
    "Technical Blogger",
    "React.js Developer Bengaluru",
    "PostgreSQL and Prisma Developer",
    "LLM Integration Developer",
    "Computer Vision for Web"
  ],
  authors: [{ name: "Channabasu Mathad", url: "https://channabasumathad.vercel.app" }],
  creator: "Channabasu Mathad",
  openGraph: {
    title: "Channabasavaswami Mathad (Channabasu)",
    description: "Full-Stack Web Developer crafting scalable applications with Next.js and Modern UI.",
    url: "https://channabasumathad.vercel.app",
    siteName: "Channabasu Mathad",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Channabasu Mathad | Full Stack Developer",
    description: "Building the future of web with Next.js and AI.",
    creator: "@Channabasu34",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://channabasumathad.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "google0dffc99f309e6efa",
  },
  other: {
    "application/ld+json": JSON.stringify(jsonLd),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9BHHGZ2');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-text-main antialiased flex flex-col items-center min-h-screen selection:bg-primary selection:text-black`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9BHHGZ2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
