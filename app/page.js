import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs";

export const metadata = {
  title: "Channabasu Mathad - Full Stack Developer",
  description: "Welcome to the portfolio of Channabasavaswami Mathad (Channabasu). Explore projects, skills, and thoughts on web development.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full max-w-column px-6 md:px-0 pt-40 pb-32">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Education />
        <FeaturedBlogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
