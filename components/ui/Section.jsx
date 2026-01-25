import { twMerge } from "tailwind-merge";

export function Section({ id, children, className, borderTop = false }) {
    return (
        <section
            id={id}
            className={twMerge(
                "mb-24 md:mb-32 scroll-mt-40",
                borderTop && "border-t border-gray-100 pt-20",
                className
            )}
        >
            {children}
        </section>
    );
}

export function SectionGrid({ title, children }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
            <h2 className="text-xs font-semibold text-text-light uppercase tracking-widest mt-1">
                {title}
            </h2>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
