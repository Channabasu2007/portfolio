import { Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "./jsonld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://channabasumathad.vercel.app"),
  title: {
    default: "Channabasavaswami Mathad | Minimal Portfolio",
    template: "%s | Channabasavaswami Mathad",
  },
  description: "Full-Stack Web Developer crafting scalable applications with Next.js and AI.",
  keywords: ["Full-Stack Developer", "Web Developer", "Next.js", "React", "AI", "Portfolio", "Channabasavaswami Mathad"],
  authors: [{ name: "Channabasavaswami Mathad", url: "https://channabasumathad.vercel.app" }],
  creator: "Channabasavaswami Mathad",
  openGraph: {
    title: "Channabasavaswami Mathad",
    description: "Full-Stack Web Developer crafting scalable applications with Next.js and AI.",
    url: "https://channabasumathad.vercel.app",
    siteName: "Channabasavaswami Mathad Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Channabasavaswami Mathad ",
    description: "Full-Stack Web Developer crafting scalable applications with Next.js and AI.",
    creator: "@Channabasu34", // Based on Header.jsx
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "google0dffc99f309e6efa",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-text-main antialiased flex flex-col items-center min-h-screen selection:bg-primary selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
