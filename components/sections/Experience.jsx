import { Section, SectionGrid } from "@/components/ui/Section";

export function Experience() {
    const items = [
        {
            role: "Web Developer",
            period: "2025 — Present",
            org: "Embrione, PES University",
            desc: "Working on web development projects within the Embrione community.",
        },
        {
            role: "Web Developer",
            period: "2025 — Present",
            org: "Qforest, PES University",
            desc: "Contributing to web initiatives and development tasks at Qforest.",
        },
    ];

    return (
        <Section id="experience" borderTop>
            <SectionGrid title="Campus Involvement">
                <div className="space-y-10">
                    {items.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-base font-medium text-text-main">
                                    {item.role}
                                </h3>
                                <span className="text-xs text-text-light font-mono">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-sm text-text-muted mb-3">{item.org}</p>
                            <p className="text-sm text-text-muted leading-relaxed max-w-lg">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionGrid>
        </Section>
    );
}

