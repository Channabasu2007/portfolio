import { Section, SectionGrid } from "@/components/ui/Section";

export function Skills() {
    const skills = [
        {
            title: "Frontend Development",
            desc: "React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive UI/UX",
        },
        {
            title: "Backend Development",
            desc: "Node.js, Express.js, Python, REST APIs, MongoDB, Authentication (JWT, NextAuth)",
        },
        {
            title: "Tools & Practices",
            desc: "Git, GitHub, Firebase, API Integration, SEO Optimization, Debugging, Clean Code Practices",
        },
    ];

    return (
        <Section id="skills" borderTop>
            <SectionGrid title="Expertise">
                <div className="space-y-8">
                    {skills.map((item) => (
                        <div key={item.title}>
                            <h3 className="text-sm font-medium text-text-main mb-2">
                                {item.title}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionGrid>
        </Section>
    );
}
