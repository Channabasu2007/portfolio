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
            period: "",
            institution: "Karnataka State Board",
            details: "Secured 98.17%",
        },
    ];

    return (
        <Section id="education" borderTop>
            <SectionGrid title="Education">
                <div className="space-y-10">
                    {items.map((item) => (
                        <div key={item.degree} className="relative">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-base font-medium text-text-main">
                                    {item.degree}
                                </h3>
                                <span className="text-xs text-text-light font-mono">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-sm text-text-muted mb-1">{item.institution}</p>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {item.details}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionGrid>
        </Section>
    );
}
