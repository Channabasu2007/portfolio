import { Section, SectionGrid } from "@/components/ui/Section";

export function Education() {
    const items = [
        {
            degree: "Bachelor of Technology (B.Tech) – CSE (AI & ML)",
            period: "2025 — Present",
            institution: "PES University, Bengaluru",
            details: "1st Year",
        },
        {
            degree: "11th Rank in Karnataka State Board (2nd PUC)",
            period: "2023 - 2025",
            institution: "Karnataka State Board",
            details: "Secured 98.17%",
        },
    ];

    return (
        <Section id="education" borderTop>
            <SectionGrid title="Education">
                <div className="max-w-3xl space-y-10 sm:space-y-12">
                    {items.map((item) => (
                        <div key={item.degree} className="relative">
                            {/* Degree and Period */}
                            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                <h3 className="text-base font-medium leading-snug text-text-main sm:text-lg">
                                    {item.degree}
                                </h3>

                                <span className="shrink-0 font-mono text-xs text-text-light sm:text-sm">
                                    {item.period}
                                </span>
                            </div>

                            {/* Institution */}
                            <p className="mb-2 text-base text-text-muted sm:text-lg">
                                {item.institution}
                            </p>

                            {/* Details */}
                            <p className="text-base leading-7 text-text-muted sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
                                {item.details}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionGrid>
        </Section>
    );
}
