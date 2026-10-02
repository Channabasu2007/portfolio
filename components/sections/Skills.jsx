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
                <div className="max-w-3xl space-y-8 sm:space-y-10">
                    {skills.map((item) => (
                        <div key={item.title}>
                            <h3 className="mb-2 text-base font-medium text-text-main sm:text-lg">
                                {item.title}
                            </h3>
                            <p className="text-base leading-7 text-text-muted sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionGrid>
        </Section>
    );
}

