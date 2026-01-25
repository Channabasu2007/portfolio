import { Section, SectionGrid } from "@/components/ui/Section";

export function About() {
    return (
        <Section id="about" borderTop>
            <SectionGrid title="About Me">
                <div className="space-y-6 text-text-muted leading-relaxed">
                    <p>
                        I am a passionate Full-Stack Developer and a student at
                        <span className="font-medium text-text-main"> PES University</span>, Bengaluru.
                        My journey in tech is driven by a desire to build creative and useful applications that solve real-world problems.
                    </p>
                    <p>
                        Currently, I specialize in the <span className="font-medium text-text-main">MERN Stack (MongoDB, Express, React, Node.js)</span> and have a deep interest in AI integration.
                        Whether it's bridging the gap between deaf and hearing communities with AI or optimizing logistics routes,
                        I love tackling challenges that require both technical depth and user-centric design.
                    </p>
                    <p>
                        When I'm not coding, you can find me exploring new web technologies, participating in hackathons,
                        or contributing to the developer community.
                    </p>
                </div>
            </SectionGrid>
        </Section>
    );
}
