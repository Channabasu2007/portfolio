import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function Hero() {
    return (
        <Section id="home">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-medium text-text-light uppercase tracking-widest">
                    Available for work
                </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-text-main mb-8 leading-tight">
                Channabasavaswami Mathad
            </h1>
            <div className="space-y-6 text-lg md:text-xl text-text-muted leading-relaxed font-light">
                <p>
                    I am a Full-Stack Web Developer building scalable, production-ready web applications using Next.js and AI. I focus on clean architecture, performance, and intuitive user experiences.
                </p>
                <p>
                    My work focuses on building robust, maintainable systems that solve real-world problems. I value simplicity, clarity, and long-term scalability.
                </p>
            </div>
            <div className="mt-10 flex gap-8">
                <Button variant="link" href="#work">
                    See selected projects
                </Button>
                <Button variant="link" href="#contact">
                    Get in touch
                </Button>
            </div>
        </Section>
    );
}
