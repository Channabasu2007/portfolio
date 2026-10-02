"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function Hero() {
  return (
    <Section id="home" className="relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute -top-20 -left-20 h-64 w-64 sm:h-96 sm:w-96 md:h-[500px] md:w-[500px] rounded-full bg-primary/10 blur-3xl -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50" />

      {/* Availability */}
      <div className="mb-6 sm:mb-8 flex items-center gap-3">
        <div className="h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
        <span className="text-xs sm:text-sm font-medium text-text-light uppercase tracking-[0.15em]">
          Available for work
        </span>
      </div>

      {/* Heading */}
      <h1 className="mb-6 max-w-4xl text-2xl leading-tight font-medium tracking-tight text-text-main sm:text-4xl md:text-5xl lg:text-6xl">
        Channabasavaswami Mathad
      </h1>

      {/* Description */}
      <div className="max-w-3xl space-y-4 text-[15px] leading-7 font-light text-text-muted sm:space-y-6 sm:text-lg sm:leading-relaxed md:text-xl lg:text-2xl">
        <p>
          I am a Full-Stack Web Developer building scalable, production-ready
          web applications using Next.js and AI. I focus on clean architecture,
          performance, and intuitive user experiences.
        </p>

        <p>
          My work focuses on building robust, maintainable systems that solve
          real-world problems. I value simplicity, clarity, and long-term
          scalability.
        </p>
      </div>
      {/* Actions */}
      <div className="mt-8 sm:mt-10 flex w-full flex gap-4 sm:flex-row sm:gap-8">
        <Button
          className="w-full justify-center sm:w-auto sm:justify-start"
          variant="link"
          href="#work"
        >
          See projects
        </Button>

        <Button
          className="w-full justify-center sm:w-auto sm:justify-start"
          variant="link"
          href="#contact"
        >
          Get in touch
        </Button>
      </div>
    </Section>
  );
}
