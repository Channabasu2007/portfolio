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
        {
            role: "Web Developer",
            period: "2026 — Present",
            org: "GCUBE Club, PES University",
            desc: "Engaged in various web development projects and initiatives at GCUBE Club, PES University.",
        },
    ];

    return (
        <Section id="experience" borderTop>
            <SectionGrid title="Campus Involvement">
                <div className="max-w-3xl space-y-10 sm:space-y-12">
                    {items.map((item, index) => (
                        <div key={index} className="relative">
                            {/* Role and Period */}
                            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                <h3 className="text-base font-medium text-text-main sm:text-lg">
                                    {item.role}
                                </h3>

                                <span className="font-mono text-xs text-text-light sm:text-sm">
                                    {item.period}
                                </span>
                            </div>

                            {/* Organization */}
                            <p className="mb-3 text-base text-text-muted sm:text-lg">
                                {item.org}
                            </p>

                            {/* Description */}
                            <p className="max-w-3xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionGrid>
        </Section>
    );
}

