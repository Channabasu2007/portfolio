import { Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "./jsonld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Channabasavaswami Mathad | Minimal Portfolio",
  description: "Full-Stack Web Developer crafting scalable applications with Next.js and AI.",
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
